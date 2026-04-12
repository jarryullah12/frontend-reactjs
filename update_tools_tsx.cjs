const fs = require('fs');
const path = require('path');

const toolsToAdd = [
  { id: 'keyword-clustering-tool', name: 'Keyword Clustering Tool', category: 'keyword', description: 'Group keywords into clusters based on search intent.', icon: '<Hash className="w-5 h-5" />' },
  { id: 'serp-simulator', name: 'SERP Simulator', category: 'seo', description: 'Preview how your webpage will look in Google search results.', icon: '<Search className="w-5 h-5" />' },
  { id: 'lsi-keyword-generator', name: 'LSI Keyword Generator', category: 'keyword', description: 'Generate Latent Semantic Indexing (LSI) keywords.', icon: '<Hash className="w-5 h-5" />' },
  { id: 'bulk-url-checker', name: 'Bulk URL Checker', category: 'seo', description: 'Check the status codes of multiple URLs at once.', icon: '<LinkIcon className="w-5 h-5" />' },
  { id: 'hreflang-tag-generator', name: 'Hreflang Tag Generator', category: 'seo', description: 'Generate hreflang tags for multi-language websites.', icon: '<Code className="w-5 h-5" />' },
  { id: 'schema-generator-faq', name: 'Schema Generator (FAQ)', category: 'seo', description: 'Generate FAQ Schema markup for your pages.', icon: '<Code className="w-5 h-5" />' },
  { id: 'schema-generator-local', name: 'Schema Generator (Local Business)', category: 'seo', description: 'Generate Local Business Schema markup.', icon: '<Code className="w-5 h-5" />' },
  { id: 'schema-generator-review', name: 'Schema Generator (Review)', category: 'seo', description: 'Generate Review Schema markup.', icon: '<Code className="w-5 h-5" />' },
  { id: 'meta-description-generator', name: 'Meta Description Generator', category: 'seo', description: 'AI-powered meta description generator.', icon: '<FileText className="w-5 h-5" />' },
  { id: 'title-tag-generator', name: 'Title Tag Generator', category: 'seo', description: 'AI-powered title tag generator.', icon: '<FileText className="w-5 h-5" />' },
  { id: 'blog-post-title-generator', name: 'Blog Post Title Generator', category: 'ai_content', description: 'Generate catchy blog post titles.', icon: '<PenTool className="w-5 h-5" />' },
  { id: 'content-outline-generator', name: 'Content Outline Generator', category: 'ai_content', description: 'Generate SEO-optimized content outlines.', icon: '<FileText className="w-5 h-5" />' },
  { id: 'paragraph-rewriter', name: 'Paragraph Rewriter', category: 'ai_content', description: 'Rewrite paragraphs for better readability and SEO.', icon: '<PenTool className="w-5 h-5" />' },
  { id: 'sentence-expander', name: 'Sentence Expander', category: 'ai_content', description: 'Expand short sentences into detailed paragraphs.', icon: '<PenTool className="w-5 h-5" />' },
  { id: 'text-summarizer', name: 'Text Summarizer', category: 'ai_content', description: 'Summarize long text into concise points.', icon: '<FileText className="w-5 h-5" />' },
  { id: 'readability-improver', name: 'Readability Improver', category: 'ai_content', description: 'Improve the readability score of your content.', icon: '<FileText className="w-5 h-5" />' },
  { id: 'keyword-typo-generator', name: 'Keyword Typo Generator', category: 'keyword', description: 'Generate common misspellings for your keywords.', icon: '<Hash className="w-5 h-5" />' },
  { id: 'google-autocomplete-extractor', name: 'Google Autocomplete Extractor', category: 'keyword', description: 'Extract autocomplete suggestions from Google.', icon: '<Search className="w-5 h-5" />' },
  { id: 'youtube-keyword-tool', name: 'YouTube Keyword Tool', category: 'keyword', description: 'Find the best keywords for YouTube videos.', icon: '<Search className="w-5 h-5" />' },
  { id: 'amazon-keyword-tool', name: 'Amazon Keyword Tool', category: 'keyword', description: 'Find keywords for Amazon product listings.', icon: '<Search className="w-5 h-5" />' },
  { id: 'bing-keyword-tool', name: 'Bing Keyword Tool', category: 'keyword', description: 'Find keywords for Bing search engine.', icon: '<Search className="w-5 h-5" />' },
  { id: 'yandex-keyword-tool', name: 'Yandex Keyword Tool', category: 'keyword', description: 'Find keywords for Yandex search engine.', icon: '<Search className="w-5 h-5" />' },
  { id: 'app-store-keyword-tool', name: 'App Store Keyword Tool', category: 'keyword', description: 'Find keywords for App Store Optimization (ASO).', icon: '<Search className="w-5 h-5" />' },
  { id: 'seo-report-generator', name: 'SEO Report Generator', category: 'analysis', description: 'Generate comprehensive SEO reports.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'competitor-analysis-tool', name: 'Competitor Analysis Tool', category: 'analysis', description: 'Analyze competitor websites for SEO insights.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'backlink-maker', name: 'Backlink Maker', category: 'seo', description: 'Generate free backlinks to your website.', icon: '<LinkIcon className="w-5 h-5" />' },
  { id: 'link-value-calculator', name: 'Link Value Calculator', category: 'seo', description: 'Calculate the estimated value of a backlink.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'website-speed-test', name: 'Website Speed Test', category: 'analysis', description: 'Test the loading speed of your website.', icon: '<Zap className="w-5 h-5" />' },
  { id: 'mobile-friendly-test', name: 'Mobile Friendly Test', category: 'analysis', description: 'Check if your website is mobile-friendly.', icon: '<Globe className="w-5 h-5" />' },
  { id: 'core-web-vitals-checker', name: 'Core Web Vitals Checker', category: 'analysis', description: 'Check Core Web Vitals metrics.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'html-validator', name: 'HTML Validator', category: 'validators', description: 'Validate HTML code for errors.', icon: '<Shield className="w-5 h-5" />' },
  { id: 'css-validator', name: 'CSS Validator', category: 'validators', description: 'Validate CSS code for errors.', icon: '<Shield className="w-5 h-5" />' },
  { id: 'xml-sitemap-formatter', name: 'XML Sitemap Formatter', category: 'utility', description: 'Format and beautify XML sitemaps.', icon: '<Code className="w-5 h-5" />' },
  { id: 'robots-txt-tester', name: 'Robots.txt Tester', category: 'validators', description: 'Test your robots.txt file for errors.', icon: '<Shield className="w-5 h-5" />' },
  { id: 'redirect-checker', name: 'Redirect Checker', category: 'seo', description: 'Check URL redirects and status codes.', icon: '<LinkIcon className="w-5 h-5" />' },
  { id: 'http2-checker', name: 'HTTP/2 Checker', category: 'analysis', description: 'Check if a website supports HTTP/2.', icon: '<Zap className="w-5 h-5" />' },
  { id: 'dns-lookup-tool', name: 'DNS Lookup Tool', category: 'utility', description: 'Perform a DNS lookup for any domain.', icon: '<Globe className="w-5 h-5" />' },
  { id: 'whois-lookup', name: 'WHOIS Lookup', category: 'utility', description: 'Find WHOIS information for a domain.', icon: '<Search className="w-5 h-5" />' },
  { id: 'ip-location-finder', name: 'IP Location Finder', category: 'utility', description: 'Find the geographical location of an IP address.', icon: '<Globe className="w-5 h-5" />' },
  { id: 'reverse-ip-domain-checker', name: 'Reverse IP Domain Checker', category: 'utility', description: 'Find other domains hosted on the same IP.', icon: '<Search className="w-5 h-5" />' },
  { id: 'server-port-scanner', name: 'Server Port Scanner', category: 'utility', description: 'Scan open ports on a server.', icon: '<Zap className="w-5 h-5" />' },
  { id: 'email-privacy-checker', name: 'Email Privacy Checker', category: 'validators', description: 'Check if a webpage exposes email addresses.', icon: '<Shield className="w-5 h-5" />' },
  { id: 'safe-browsing-checker', name: 'Safe Browsing Checker', category: 'validators', description: 'Check if a website is safe according to Google.', icon: '<ShieldCheck className="w-5 h-5" />' },
  { id: 'google-cache-checker', name: 'Google Cache Checker', category: 'seo', description: 'Check the Google cache status of a URL.', icon: '<Search className="w-5 h-5" />' },
  { id: 'mozrank-checker', name: 'Mozrank Checker', category: 'seo', description: 'Check the Mozrank of a website.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'alexa-rank-checker', name: 'Alexa Rank Checker', category: 'seo', description: 'Check the Alexa rank of a website.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'keyword-roi-calculator', name: 'Keyword ROI Calculator', category: 'keyword', description: 'Calculate the potential ROI of a keyword.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'cpc-calculator', name: 'CPC Calculator', category: 'keyword', description: 'Calculate Cost Per Click (CPC) for campaigns.', icon: '<BarChart className="w-5 h-5" />' },
  { id: 'url-slug-generator', name: 'URL Slug Generator', category: 'utility', description: 'Generate SEO-friendly URL slugs.', icon: '<LinkIcon className="w-5 h-5" />' },
  { id: 'domain-age-checker', name: 'Domain Age Checker', category: 'seo', description: 'Check the age of a domain.', icon: '<Search className="w-5 h-5" />' }
];

const toolsTsxPath = path.join(__dirname, 'src', 'pages', 'Tools.tsx');
let toolsTsx = fs.readFileSync(toolsTsxPath, 'utf8');

const newToolsString = toolsToAdd.map(t => `    { id: '${t.id}', name: '${t.name}', category: '${t.category}', description: '${t.description}', icon: ${t.icon} },`).join('\\n');

toolsTsx = toolsTsx.replace(
  /\{ id: 'url-encoder-decoder'.*?\},/,
  "$&\\n" + newToolsString
);

fs.writeFileSync(toolsTsxPath, toolsTsx);
console.log('Updated Tools.tsx');
