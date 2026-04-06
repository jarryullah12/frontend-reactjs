import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function TwitterCardGenerator() {
  const [cardType, setCardType] = useState('summary');
  const [site, setSite] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    let tags = `<meta name="twitter:card" content="${cardType}">\n`;
    if (site) tags += `<meta name="twitter:site" content="${site}">\n`;
    if (title) tags += `<meta name="twitter:title" content="${title}">\n`;
    if (description) tags += `<meta name="twitter:description" content="${description}">\n`;
    if (image) tags += `<meta name="twitter:image" content="${image}">\n`;
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
    <>
      <SEO title="Twitter Card Generator - OptiSEO Tools" description="Generate Twitter Card meta tags for your website." />
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
      <ToolDescription points={toolDescriptions['twitter-card-generator']} />
    </div>
    </>
  );
}
