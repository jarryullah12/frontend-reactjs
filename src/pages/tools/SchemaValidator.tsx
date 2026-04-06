import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, AlertTriangle, CheckCircle2, Code, Download } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function SchemaValidator() {
  const { t } = useTranslation();
  const { downloadAsPdf } = usePdfGenerator();
  const [jsonInput, setJsonInput] = useState('{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Understanding SEO",\n  "author": {\n    "@type": "Person",\n    "name": "Jane Doe"\n  }\n}');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string; errors: string[] } | null>(null);

  const validateSchema = () => {
    try {
      if (!jsonInput.trim()) {
        setValidationResult({ isValid: false, message: 'Input is empty.', errors: [] });
        return;
      }

      const parsed = JSON.parse(jsonInput);
      const errors: string[] = [];

      if (!parsed['@context'] || !parsed['@context'].includes('schema.org')) {
        errors.push('Missing or invalid "@context". It should be "https://schema.org".');
      }
      
      if (!parsed['@type']) {
        errors.push('Missing "@type" property. E.g., "Article", "Product", "Organization".');
      }

      if (errors.length > 0) {
        setValidationResult({ isValid: false, message: 'Invalid Schema.org JSON-LD', errors });
      } else {
        setValidationResult({ isValid: true, message: 'Valid Schema.org JSON-LD structure!', errors: [] });
      }
    } catch (e: any) {
      setValidationResult({ isValid: false, message: 'Invalid JSON format', errors: [e.message] });
    }
  };

  const handleDownloadPdf = () => {
    downloadAsPdf('schema-result', 'schema-validation-report.pdf');
  };

  return (
    <>
      <SEO title="Schema Validator - OptiSEO Tools" description="Use our free Schema Validator tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <Shield className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.schema.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.schema.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool_page.schema.form.code')}</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="flex-1 w-full min-h-[300px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-[#4f39f6]"
            placeholder={t('tool_page.schema.form.placeholder')}
          />
          <button
            onClick={validateSchema}
            className="w-full py-3 px-4 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm mt-4 flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5" /> {t('tool_page.generate')}
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.schema.output')}</h3>
            {validationResult && (
              <button
                onClick={handleDownloadPdf}
                className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                title={t('tool_page.download')}
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div id="schema-result" className="flex-1 bg-white dark:bg-gray-950 rounded-xl p-6 overflow-auto border border-gray-200 dark:border-gray-700 shadow-inner">
            {!validationResult ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            ) : validationResult.isValid ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle2 className="w-16 h-16 text-[#4f39f6] mb-4" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{validationResult.message}</h4>
                <p className="text-gray-600 dark:text-gray-400">Your JSON-LD syntax is correct and includes the required schema.org properties.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-100 dark:border-red-900/30">
                  <AlertTriangle className="w-8 h-8 text-[#4f39f6] shrink-0" />
                  <h4 className="text-xl font-bold text-red-600 dark:text-red-400">{validationResult.message}</h4>
                </div>
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">Errors found:</h5>
                  <ul className="list-disc pl-5 space-y-2">
                    {validationResult.errors.map((error, idx) => (
                      <li key={idx} className="text-red-600 dark:text-red-400 text-sm">{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['schema-validator']} />
    </div>
    </>
  );
}
