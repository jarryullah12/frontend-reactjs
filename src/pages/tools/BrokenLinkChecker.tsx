import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, Globe, Link2Off, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function BrokenLinkChecker() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const scanLinks = () => {
    if (!url) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        total: 45,
        broken: 3,
        healthy: 42,
        links: [
          { url: 'https://example.com/about', status: 200, message: 'OK' },
          { url: 'https://example.com/old-page', status: 404, message: 'Not Found' },
          { url: 'https://external-site.com/broken', status: 500, message: 'Server Error' },
          { url: 'https://example.com/contact', status: 200, message: 'OK' },
          { url: 'https://example.com/services/dead', status: 404, message: 'Not Found' },
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <SEO title="{t('tool_page.broken.title')} - OptiSEO Tools" description="{t('tool_page.broken.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.broken.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.broken.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('tool_page.broken.form.placeholder_url')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
            />
          </div>
          <button
            onClick={scanLinks}
            disabled={loading}
            className="px-8 py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Scanning...' : 'Scan for Broken Links'}
          </button>
        </div>
      </div>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Links Scanned</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{results.total}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Healthy Links</p>
              <h3 className="text-2xl font-bold text-emerald-500">{results.healthy}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Broken Links</p>
              <h3 className="text-2xl font-bold text-red-500">{results.broken}</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg">Scan Results</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">URL</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {results.links.map((link: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate max-w-xs text-gray-900 dark:text-gray-100">{link.url}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          link.status === 200 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {link.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {link.status === 200 ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm ${link.status === 200 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {link.message}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      <ToolDescription points={toolDescriptions['broken-link-checker']} />
    </div>
    </>
  );
}
