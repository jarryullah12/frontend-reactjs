import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { LinkIcon, Copy, CheckCircle2 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

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
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
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
    <>
      <SEO title="UTM Builder - OptiSEO Tools" description="Build UTM tracking URLs for your marketing campaigns." />
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
      <ToolDescription points={toolDescriptions['utm-builder']} />
    </div>
    </>
  );
}
