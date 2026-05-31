import express from 'express';
import { createServer as createViteServer } from 'vite';
import crypto from 'crypto';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: ['https://getoptiseo.com', 'https://www.getoptiseo.com', 'http://localhost:5173'] }));
const PORT = 3000;

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://wdfywmdmuhsggjfhzgpa.supabase.co';
// Use the service role key if available, otherwise fallback to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZnl3bWRtdWhzZ2dqZmh6Z3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2Mjk1MTIsImV4cCI6MjA4OTIwNTUxMn0.WkgMbZDd0WLSPoYFNSAdcQFm7EgKbIDymQ5YNXpJZz0';

const supabase = createClient(supabaseUrl, supabaseKey);
const siteUrl = (process.env.SITE_URL || 'https://getoptiseo.com').replace(/\/+$/, '');

const getCurrentIsoDate = () => new Date().toISOString().split('T')[0];

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const createSitemapEntry = (loc: string, lastmod: string) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
`;

const decodeXml = (value: string) =>
  value
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');

const normalizeAbsoluteUrl = (value: string) => value.trim().replace(/\/+$/, '');

const isBlogLoc = (loc: string) => loc.startsWith(`${siteUrl}/blog/`);
const isSitemapLoc = (loc: string) => {
  const normalized = normalizeAbsoluteUrl(loc).toLowerCase();
  return normalized.endsWith('/sitemap.xml') || normalized.endsWith('/sitemap_index.xml');
};

const normalizeLastmod = (value?: string) => {
  if (!value) {
    return getCurrentIsoDate();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return getCurrentIsoDate();
  }

  return parsed.toISOString().split('T')[0];
};

type SitemapUrlEntry = {
  loc: string;
  lastmod: string;
  priority: string;
};

const parseSitemapEntries = (xml: string): SitemapUrlEntry[] => {
  const urlBlockRegex = /<url>[\s\S]*?<\/url>/g;
  const urlBlocks = xml.match(urlBlockRegex) || [];
  const entries: SitemapUrlEntry[] = [];

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>\s*([\s\S]*?)\s*<\/loc>/i);
    if (!locMatch) {
      continue;
    }

    const rawLoc = decodeXml(locMatch[1]);
    const loc = normalizeAbsoluteUrl(rawLoc);
    if (!loc) {
      continue;
    }

    const lastmodMatch = block.match(/<lastmod>\s*([\s\S]*?)\s*<\/lastmod>/i);
    const priorityMatch = block.match(/<priority>\s*([\s\S]*?)\s*<\/priority>/i);
    entries.push({
      loc,
      lastmod: normalizeLastmod(lastmodMatch?.[1]),
      priority: (priorityMatch?.[1] || '0.8').trim(),
    });
  }

  return entries;
};

const renderSitemapXml = (entries: SitemapUrlEntry[]) => {
  const deduped = new Map<string, SitemapUrlEntry>();
  for (const entry of entries) {
    deduped.set(entry.loc, entry);
  }

  const xmlBody = [...deduped.values()]
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${normalizeLastmod(entry.lastmod)}</lastmod>
    <priority>${entry.priority || '0.8'}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlBody}\n</urlset>\n`;
};

const upsertSitemapBlogUrl = (xml: string, loc: string, lastmod: string) => {
  const urlBlockRegex = /<url>[\s\S]*?<\/url>/g;
  const stripped = xml.replace(urlBlockRegex, (urlBlock) => {
    const locMatch = urlBlock.match(/<loc>\s*([^<]+)\s*<\/loc>/);
    if (!locMatch || normalizeAbsoluteUrl(locMatch[1]) !== loc) {
      return urlBlock;
    }
    // Remove existing block so we can reinsert it at the top.
    return '';
  });

  const entry = createSitemapEntry(loc, lastmod);
  if (/<urlset[^>]*>/i.test(stripped)) {
    return stripped.replace(/(<urlset[^>]*>\s*)/i, `$1\n${entry}`);
  }

  return `${stripped.trimEnd()}\n${entry}`;
};

