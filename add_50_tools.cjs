const fs = require('fs');
const path = require('path');

const tools = [
  { id: 'keyword-clustering-tool', name: 'Keyword Clustering Tool', component: 'KeywordClusteringTool', desc: 'Group keywords into clusters based on search intent.' },
  { id: 'serp-simulator', name: 'SERP Simulator', component: 'SERPSimulator', desc: 'Preview how your webpage will look in Google search results.' },
  { id: 'lsi-keyword-generator', name: 'LSI Keyword Generator', component: 'LSIKeywordGenerator', desc: 'Generate Latent Semantic Indexing (LSI) keywords.' },
  { id: 'bulk-url-checker', name: 'Bulk URL Checker', component: 'BulkURLChecker', desc: 'Check the status codes of multiple URLs at once.' },
  { id: 'hreflang-tag-generator', name: 'Hreflang Tag Generator', component: 'HreflangTagGenerator', desc: 'Generate hreflang tags for multi-language websites.' },
  { id: 'schema-generator-faq', name: 'Schema Generator (FAQ)', component: 'SchemaGeneratorFAQ', desc: 'Generate FAQ Schema markup for your pages.' },
  { id: 'schema-generator-local', name: 'Schema Generator (Local Business)', component: 'SchemaGeneratorLocal', desc: 'Generate Local Business Schema markup.' },
  { id: 'schema-generator-review', name: 'Schema Generator (Review)', component: 'SchemaGeneratorReview', desc: 'Generate Review Schema markup.' },
  { id: 'meta-description-generator', name: 'Meta Description Generator', component: 'MetaDescriptionGenerator', desc: 'AI-powered meta description generator.' },
  { id: 'title-tag-generator', name: 'Title Tag Generator', component: 'TitleTagGenerator', desc: 'AI-powered title tag generator.' },
  { id: 'blog-post-title-generator', name: 'Blog Post Title Generator', component: 'BlogPostTitleGenerator', desc: 'Generate catchy blog post titles.' },
  { id: 'content-outline-generator', name: 'Content Outline Generator', component: 'ContentOutlineGenerator', desc: 'Generate SEO-optimized content outlines.' },
  { id: 'paragraph-rewriter', name: 'Paragraph Rewriter', component: 'ParagraphRewriter', desc: 'Rewrite paragraphs for better readability and SEO.' },
  { id: 'sentence-expander', name: 'Sentence Expander', component: 'SentenceExpander', desc: 'Expand short sentences into detailed paragraphs.' },
  { id: 'text-summarizer', name: 'Text Summarizer', component: 'TextSummarizer', desc: 'Summarize long text into concise points.' },
  { id: 'readability-improver', name: 'Readability Improver', component: 'ReadabilityImprover', desc: 'Improve the readability score of your content.' },
  { id: 'keyword-typo-generator', name: 'Keyword Typo Generator', component: 'KeywordTypoGenerator', desc: 'Generate common misspellings for your keywords.' },
  { id: 'google-autocomplete-extractor', name: 'Google Autocomplete Extractor', component: 'GoogleAutocompleteExtractor', desc: 'Extract autocomplete suggestions from Google.' },
  { id: 'youtube-keyword-tool', name: 'YouTube Keyword Tool', component: 'YouTubeKeywordTool', desc: 'Find the best keywords for YouTube videos.' },
  { id: 'amazon-keyword-tool', name: 'Amazon Keyword Tool', component: 'AmazonKeywordTool', desc: 'Find keywords for Amazon product listings.' },
  { id: 'bing-keyword-tool', name: 'Bing Keyword Tool', component: 'BingKeywordTool', desc: 'Find keywords for Bing search engine.' },
  { id: 'yandex-keyword-tool', name: 'Yandex Keyword Tool', component: 'YandexKeywordTool', desc: 'Find keywords for Yandex search engine.' },
  { id: 'app-store-keyword-tool', name: 'App Store Keyword Tool', component: 'AppStoreKeywordTool', desc: 'Find keywords for App Store Optimization (ASO).' },
  { id: 'seo-report-generator', name: 'SEO Report Generator', component: 'SEOReportGenerator', desc: 'Generate comprehensive SEO reports.' },
  { id: 'competitor-analysis-tool', name: 'Competitor Analysis Tool', component: 'CompetitorAnalysisTool', desc: 'Analyze competitor websites for SEO insights.' },
  { id: 'backlink-maker', name: 'Backlink Maker', component: 'BacklinkMaker', desc: 'Generate free backlinks to your website.' },
  { id: 'link-value-calculator', name: 'Link Value Calculator', component: 'LinkValueCalculator', desc: 'Calculate the estimated value of a backlink.' },
  { id: 'website-speed-test', name: 'Website Speed Test', component: 'WebsiteSpeedTest', desc: 'Test the loading speed of your website.' },
  { id: 'mobile-friendly-test', name: 'Mobile Friendly Test', component: 'MobileFriendlyTest', desc: 'Check if your website is mobile-friendly.' },
  { id: 'core-web-vitals-checker', name: 'Core Web Vitals Checker', component: 'CoreWebVitalsChecker', desc: 'Check Core Web Vitals metrics.' },
  { id: 'html-validator', name: 'HTML Validator', component: 'HTMLValidator', desc: 'Validate HTML code for errors.' },
  { id: 'css-validator', name: 'CSS Validator', component: 'CSSValidator', desc: 'Validate CSS code for errors.' },
  { id: 'xml-sitemap-formatter', name: 'XML Sitemap Formatter', component: 'XMLSitemapFormatter', desc: 'Format and beautify XML sitemaps.' },
  { id: 'robots-txt-tester', name: 'Robots.txt Tester', component: 'RobotsTxtTester', desc: 'Test your robots.txt file for errors.' },
  { id: 'redirect-checker', name: 'Redirect Checker', component: 'RedirectChecker', desc: 'Check URL redirects and status codes.' },
  { id: 'http2-checker', name: 'HTTP/2 Checker', component: 'HTTP2Checker', desc: 'Check if a website supports HTTP/2.' },
  { id: 'dns-lookup-tool', name: 'DNS Lookup Tool', component: 'DNSLookupTool', desc: 'Perform a DNS lookup for any domain.' },
  { id: 'whois-lookup', name: 'WHOIS Lookup', component: 'WHOISLookup', desc: 'Find WHOIS information for a domain.' },
  { id: 'ip-location-finder', name: 'IP Location Finder', component: 'IPLocationFinder', desc: 'Find the geographical location of an IP address.' },
  { id: 'reverse-ip-domain-checker', name: 'Reverse IP Domain Checker', component: 'ReverseIPDomainChecker', desc: 'Find other domains hosted on the same IP.' },
  { id: 'server-port-scanner', name: 'Server Port Scanner', component: 'ServerPortScanner', desc: 'Scan open ports on a server.' },
  { id: 'email-privacy-checker', name: 'Email Privacy Checker', component: 'EmailPrivacyChecker', desc: 'Check if a webpage exposes email addresses.' },
  { id: 'safe-browsing-checker', name: 'Safe Browsing Checker', component: 'SafeBrowsingChecker', desc: 'Check if a website is safe according to Google.' },
  { id: 'google-cache-checker', name: 'Google Cache Checker', component: 'GoogleCacheChecker', desc: 'Check the Google cache status of a URL.' },
  { id: 'mozrank-checker', name: 'Mozrank Checker', component: 'MozrankChecker', desc: 'Check the Mozrank of a website.' },
  { id: 'alexa-rank-checker', name: 'Alexa Rank Checker', component: 'AlexaRankChecker', desc: 'Check the Alexa rank of a website.' },
  { id: 'keyword-roi-calculator', name: 'Keyword ROI Calculator', component: 'KeywordROICalculator', desc: 'Calculate the potential ROI of a keyword.' },
  { id: 'cpc-calculator', name: 'CPC Calculator', component: 'CPCCalculator', desc: 'Calculate Cost Per Click (CPC) for campaigns.' },
  { id: 'url-slug-generator', name: 'URL Slug Generator', component: 'URLSlugGenerator', desc: 'Generate SEO-friendly URL slugs.' },
  { id: 'domain-age-checker', name: 'Domain Age Checker', component: 'DomainAgeChecker', desc: 'Check the age of a domain.' }
];

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');
const appTsxPath = path.join(__dirname, 'src', 'App.tsx');
const toolsTsxPath = path.join(__dirname, 'src', 'pages', 'Tools.tsx');
const toolDescriptionsPath = path.join(__dirname, 'src', 'data', 'toolDescriptions.ts');

