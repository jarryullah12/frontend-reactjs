const normalizeBaseUrl = (value: string | undefined) => {
  if (!value) return '';
  return value.trim().replace(/\/+$/, '');
};

const looksLikeNetlify404 = (body: string) => {
  const text = body.toLowerCase();
  return (
    text.includes('<title>404 page not found</title>') &&
    text.includes('the requested url was not found on this server')
  );
};

const looksLikeHtml = (body: string) => body.trim().startsWith('<');

const toJinaMirrorUrl = (targetUrl: string) => {
  const withoutProtocol = targetUrl.replace(/^https?:\/\//i, '');
  return `https://r.jina.ai/http://${withoutProtocol}`;
};

const extractErrorText = (contentType: string, body: string, status: number) => {
  if (contentType.includes('application/json')) {
    try {
      const parsed = JSON.parse(body);
      if (parsed?.error) return String(parsed.error);
      if (parsed?.message) return String(parsed.message);
    } catch {
      // Ignore parse errors and fall back to plain text below.
    }
  }

  const trimmed = body.trim();
  if (!trimmed) return `HTTP ${status}`;
  return trimmed.slice(0, 180);
};

export async function fetchWebsiteHtml(targetUrl: string): Promise<string> {
  const encodedUrl = encodeURIComponent(targetUrl);
  const configuredApiBase = normalizeBaseUrl(import.meta.env.VITE_API_URL);

  const candidates = [
    { endpoint: configuredApiBase ? `${configuredApiBase}/api/proxy-fetch?url=${encodedUrl}` : '', parser: 'text' as const },
    { endpoint: `/api/proxy-fetch?url=${encodedUrl}`, parser: 'text' as const },
    { endpoint: typeof window !== 'undefined' ? `${window.location.origin}/api/proxy-fetch?url=${encodedUrl}` : '', parser: 'text' as const },
    { endpoint: `https://api.allorigins.win/raw?url=${encodedUrl}`, parser: 'text' as const },
    { endpoint: `https://api.allorigins.win/get?url=${encodedUrl}`, parser: 'allorigins-json' as const },
    { endpoint: toJinaMirrorUrl(targetUrl), parser: 'text' as const },
    { endpoint: targetUrl, parser: 'text' as const },
  ].filter((candidate) => Boolean(candidate.endpoint));

  const uniqueCandidates = candidates.filter((candidate, index, self) => (
    self.findIndex((item) => item.endpoint === candidate.endpoint) === index
  ));
  const attempts: string[] = [];

  for (const candidate of uniqueCandidates) {
    const { endpoint, parser } = candidate;
    try {
      const response = await fetch(endpoint, {
        signal: AbortSignal.timeout(15000),
      });
      const body = await response.text();

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (looksLikeNetlify404(body)) {
          attempts.push(`${endpoint} -> Returned Netlify 404 HTML page`);
        } else if (looksLikeHtml(body)) {
          attempts.push(`${endpoint} -> Returned HTML error page (HTTP ${response.status})`);
        } else {
          attempts.push(`${endpoint} -> ${extractErrorText(contentType, body, response.status)}`);
        }
        continue;
      }

      if (!body.trim()) {
        attempts.push(`${endpoint} -> Empty response body`);
        continue;
      }

      if (parser === 'allorigins-json') {
        try {
          const parsed = JSON.parse(body);
          const html = parsed?.contents;
          if (typeof html === 'string' && html.trim()) {
            return html;
          }
          attempts.push(`${endpoint} -> Invalid AllOrigins JSON payload`);
          continue;
        } catch {
          attempts.push(`${endpoint} -> Invalid JSON from AllOrigins`);
          continue;
        }
      }

      if (looksLikeNetlify404(body)) {
        attempts.push(`${endpoint} -> Netlify 404 HTML`);
        continue;
      }

      return body;
    } catch (error: any) {
      attempts.push(`${endpoint} -> ${error?.message || 'Network error'}`);
    }
  }

  const summary = attempts.slice(0, 6).join(' | ');
  throw new Error(summary || 'Unable to fetch website HTML from any configured endpoint.');
}
