import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function URLRewritingTool() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRewrite = () => {
    if (!url) return '';
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      const params = Array.from(parsedUrl.searchParams.keys());
      if (params.length === 0) return '# No query parameters found.';
      
      let rule = 'RewriteEngine On\n';
      let regex = '^' + parsedUrl.pathname.substring(1).replace('.php', '') + '/';
      let target = parsedUrl.pathname.substring(1) + '?';
      
      params.forEach((param, index) => {
        regex += '([^/]*)/';
        target += `${param}=$${index + 1}&`;
      });
      
      regex += '?$';
      target = target.slice(0, -1);
      
      rule += `RewriteRule ${regex} ${target} [L]\n`;
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
    <>
      <SEO title="URL Rewriting Tool - OptiSEO Tools" description="Convert dynamic URLs to static URLs for better SEO." />
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
      <ToolDescription points={toolDescriptions['url-rewriting-tool']} />
    </div>
    </>
  );
}
