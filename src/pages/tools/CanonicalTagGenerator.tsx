import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function CanonicalTagGenerator() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const tag = url ? `<link rel="canonical" href="${url}" />` : '';

  const handleCopy = () => {
    if (tag) {
      navigator.clipboard.writeText(tag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SEO title="Canonical Tag Generator - OptiSEO Tools" description="Generate canonical tags for your webpages to prevent duplicate content issues." />
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
        <ToolDescription points={toolDescriptions['canonical-tag-generator']} />
      </div>
    </div>
    </>
  );
}
