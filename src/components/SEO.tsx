import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { toCanonicalUrl } from '@/lib/seo';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  noindex?: boolean;
  canonical?: string;
}

export function SEO({ title, description, keywords, image, url, noindex = false, canonical }: SEOProps) {
  const location = useLocation();
  const siteName = 'OptiSEO';
  const defaultImage = 'https://picsum.photos/seed/optiseo/1200/630'; // Replace with actual default OG image
  const normalizedUrl = toCanonicalUrl(canonical || url || location.pathname);
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={normalizedUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={normalizedUrl} />
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={normalizedUrl} />
      <meta name="twitter:title" content={`${title} | ${siteName}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
