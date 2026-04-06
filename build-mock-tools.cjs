const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

const generateMockTool = (name, title, desc, inputLabel, placeholder, btnText, mockLogic) => `import React, { useState } from 'react';
import { Search, Activity } from 'lucide-react';

export function ${name}() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    setTimeout(() => {
      setResult(${mockLogic});
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">${title}</h1>
          <p className="text-gray-600 dark:text-gray-400">${desc}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${inputLabel}</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent"
              placeholder="${placeholder}"
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
              ${btnText}
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
    </div>
  );
}
`;

const mockTools = [
  {
    name: 'KeywordSuggestionTool', title: 'Keyword Suggestion Tool', desc: 'Get keyword suggestions for your seed keyword.',
    inputLabel: 'Seed Keyword', placeholder: 'e.g., digital marketing', btnText: 'Get Suggestions',
    mockLogic: "{ seedKeyword: input, suggestions: [input + ' tips', 'best ' + input, input + ' tutorial', input + ' for beginners'].join(', ') }"
  },
  {
    name: 'LongTailKeywordGenerator', title: 'Long Tail Keyword Generator', desc: 'Generate long tail keywords easily.',
    inputLabel: 'Seed Keyword', placeholder: 'e.g., running shoes', btnText: 'Generate Keywords',
    mockLogic: "{ seedKeyword: input, longTailKeywords: ['how to choose ' + input, 'what are the best ' + input, input + ' vs alternative'].join(', ') }"
  },
  {
    name: 'PageAuthorityChecker', title: 'Page Authority Checker', desc: 'Check the page authority of any URL.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Check Authority',
    mockLogic: "{ domain: input, pageAuthority: Math.floor(Math.random() * 40) + 20, domainAuthority: Math.floor(Math.random() * 50) + 30, spamScore: '1%' }"
  },
  {
    name: 'GoogleIndexChecker', title: 'Google Index Checker', desc: 'Check if your URL is indexed by Google.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Check Index Status',
    mockLogic: "{ url: input, status: Math.random() > 0.2 ? 'Indexed' : 'Not Indexed', lastCrawled: new Date().toLocaleDateString() }"
  },
  {
    name: 'XMLSitemapValidator', title: 'XML Sitemap Validator', desc: 'Validate your XML sitemap format.',
    inputLabel: 'Sitemap URL', placeholder: 'https://example.com/sitemap.xml', btnText: 'Validate Sitemap',
    mockLogic: "{ url: input, status: 'Valid XML', urlsFound: Math.floor(Math.random() * 500) + 10, errors: 0 }"
  },
  {
    name: 'KeywordPositionChecker', title: 'Keyword Position Checker', desc: 'Check your keyword ranking position.',
    inputLabel: 'Domain or URL', placeholder: 'https://example.com', btnText: 'Check Position',
    mockLogic: "{ domain: input, keyword: 'example keyword', position: Math.floor(Math.random() * 100) + 1, searchVolume: '10k - 100k' }"
  },
  {
    name: 'SSLChecker', title: 'SSL Checker', desc: 'Check your website SSL certificate.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Check SSL',
    mockLogic: "{ domain: input, issuer: 'Let\\'s Encrypt Authority X3', validFrom: '2023-01-01', validTo: '2024-01-01', status: 'Valid' }"
  },
  {
    name: 'ServerStatusChecker', title: 'Server Status Checker', desc: 'Check the status of your server.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Check Status',
    mockLogic: "{ url: input, status: 'Online', responseCode: '200 OK', responseTime: Math.floor(Math.random() * 500) + 50 + 'ms' }"
  },
  {
    name: 'WebsiteScreenshot', title: 'Website Screenshot Generator', desc: 'Generate a screenshot of any website.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Capture Screenshot',
    mockLogic: "{ url: input, status: 'Screenshot captured successfully (Mock)', resolution: '1920x1080' }"
  },
  {
    name: 'GrammarChecker', title: 'Grammar Checker', desc: 'Check your text for grammar errors.',
    inputLabel: 'Text to check', placeholder: 'Type your text here...', btnText: 'Check Grammar',
    mockLogic: "{ status: 'Checked', errorsFound: Math.floor(Math.random() * 3), suggestions: 'Consider revising sentence structure.' }"
  },
  {
    name: 'OpenGraphChecker', title: 'Open Graph Checker', desc: 'Check Open Graph tags of any URL.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Check Tags',
    mockLogic: "{ url: input, ogTitle: 'Sample Title', ogDescription: 'Sample Description', ogImage: 'https://example.com/image.jpg' }"
  },
  {
    name: 'HTTPHeadersChecker', title: 'HTTP Headers Checker', desc: 'Check HTTP headers returned by a server.',
    inputLabel: 'Website URL', placeholder: 'https://example.com', btnText: 'Check Headers',
    mockLogic: "{ url: input, server: 'nginx', contentType: 'text/html; charset=UTF-8', connection: 'keep-alive' }"
  }
];

mockTools.forEach(tool => {
  const content = generateMockTool(tool.name, tool.title, tool.desc, tool.inputLabel, tool.placeholder, tool.btnText, tool.mockLogic);
  fs.writeFileSync(path.join(toolsDir, tool.name + '.tsx'), content);
});

console.log('Mock tools generated.');