const getSitemapFiles = async () => {
  const candidates = [
    path.join(__dirname, 'public', 'sitemap.xml'),
    path.join(__dirname, 'dist', 'sitemap.xml'),
    path.join(__dirname, '..', 'public', 'sitemap.xml'),
    path.join(__dirname, '..', 'dist', 'sitemap.xml'),
  ];
  const existing: string[] = [];
  const seen = new Set<string>();

  for (const filePath of candidates) {
    const resolved = path.resolve(filePath);
    if (seen.has(resolved)) {
      continue;
    }
    seen.add(resolved);
    try {
      await fs.access(resolved);
      existing.push(resolved);
    } catch {
      // Ignore missing candidates.
    }
  }

  return existing;
};

// Webhook endpoint needs raw body for signature verification
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    if (secret) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
      const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

      if (!crypto.timingSafeEqual(digest, signature)) {
        return res.status(401).send('Invalid signature');
      }
    } else {
      console.warn('LEMON_SQUEEZY_WEBHOOK_SECRET is not set. Skipping signature verification.');
    }

    const payload = JSON.parse(req.body.toString());
    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data;

    // Handle subscription_created or order_created events
    if (eventName === 'subscription_created' || eventName === 'order_created') {
      const userId = customData?.user_id;
      const productName = (payload.data?.attributes?.first_order_item?.product_name || '').toLowerCase();
      
      let role = 'premium';
      const pName = productName.toLowerCase();
      if (pName.includes('lifetime')) {
        role = 'lifetime';
      } else if (pName.includes('yearly plan 3')) {
        role = 'yearly plan 3';
      } else if (pName.includes('yearly plan 2')) {
        role = 'yearly plan 2';
      } else if (pName.includes('yearly plan 1')) {
        role = 'yearly plan 1';
      } else if (pName.includes('pro')) {
        role = 'pro';
      }
      
      if (userId) {
        // Update user in Supabase
        const { error } = await supabase
          .from('users')
          .update({ 
            role: role,
            subscription_created: new Date().toISOString()
          })
          .eq('id', userId);

        if (error) {
          console.error('Error updating user in Supabase:', error);
          return res.status(500).send('Error updating user');
        }
        console.log(`Successfully upgraded user ${userId} to ${role}`);
      } else {
        console.warn('No user_id found in custom_data');
      }
    }

    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Standard JSON parsing for other API routes
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const sitemapFiles = await getSitemapFiles();
    const staticEntriesByLoc = new Map<string, SitemapUrlEntry>();

    for (const filePath of sitemapFiles) {
      const existingXml = await fs.readFile(filePath, 'utf8');
      const parsedEntries = parseSitemapEntries(existingXml);
      for (const entry of parsedEntries) {
        if (!isBlogLoc(entry.loc) && !isSitemapLoc(entry.loc) && !staticEntriesByLoc.has(entry.loc)) {
          staticEntriesByLoc.set(entry.loc, entry);
        }
      }
    }

    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, title, date')
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    const blogEntriesByLoc = new Map<string, SitemapUrlEntry>();
    for (const blog of blogs || []) {
      const normalizedSlug = normalizeSlug(blog.slug || blog.title || '');
      if (!normalizedSlug) {
        continue;
      }

      const loc = `${siteUrl}/blog/${normalizedSlug}`;
      if (!blogEntriesByLoc.has(loc)) {
        blogEntriesByLoc.set(loc, {
          loc,
          lastmod: normalizeLastmod(blog.date),
          priority: '0.8',
        });
      }
    }

    if (!staticEntriesByLoc.has(siteUrl)) {
      staticEntriesByLoc.set(siteUrl, {
        loc: siteUrl,
        lastmod: getCurrentIsoDate(),
        priority: '1.0',
      });
    }

    const finalEntries = [...blogEntriesByLoc.values(), ...staticEntriesByLoc.values()];
    const xml = renderSitemapXml(finalEntries);

    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.status(200).send(xml);
  } catch (error: any) {
    console.error('Dynamic sitemap generation error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate sitemap.' });
  }
});

