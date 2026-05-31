import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {  Copy, Download, CheckCircle2 , FileText } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

import { ResultDisplay } from '../../components/ResultDisplay';

export function XmlSitemapGenerator() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [urls, setUrls] = useState('https://example.com/\nhttps://example.com/about\nhttps://example.com/contact');
  const [changefreq, setChangefreq] = useState('daily');
  const [priority, setPriority] = useState('0.8');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const urlList = urls.split('\n').filter(url => url.trim() !== '');
    const date = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    urlList.forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>${url.trim()}</loc>\n`;
      xml += `    <lastmod>${date}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    });
    
    xml += `</urlset>`;
    setGenerated(xml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    downloadTextAsPdf(generated, 'sitemap.pdf');
  };

  return (
    <>
      <SEO title="{t('tool_page.sitemap.title')} - OptiSEO Tools" description="{t('tool_page.sitemap.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">{t('tool_page.sitemap.title')}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">{t('tool_page.sitemap.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl ">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.sitemap.form.url')} (One per line)</label>
              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                placeholder="https://example.com/"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.sitemap.form.frequency')}</label>
                <select
                  value={changefreq}
                  onChange={(e) => setChangefreq(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                >
                  <option value="always">{t('tool_page.sitemap.form.frequencies.always')}</option>
                  <option value="hourly">{t('tool_page.sitemap.form.frequencies.hourly')}</option>
                  <option value="daily">{t('tool_page.sitemap.form.frequencies.daily')}</option>
                  <option value="weekly">{t('tool_page.sitemap.form.frequencies.weekly')}</option>
                  <option value="monthly">{t('tool_page.sitemap.form.frequencies.monthly')}</option>
                  <option value="yearly">{t('tool_page.sitemap.form.frequencies.yearly')}</option>
                  <option value="never">{t('tool_page.sitemap.form.frequencies.never')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.sitemap.form.priority')}</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                >
                  <option value="1.0">1.0</option>
                  <option value="0.9">0.9</option>
                  <option value="0.8">0.8</option>
                  <option value="0.7">0.7</option>
                  <option value="0.6">0.6</option>
                  <option value="0.5">0.5</option>
                </select>
              </div>
            </div>

            <button
              onClick={generate}
              className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm mt-4"
            >
              {t('tool_page.generate')}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg  flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.sitemap.output')}</h3>
            {generated && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.copy')}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
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
          
          <div className="flex-1 bg-white dark:bg-black rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800 relative min-h-[300px]">
            {generated ? (
              <ResultDisplay result={generated} hideCard={true} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-8 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-sm font-medium">{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['xml-sitemap-generator']} />
    </div>
    </>
  );
}
