import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function ReverseImageSearch() {
  const [url, setUrl] = useState('');

  const handleSearch = () => {
    if (url) {
      window.open(`https://images.google.com/searchbyimage?image_url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <>
      <SEO title="Reverse Image Search - OptiSEO Tools" description="Search for similar images across the web using an image URL." />
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
      <ToolDescription points={toolDescriptions['reverse-image-search']} />
    </div>
    </>
  );
}
