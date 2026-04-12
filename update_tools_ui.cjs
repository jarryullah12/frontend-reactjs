const fs = require('fs');
const path = require('path');

const toolsConfig = {
  'KeywordClusteringTool': {
    label: 'Keywords (one per line)',
    placeholder: 'Enter keywords to cluster...',
    prompt: 'Cluster the following keywords based on search intent and semantic similarity. Provide the output as a formatted list or table. Keywords:\\n${input}'
  },
  'SERPSimulator': {
    label: 'Title, URL, and Meta Description',
    placeholder: 'Enter Title, URL, and Meta Description...',
    prompt: 'Simulate a Google SERP snippet for the following details. Show how it would look and provide tips for improvement. Details:\\n${input}'
  },
  'LSIKeywordGenerator': {
    label: 'Main Keyword',
    placeholder: 'Enter your main keyword...',
    prompt: 'Generate a list of LSI (Latent Semantic Indexing) keywords for the following main keyword. Provide them in a comma-separated list and explain briefly how to use them. Keyword: ${input}'
  },
  'BulkURLChecker': {
    label: 'URLs (one per line)',
    placeholder: 'Enter URLs to check...',
    prompt: 'Perform a simulated bulk SEO check for the following URLs. Provide a mock status code and basic SEO health check for each. URLs:\\n${input}'
  },
  'HreflangTagGenerator': {
    label: 'URLs and Language/Region Codes',
    placeholder: 'e.g., https://example.com/en (en-US)',
    prompt: 'Generate HTML hreflang tags for the following URLs and language/region codes. Input:\\n${input}'
  },
  'SchemaGeneratorFAQ': {
    label: 'Questions and Answers',
    placeholder: 'Q: ...\\nA: ...',
    prompt: 'Generate FAQPage Schema.org JSON-LD markup for the following questions and answers. Input:\\n${input}'
  },
  'SchemaGeneratorLocal': {
    label: 'Business Details',
    placeholder: 'Name, Address, Phone, Website...',
    prompt: 'Generate LocalBusiness Schema.org JSON-LD markup for the following business details. Input:\\n${input}'
  },
  'SchemaGeneratorReview': {
    label: 'Review Details',
    placeholder: 'Item Name, Reviewer, Rating (1-5), Review Body...',
    prompt: 'Generate Review Schema.org JSON-LD markup for the following review details. Input:\\n${input}'
  },
  'MetaDescriptionGenerator': {
    label: 'Page Content or Topic',
    placeholder: 'Enter the page content or topic...',
    prompt: 'Generate 3 SEO-optimized meta descriptions (under 160 characters) for the following topic/content. Include a call to action. Content:\\n${input}'
  },
  'TitleTagGenerator': {
    label: 'Page Content or Topic',
    placeholder: 'Enter the page content or topic...',
    prompt: 'Generate 5 catchy and SEO-optimized title tags (under 60 characters) for the following topic/content. Content:\\n${input}'
  },
  'BlogPostTitleGenerator': {
    label: 'Blog Topic',
    placeholder: 'Enter your blog topic...',
    prompt: 'Generate 10 catchy, click-worthy blog post titles for the following topic. Topic:\\n${input}'
  },
  'ContentOutlineGenerator': {
    label: 'Topic or Keyword',
    placeholder: 'Enter your topic...',
    prompt: 'Generate a comprehensive SEO-optimized content outline (H1, H2, H3) for the following topic. Topic:\\n${input}'
  },
  'ParagraphRewriter': {
    label: 'Paragraph to Rewrite',
    placeholder: 'Enter a paragraph...',
    prompt: 'Rewrite the following paragraph to be more engaging, clear, and SEO-friendly. Provide 3 different versions. Paragraph:\\n${input}'
  },
  'SentenceExpander': {
    label: 'Sentence to Expand',
    placeholder: 'Enter a short sentence...',
    prompt: 'Expand the following sentence into a detailed, engaging paragraph. Sentence:\\n${input}'
  },
  'TextSummarizer': {
    label: 'Text to Summarize',
    placeholder: 'Enter long text here...',
    prompt: 'Summarize the following text into a concise paragraph and a few bullet points. Text:\\n${input}'
  },
  'ReadabilityImprover': {
    label: 'Text to Improve',
    placeholder: 'Enter text to improve readability...',
    prompt: 'Improve the readability of the following text. Make it easier to read (aim for an 8th-grade reading level) while keeping the original meaning. Text:\\n${input}'
  },
  'KeywordTypoGenerator': {
    label: 'Main Keyword',
    placeholder: 'Enter your keyword...',
    prompt: 'Generate common typos, misspellings, and keyboard slip variations for the following keyword. Keyword:\\n${input}'
  },
  'GoogleAutocompleteExtractor': {
    label: 'Seed Keyword',
    placeholder: 'Enter a seed keyword...',
    prompt: 'Simulate extracting Google Autocomplete suggestions for the following seed keyword. Provide a list of long-tail variations. Keyword:\\n${input}'
  },
  'YouTubeKeywordTool': {
    label: 'Video Topic',
    placeholder: 'Enter your video topic...',
    prompt: 'Generate a list of high-volume YouTube keywords and video ideas for the following topic. Topic:\\n${input}'
  },
  'AmazonKeywordTool': {
    label: 'Product Category or Name',
    placeholder: 'Enter product name...',
    prompt: 'Generate a list of Amazon search keywords and buyer-intent phrases for the following product. Product:\\n${input}'
  },
  'BingKeywordTool': {
    label: 'Seed Keyword',
    placeholder: 'Enter a seed keyword...',
    prompt: 'Generate a list of keywords optimized for Bing search engine for the following seed keyword. Keyword:\\n${input}'
  },
  'YandexKeywordTool': {
    label: 'Seed Keyword',
    placeholder: 'Enter a seed keyword...',
    prompt: 'Generate a list of keywords optimized for Yandex search engine for the following seed keyword. Keyword:\\n${input}'
  },
  'AppStoreKeywordTool': {
    label: 'App Name or Category',
    placeholder: 'Enter app name or category...',
    prompt: 'Generate ASO (App Store Optimization) keywords for the following app category or name. App:\\n${input}'
  },
  'SEOReportGenerator': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Generate a simulated comprehensive SEO audit report for the following URL. Include mock metrics for On-page, Off-page, and Technical SEO. URL:\\n${input}'
  },
  'CompetitorAnalysisTool': {
    label: 'Competitor URLs',
    placeholder: 'Enter competitor URLs...',
    prompt: 'Generate a simulated competitor SEO analysis for the following URLs. Compare their likely top keywords and backlink strategies. URLs:\\n${input}'
  },
  'BacklinkMaker': {
    label: 'Website URL',
    placeholder: 'Enter your website URL...',
    prompt: 'Generate a list of potential backlink opportunities (directories, guest post ideas, resource pages) for the following URL/niche. URL:\\n${input}'
  },
  'LinkValueCalculator': {
    label: 'Backlink Details',
    placeholder: 'URL, DA, Traffic...',
    prompt: 'Estimate the SEO value of a backlink with the following details. Provide a simulated score from 1-100 and explain why. Details:\\n${input}'
  },
  'WebsiteSpeedTest': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a website speed test for the following URL. Provide mock metrics for Load Time, TTFB, and suggestions for improvement. URL:\\n${input}'
  },
  'MobileFriendlyTest': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a mobile-friendly test for the following URL. Provide a mock score and list common mobile usability issues to fix. URL:\\n${input}'
  },
  'CoreWebVitalsChecker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a Core Web Vitals check for the following URL. Provide mock scores for LCP, FID, and CLS, along with optimization tips. URL:\\n${input}'
  },
  'HTMLValidator': {
    label: 'HTML Code or URL',
    placeholder: 'Enter HTML code or URL...',
    prompt: 'Simulate an HTML validation check for the following input. Point out common HTML errors and how to fix them. Input:\\n${input}'
  },
  'CSSValidator': {
    label: 'CSS Code or URL',
    placeholder: 'Enter CSS code or URL...',
    prompt: 'Simulate a CSS validation check for the following input. Point out common CSS errors and optimization tips. Input:\\n${input}'
  },
  'XMLSitemapFormatter': {
    label: 'Raw URLs or Messy Sitemap',
    placeholder: 'Enter URLs...',
    prompt: 'Format the following URLs into a valid XML Sitemap structure. URLs:\\n${input}'
  },
  'RobotsTxtTester': {
    label: 'Robots.txt Content and URL to Test',
    placeholder: 'Enter robots.txt and URL...',
    prompt: 'Simulate testing the following URL against the provided robots.txt rules. Determine if it is allowed or disallowed. Input:\\n${input}'
  },
  'RedirectChecker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a redirect chain check for the following URL. Show a mock 301/302 redirect path. URL:\\n${input}'
  },
  'HTTP2Checker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate an HTTP/2 support check for the following URL. Explain the benefits of HTTP/2 if it were enabled. URL:\\n${input}'
  },
  'DNSLookupTool': {
    label: 'Domain Name',
    placeholder: 'Enter domain name...',
    prompt: 'Simulate a DNS lookup for the following domain. Provide mock A, AAAA, MX, and TXT records. Domain:\\n${input}'
  },
  'WHOISLookup': {
    label: 'Domain Name',
    placeholder: 'Enter domain name...',
    prompt: 'Simulate a WHOIS lookup for the following domain. Provide mock registration, registrar, and expiry details. Domain:\\n${input}'
  },
  'IPLocationFinder': {
    label: 'IP Address',
    placeholder: 'Enter IP address...',
    prompt: 'Simulate an IP location lookup for the following IP address. Provide a mock City, Country, and ISP. IP:\\n${input}'
  },
  'ReverseIPDomainChecker': {
    label: 'IP Address or Domain',
    placeholder: 'Enter IP or domain...',
    prompt: 'Simulate a Reverse IP Domain check for the following input. List mock domains hosted on the same server. Input:\\n${input}'
  },
  'ServerPortScanner': {
    label: 'Domain or IP',
    placeholder: 'Enter domain or IP...',
    prompt: 'Simulate a server port scan for the following host. List common open ports (e.g., 80, 443, 22) and their status. Host:\\n${input}'
  },
  'EmailPrivacyChecker': {
    label: 'Website URL or Text',
    placeholder: 'Enter URL or text...',
    prompt: 'Simulate an email privacy check. Scan the following input for exposed email addresses and suggest obfuscation methods. Input:\\n${input}'
  },
  'SafeBrowsingChecker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a Google Safe Browsing check for the following URL. Provide a mock status (Safe/Unsafe) and explain what it means. URL:\\n${input}'
  },
  'GoogleCacheChecker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a Google Cache check for the following URL. Provide a mock cached date and time. URL:\\n${input}'
  },
  'MozrankChecker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate a MozRank check for the following URL. Provide a mock MozRank score (0-10) and explain how to improve it. URL:\\n${input}'
  },
  'AlexaRankChecker': {
    label: 'Website URL',
    placeholder: 'Enter website URL...',
    prompt: 'Simulate an Alexa Rank check for the following URL. Provide a mock global and country rank. URL:\\n${input}'
  },
  'KeywordROICalculator': {
    label: 'Search Volume, CTR, Conv. Rate, Value',
    placeholder: 'e.g., 10000, 5%, 2%, $50',
    prompt: 'Calculate the estimated ROI for a keyword with the following metrics: Search Volume, CTR, Conversion Rate, and Average Value per Conversion. Input:\\n${input}'
  },
  'CPCCalculator': {
    label: 'Keyword or Niche',
    placeholder: 'Enter keyword...',
    prompt: 'Simulate a CPC (Cost Per Click) check for the following keyword. Provide a mock average CPC and competition level. Keyword:\\n${input}'
  },
  'URLSlugGenerator': {
    label: 'Post Title',
    placeholder: 'Enter post title...',
    prompt: 'Generate 5 SEO-friendly URL slugs for the following post title. Title:\\n${input}'
  },
  'DomainAgeChecker': {
    label: 'Domain Name',
    placeholder: 'Enter domain name...',
    prompt: 'Simulate a domain age check for the following domain. Provide a mock creation date and age in years/months. Domain:\\n${input}'
  }
};

