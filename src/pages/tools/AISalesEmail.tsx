import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, Loader2, Sparkles, CheckCircle2, Mail } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function AISalesEmail() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [benefits, setBenefits] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = async () => {
    if (!product || !audience) return;
    
    setIsLoading(true);
    setGeneratedContent('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Write a highly converting cold sales email for a product/service called "${product}".
      The target audience is: ${audience}.
      Key benefits to highlight: ${benefits}.
      Keep it concise, engaging, and include a clear call to action. Include a catchy subject line.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      });

      setGeneratedContent(response.text || 'Failed to generate email.');
    } catch (error) {
      console.error('Error generating email:', error);
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
    downloadTextAsPdf(generatedContent, 'sales-email.pdf');
  };

  return (
    <>
      <SEO title="A I Sales Email - OptiSEO Tools" description="Use our free A I Sales Email tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Mail className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.sales_email.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.sales_email.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.sales_email.form.product')}</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.sales_email.form.product_placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.sales_email.form.audience')}</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.sales_email.form.audience_placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.sales_email.form.benefits')}</label>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6]"
                placeholder={t('tool_page.sales_email.form.benefits_placeholder')}
              />
            </div>

            <button
              onClick={generateEmail}
              disabled={!product || !audience || isLoading}
              className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 disabled:bg-[#4f39f6]/40 text-white font-medium rounded-xl transition-colors shadow-sm mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t('tool_page.generate')}...</> : <><Sparkles className="w-5 h-5" /> {t('tool_page.generate')}</>}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.sales_email.output')}</h3>
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
          
          <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl p-6 overflow-auto border border-gray-200 dark:border-gray-700 shadow-inner">
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
      <ToolDescription points={toolDescriptions['ai-sales-email']} />
    </div>
    </>
  );
}
