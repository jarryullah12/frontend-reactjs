import { SEO } from '../../components/SEO';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { BarChart, Search, CheckCircle2, XCircle, Loader2, AlertCircle, Globe, Layout, Image as ImageIcon, ListChecks, Sparkles } from 'lucide-react';
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';

export function WebsiteAnalyzer() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get('url') || '';
  const [url, setUrl] = useState(urlParam);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadingMessages = [
    "Connecting to website...",
    "Fetching page content...",
    "Analyzing meta tags...",
    "Checking heading structure...",
    "Evaluating image alt tags...",
    "Calculating SEO score...",
    "Generating recommendations..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let index = 0;
      setLoadingMessage(loadingMessages[0]);
      interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const analyze = async () => {
    if (!url) return;
    
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Step 1: Fetch HTML via proxy
      const proxyResponse = await fetch(`/api/proxy-fetch?url=${encodeURIComponent(formattedUrl)}`);
      if (!proxyResponse.ok) {
        const errorData = await proxyResponse.json();
        throw new Error(errorData.error || 'Failed to fetch website content');
      }
      const htmlContent = await proxyResponse.text();

      // Step 2: Analyze with Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const prompt = `Analyze the following HTML content of a website (${formattedUrl}) and provide a detailed SEO audit in JSON format.
      
      HTML Content (truncated):
      ${htmlContent.slice(0, 30000)}

      Analyze the title, meta description, H1 tags, and images.
      Return the results in the specified JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              title: { 
                type: Type.OBJECT, 
                properties: {
                  text: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["good", "warning", "error"] },
                  message: { type: Type.STRING }
                }
              },
              description: { 
                type: Type.OBJECT, 
                properties: {
                  text: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["good", "warning", "error"] },
                  message: { type: Type.STRING }
                }
              },
              headings: {
                type: Type.OBJECT,
                properties: {
                  h1_count: { type: Type.NUMBER },
                  status: { type: Type.STRING, enum: ["good", "warning", "error"] },
                  message: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              },
              images: {
                type: Type.OBJECT,
                properties: {
                  total: { type: Type.NUMBER },
                  missing_alt: { type: Type.NUMBER },
                  status: { type: Type.STRING, enum: ["good", "warning", "error"] },
                  message: { type: Type.STRING }
                }
              },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["score", "title", "description", "headings", "images", "recommendations"]
          }
        },
      });

      if (!response.text) {
        throw new Error('The AI model returned an empty response.');
      }

      const result = JSON.parse(response.text);
      setAnalysis(result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      let userFriendlyError = 'Failed to analyze the website. ';
      
      if (err.message?.includes('PERMISSION_DENIED')) {
        userFriendlyError += 'API Key issue. Please check your configuration.';
      } else if (err.message?.includes('fetch')) {
        userFriendlyError += `Connection error: ${err.message}. The website might be blocking automated requests or is currently down.`;
      } else if (err.message) {
        userFriendlyError += `Error: ${err.message}`;
      } else {
        userFriendlyError += 'Please make sure the URL is correct and publicly accessible.';
      }
      
      setError(userFriendlyError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlParam) {
      analyze();
    }
  }, [urlParam]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <>
      <SEO title="Website Analyzer - OptiSEO Tools" description="Use our free Website Analyzer tool to optimize your website." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.website_analyzer.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('tool_page.website_analyzer.subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex-1 relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] outline-none"
            placeholder={t('tool_page.website_analyzer.form.url_placeholder') || "example.com"}
          />
        </div>
        <button 
          onClick={analyze} 
          disabled={loading || !url}
          className="px-8 py-3 bg-[#4f39f6] text-white rounded-xl font-semibold hover:bg-[#4f39f6]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('common.analyzing') || "Analyzing..."}
            </>
          ) : (
            t('tool_page.website_analyzer.analyze_button')
          )}
        </button>
      </div>

      {loading && (
        <div className="mb-8 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-[#4f39f6]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#4f39f6] border-t-transparent animate-spin"></div>
            <BarChart className="absolute inset-0 m-auto w-8 h-8 text-[#4f39f6] animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Website</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">{loadingMessage}</p>
          <div className="mt-8 w-full max-w-xs bg-gray-100 dark:bg-gray-900 rounded-full h-2 overflow-hidden">
            <div className="bg-[#4f39f6] h-full animate-progress-indeterminate"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-3">
          <XCircle className="w-5 h-5" />
          {error}
        </div>
      )}
      
      {analysis && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('tool_page.website_analyzer.results_title')}
                  </h2>
                </div>
                <p className="text-gray-500 font-mono">{url}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`text-6xl font-black ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mt-1">SEO Score</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <Layout className="w-5 h-5 text-[#4f39f6]" />
                  Page Title
                </div>
                {getStatusIcon(analysis.title.status)}
              </div>
              <p className="text-gray-900 dark:text-white font-medium mb-2">{analysis.title.text}</p>
              <p className="text-sm text-gray-500">{analysis.title.message}</p>
            </div>

            {/* Meta Description Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <Search className="w-5 h-5 text-[#4f39f6]" />
                  Meta Description
                </div>
                {getStatusIcon(analysis.description.status)}
              </div>
              <p className="text-gray-900 dark:text-white font-medium mb-2">{analysis.description.text || 'No meta description found'}</p>
              <p className="text-sm text-gray-500">{analysis.description.message}</p>
            </div>

            {/* Headings Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <ListChecks className="w-5 h-5 text-[#4f39f6]" />
                  Headings Structure
                </div>
                {getStatusIcon(analysis.headings.status)}
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm">
                  <span className="font-bold">{analysis.headings.h1_count}</span> H1 Tags
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{analysis.headings.message}</p>
              {analysis.headings.items?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase">H1 Content:</p>
                  {analysis.headings.items.map((h: string, i: number) => (
                    <p key={i} className="text-sm text-gray-700 dark:text-gray-300 italic">"{h}"</p>
                  ))}
                </div>
              )}
            </div>

            {/* Images Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <ImageIcon className="w-5 h-5 text-[#4f39f6]" />
                  Images & Alt Tags
                </div>
                {getStatusIcon(analysis.images.status)}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold">{analysis.images.total}</div>
                  <div className="text-xs text-gray-500">Total Images</div>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <div className={`text-2xl font-bold ${analysis.images.missing_alt > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {analysis.images.missing_alt}
                  </div>
                  <div className="text-xs text-gray-500">Missing Alt Tags</div>
                </div>
              </div>
              <p className="text-sm text-gray-500">{analysis.images.message}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#4f39f6] text-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              SEO Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.recommendations.map((rec: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToolDescription points={toolDescriptions['website-analyzer']} />
    </div>
    </>
  );
}