app.post('/api/sitemap/blog', async (req, res) => {
  const body = req.body || {};
  const providedSlug = typeof body.slug === 'string' ? normalizeSlug(body.slug) : '';
  const providedUrl = typeof body.url === 'string' ? body.url.trim().replace(/\/+$/, '') : '';

  const loc = providedUrl || (providedSlug ? `${siteUrl}/blog/${providedSlug}` : '');
  if (!loc || !loc.startsWith(`${siteUrl}/blog/`)) {
    return res.status(400).json({ error: 'Valid blog slug or URL is required.' });
  }

  const lastmod = getCurrentIsoDate();

  try {
    const sitemapFiles = await getSitemapFiles();
    if (sitemapFiles.length === 0) {
      return res.json({
        success: true,
        loc,
        lastmod,
        updatedFiles: [],
        note: 'No static sitemap file found. Use /api/sitemap.xml for dynamic sitemap output.',
      });
    }

    for (const filePath of sitemapFiles) {
      const existingXml = await fs.readFile(filePath, 'utf8');
      const updatedXml = upsertSitemapBlogUrl(existingXml, loc, lastmod);
      if (updatedXml !== existingXml) {
        await fs.writeFile(filePath, updatedXml, 'utf8');
      }
    }

    res.json({
      success: true,
      loc,
      lastmod,
      updatedFiles: sitemapFiles,
    });
  } catch (error: any) {
    console.error('Sitemap update error:', error);
    res.status(500).json({ error: error?.message || 'Failed to update sitemap.' });
  }
});

// Fetch prices from Lemon Squeezy
app.get('/api/lemonsqueezy/prices', async (req, res) => {
  try {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhNjE1NmYwMTlmMDNmOGU2ZmVmZGZhOGNiZDY5NmNjODhiZWIzMWJlYTFiZDkzNDRkMzRhNzczN2RmYWVjNThmMzQ3OTZiZmNmNzhhMWZlMSIsImlhdCI6MTc3NDkzNDYwMS43NDYxMSwibmJmIjoxNzc0OTM0NjAxLjc0NjExMywiZXhwIjoxNzk4Njc1MjAwLjAzMTUyMywic3ViIjoiNjcwNjczMCIsInNjb3BlcyI6W119.eZ23KlHl4KqbHhNfjN8UUXdo21rXNqNayFk4NaEkm4UPuFH7EdgIRT1aUP8B0SWd_nIrl0Bm-QIf3_x1NfwffUs0SIiLmFHc-OKir74yLD17BYOf6OCWQBoUKXH66_qVTpiBMISXYF1WvIl1y901kL0pvJIxUjNKqIlIH-F3bFAT35DS0t2z42QML3yx2aWQeVa3_51d_zuuBQETKDu59ce-a4VdvRfV495oGRqmvaaXeHCtYq442ZZv9ua4AS4rTnjzv_Ly1X_6v_LDp8tqlurWbyQz4xe9eunck_3Scg5TSW_GwRxLMdo6A-m6PoueeeeCKeJn0qVykpMzmMpG8G9f_P_eXXgrWEeAxQe2E2Yqdx3uvVLC8japmIJ8uqzIwxnZKRWDm_jSyujCJE3WP5awoLAuI5WWiQqTu3CNhBO-G5_vlPVKlY7bR-mAYTJz-AHK1CEm1jPmzk85qidDgSHfQ7-IclcDGWuyR93vBXep_CrIfBpthwRmhLJf2FAEH44Qnl7-y0MWpmBvbDBuQqzyaYHuXfrAHeqA7wyXYg_dOe6jsM1xtnfdCSP_Jyavzos684RoiPOjy3_9uq4KZaf7fdzdcxsVoTD79kkB1houZ_aOHa30CUWhLGWSPhMsJkfF85-p4t7itJ0nz8SPMcnAOjDP3x2I0WLKSf0S7NY';
    
    const response = await fetch('https://api.lemonsqueezy.com/v1/variants', {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch variants from Lemon Squeezy:', await response.text());
      return res.status(response.status).json({ error: 'Failed to fetch prices' });
    }

    const data = await response.json();
    const prices: Record<string, { price: number, formatted: string }> = {};
    
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((variant: any) => {
        prices[variant.id] = {
          price: variant.attributes.price / 100,
          formatted: variant.attributes.formatted_price || `$${variant.attributes.price / 100}`
        };
      });
    }

    res.json(prices);
  } catch (error: any) {
    console.error('Prices fetch error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch prices' });
  }
});

