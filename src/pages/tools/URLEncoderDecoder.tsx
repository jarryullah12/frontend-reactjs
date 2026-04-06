import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link, Unlock, Lock, Copy, CheckCircle2 } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function URLEncoderDecoder() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const processURL = () => {
    if (!input) return;
    try {
      if (mode === 'encode') {
        setResult(encodeURIComponent(input));
      } else {
        setResult(decodeURIComponent(input));
      }
    } catch (e) {
      setResult('Invalid input for decoding.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO title="{t('tool_page.url_codec.title')} - OptiSEO Tools" description="{t('tool_page.url_codec.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.url_codec.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.url_codec.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('tool_page.url_codec.form.mode')}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setMode('encode')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  mode === 'encode' 
                    ? 'border-[#4f39f6] bg-[#4f39f6]/5 text-[#4f39f6] ring-1 ring-[#4f39f6]' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span className="font-medium">{t('tool_page.url_codec.form.modes.encode')}</span>
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  mode === 'decode' 
                    ? 'border-[#4f39f6] bg-[#4f39f6]/5 text-[#4f39f6] ring-1 ring-[#4f39f6]' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500'
                }`}
              >
                <Unlock className="w-4 h-4" />
                <span className="font-medium">{t('tool_page.url_codec.form.modes.decode')}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('tool_page.url_codec.form.input')}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              placeholder="Paste your URL or text here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] resize-none font-mono"
            />
          </div>

          <button
            onClick={processURL}
            disabled={!input}
            className="w-full py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.url_codec.output')}</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? t('tool_page.copied') : t('tool_page.copy')}
            </button>
          </div>
          <div className="p-4 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 break-all font-mono text-gray-800 dark:text-gray-200">
            {result}
          </div>
        </motion.div>
      )}
      <ToolDescription points={toolDescriptions['url-encoder-decoder']} />
    </div>
    </>
  );
}
