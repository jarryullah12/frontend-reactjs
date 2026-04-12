import { SEO } from '../../components/SEO';
import React, { useState } from 'react';
import { Search, Activity, CheckCircle2, AlertCircle, Sparkles, Download } from 'lucide-react';
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function GrammarChecker() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [result, setResult] = useState<{
    errorsFound: number;
    correctedText: string;
    suggestions: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { downloadAsPdf } = usePdfGenerator();

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: `Analyze the following text for grammar, spelling, and punctuation errors. 
        Provide the corrected text, the number of errors found, and a list of specific suggestions or explanations for the corrections.
        
        Text to analyze:
        """
        ${input}
        """`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              errorsFound: { type: Type.NUMBER, description: "Total number of errors found" },
              correctedText: { type: Type.STRING, description: "The fully corrected text" },
              suggestions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of explanations for the corrections made"
              }
            },
            required: ["errorsFound", "correctedText", "suggestions"]
          }
        },
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
    } catch (err) {
      console.error('Grammar check error:', err);
      setError('Failed to analyze the text. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    try {
      setIsDownloading(true);
      await downloadAsPdf('grammar-result', 'grammar-check-report.pdf');
    } catch (err) {
      console.error('PDF Download error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <SEO title="Grammar Checker - OptiSEO Tools" description="Check your text for grammar, spelling, and punctuation errors instantly using AI." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-[#4f39f6]" />
            Grammar Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Instantly check your text for grammar, spelling, and punctuation errors using advanced AI.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to check</label>
            <textarea
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] outline-none resize-y min-h-[200px]"
              placeholder="Paste or type your text here to check for grammar errors..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {input.length} characters | {input.split(/\s+/).filter(w => w.length > 0).length} words
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className="px-8 py-3 bg-[#4f39f6] text-white rounded-xl font-semibold hover:bg-[#4f39f6]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Check Grammar
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {result && !loading && (
          <div id="grammar-result" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#4f39f6]" />
                    Corrected Text
                  </h3>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="p-2 text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors disabled:opacity-50"
                    title="Download PDF"
                  >
                    {isDownloading ? (
                      <Activity className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.errorsFound === 0 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {result.errorsFound === 0 ? 'No errors found' : `${result.errorsFound} error${result.errorsFound > 1 ? 's' : ''} found`}
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 whitespace-pre-wrap text-gray-900 dark:text-white">
                {result.correctedText}
              </div>
            </div>

            {result.suggestions && result.suggestions.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Suggestions & Corrections</h3>
                <ul className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#4f39f6]/10 text-[#4f39f6] flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="leading-relaxed">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <ToolDescription points={toolDescriptions['grammar-checker']} />
    </>
  );
}
