import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Linkedin, Sparkles, Copy, CheckCircle2, Download } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

import { ResultDisplay } from '../../components/ResultDisplay';

export function AISocialCaption() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [loading, setLoading] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCaptions = async () => {
    if (!topic) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: `Generate 3 engaging social media captions for ${platform} about: ${topic}. 
        Include relevant emojis and hashtags. Make them catchy and tailored for ${platform}.`,
      });
      
      setGeneratedCaptions(response.text || '');
    } catch (error) {
      console.error('AI Generation error:', error);
      setGeneratedCaptions('Failed to generate captions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCaptions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { name: 'Twitter', icon: Twitter, color: 'text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
  ];

  return (
    <>
      <SEO title="{t('tool_page.caption.title')} - OptiSEO Tools" description="{t('tool_page.caption.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.caption.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.caption.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tool_page.caption.form.platform')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPlatform(p.name)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                      platform === p.name 
                        ? 'border-[#4f39f6] bg-[#4f39f6]/5 ring-1 ring-[#4f39f6]' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <p.icon className={`w-5 h-5 ${p.color}`} />
                    <span className="text-sm font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tool_page.caption.form.topic')}
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
                placeholder={t('tool_page.caption.form.placeholder_topic')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] resize-none"
              />
            </div>

            <button
              onClick={generateCaptions}
              disabled={loading || !topic}
              className="w-full py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Generating...' : t('tool_page.generate')}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.caption.output')}</h3>
            {generatedCaptions && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => downloadTextAsPdf(generatedCaptions, 'social-captions.pdf')}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 bg-white dark:bg-black rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800 relative">
            {generatedCaptions ? (
              <ResultDisplay result={generatedCaptions} hideCard={true} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500 dark:text-gray-600">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['ai-social-caption']} />
    </div>
    </>
  );
}
