import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, Globe, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function DAChecker() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const checkAuthority = () => {
    if (!url) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        da: Math.floor(Math.random() * 90) + 10,
        pa: Math.floor(Math.random() * 80) + 15,
        spamScore: Math.floor(Math.random() * 10),
        totalLinks: Math.floor(Math.random() * 10000) + 500,
        qualityLinks: Math.floor(Math.random() * 5000) + 200
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <SEO title="{t('tool_page.da.title')} - OptiSEO Tools" description="{t('tool_page.da.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.da.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.da.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('tool_page.da.form.placeholder_url')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
            />
          </div>
          <button
            onClick={checkAuthority}
            disabled={loading}
            className="px-8 py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check Authority'}
          </button>
        </div>
      </div>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Domain Authority</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-blue-600">{results.da}</span>
              <span className="text-gray-400 mb-1">/100</span>
            </div>
            <div className="mt-4 w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${results.da}%` }} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Page Authority</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-purple-600">{results.pa}</span>
              <span className="text-gray-400 mb-1">/100</span>
            </div>
            <div className="mt-4 w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full" style={{ width: `${results.pa}%` }} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Spam Score</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-red-600">{results.spamScore}%</span>
            </div>
            <div className="mt-4 w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full" style={{ width: `${results.spamScore}%` }} />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Backlinks</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{results.totalLinks.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Quality Backlinks</p>
              <p className="text-xl font-bold text-emerald-500">{results.qualityLinks.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Linking Root Domains</p>
              <p className="text-xl font-bold text-amber-500">{(results.qualityLinks / 10).toFixed(0)}</p>
            </div>
          </div>
        </motion.div>
      )}
      <ToolDescription points={toolDescriptions['da-checker']} />
    </div>
    </>
  );
}
