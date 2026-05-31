import fs from 'fs/promises';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const SITE_ORIGIN = (process.env.VITE_SITE_URL || 'https://getoptiseo.com').replace(/\/+$/, '');

const normalizePathname = (pathname) => {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const singleSlash = withLeadingSlash.replace(/\/{2,}/g, '/');
  if (singleSlash !== '/' && singleSlash.endsWith('/')) {
    return singleSlash.slice(0, -1);
  }
  return singleSlash;
};

const toAbsoluteCanonical = (pathname) => {
  const normalized = normalizePathname(pathname);
  return `${SITE_ORIGIN}${normalized}`;
};

const parseSitemapPaths = (xml) => {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  const paths = new Set(['/']);

  for (const match of matches) {
    const value = match[1]?.trim();
    if (!value) {
      continue;
    }

    try {
      const url = new URL(value);
      if (url.hostname === new URL(SITE_ORIGIN).hostname) {
        paths.add(normalizePathname(url.pathname));
      }
    } catch {
      // Ignore invalid URLs in sitemap
    }
  }

  return [...paths];
};

const injectSeoTags = (html, canonicalUrl) => {
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  const ogUrlTag = `<meta property="og:url" content="${canonicalUrl}" />`;
  const twitterUrlTag = `<meta name="twitter:url" content="${canonicalUrl}" />`;

  const withoutExisting = html
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:url"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:url"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="twitter:url"[^>]*>\s*/gi, '');

  return withoutExisting.replace(
    '</head>',
    `  ${canonicalTag}\n    ${ogUrlTag}\n    ${twitterUrlTag}\n  </head>`
  );
};

const ensureDirectory = async (targetPath) => {
  await fs.mkdir(targetPath, { recursive: true });
};

const renderRouteHtml = async (baseHtml, routePath) => {
  const canonicalUrl = toAbsoluteCanonical(routePath);
  const routeHtml = injectSeoTags(baseHtml, canonicalUrl);

  if (routePath === '/') {
    await fs.writeFile(path.join(DIST_DIR, 'index.html'), routeHtml, 'utf-8');
    return;
  }

  const relativeDir = routePath.replace(/^\//, '');
  const outputDir = path.join(DIST_DIR, relativeDir);
  await ensureDirectory(outputDir);
  await fs.writeFile(path.join(outputDir, 'index.html'), routeHtml, 'utf-8');
};

const readSitemapSafely = async () => {
  try {
    return await fs.readFile(SITEMAP_PATH, 'utf-8');
  } catch {
    return '';
  }
};

const run = async () => {
  const [baseHtml, sitemapXml] = await Promise.all([
    fs.readFile(INDEX_HTML_PATH, 'utf-8'),
    readSitemapSafely(),
  ]);

  const routes = sitemapXml ? parseSitemapPaths(sitemapXml) : ['/'];
  await Promise.all(routes.map((routePath) => renderRouteHtml(baseHtml, routePath)));

  console.log(`Prerendered canonical SEO HTML for ${routes.length} routes.`);
};

run().catch((error) => {
  console.error('SEO prerender failed:', error);
  process.exitCode = 1;
});
