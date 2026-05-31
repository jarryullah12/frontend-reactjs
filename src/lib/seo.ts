const DEFAULT_SITE_URL = 'https://getoptiseo.com';

const removeTrailingSlash = (value: string): string => {
  if (value.length > 1 && value.endsWith('/')) {
    return value.slice(0, -1);
  }
  return value;
};

export const normalizePathname = (pathname: string): string => {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const singleSlashPath = withLeadingSlash.replace(/\/{2,}/g, '/');
  const trimmed = removeTrailingSlash(singleSlashPath);
  return trimmed || '/';
};

export const getSiteOrigin = (): string => {
  const configured = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() || DEFAULT_SITE_URL;

  try {
    const parsed = new URL(configured);
    parsed.pathname = '/';
    parsed.search = '';
    parsed.hash = '';
    return removeTrailingSlash(parsed.toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const toCanonicalUrl = (value: string): string => {
  const siteOrigin = getSiteOrigin();

  try {
    const parsed = value.startsWith('http://') || value.startsWith('https://')
      ? new URL(value)
      : new URL(value, siteOrigin);

    parsed.search = '';
    parsed.hash = '';
    parsed.pathname = normalizePathname(parsed.pathname);

    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      parsed.protocol = new URL(siteOrigin).protocol;
      parsed.host = new URL(siteOrigin).host;
    }

    return parsed.toString();
  } catch {
    return new URL('/', siteOrigin).toString();
  }
};

