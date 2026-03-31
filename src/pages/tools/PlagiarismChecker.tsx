import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, ShieldCheck, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function PlagiarismChecker() {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const checkPlagiarism = () => {
    if (!content || content.length < 50) return;
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        uniqueness: 92,
        plagiarized: 8,
        matches: [
          { source: 'https://example-blog.com/seo-guide', percentage: 5, snippet: '...the future of digital marketing is heavily dependent on...' },
          { source: 'https://marketing-wiki.org/ai-content', percentage: 3, snippet: '...using advanced language models to generate high-quality...' }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <SEO title="{t('tool_page.plagiarism.title')} - OptiSEO Tools" description="{t('tool_page.plagiarism.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.plagiarism.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.plagiarism.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('tool_page.plagiarism.form.content')}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder={t('tool_page.plagiarism.form.placeholder_content')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] resize-none"
            />
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-500">{content.length} characters</p>
              <p className="text-xs text-gray-500">Min. 50 characters</p>
            </div>
          </div>
          <button
            onClick={checkPlagiarism}
            disabled={loading || content.length < 50}
            className="w-full py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check for Plagiarism'}
          </button>
        </div>
      </div>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <span className="text-lg font-bold text-emerald-500">{results.uniqueness}%</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Unique Content</h3>
                <p className="text-sm text-gray-500">Your content is mostly original.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
                <span className="text-lg font-bold text-red-500">{results.plagiarized}%</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Plagiarized</h3>
                <p className="text-sm text-gray-500">Matches found in other sources.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg">Matched Sources</h3>
            </div>
            <div className="p-6 space-y-4">
              {results.matches.map((match: any, i: number) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#4f39f6]">
                      <FileText className="w-4 h-4" />
                      {match.source}
                    </div>
                    <span className="text-xs font-bold text-red-500">{match.percentage}% Match</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{match.snippet}"</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      <ToolDescription points={toolDescriptions['plagiarism-checker']} />
    </div>
    </>
  );
}
