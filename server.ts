import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://wdfywmdmuhsggjfhzgpa.supabase.co';
// Use the service role key if available, otherwise fallback to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZnl3bWRtdWhzZ2dqZmh6Z3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2Mjk1MTIsImV4cCI6MjA4OTIwNTUxMn0.WkgMbZDd0WLSPoYFNSAdcQFm7EgKbIDymQ5YNXpJZz0';

const supabase = createClient(supabaseUrl, supabaseKey);

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
      if (productName.includes('lifetime')) {
        role = 'lifetime';
      } else if (productName.includes('pro')) {
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
  const { variantId, userId, redirectUrl } = req.body;
  
  if (!variantId) {
    return res.status(400).json({ error: 'variantId is required' });
  }

  try {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhNjE1NmYwMTlmMDNmOGU2ZmVmZGZhOGNiZDY5NmNjODhiZWIzMWJlYTFiZDkzNDRkMzRhNzczN2RmYWVjNThmMzQ3OTZiZmNmNzhhMWZlMSIsImlhdCI6MTc3NDkzNDYwMS43NDYxMSwibmJmIjoxNzc0OTM0NjAxLjc0NjExMywiZXhwIjoxNzk4Njc1MjAwLjAzMTUyMywic3ViIjoiNjcwNjczMCIsInNjb3BlcyI6W119.eZ23KlHl4KqbHhNfjN8UUXdo21rXNqNayFk4NaEkm4UPuFH7EdgIRT1aUP8B0SWd_nIrl0Bm-QIf3_x1NfwffUs0SIiLmFHc-OKir74yLD17BYOf6OCWQBoUKXH66_qVTpiBMISXYF1WvIl1y901kL0pvJIxUjNKqIlIH-F3bFAT35DS0t2z42QML3yx2aWQeVa3_51d_zuuBQETKDu59ce-a4VdvRfV495oGRqmvaaXeHCtYq442ZZv9ua4AS4rTnjzv_Ly1X_6v_LDp8tqlurWbyQz4xe9eunck_3Scg5TSW_GwRxLMdo6A-m6PoueeeeCKeJn0qVykpMzmMpG8G9f_P_eXXgrWEeAxQe2E2Yqdx3uvVLC8japmIJ8uqzIwxnZKRWDm_jSyujCJE3WP5awoLAuI5WWiQqTu3CNhBO-G5_vlPVKlY7bR-mAYTJz-AHK1CEm1jPmzk85qidDgSHfQ7-IclcDGWuyR93vBXep_CrIfBpthwRmhLJf2FAEH44Qnl7-y0MWpmBvbDBuQqzyaYHuXfrAHeqA7wyXYg_dOe6jsM1xtnfdCSP_Jyavzos684RoiPOjy3_9uq4KZaf7fdzdcxsVoTD79kkB1houZ_aOHa30CUWhLGWSPhMsJkfF85-p4t7itJ0nz8SPMcnAOjDP3x2I0WLKSf0S7NY';
    const storeId = (process.env.LEMON_SQUEEZY_STORE_ID || '316300').replace('#', '').trim();

    if (!apiKey || !storeId) {
      return res.status(500).json({ 
        error: 'Lemon Squeezy credentials missing. Please add LEMON_SQUEEZY_API_KEY and LEMON_SQUEEZY_STORE_ID in AI Studio Secrets.' 
      });
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
    
    // Force custom domain if provided
    if (checkoutUrl && checkoutUrl.includes('lemonsqueezy.com')) {
      const urlObj = new URL(checkoutUrl);
      checkoutUrl = `https://checkout.getoptiseo.com${urlObj.pathname}${urlObj.search}`;
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
