import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Search, Activity } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function KeywordSuggestionTool() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    setTimeout(() => {
      setResult({ seedKeyword: input, suggestions: [input + ' tips', 'best ' + input, input + ' tutorial', input + ' for beginners'].join(', ') });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <SEO title="Keyword Suggestion Tool - OptiSEO Tools" description="Get keyword suggestions for your seed keyword." />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Keyword Suggestion Tool</h1>
          <p className="text-gray-600 dark:text-gray-400">Get keyword suggestions for your seed keyword.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seed Keyword</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent"
              placeholder="e.g., digital marketing"
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
              Get Suggestions
            </button>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f39f6] mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Processing...</p>
            </div>
          )}

          {result && !loading && (
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Results</h3>
              <div className="space-y-4">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToolDescription points={toolDescriptions['keyword-suggestion-tool']} />
    </div>
    </>
  );
}
