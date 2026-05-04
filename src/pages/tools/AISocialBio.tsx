import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, Loader2, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

import { ResultDisplay } from '../../components/ResultDisplay';

export function AISocialBio() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [platform, setPlatform] = useState('Twitter/X');
  const [profession, setProfession] = useState('');
  const [personality, setPersonality] = useState('Professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateBio = async () => {
    if (!profession) return;
    
    setIsLoading(true);
    setGeneratedContent('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Write 3 different engaging bio options for a ${platform} profile.
      The person is a: ${profession}.
      The desired personality/tone is: ${personality}.
      Keep them within the typical character limits for ${platform}. Use emojis where appropriate.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      setGeneratedContent(response.text || 'Failed to generate bio.');
    } catch (error) {
      console.error('Error generating bio:', error);
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
    downloadTextAsPdf(generatedContent, 'social-bio.pdf');
  };

  return (
    <>
      <SEO title="A I Social Bio - OptiSEO Tools" description="Use our free A I Social Bio tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Share2 className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.bio.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.bio.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.bio.form.platform')}</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
              >
                <option value="Twitter/X">Twitter / X</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="TikTok">TikTok</option>
                <option value="GitHub">GitHub</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.bio.form.profession')}</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.bio.form.placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.blog.form.tone')}</label>
              <select
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
              >
                <option value="Professional">{t('tool_page.blog.form.tones.professional')}</option>
                <option value="Funny">Funny & Witty</option>
                <option value="Inspirational">Inspirational</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Techy">Techy / Geeky</option>
              </select>
            </div>

            <button
              onClick={generateBio}
              disabled={!profession || isLoading}
              className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 disabled:bg-[#4f39f6]/40 text-white font-medium rounded-xl transition-colors shadow-sm mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('tool_page.generate')}...</> : <><Sparkles className="w-5 h-5" /> {t('tool_page.generate')}</>}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.bio.output')}</h3>
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
              <ResultDisplay result={generatedContent} hideCard={true} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['ai-social-bio']} />
    </div>
    </>
  );
}
