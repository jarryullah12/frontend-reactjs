import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Search, Activity, Download, Image as ImageIcon, AlertCircle, Loader2 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function WebsiteScreenshot() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [result, setResult] = useState<{ screenshotUrl: string; websiteUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(formattedUrl)}&screenshot=true&meta=false`);
      const data = await response.json();

      if (data.status === 'success' && data.data?.screenshot?.url) {
        setResult({
          screenshotUrl: data.data.screenshot.url,
          websiteUrl: formattedUrl
        });
      } else {
        throw new Error('Failed to generate screenshot');
      }
    } catch (err) {
      console.error('Screenshot error:', err);
      setError('Failed to generate screenshot. Please make sure the URL is correct and accessible.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result?.screenshotUrl) return;
    try {
      setIsDownloading(true);
      const response = await fetch(result.screenshotUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `screenshot-${new URL(result.websiteUrl).hostname}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback to opening in new tab
      window.open(result.screenshotUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <SEO title="Website Screenshot Generator - OptiSEO Tools" description="Generate a high-quality screenshot of any website instantly." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-[#4f39f6]" />
            Website Screenshot Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Generate a high-quality, full-page screenshot of any website instantly.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] outline-none"
              placeholder="https://example.com"
            />
          </div>
          <button 
            onClick={handleAnalyze} 
            disabled={loading || !url}
            className="px-8 py-3 bg-[#4f39f6] text-white rounded-xl font-semibold hover:bg-[#4f39f6]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[180px]"
          >
            {loading ? (
              <>
                <Activity className="w-5 h-5 animate-spin" />
                Capturing...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Capture Screenshot
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {result && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Screenshot Result</h3>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isDownloading ? 'Downloading...' : 'Download Image'}
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[400px]">
              <img 
                src={result.screenshotUrl} 
                alt={`Screenshot of ${result.websiteUrl}`}
                className="max-w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        )}
        <ToolDescription points={toolDescriptions['website-screenshot']} />
      </div>
    </>
  );
}
