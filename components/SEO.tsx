import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "ProResumeLab - AI-Powered Professional Resume Builder",
  description = "Build high-impact, ATS-friendly resumes and cover letters in seconds with Google Gemini AI. Choose from professional templates and land your dream job faster.",
  keywords = "resume builder, AI resume, professional resume, ATS friendly, cover letter builder, career tools, Google Gemini, job interview, portfolio, CV maker",
  image = "/og-image.png",
  url,
  type = "website"
}) => {
  const location = useLocation();
  const siteUrl = "https://proresumelab.com";
  const canonicalUrl = url || `${siteUrl}${location.pathname}${location.search}`;
  const siteTitle = title.includes("ProResumeLab") ? title : `${title} | ProResumeLab`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ProResumeLab" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ProResumeLab",
          "url": canonicalUrl,
          "description": description,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
