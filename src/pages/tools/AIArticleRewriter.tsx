import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';
import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';

export function AIArticleRewriter() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [article, setArticle] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const rewriteArticle = async () => {
    if (!article) return;
    
    setIsLoading(true);
    setGeneratedContent('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Rewrite the following article to make it unique while preserving the core message. 
      Use a ${tone} tone of voice.
      
      Original Article:
      ${article}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      setGeneratedContent(response.text || 'Failed to rewrite content.');
    } catch (error) {
      console.error('Error rewriting content:', error);
      setGeneratedContent('An error occurred while rewriting. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    downloadTextAsPdf(generatedContent, 'rewritten-article.pdf');
  };

  return (
    <>
      <SEO title="A I Article Rewriter - OptiSEO Tools" description="Use our free A I Article Rewriter tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.rewriter.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.rewriter.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.rewriter.form.content')}</label>
              <textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="flex-1 w-full min-h-[300px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.rewriter.form.placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.blog.form.tone')}</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
              >
                <option value="professional">{t('tool_page.blog.form.tones.professional')}</option>
                <option value="casual">{t('tool_page.blog.form.tones.casual')}</option>
                <option value="academic">Academic</option>
                <option value="creative">{t('tool_page.blog.form.tones.creative')}</option>
                <option value="simplified">Simplified</option>
              </select>
            </div>

            <button
              onClick={rewriteArticle}
              disabled={!article || isLoading}
              className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 disabled:bg-[#4f39f6]/40 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('tool_page.generate')}...</> : <><Sparkles className="w-5 h-5" /> {t('tool_page.generate')}</>}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool_page.rewriter.output')}</label>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.copy')}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-[#4f39f6]" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.download')}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 w-full min-h-[300px] p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 overflow-auto prose dark:prose-invert">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#4f39f6] mb-2" />
                <p>{t('tool_page.generate')}...</p>
              </div>
            ) : generatedContent ? (
              <div className="whitespace-pre-wrap">{generatedContent}</div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <ToolDescription points={toolDescriptions['ai-article-rewriter']} />
    </>
  );
}