const toolsDir = path.join(__dirname, 'src', 'pages', 'tools');

Object.keys(toolsConfig).forEach(toolName => {
  const filePath = path.join(toolsDir, `${toolName}.tsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const config = toolsConfig[toolName];

    // Ensure GoogleGenAI is imported
    if (!content.includes("import { GoogleGenAI }")) {
      content = content.replace(
        "import { ToolDescription } from '../../components/ToolDescription';",
        "import { ToolDescription } from '../../components/ToolDescription';\nimport { GoogleGenAI } from '@google/genai';"
      );
    }

    // Replace handleAnalyze body
    const handleAnalyzeRegex = /const handleAnalyze = async \(\) => \{[\s\S]*?finally \{\s*setLoading\(false\);\s*\}\s*\};/;
    const newHandleAnalyze = `const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: \`${config.prompt}\`,
      });
      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };`;
    content = content.replace(handleAnalyzeRegex, newHandleAnalyze);

    // Replace Label
    content = content.replace(/<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input<\/label>/, `<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${config.label}</label>`);

    // Replace Placeholder
    content = content.replace(/placeholder="Enter your text here..."/, `placeholder="${config.placeholder}"`);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${toolName}.tsx`);
  } else {
    console.log(`File not found: ${toolName}.tsx`);
  }
});
