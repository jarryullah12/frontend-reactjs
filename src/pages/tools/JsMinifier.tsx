import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download, CheckCircle2, Code } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function JsMinifier() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [input, setInput] = useState('function greet(name) {\n  // Print greeting\n  console.log("Hello, " + name);\n}\n\ngreet("World");');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = () => {
    let minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\/\/.*$/gm, '')         // Remove single-line comments
      .replace(/\s+/g, ' ')             // Collapse whitespace
      .replace(/\s*([\{\}\:\;\,=\(\)])\s*/g, '$1') // Remove space around operators/separators
      .trim();
    setOutput(minified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    downloadTextAsPdf(output, 'minified.js.pdf');
  };

  return (
    <>
      <SEO title="Js Minifier - OptiSEO Tools" description="Use our free Js Minifier tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Code className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.minifier.js_title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.minifier.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool_page.minifier.form.input')}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full min-h-[300px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-[#4f39f6]"
            placeholder={t('tool_page.minifier.form.placeholder')}
          />
          <button
            onClick={minify}
            className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm mt-4"
          >
            {t('tool_page.generate')}
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool_page.minifier.output')}</label>
            {output && (
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
          <textarea
            readOnly
            value={output}
            className="flex-1 w-full min-h-[300px] px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-black text-amber-600 dark:text-amber-400 font-mono text-sm"
            placeholder={t('tool_page.placeholder_fill')}
          />
          {output && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Saved {Math.round((1 - output.length / input.length) * 100)}% space!
            </div>
          )}
        </div>
      </div>
      <ToolDescription points={toolDescriptions['js-minifier']} />
    </div>
    </>
  );
}
