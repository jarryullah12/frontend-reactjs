import { SEO } from '../../components/SEO';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Hash, BarChart3 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function KeywordDensity() {
  const { t } = useTranslation();
  const [text, setText] = useState('SEO is the process of optimizing a website for search engines. Good SEO practices improve rankings. SEO tools help analyze SEO performance.');
  const [targetKeyword, setTargetKeyword] = useState('SEO');

  const analysis = useMemo(() => {
    if (!text.trim()) return null;

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    
    const target = targetKeyword.toLowerCase().trim();
    let keywordCount = 0;
    
    if (target) {
      const targetWords = target.split(' ').length;
      if (targetWords === 1) {
        keywordCount = words.filter(w => w === target).length;
      } else {
        // Simple multi-word matching
        const regex = new RegExp(`\\b${target}\\b`, 'gi');
        const matches = text.match(regex);
        keywordCount = matches ? matches.length : 0;
      }
    }

    const density = totalWords > 0 ? ((keywordCount / totalWords) * 100).toFixed(2) : '0.00';
    
    // Calculate top words
    const wordCounts: Record<string, number> = {};
    words.forEach(w => {
      if (w.length > 2) { // Ignore short words
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
    });
    
    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count, density: ((count / totalWords) * 100).toFixed(2) }));

    return { totalWords, keywordCount, density, topWords };
  }, [text, targetKeyword]);

  return (
    <>
      <SEO title="Keyword Density - OptiSEO Tools" description="Use our free Keyword Density tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Hash className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.density.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.density.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.density.form.keyword')}</label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.density.form.keyword_placeholder')}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.density.form.content')}</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 w-full min-h-[300px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.density.form.content_placeholder')}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#4f39f6]" /> {t('tool_page.density.output')}
            </h3>
          </div>
          
          <div id="density-result" className="flex-1 bg-white dark:bg-gray-950 rounded-xl p-6 overflow-auto border border-gray-200 dark:border-gray-700 shadow-inner">
            {!analysis ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.totalWords}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t('tool_page.density.stats.total')}</div>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-900/30">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{analysis.keywordCount}</div>
                    <div className="text-xs text-teal-600/70 dark:text-teal-400/70 uppercase tracking-wider mt-1">{t('tool_page.density.stats.count')}</div>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-900/30">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{analysis.density}%</div>
                    <div className="text-xs text-teal-600/70 dark:text-teal-400/70 uppercase tracking-wider mt-1">{t('tool_page.density.stats.density')}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">{t('tool_page.density.top_words')}</h4>
                  <div className="space-y-3">
                    {analysis.topWords.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item.word}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500 text-sm">{item.count} {t('tool_page.density.times')}</span>
                          <span className="text-teal-600 dark:text-teal-400 text-sm font-mono bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded">{item.density}%</span>
                        </div>
                      </div>
                    ))}
                    {analysis.topWords.length === 0 && (
                      <p className="text-gray-500 text-sm">Not enough words to analyze.</p>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-xl text-sm border border-blue-100 dark:border-blue-900/30">
                  <strong>Tip:</strong> Ideal keyword density is typically between 1% and 2%. If your density is over 3%, consider using synonyms to avoid keyword stuffing penalties.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['keyword-density']} />
    </div>
    </>
  );
}
