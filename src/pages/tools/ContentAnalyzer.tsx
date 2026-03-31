import { SEO } from '../../components/SEO';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, CheckCircle2, AlertTriangle, XCircle, Search, Download } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function ContentAnalyzer() {
  const { t } = useTranslation();
  const { downloadAsPdf } = usePdfGenerator();
  const [title, setTitle] = useState('10 Best SEO Tools for 2026');
  const [content, setContent] = useState('SEO tools are essential for any digital marketing strategy. The best SEO tools help you analyze your website, find keywords, and track your rankings over time. In this article, we will look at the top 10 SEO tools you need to use in 2026.');
  const [keyword, setKeyword] = useState('SEO tools');

  const analysis = useMemo(() => {
    if (!content.trim() || !title.trim() || !keyword.trim()) return null;

    const target = keyword.toLowerCase().trim();
    const contentLower = content.toLowerCase();
    const titleLower = title.toLowerCase();
    
    const wordCount = content.trim().split(/\s+/).length;
    
    // Keyword in Title
    const titleHasKeyword = titleLower.includes(target);
    
    // Keyword in first 100 words
    const first100Words = contentLower.split(/\s+/).slice(0, 100).join(' ');
    const first100HasKeyword = first100Words.includes(target);
    
    // Keyword Density
    const regex = new RegExp(`\\b${target}\\b`, 'gi');
    const matches = content.match(regex);
    const keywordCount = matches ? matches.length : 0;
    const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
    
    // Content Length
    const isLengthGood = wordCount >= 300;

    let score = 0;
    if (titleHasKeyword) score += 25;
    if (first100HasKeyword) score += 25;
    if (density >= 0.5 && density <= 2.5) score += 25;
    if (isLengthGood) score += 25;

    return {
      score,
      checks: [
        {
          id: 'title',
          label: t('tool_page.analyzer.checks.title.label'),
          passed: titleHasKeyword,
          message: titleHasKeyword ? t('tool_page.analyzer.checks.title.passed') : t('tool_page.analyzer.checks.title.failed'),
        },
        {
          id: 'intro',
          label: t('tool_page.analyzer.checks.intro.label'),
          passed: first100HasKeyword,
          message: first100HasKeyword ? t('tool_page.analyzer.checks.intro.passed') : t('tool_page.analyzer.checks.intro.failed'),
        },
        {
          id: 'density',
          label: t('tool_page.analyzer.checks.density.label'),
          passed: density >= 0.5 && density <= 2.5,
          message: density < 0.5 ? t('tool_page.analyzer.checks.density.low') : density > 2.5 ? t('tool_page.analyzer.checks.density.high') : t('tool_page.analyzer.checks.density.passed'),
          value: `${density.toFixed(2)}%`,
        },
        {
          id: 'length',
          label: t('tool_page.analyzer.checks.length.label'),
          passed: isLengthGood,
          message: isLengthGood ? t('tool_page.analyzer.checks.length.passed', { count: wordCount }) : t('tool_page.analyzer.checks.length.failed', { count: wordCount }),
        }
      ]
    };
  }, [title, content, keyword, t]);

  const handleDownloadPdf = () => {
    downloadAsPdf('analyzer-result', 'content-analysis-report.pdf');
  };

  return (
    <>
      <SEO title="Content Analyzer - OptiSEO Tools" description="Use our free Content Analyzer tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.analyzer.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.analyzer.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.analyzer.form.keyword')}</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.analyzer.form.keyword_placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.analyzer.form.title')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.analyzer.form.title_placeholder')}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.analyzer.form.content')}</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full min-h-[300px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.analyzer.form.content_placeholder')}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-[#4f39f6]" /> {t('tool_page.analyzer.output')}
            </h3>
            {analysis && (
              <button
                onClick={handleDownloadPdf}
                className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                title={t('tool_page.download')}
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div id="analyzer-result" className="flex-1 bg-white dark:bg-gray-950 rounded-xl p-6 overflow-auto border border-gray-200 dark:border-gray-700 shadow-inner">
            {!analysis ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-center px-4">
                <p>{t('tool_page.analyzer.placeholder_fill')}</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-gray-100 dark:border-gray-800">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={analysis.score >= 80 ? '#10b981' : analysis.score >= 50 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeDasharray={`${(analysis.score / 100) * 289} 289`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.score}</div>
                  </div>
                  <div className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-wider">{t('tool_page.analyzer.score_label')}</div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">{t('tool_page.analyzer.detailed_analysis')}</h4>
                  
                  {analysis.checks.map((check) => (
                    <div key={check.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                      <div className="shrink-0 mt-0.5">
                        {check.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : check.id === 'density' && !check.passed ? (
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900 dark:text-white">{check.label}</h5>
                          {check.value && <span className="text-xs font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">{check.value}</span>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{check.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['content-analyzer']} />
    </div>
    </>
  );
}
