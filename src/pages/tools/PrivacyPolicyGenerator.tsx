import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Shield, FileText, Copy, CheckCircle2, Download } from 'lucide-react';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

import { ResultDisplay } from '../../components/ResultDisplay';

export function PrivacyPolicyGenerator() {
  const { t } = useTranslation();
  const { downloadTextAsPdf } = usePdfGenerator();
  const [company, setCompany] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('privacy');
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [copied, setCopied] = useState(false);

  const generateDocument = () => {
    if (!company || !url) return;
    
    const date = new Date().toLocaleDateString();
    let content = '';

    if (type === 'privacy') {
      content = `PRIVACY POLICY\n\nLast updated: ${date}\n\nAt ${company}, accessible from ${url}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${company} and how we use it.\n\nLog Files\n${company} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.\n\nCookies and Web Beacons\nLike any other website, ${company} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.\n\nPrivacy Policies\nYou may consult this list to find the Privacy Policy for each of the advertising partners of ${company}.\n\nConsent\nBy using our website, you hereby consent to our Privacy Policy and agree to its terms.`;
    } else {
      content = `TERMS AND CONDITIONS\n\nLast updated: ${date}\n\nWelcome to ${company}!\n\nThese terms and conditions outline the rules and regulations for the use of ${company}'s Website, located at ${url}.\n\nBy accessing this website we assume you accept these terms and conditions. Do not continue to use ${company} if you do not agree to take all of the terms and conditions stated on this page.\n\nCookies\nWe employ the use of cookies. By accessing ${company}, you agreed to use cookies in agreement with the ${company}'s Privacy Policy.\n\nLicense\nUnless otherwise stated, ${company} and/or its licensors own the intellectual property rights for all material on ${company}. All intellectual property rights are reserved.\n\nYour Privacy\nPlease read Privacy Policy.`;
    }

    setGeneratedDoc(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO title="{t('tool_page.privacy.title')} - OptiSEO Tools" description="{t('tool_page.privacy.subtitle')}" />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('tool_page.privacy.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.privacy.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool_page.privacy.form.company')}
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. My Awesome Company"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool_page.privacy.form.url')}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tool_page.privacy.form.type')}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6]"
              >
                <option value="privacy">{t('tool_page.privacy.form.types.privacy')}</option>
                <option value="terms">{t('tool_page.privacy.form.types.terms')}</option>
              </select>
            </div>
            <button
              onClick={generateDocument}
              disabled={!company || !url}
              className="w-full py-3 bg-[#4f39f6] hover:bg-[#4f39f6]/90 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              {t('tool_page.generate')}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tool_page.privacy.output')}</h3>
            {generatedDoc && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => downloadTextAsPdf(generatedDoc, `${type}.pdf`)}
                  className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 bg-white dark:bg-black rounded-xl p-4 overflow-auto border border-gray-200 dark:border-gray-800 relative">
            {generatedDoc ? (
              <ResultDisplay result={generatedDoc} hideCard={true} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500 dark:text-gray-600">
                <p>{t('tool_page.placeholder_fill')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToolDescription points={toolDescriptions['privacy-policy-generator']} />
    </div>
    </>
  );
}
