import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { Search, Activity } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { GoogleGenAI } from '@google/genai';
import { toolDescriptions } from '../../data/toolDescriptions';


import { ResultDisplay } from '../../components/ResultDisplay';

export function MobileFriendlyTest() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: `Evaluate the likely mobile-friendliness of the following URL based on modern web development standards. Provide an estimated score and explain potential mobile usability issues (e.g., viewport configuration, tap targets). Do NOT provide generic on-page SEO advice like "Add an H1 tag" or "Add a meta description". URL:\n${input}`,
      });
      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Mobile Friendly Test - OptiSEO Tools" description="Check if your website is mobile-friendly." />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mobile Friendly Test</h1>
            <p className="text-gray-600 dark:text-gray-400">Check if your website is mobile-friendly.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website URL</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent min-h-[150px]"
                placeholder="Enter website URL..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="flex justify-end mb-8">
              <button
                onClick={handleAnalyze}
                disabled={loading || !input}
                className="px-6 py-2 text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Process
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f39f6] mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Processing...</p>
              </div>
            )}

            {result && !loading && <ResultDisplay result={result} />}
          </div>
        </div>
        <ToolDescription points={toolDescriptions['mobile-friendly-test'] || [
          'What is this tool? It is a powerful SEO utility designed to optimize your workflow.',
          'How to use it? Simply enter your input and click Process.',
          'Why use it? It helps improve your website ranking and visibility.',
          'Is it free to use? Yes, depending on your subscription plan.',
          'How accurate are the results? We use advanced algorithms and AI to ensure high accuracy.',
          'Do I need to install anything? No, this is a completely web-based tool.',
          'Is my data secure? Yes, we do not store your input data after processing.',
          'Can I export the results? Yes, you can copy or export the results easily.',
          'Who is this tool for? SEO professionals, marketers, and website owners.',
          'How often should I use it? As often as needed for your daily SEO tasks.'
        ]} />
      </div>
    </>
  );
}