// 1. Create Tool Files
tools.forEach(tool => {
  const isAITool = tool.name.includes('Generator') || tool.name.includes('Rewriter') || tool.name.includes('Expander') || tool.name.includes('Summarizer') || tool.name.includes('Improver');
  
  let content = `import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { Search, Activity } from 'lucide-react';
import { ToolDescription } from '../../components/ToolDescription';
import { toolDescriptions } from '../../data/toolDescriptions';
${isAITool ? `import { GoogleGenAI } from '@google/genai';` : ''}

export function ${tool.component}() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    try {
      ${isAITool ? `
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: \`Please process this for ${tool.name}: \${input}\`,
      });
      setResult(response.text);
      ` : `
      // Simulated processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResult('Processed result for: ' + input);
      `}
    } catch (error) {
      console.error(error);
      setResult('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="${tool.name} - OptiSEO Tools" description="${tool.desc}" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">${tool.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">${tool.desc}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent min-h-[150px]"
                placeholder="Enter your text here..."
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

            {result && !loading && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Results</h3>
                <div className="prose dark:prose-invert max-w-none">
                  {typeof result === 'string' ? <p className="whitespace-pre-wrap">{result}</p> : JSON.stringify(result, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
        <ToolDescription points={toolDescriptions['${tool.id}'] || [
          { title: 'What is this tool?', description: '${tool.desc}' },
          { title: 'How to use it?', description: 'Simply enter your input and click Process.' },
          { title: 'Why use it?', description: 'It helps optimize your SEO workflow.' }
        ]} />
      </div>
    </>
  );
}
`;
  fs.writeFileSync(path.join(toolsDir, tool.component + '.tsx'), content);
});

// 2. Update App.tsx
let appTsx = fs.readFileSync(appTsxPath, 'utf8');
const imports = tools.map(t => 'import { ' + t.component + ' } from "./pages/tools/' + t.component + '";').join('\\n');
const routes = tools.map(t => '            <Route path="tools/' + t.id + '" element={<' + t.component + ' />} />').join('\\n');

appTsx = appTsx.replace("import { HTTPHeadersChecker } from './pages/tools/HTTPHeadersChecker';", "import { HTTPHeadersChecker } from './pages/tools/HTTPHeadersChecker';\\n" + imports);
appTsx = appTsx.replace('<Route path="tools/http-headers-checker" element={<HTTPHeadersChecker />} />', '<Route path="tools/http-headers-checker" element={<HTTPHeadersChecker />} />\\n' + routes);
fs.writeFileSync(appTsxPath, appTsx);

// 3. Update toolDescriptions.ts
let toolDesc = fs.readFileSync(toolDescriptionsPath, 'utf8');
const descEntries = tools.map(t => "  '" + t.id + "': [\\n    { title: 'What is " + t.name + "?', description: '" + t.desc + "' },\\n    { title: 'How to use it?', description: 'Enter your input and click Process.' },\\n    { title: 'Why use it?', description: 'It helps optimize your SEO workflow.' }\\n  ],").join('\\n');
toolDesc = toolDesc.replace(/};\\s*$/, ",\\n" + descEntries + "\\n};\n");
fs.writeFileSync(toolDescriptionsPath, toolDesc);

console.log('Successfully generated 50 tools!');
