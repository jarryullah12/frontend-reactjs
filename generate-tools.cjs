const fs = require('fs');
const path = require('path');

const tools = [
  { id: 'keyword-suggestion-tool', name: 'Keyword Suggestion Tool', component: 'KeywordSuggestionTool', category: 'keyword', desc: 'Get keyword suggestions for your seed keyword.', icon: 'Hash' },
  { id: 'long-tail-keyword-generator', name: 'Long Tail Keyword Generator', component: 'LongTailKeywordGenerator', category: 'keyword', desc: 'Generate long tail keywords easily.', icon: 'Hash' },
  { id: 'page-authority-checker', name: 'Page Authority Checker', component: 'PageAuthorityChecker', category: 'seo', desc: 'Check the page authority of any URL.', icon: 'Zap' },
  { id: 'google-index-checker', name: 'Google Index Checker', component: 'GoogleIndexChecker', category: 'seo', desc: 'Check if your URL is indexed by Google.', icon: 'Search' },
  { id: 'xml-sitemap-validator', name: 'XML Sitemap Validator', component: 'XMLSitemapValidator', category: 'validators', desc: 'Validate your XML sitemap format.', icon: 'Shield' },
  { id: 'keyword-position-checker', name: 'Keyword Position Checker', component: 'KeywordPositionChecker', category: 'keyword', desc: 'Check your keyword ranking position.', icon: 'BarChart' },
  { id: 'word-counter', name: 'Word Counter', component: 'WordCounter', category: 'utility', desc: 'Count words and characters in your text.', icon: 'FileText' },
  { id: 'character-counter', name: 'Character Counter', component: 'CharacterCounter', category: 'utility', desc: 'Count characters with and without spaces.', icon: 'FileText' },
  { id: 'case-converter', name: 'Case Converter', component: 'CaseConverter', category: 'utility', desc: 'Convert text to uppercase, lowercase, title case, etc.', icon: 'FileText' },
  { id: 'reverse-image-search', name: 'Reverse Image Search', component: 'ReverseImageSearch', category: 'utility', desc: 'Search for similar images across the web.', icon: 'Search' },
  { id: 'image-compressor', name: 'Image Compressor', component: 'ImageCompressor', category: 'utility', desc: 'Compress images without losing quality.', icon: 'FileText' },
  { id: 'favicon-generator', name: 'Favicon Generator', component: 'FaviconGenerator', category: 'utility', desc: 'Generate favicons for your website.', icon: 'Globe' },
  { id: 'htaccess-generator', name: 'Htaccess Generator', component: 'HtaccessGenerator', category: 'utility', desc: 'Generate .htaccess files easily.', icon: 'Code' },
  { id: 'ssl-checker', name: 'SSL Checker', component: 'SSLChecker', category: 'validators', desc: 'Check your website SSL certificate.', icon: 'ShieldCheck' },
  { id: 'what-is-my-ip', name: 'What Is My IP', component: 'WhatIsMyIP', category: 'utility', desc: 'Find out your public IP address.', icon: 'Globe' },
  { id: 'server-status-checker', name: 'Server Status Checker', component: 'ServerStatusChecker', category: 'analysis', desc: 'Check the status of your server.', icon: 'Zap' },
  { id: 'website-screenshot', name: 'Website Screenshot Generator', component: 'WebsiteScreenshot', category: 'utility', desc: 'Generate a screenshot of any website.', icon: 'Globe' },
  { id: 'url-rewriting-tool', name: 'URL Rewriting Tool', component: 'URLRewritingTool', category: 'seo', desc: 'Rewrite dynamic URLs to static URLs.', icon: 'LinkIcon' },
  { id: 'grammar-checker', name: 'Grammar Checker', component: 'GrammarChecker', category: 'ai_content', desc: 'Check your text for grammar errors.', icon: 'PenTool' },
  { id: 'readability-checker', name: 'Readability Checker', component: 'ReadabilityChecker', category: 'analysis', desc: 'Check the readability score of your text.', icon: 'FileText' },
  { id: 'md5-generator', name: 'MD5 Generator', component: 'MD5Generator', category: 'utility', desc: 'Generate MD5 hash for any text.', icon: 'Lock' },
  { id: 'sha1-generator', name: 'SHA1 Generator', component: 'SHA1Generator', category: 'utility', desc: 'Generate SHA1 hash for any text.', icon: 'Lock' },
  { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', component: 'Base64EncoderDecoder', category: 'utility', desc: 'Encode or decode text to Base64.', icon: 'Code' },
  { id: 'html-minifier', name: 'HTML Minifier', component: 'HTMLMinifier', category: 'minifiers', desc: 'Minify HTML code to reduce file size.', icon: 'Code' },
  { id: 'json-formatter', name: 'JSON Formatter', component: 'JSONFormatter', category: 'utility', desc: 'Format and validate JSON data.', icon: 'Code' },
  { id: 'utm-builder', name: 'UTM Builder', component: 'UTMBuilder', category: 'seo', desc: 'Build UTM tracking URLs for campaigns.', icon: 'LinkIcon' },
  { id: 'open-graph-checker', name: 'Open Graph Checker', component: 'OpenGraphChecker', category: 'seo', desc: 'Check Open Graph tags of any URL.', icon: 'Share2' },
  { id: 'twitter-card-generator', name: 'Twitter Card Generator', component: 'TwitterCardGenerator', category: 'seo', desc: 'Generate Twitter Card meta tags.', icon: 'Share2' },
  { id: 'canonical-tag-generator', name: 'Canonical Tag Generator', component: 'CanonicalTagGenerator', category: 'seo', desc: 'Generate canonical tags for your pages.', icon: 'Code' },
  { id: 'http-headers-checker', name: 'HTTP Headers Checker', component: 'HTTPHeadersChecker', category: 'analysis', desc: 'Check HTTP headers returned by a server.', icon: 'Zap' }
];

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

// Create tool files
tools.forEach(tool => {
  const content = `import React from 'react';

export function ${tool.component}() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">${tool.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">${tool.desc}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">This tool is currently under development. Please check back later.</p>
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(toolsDir, `${tool.component}.tsx`), content);
});

console.log('Done');
