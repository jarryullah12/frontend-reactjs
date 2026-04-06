import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';
import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, Loader2, Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';

export function AIContentIdeas() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [niche, setNiche] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateIdeas = async () => {
    if (!niche) return;
    
    setIsLoading(true);
    setGeneratedContent('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Generate 5 highly engaging and SEO-optimized blog post ideas for the niche: "${niche}".
      Target audience: ${targetAudience || 'General audience'}.
      For each idea, provide:
      1. A catchy SEO-friendly title
      2. A brief summary of what the post will cover
      3. 3-5 target keywords
      
      Format the output clearly with headings and bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      setGeneratedContent(response.text || 'Failed to generate ideas.');
    } catch (error) {
      console.error('Error generating ideas:', error);
      setGeneratedContent('An error occurred. Please check your API key and try again.');
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
    downloadTextAsPdf(generatedContent, 'content-ideas.pdf');
  };

  return (
    <>
      <SEO title="A I Content Ideas - OptiSEO Tools" description="Use our free A I Content Ideas tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.ideas.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.ideas.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.ideas.form.niche')}</label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.ideas.form.placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.ideas.form.audience')}</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.ideas.form.audience_placeholder')}
              />
            </div>

            <button
              onClick={generateIdeas}
              disabled={!niche || isLoading}
              className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 disabled:bg-[#4f39f6]/40 text-white font-medium rounded-xl transition-colors shadow-sm mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('tool_page.generate')}...</> : <><Sparkles className="w-5 h-5" /> {t('tool_page.generate')}</>}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.ideas.output')}</h3>
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
          
          <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl p-6 overflow-auto border border-gray-200 dark:border-gray-700 shadow-inner prose dark:prose-invert">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#4f39f6] mb-2" />
                <p>{t('tool_page.generate')}...</p>
              </div>
            ) : generatedContent ? (
              <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-sans">
                {generatedContent}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <ToolDescription points={toolDescriptions['ai-content-ideas']} />
    </>
  );
}
