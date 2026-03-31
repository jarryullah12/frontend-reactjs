import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Copy, Download, Share2, CheckCircle2 } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function MetaTagGenerator() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [robotsIndex, setRobotsIndex] = useState('index');
  const [robotsFollow, setRobotsFollow] = useState('follow');
  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    let tags = '';
    if (title) tags += `<title>${title}</title>\n`;
    if (description) tags += `<meta name="description" content="${description}">\n`;
    if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`;
    if (author) tags += `<meta name="author" content="${author}">\n`;
    tags += `<meta name="robots" content="${robotsIndex}, ${robotsFollow}">\n`;
    tags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    tags += `<meta charset="UTF-8">\n`;
    setGeneratedTags(tags);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    downloadTextAsPdf(generatedTags, 'meta-tags.pdf');
  };

  return (
    <>
      <SEO title="{t('tool_page.meta.title')} - OptiSEO Tools" description="{t('tool_page.meta.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.meta.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.meta.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.meta.form.site_title')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                placeholder={t('tool_page.meta.form.placeholder_title')}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">{title.length} / 60 {t('tool_page.meta.form.chars')}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.meta.form.site_desc')}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                placeholder={t('tool_page.meta.form.placeholder_desc')}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">{description.length} / 160 {t('tool_page.meta.form.chars')}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.meta.form.keywords')}</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                placeholder={t('tool_page.meta.form.placeholder_keywords')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.meta.form.author')}</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                placeholder={t('tool_page.meta.form.placeholder_author')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.meta.form.robots_index')}</label>
                <select
                  value={robotsIndex}
                  onChange={(e) => setRobotsIndex(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                >
                  <option value="index">Index</option>
                  <option value="noindex">No Index</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('tool_page.meta.form.robots_follow')}</label>
                <select
                  value={robotsFollow}
                  onChange={(e) => setRobotsFollow(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
                >
                  <option value="follow">Follow</option>
                  <option value="nofollow">No Follow</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateTags}
              className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm mt-4"
            >
              {t('tool_page.generate')}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.meta.output')}</h3>
            {generatedTags && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.copy')}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  title={t('tool_page.download')}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 bg-white dark:bg-black rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800 relative">
            {generatedTags ? (
              <pre className="text-sm text-gray-800 dark:text-emerald-400 font-mono whitespace-pre-wrap break-all">
                {generatedTags}
              </pre>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500 dark:text-gray-600">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['meta-tag-generator']} />
    </div>
    </>
  );
}
