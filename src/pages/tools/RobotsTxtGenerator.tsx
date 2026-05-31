import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, CheckCircle2, FileText } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

import { ResultDisplay } from '../../components/ResultDisplay';

export function RobotsTxtGenerator() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [userAgent, setUserAgent] = useState('*');
  const [allow, setAllow] = useState('');
  const [disallow, setDisallow] = useState('/cgi-bin/\n/wp-admin/');
  const [sitemap, setSitemap] = useState('');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let txt = `User-agent: ${userAgent}\n`;
    
    if (disallow) {
      const disallowLines = disallow.split('\n').filter(line => line.trim() !== '');
      disallowLines.forEach(line => {
        txt += `Disallow: ${line.trim()}\n`;
      });
    }
    
    if (allow) {
      const allowLines = allow.split('\n').filter(line => line.trim() !== '');
      allowLines.forEach(line => {
        txt += `Allow: ${line.trim()}\n`;
      });
    }

    if (sitemap) {
      txt += `\nSitemap: ${sitemap}\n`;
    }

    setGenerated(txt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    downloadTextAsPdf(generated, 'robots-txt.pdf');
  };

  return (
    <>
      <SEO title="{t('tool_page.robots.title')} - OptiSEO Tools" description="{t('tool_page.robots.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white">{t('tool_page.robots.title')}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">{t('tool_page.robots.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl ">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.robots.form.user_agent')}</label>
              <input
                type="text"
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                placeholder="*"
              />
              <p className="text-xs text-gray-500 mt-1">* applies to all crawlers</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.robots.form.disallow')} (One per line)</label>
              <textarea
                value={disallow}
                onChange={(e) => setDisallow(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                placeholder="/private/&#10;/tmp/"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.robots.form.allow')} (One per line)</label>
              <textarea
                value={allow}
                onChange={(e) => setAllow(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                placeholder="/public/&#10;/assets/"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.robots.form.sitemap')} (Optional)</label>
              <input
                type="url"
                value={sitemap}
                onChange={(e) => setSitemap(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all "
                placeholder="https://example.com/sitemap.xml"
              />
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.robots.output')}</h3>
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
      <ToolDescription points={toolDescriptions['robots-txt-generator']} />
    </div>
    </>
  );
}
