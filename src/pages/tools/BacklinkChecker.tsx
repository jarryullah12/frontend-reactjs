import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, Link as LinkIcon, ExternalLink, ShieldCheck, Globe } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function BacklinkChecker() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const analyzeBacklinks = () => {
    if (!url) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        total: Math.floor(Math.random() * 5000) + 100,
        referringDomains: Math.floor(Math.random() * 500) + 50,
        domainRating: Math.floor(Math.random() * 100),
        topLinks: [
          { url: 'https://wikipedia.org', type: 'Dofollow', dr: 98 },
          { url: 'https://github.com', type: 'Dofollow', dr: 95 },
          { url: 'https://medium.com', type: 'Nofollow', dr: 92 },
          { url: 'https://reddit.com', type: 'Nofollow', dr: 91 },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <SEO title="{t('tool_page.backlink.title')} - OptiSEO Tools" description="{t('tool_page.backlink.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.backlink.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.backlink.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('tool_page.backlink.form.placeholder_url')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
            />
          </div>
          <button
            onClick={analyzeBacklinks}
            disabled={loading}
            className="px-8 py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? t('tool_page.website_analyzer.analyze_button') + '...' : t('tool_page.website_analyzer.analyze_button')}
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
              <p className="text-sm text-gray-500 mb-1">Total Backlinks</p>
              <h3 className="text-2xl font-bold text-[#4f39f6]">{results.total.toLocaleString()}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Referring Domains</p>
              <h3 className="text-2xl font-bold text-emerald-500">{results.referringDomains.toLocaleString()}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Domain Rating</p>
              <h3 className="text-2xl font-bold text-amber-500">{results.domainRating}/100</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg">Top Referring Pages</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Source URL</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">DR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {results.topLinks.map((link: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium truncate max-w-xs">{link.url}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          link.type === 'Dofollow' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {link.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold">{link.dr}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      <ToolDescription points={toolDescriptions['backlink-checker']} />
    </div>
    </>
  );
}
