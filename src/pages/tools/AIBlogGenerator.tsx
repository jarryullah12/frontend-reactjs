import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';
import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Copy, Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';

import { ResultDisplay } from '../../components/ResultDisplay';

export function AIBlogGenerator() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePost = async () => {
    if (!topic) return;
    
    setIsLoading(true);
    setGeneratedContent('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Write a ${length} length blog post about "${topic}". 
      Include the following keywords naturally: ${keywords}.
      The tone should be ${tone}.
      Structure the post with a catchy title, an engaging introduction, multiple subheadings (H2, H3), and a strong conclusion.
      Format the output in Markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      setGeneratedContent(response.text || 'Failed to generate content. Please try again.');
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('An error occurred while generating content. Please check your API key and try again.');
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
    downloadTextAsPdf(generatedContent, 'blog-post.pdf');
  };

  return (
    <>
      <SEO title="A I Blog Generator - OptiSEO Tools" description="Use our free A I Blog Generator tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.blog.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.blog.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.blog.form.topic')}</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                  placeholder={t('tool_page.blog.form.placeholder_topic')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.blog.form.keywords')}</label>
                <textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                  placeholder={t('tool_page.blog.form.placeholder_keywords')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.blog.form.tone')}</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                >
                  <option value="professional">{t('tool_page.blog.form.tones.professional')}</option>
                  <option value="casual">{t('tool_page.blog.form.tones.casual')}</option>
                  <option value="informative">{t('tool_page.blog.form.tones.informative')}</option>
                  <option value="creative">{t('tool_page.blog.form.tones.creative')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.blog.form.length')}</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                >
                  <option value="short">{t('tool_page.blog.form.lengths.short')}</option>
                  <option value="medium">{t('tool_page.blog.form.lengths.medium')}</option>
                  <option value="long">{t('tool_page.blog.form.lengths.long')}</option>
                </select>
              </div>

              <button
                onClick={generatePost}
                disabled={!topic || isLoading}
                className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 disabled:bg-[#4f39f6]/40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-sm mt-4 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('tool_page.generate')}...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t('tool_page.generate')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.blog.output')}</h3>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.copy')}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.download')}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-auto prose dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#4f39f6]" />
                <p>{t('tool_page.generate')}...</p>
              </div>
            ) : generatedContent ? (
              <ResultDisplay result={generatedContent} hideCard={true} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <ToolDescription points={toolDescriptions['ai-blog-generator']} />
    </>
  );
}
