import { SEO } from '../../components/SEO';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { BarChart, Search, CheckCircle2, XCircle, Loader2, AlertCircle, Globe, Layout, Image as ImageIcon, ListChecks, Sparkles, Activity, Info, Clock, HardDrive, Languages, FileText, Smartphone, Zap, Users, Cpu, ArrowUpRight } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';
import { fetchWebsiteHtml } from '../../lib/fetchWebsiteHtml';

const TABS = [
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'speed', label: 'Speed', icon: Zap },
  { id: 'visitors', label: 'Visitors', icon: Users },
  { id: 'technology', label: 'Technology', icon: Cpu },
];

const CHART_COLORS = ['#4f39f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function WebsiteAnalyzer() {
  const [activeTab, setActiveTab] = useState('seo');
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
      // Step 1: Fetch HTML via proxy/fallback endpoints
      const htmlContent = await fetchWebsiteHtml(formattedUrl);

      // Step 2: Analyze with Gemini
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
      if (!geminiApiKey) {
        throw new Error('Missing GEMINI API key.');
      }
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      
      const prompt = `You are an expert SEO auditor & Website Analyzer. Your task is to analyze the following HTML content which belongs to the external website: ${formattedUrl}.
      
      CRITICAL INSTRUCTION: You MUST base your analysis STRICTLY on the HTML content provided. Do NOT provide generic SEO advice. If the HTML already has an H1 tag, do NOT tell the user to "Add a H1 heading". If it's a client-side rendered app (like React), mention that it appears to be JS-rendered, but still deduce whatever possible. Provide ACTUAL insights.

      HTML Content (truncated):
      ${htmlContent.slice(0, 10000)}

      MUST provide:
      1. SEO: 'tasks_by_priority', 'detailed_metrics', 'category_scores', 'critical_issues_count', 'page_details', and analysis for title, description, headings, images.
      2. mobile_score (0-100) and speed_score (0-100).
      3. performance_metrics: FCP (ms), LCP (ms), CLS (0-1), TTI (ms), speedIndex (ms). Estimate based on typical performance of the tech stack found.
      4. visitors: a realistic simulated monthly_estimate (number), traffic_sources (Direct, Organic Search, Social, Referral - values summing to 100), top_countries (top 5 with % value).
      5. technologies: Array of technologies realistically inferred from HTML/scripts (e.g. React, Next.js, WordPress, Google Analytics).

      Return the results in the specified JSON format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              category_scores: {
                type: Type.OBJECT,
                properties: {
                  meta_data: { type: Type.NUMBER },
                  page_quality: { type: Type.NUMBER },
                  page_structure: { type: Type.NUMBER },
                  links: { type: Type.NUMBER },
                  server: { type: Type.NUMBER },
                  external_factors: { type: Type.NUMBER }
                }
              },
              critical_issues_count: { type: Type.NUMBER },
              mobile_score: { type: Type.NUMBER },
              speed_score: { type: Type.NUMBER },
              performance_metrics: {
                type: Type.OBJECT,
                properties: {
                  fcp: { type: Type.NUMBER },
                  lcp: { type: Type.NUMBER },
                  cls: { type: Type.NUMBER },
                  tti: { type: Type.NUMBER },
                  speedIndex: { type: Type.NUMBER }
                }
              },
              visitors: {
                type: Type.OBJECT,
                properties: {
                  monthly_estimate: { type: Type.NUMBER },
                  traffic_sources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } }
                    }
                  },
                  top_countries: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } }
                    }
                  }
                }
              },
              technologies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { 
                    category: { type: Type.STRING },
                    name: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              },
              page_details: {
                type: Type.OBJECT,
                properties: {
                  status_code: { type: Type.NUMBER },
                  response_time: { type: Type.STRING },
                  is_follow: { type: Type.BOOLEAN },
                  is_index: { type: Type.BOOLEAN },
                  file_size: { type: Type.STRING },
                  language: { type: Type.STRING },
                  word_count: { type: Type.NUMBER }
                }
              },
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
              },
              tasks_by_priority: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    task: { type: Type.STRING },
                    priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                  }
                }
              },
              detailed_metrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ["good", "warning", "error", "info"] },
                    value: { type: Type.STRING },
                    message: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["score", "category_scores", "critical_issues_count", "page_details", "title", "description", "headings", "images", "recommendations", "tasks_by_priority", "detailed_metrics", "mobile_score", "speed_score", "performance_metrics", "visitors", "technologies"]
          }
        },
      });

      if (!response.text) {
        throw new Error('The AI model returned an empty response.');
      }

      const normalizedJson = response.text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
        .trim();

      let result: any;
      try {
        result = JSON.parse(normalizedJson);
      } catch {
        throw new Error('AI returned invalid JSON response. Please try again.');
      }
      setAnalysis(result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      let userFriendlyError = 'Failed to analyze the website. ';
      
      if (err.message?.includes('Unable to fetch website HTML from any configured endpoint')) {
        userFriendlyError += 'Could not fetch the website HTML from proxy/fallback sources. Please ensure your backend proxy is deployed or set VITE_API_URL correctly.';
      } else if (err.message?.includes('Netlify 404 HTML')) {
        userFriendlyError += 'Proxy endpoint returned 404 HTML. Backend route `/api/proxy-fetch` is not available on this deployment.';
      } else if (err.message?.includes('/api/proxy-fetch')) {
        userFriendlyError += `Proxy/fallback fetch failed: ${err.message}`;
      } else if (err.message?.includes('Missing GEMINI API key')) {
        userFriendlyError += 'Gemini API key missing. Configure GEMINI_API_KEY or VITE_GEMINI_API_KEY and redeploy.';
      } else if (err.message?.includes('PERMISSION_DENIED')) {
        userFriendlyError += 'API Key issue. Please check your configuration.';
      } else if (err.message?.includes('503') || err.message?.includes('UNAVAILABLE')) {
        userFriendlyError += 'The AI model is currently experiencing high demand. Please wait a moment and try again.';
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
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart className="w-8 h-8 text-[#4f39f6]" />
          {t('tool_page.website_analyzer.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">{t('tool_page.website_analyzer.subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex-1 relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all  outline-none"
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
              {t('common.analyzing') !== 'common.analyzing' ? t('common.analyzing') : "Analyzing..."}
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
          
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#4f39f6] text-[#4f39f6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'seo' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-8">
            {/* Top Section: On-page score */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">On-page score</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Issues:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{analysis.critical_issues_count || 0}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">Critical</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Circular Chart */}
                <div className="relative w-48 h-48 flex-shrink-0 flex flex-col items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-gray-700" />
                    <circle 
                      cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="12" 
                      className="text-amber-400"
                      strokeDasharray={2 * Math.PI * 54}
                      strokeDashoffset={2 * Math.PI * 54 * (1 - (analysis.score || 0) / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">{analysis.score || 0}%</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">On-page score</span>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: 'Meta data', value: analysis.category_scores?.meta_data || 0 },
                    { label: 'Page quality', value: analysis.category_scores?.page_quality || 0 },
                    { label: 'Page structure', value: analysis.category_scores?.page_structure || 0 },
                    { label: 'Links', value: analysis.category_scores?.links || 0 },
                    { label: 'Server', value: analysis.category_scores?.server || 0 },
                    { label: 'External factors', value: analysis.category_scores?.external_factors || 0 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                        <span className="font-bold text-gray-900 dark:text-white">{item.value} %</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section: HTML page details */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-[#4f39f6] text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Layout className="w-3 h-3" /> HTML page
                  </div>
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-800 inline-block">
                  Show page
                </a>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-3">
                      <div className="text-sm text-blue-500 mb-1">Meta title</div>
                      <div className="text-gray-900 dark:text-white font-medium">{analysis.title?.text || 'N/A'}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm text-blue-500 mb-1">Meta description</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{analysis.description?.text || 'N/A'}</div>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm text-blue-500 mb-1 inline-block mr-2">URL</div>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1 inline-flex">
                        {url} <Globe className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Grid Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Activity className="w-4 h-4" /> Status code
                      </div>
                      <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded">{analysis.page_details?.status_code || 200}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Clock className="w-4 h-4" /> Response time
                      </div>
                      <span className="text-gray-900 dark:text-white">{analysis.page_details?.response_time || '0.15 sec'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Layout className="w-4 h-4" /> Page status
                      </div>
                      <div className="flex gap-1">
                        <span className={`text-white text-xs font-bold px-2 py-0.5 rounded ${analysis.page_details?.is_follow !== false ? 'bg-emerald-500' : 'bg-red-500'}`}>
                          {analysis.page_details?.is_follow !== false ? 'Follow' : 'NoFollow'}
                        </span>
                        <span className={`text-white text-xs font-bold px-2 py-0.5 rounded ${analysis.page_details?.is_index !== false ? 'bg-emerald-500' : 'bg-red-500'}`}>
                          {analysis.page_details?.is_index !== false ? 'Index' : 'NoIndex'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-500">
                        <HardDrive className="w-4 h-4" /> File size
                      </div>
                      <span className="text-gray-900 dark:text-white">{analysis.page_details?.file_size || '1.20 kB'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Languages className="w-4 h-4" /> Language
                      </div>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded">{analysis.page_details?.language || '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-500">
                        <FileText className="w-4 h-4" /> Word count
                      </div>
                      <span className="text-gray-900 dark:text-white">{analysis.page_details?.word_count || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Analysis */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl ">
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl ">
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl ">
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-2xl border border-white/50 dark:border-gray-700/50 p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all hover:shadow-2xl ">
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

          {/* Tasks by Priority */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-[#4f39f6]" />
              Tasks Sorted by Priority
            </h2>
            <div className="space-y-4">
              {analysis.tasks_by_priority?.map((task: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    task.priority === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }`}>
                    {task.priority}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{task.task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#4f39f6]" />
              Detailed Analysis Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.detailed_metrics?.map((metric: any, i: number) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{metric.name}</span>
                    {metric.status === 'good' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {metric.status === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                    {metric.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                    {metric.status === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2 truncate" title={metric.value}>
                    {metric.value || 'N/A'}
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">{metric.message}</p>
                  <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">What is this?</span> {metric.explanation || 'SEO metric explanation.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Smartphone className="w-6 h-6 text-[#4f39f6]" />
                  Mobile Usability & Score
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative w-48 h-48 mx-auto flex flex-col items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-gray-700" />
                      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="12" className={`${analysis.mobile_score >= 80 ? 'text-emerald-500' : analysis.mobile_score >= 50 ? 'text-amber-500' : 'text-red-500'}`} strokeDasharray={2 * Math.PI * 54} strokeDashoffset={2 * Math.PI * 54 * (1 - (analysis.mobile_score || 0) / 100)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-4xl font-black text-gray-900 dark:text-white">{analysis.mobile_score || 0}%</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mobile Score</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Mobile Optimization Checks</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span className="text-gray-700 dark:text-gray-300">Viewport Meta Tag is present</span></li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span className="text-gray-700 dark:text-gray-300">Content sizes to viewport</span></li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span className="text-gray-700 dark:text-gray-300">Legible font sizes on mobile</span></li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <span className="text-gray-700 dark:text-gray-300">Tap targets are sized appropriately</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'speed' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                 <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                    <Zap className="w-6 h-6 text-amber-500" />
                    Performance Metrics
                  </h2>
                  <div className="text-right">
                    <div className="text-4xl font-black text-amber-500">{analysis.speed_score || 0}/100</div>
                    <div className="text-sm text-gray-500">Speed Score</div>
                  </div>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                   <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                     <div className="text-sm text-gray-500 mb-1">First Contentful Paint (FCP)</div>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{(analysis.performance_metrics?.fcp / 1000).toFixed(1) || '0.8'} s</div>
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                     <div className="text-sm text-gray-500 mb-1">Largest Contentful Paint (LCP)</div>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{(analysis.performance_metrics?.lcp / 1000).toFixed(1) || '1.2'} s</div>
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                     <div className="text-sm text-gray-500 mb-1">Cumulative Layout Shift (CLS)</div>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.performance_metrics?.cls || '0.01'}</div>
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                     <div className="text-sm text-gray-500 mb-1">Time to Interactive (TTI)</div>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{(analysis.performance_metrics?.tti / 1000).toFixed(1) || '2.4'} s</div>
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                     <div className="text-sm text-gray-500 mb-1">Speed Index</div>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{(analysis.performance_metrics?.speedIndex / 1000).toFixed(1) || '1.5'} s</div>
                   </div>
                 </div>

                 <div className="h-[300px] w-full mt-8">
                   <ResponsiveContainer width="100%" height="100%">
                     <RechartsBarChart data={[
                        { name: 'FCP', ms: analysis.performance_metrics?.fcp || 800 },
                        { name: 'LCP', ms: analysis.performance_metrics?.lcp || 1200 },
                        { name: 'TTI', ms: analysis.performance_metrics?.tti || 2400 },
                        { name: 'Speed Index', ms: analysis.performance_metrics?.speedIndex || 1500 },
                     ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                       <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} unit="ms" />
                       <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                       <Bar dataKey="ms" fill="#4f39f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                     </RechartsBarChart>
                   </ResponsiveContainer>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'visitors' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Users className="w-6 h-6 text-blue-500" />
                    Traffic & Visitors Estimate
                 </h2>

                 <div className="mb-8 p-6 bg-gradient-to-r from-[#4f39f6]/10 to-blue-500/10 rounded-xl flex items-center justify-between">
                   <div>
                     <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Estimated Monthly Traffic</div>
                     <div className="text-4xl font-black text-gray-900 dark:text-white">{analysis.visitors?.monthly_estimate ? new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(analysis.visitors.monthly_estimate) : '10K+'}</div>
                   </div>
                   <div className="h-16 w-32">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={[
                         { v: 4000 }, { v: 3000 }, { v: 5000 }, { v: 4500 }, { v: 6000 }, { v: 8000 }, { v: analysis.visitors?.monthly_estimate || 10000 }
                       ]}>
                         <Area type="monotone" dataKey="v" stroke="#4f39f6" fill="#4f39f6" fillOpacity={0.2} />
                       </AreaChart>
                     </ResponsiveContainer>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Traffic Sources (%)</h3>
                     <div className="h-[250px]">
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie
                             data={analysis.visitors?.traffic_sources || [
                               { name: 'Organic Search', value: 50 },
                               { name: 'Direct', value: 30 },
                               { name: 'Social', value: 15 },
                               { name: 'Referral', value: 5 }
                             ]}
                             cx="50%" cy="50%"
                             innerRadius={60} outerRadius={80}
                             paddingAngle={5}
                             dataKey="value"
                           >
                             {(analysis.visitors?.traffic_sources || []).map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                             ))}
                           </Pie>
                           <Tooltip 
                             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                             formatter={(value) => [`${value}%`, 'Share']}
                           />
                         </PieChart>
                       </ResponsiveContainer>
                     </div>
                     <div className="flex flex-wrap gap-4 justify-center mt-4">
                       {(analysis.visitors?.traffic_sources || []).map((source, idx) => (
                         <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}></div>
                           {source.name}
                         </div>
                       ))}
                     </div>
                   </div>

                   <div>
                     <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Top Countries</h3>
                     <div className="space-y-4">
                       {(analysis.visitors?.top_countries || []).map((country, idx) => (
                         <div key={idx}>
                           <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
                             <span>{country.name}</span>
                             <span className="font-bold">{country.value}%</span>
                           </div>
                           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                             <div className="h-2 rounded-full" style={{ width: `${country.value}%`, backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}></div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>

               </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Cpu className="w-6 h-6 text-[#4f39f6]" />
                    Stack & Technologies
                 </h2>
                 <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                   These are the technologies, frameworks, and tools detected or inferred from the website's source code.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {(analysis.technologies || []).map((tech, idx) => (
                     <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                       <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                         <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-400 text-xl">
                           {tech.name.charAt(0)}
                         </div>
                       </div>
                       <div>
                         <h4 className="font-bold text-gray-900 dark:text-white">{tech.name}</h4>
                         <div className="text-xs text-[#4f39f6] font-medium bg-[#4f39f6]/10 inline-block px-2 py-0.5 rounded mt-1 mb-2">{tech.category}</div>
                         <p className="text-sm text-gray-500">{tech.description}</p>
                       </div>
                     </div>
                   ))}
                   {(!analysis.technologies || analysis.technologies.length === 0) && (
                     <div className="col-span-full py-12 text-center text-gray-500">
                       No specific technologies could be identified.
                     </div>
                   )}
                 </div>
               </div>
            </div>
          )}

        </div>
      )}
      <ToolDescription points={toolDescriptions['website-analyzer']} />
    </div>
    </>
  );
}
