const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

const implementations = {
  'UTMBuilder.tsx': `import React, { useState } from 'react';
import { LinkIcon, Copy, CheckCircle2 } from 'lucide-react';

export function UTMBuilder() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUTM = () => {
    if (!url) return '';
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : \`https://\${url}\`);
      if (source) parsedUrl.searchParams.set('utm_source', source);
      if (medium) parsedUrl.searchParams.set('utm_medium', medium);
      if (campaign) parsedUrl.searchParams.set('utm_campaign', campaign);
      if (term) parsedUrl.searchParams.set('utm_term', term);
      if (content) parsedUrl.searchParams.set('utm_content', content);
      return parsedUrl.toString();
    } catch (e) {
      return 'Invalid URL';
    }
  };

  const generatedUrl = generateUTM();

  const handleCopy = () => {
    if (generatedUrl && generatedUrl !== 'Invalid URL') {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">UTM Builder</h1>
          <p className="text-gray-600 dark:text-gray-400">Build UTM tracking URLs for your marketing campaigns.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website URL *</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Source *</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="google, newsletter" value={source} onChange={(e) => setSource(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Medium</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="cpc, banner, email" value={medium} onChange={(e) => setMedium(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="spring_sale" value={campaign} onChange={(e) => setCampaign(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Term</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="running shoes" value={term} onChange={(e) => setTerm(e.target.value)} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Content</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="logolink or textlink" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated URL</label>
            <div className="relative">
              <textarea
                className="w-full h-24 p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                readOnly
                value={generatedUrl}
              ></textarea>
              <button 
                onClick={handleCopy}
                className="absolute right-4 top-4 text-gray-400 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'CanonicalTagGenerator.tsx': `import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export function CanonicalTagGenerator() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const tag = url ? \`<link rel="canonical" href="\${url}" />\` : '';

  const handleCopy = () => {
    if (tag) {
      navigator.clipboard.writeText(tag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Canonical Tag Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate canonical tags for your webpages to prevent duplicate content issues.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page URL</label>
            <input type="text" className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="https://example.com/page" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated Tag</label>
            <div className="relative">
              <textarea
                className="w-full h-24 p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm"
                readOnly
                value={tag}
              ></textarea>
              <button 
                onClick={handleCopy}
                className="absolute right-4 top-4 text-gray-400 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'TwitterCardGenerator.tsx': `import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export function TwitterCardGenerator() {
  const [cardType, setCardType] = useState('summary');
  const [site, setSite] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    let tags = \`<meta name="twitter:card" content="\${cardType}">\\n\`;
    if (site) tags += \`<meta name="twitter:site" content="\${site}">\\n\`;
    if (title) tags += \`<meta name="twitter:title" content="\${title}">\\n\`;
    if (description) tags += \`<meta name="twitter:description" content="\${description}">\\n\`;
    if (image) tags += \`<meta name="twitter:image" content="\${image}">\\n\`;
    return tags;
  };

  const tags = generateTags();

  const handleCopy = () => {
    if (tags) {
      navigator.clipboard.writeText(tags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Twitter Card Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate Twitter Card meta tags for your website.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Type</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" value={cardType} onChange={(e) => setCardType(e.target.value)}>
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary Large Image</option>
                <option value="app">App</option>
                <option value="player">Player</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Username (@username)</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="@example" value={site} onChange={(e) => setSite(e.target.value)} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none h-24" placeholder="Page Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
              <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="https://example.com/image.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated Tags</label>
            <div className="relative">
              <textarea
                className="w-full h-48 p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm whitespace-pre"
                readOnly
                value={tags}
              ></textarea>
              <button 
                onClick={handleCopy}
                className="absolute right-4 top-4 text-gray-400 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'HtaccessGenerator.tsx': `import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export function HtaccessGenerator() {
  const [www, setWww] = useState('none');
  const [https, setHttps] = useState(false);
  const [customError, setCustomError] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHtaccess = () => {
    let code = \`# Generated by OptiSEO\\n\\n\`;
    
    if (www !== 'none' || https) {
      code += \`<IfModule mod_rewrite.c>\\nRewriteEngine On\\n\\n\`;
      
      if (www === 'force') {
        code += \`# Force WWW\\nRewriteCond %{HTTP_HOST} !^www\\. [NC]\\nRewriteRule ^(.*)$ http://www.%{HTTP_HOST}/$1 [R=301,L]\\n\\n\`;
      } else if (www === 'remove') {
        code += \`# Remove WWW\\nRewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]\\nRewriteRule ^(.*)$ http://%1/$1 [R=301,L]\\n\\n\`;
      }
      
      if (https) {
        code += \`# Force HTTPS\\nRewriteCond %{HTTPS} off\\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\\n\\n\`;
      }
      
      code += \`</IfModule>\\n\\n\`;
    }
    
    if (customError) {
      code += \`# Custom Error Pages\\nErrorDocument 400 /400.html\\nErrorDocument 401 /401.html\\nErrorDocument 403 /403.html\\nErrorDocument 404 /404.html\\nErrorDocument 500 /500.html\\n\\n\`;
    }
    
    return code;
  };

  const code = generateHtaccess();

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">.htaccess Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate common .htaccess rules for your Apache server.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">WWW Redirect</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="www" value="none" checked={www === 'none'} onChange={() => setWww('none')} className="text-[#4f39f6] focus:ring-[#4f39f6]" />
                  Do not change
                </label>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="www" value="force" checked={www === 'force'} onChange={() => setWww('force')} className="text-[#4f39f6] focus:ring-[#4f39f6]" />
                  Force www.
                </label>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="www" value="remove" checked={www === 'remove'} onChange={() => setWww('remove')} className="text-[#4f39f6] focus:ring-[#4f39f6]" />
                  Remove www.
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Other Options</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="checkbox" checked={https} onChange={(e) => setHttps(e.target.checked)} className="text-[#4f39f6] focus:ring-[#4f39f6] rounded" />
                  Force HTTPS
                </label>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="checkbox" checked={customError} onChange={(e) => setCustomError(e.target.checked)} className="text-[#4f39f6] focus:ring-[#4f39f6] rounded" />
                  Custom Error Pages
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated .htaccess</label>
            <div className="relative">
              <textarea
                className="w-full h-64 p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm whitespace-pre"
                readOnly
                value={code}
              ></textarea>
              <button 
                onClick={handleCopy}
                className="absolute right-4 top-4 text-gray-400 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'URLRewritingTool.tsx': `import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export function URLRewritingTool() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRewrite = () => {
    if (!url) return '';
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : \`https://\${url}\`);
      const params = Array.from(parsedUrl.searchParams.keys());
      if (params.length === 0) return '# No query parameters found.';
      
      let rule = 'RewriteEngine On\\n';
      let regex = '^' + parsedUrl.pathname.substring(1).replace('.php', '') + '/';
      let target = parsedUrl.pathname.substring(1) + '?';
      
      params.forEach((param, index) => {
        regex += '([^/]*)/';
        target += \`\${param}=$$\{index + 1}&\`;
      });
      
      regex += '?$';
      target = target.slice(0, -1);
      
      rule += \`RewriteRule \${regex} \${target} [L]\\n\`;
      return rule;
    } catch (e) {
      return '# Invalid URL format';
    }
  };

  const rule = generateRewrite();

  const handleCopy = () => {
    if (rule && !rule.startsWith('#')) {
      navigator.clipboard.writeText(rule);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">URL Rewriting Tool</h1>
          <p className="text-gray-600 dark:text-gray-400">Convert dynamic URLs to static URLs for better SEO.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dynamic URL</label>
            <input type="text" className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="https://example.com/product.php?id=123&category=shoes" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rewrite Rule</label>
            <div className="relative">
              <textarea
                className="w-full h-32 p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm whitespace-pre"
                readOnly
                value={rule}
              ></textarea>
              <button 
                onClick={handleCopy}
                className="absolute right-4 top-4 text-gray-400 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'ReadabilityChecker.tsx': `import React, { useState } from 'react';

export function ReadabilityChecker() {
  const [text, setText] = useState('');

  const analyzeText = () => {
    if (!text.trim()) return null;
    
    const words = text.trim().split(/\\s+/).length;
    const sentences = text.split(/[\\.!?]+/).filter(s => s.trim().length > 0).length || 1;
    const characters = text.replace(/[^a-zA-Z]/g, '').length;
    
    // Simple estimation of syllables
    const syllables = Math.max(1, Math.round(characters / 3));
    
    // Flesch Reading Ease formula
    const readingEase = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    
    let grade = 'College';
    if (readingEase > 90) grade = '5th Grade';
    else if (readingEase > 80) grade = '6th Grade';
    else if (readingEase > 70) grade = '7th Grade';
    else if (readingEase > 60) grade = '8th & 9th Grade';
    else if (readingEase > 50) grade = '10th to 12th Grade';
    else if (readingEase > 30) grade = 'College';
    else grade = 'College Graduate';

    return {
      words,
      sentences,
      readingEase: Math.max(0, Math.min(100, Math.round(readingEase))),
      grade
    };
  };

  const stats = analyzeText();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Readability Checker</h1>
          <p className="text-gray-600 dark:text-gray-400">Check the readability score of your text.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <textarea
            className="w-full h-64 p-4 mb-6 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent resize-none"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#4f39f6]">{stats.words}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#4f39f6]">{stats.sentences}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#4f39f6]">{stats.readingEase}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reading Ease (0-100)</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <div className="text-lg font-bold text-[#4f39f6] flex items-center justify-center h-8">{stats.grade}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  'ReverseImageSearch.tsx': `import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function ReverseImageSearch() {
  const [url, setUrl] = useState('');

  const handleSearch = () => {
    if (url) {
      window.open(\`https://images.google.com/searchbyimage?image_url=\${encodeURIComponent(url)}\`, '_blank');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Reverse Image Search</h1>
          <p className="text-gray-600 dark:text-gray-400">Search for similar images across the web using an image URL.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
            <input type="text" className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent" placeholder="https://example.com/image.jpg" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleSearch}
              disabled={!url}
              className="px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search on Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'ImageCompressor.tsx': `import React, { useState, useRef } from 'react';

export function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCompressedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!image || !canvasRef.current) return;
    
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const compressed = canvas.toDataURL('image/jpeg', quality);
      setCompressedImage(compressed);
    };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Image Compressor</h1>
          <p className="text-gray-600 dark:text-gray-400">Compress images without losing quality.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4f39f6]/10 file:text-[#4f39f6] hover:file:bg-[#4f39f6]/20" />
          </div>
          
          {image && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compression Quality: {Math.round(quality * 100)}%</label>
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full" />
              <button 
                onClick={compressImage}
                className="mt-4 px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
              >
                Compress Image
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {compressedImage && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compressed Image</h3>
              <img src={compressedImage} alt="Compressed" className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-4" />
              <a 
                href={compressedImage} 
                download="compressed_image.jpg"
                className="inline-block px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  'FaviconGenerator.tsx': `import React, { useState, useRef } from 'react';

export function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setFavicon(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFavicon = () => {
    if (!image || !canvasRef.current) return;
    
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = 32;
      canvas.height = 32;
      ctx.drawImage(img, 0, 0, 32, 32);
      
      const generated = canvas.toDataURL('image/png');
      setFavicon(generated);
    };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Favicon Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate a 32x32 favicon from any image.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image (Square recommended)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4f39f6]/10 file:text-[#4f39f6] hover:file:bg-[#4f39f6]/20" />
          </div>
          
          {image && (
            <div className="mb-6">
              <button 
                onClick={generateFavicon}
                className="px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors"
              >
                Generate Favicon
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {favicon && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generated Favicon</h3>
              <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block mb-4">
                <img src={favicon} alt="Favicon" className="w-8 h-8" />
              </div>
              <br />
              <a 
                href={favicon} 
                download="favicon.png"
                className="inline-block px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Download favicon.png
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`
};

Object.entries(implementations).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(toolsDir, filename), content);
});

console.log('Real tools generated.');