// Proxy endpoint to fetch website HTML for SEO analysis
app.post('/api/lemonsqueezy/checkout', async (req, res) => {
  console.log('Received checkout request:', req.body);
  const { variantId, userId, redirectUrl } = req.body;
  
  if (!variantId) {
    return res.status(400).json({ error: 'variantId is required' });
  }

  try {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhNjE1NmYwMTlmMDNmOGU2ZmVmZGZhOGNiZDY5NmNjODhiZWIzMWJlYTFiZDkzNDRkMzRhNzczN2RmYWVjNThmMzQ3OTZiZmNmNzhhMWZlMSIsImlhdCI6MTc3NDkzNDYwMS43NDYxMSwibmJmIjoxNzc0OTM0NjAxLjc0NjExMywiZXhwIjoxNzk4Njc1MjAwLjAzMTUyMywic3ViIjoiNjcwNjczMCIsInNjb3BlcyI6W119.eZ23KlHl4KqbHhNfjN8UUXdo21rXNqNayFk4NaEkm4UPuFH7EdgIRT1aUP8B0SWd_nIrl0Bm-QIf3_x1NfwffUs0SIiLmFHc-OKir74yLD17BYOf6OCWQBoUKXH66_qVTpiBMISXYF1WvIl1y901kL0pvJIxUjNKqIlIH-F3bFAT35DS0t2z42QML3yx2aWQeVa3_51d_zuuBQETKDu59ce-a4VdvRfV495oGRqmvaaXeHCtYq442ZZv9ua4AS4rTnjzv_Ly1X_6v_LDp8tqlurWbyQz4xe9eunck_3Scg5TSW_GwRxLMdo6A-m6PoueeeeCKeJn0qVykpMzmMpG8G9f_P_eXXgrWEeAxQe2E2Yqdx3uvVLC8japmIJ8uqzIwxnZKRWDm_jSyujCJE3WP5awoLAuI5WWiQqTu3CNhBO-G5_vlPVKlY7bR-mAYTJz-AHK1CEm1jPmzk85qidDgSHfQ7-IclcDGWuyR93vBXep_CrIfBpthwRmhLJf2FAEH44Qnl7-y0MWpmBvbDBuQqzyaYHuXfrAHeqA7wyXYg_dOe6jsM1xtnfdCSP_Jyavzos684RoiPOjy3_9uq4KZaf7fdzdcxsVoTD79kkB1houZ_aOHa30CUWhLGWSPhMsJkfF85-p4t7itJ0nz8SPMcnAOjDP3x2I0WLKSf0S7NY';
    let storeId = process.env.LEMON_SQUEEZY_STORE_ID ? process.env.LEMON_SQUEEZY_STORE_ID.replace('#', '').trim() : null;

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Lemon Squeezy credentials missing. Please add LEMON_SQUEEZY_API_KEY in AI Studio Secrets.' 
      });
    }
    
    // Dynamically fetch store ID if not provided
    if (!storeId) {
      try {
        const storeRes = await fetch('https://api.lemonsqueezy.com/v1/stores', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/vnd.api+json'
          }
        });
        if (storeRes.ok) {
          const storeData = await storeRes.json();
          if (storeData.data && storeData.data.length > 0) {
            storeId = storeData.data[0].id;
          }
        }
      } catch (err) {
        console.error('Failed to fetch stores:', err);
      }
    }
    
    if (!storeId) {
       storeId = '316300'; // fallback
    }

    const payload: any = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            custom: {
              user_id: userId || ''
            }
          }
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: storeId
            }
          },
          variant: {
            data: {
              type: 'variants',
              id: variantId.toString()
            }
          }
        }
      }
    };

    if (redirectUrl) {
      payload.data.attributes.product_options = {
        redirect_url: redirectUrl
      };
    }

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lemon Squeezy API error:', errorData);
      return res.status(response.status).json({ error: `Lemon Squeezy API error: ${errorData}` });
    }

    const data = await response.json();
    let checkoutUrl = data.data.attributes.url;
    
    const checkoutBaseUrl = (process.env.LEMONSQUEEZY_CHECKOUT_BASE_URL || 'https://getoptiseo.lemonsqueezy.com').replace(/\/+$/, '');

    // Force checkout host so frontend and backend stay consistent.
    if (checkoutUrl && checkoutUrl.includes('lemonsqueezy.com')) {
      const urlObj = new URL(checkoutUrl);
      checkoutUrl = `${checkoutBaseUrl}${urlObj.pathname}${urlObj.search}`;
    }
    
    res.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message || 'Failed to create checkout' });
  }
});

app.get('/api/proxy-fetch', async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    // Return only the first 50KB to avoid huge payloads
    res.send(html.slice(0, 50000));
  } catch (error: any) {
    console.error('Proxy fetch error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch website content' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
