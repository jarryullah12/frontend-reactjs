/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store';
import { Layout } from './components/layout/Layout';
import { ProtectedToolRoute } from './components/layout/ProtectedToolRoute';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Disclaimer } from './pages/Disclaimer';
import { Docs } from './pages/Docs';
import { AccountSettings } from './pages/AccountSettings';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';
import './i18n/i18n';

// Lazy loaded tools
const MetaTagGenerator = lazy(() => import('./pages/tools/MetaTagGenerator').then(m => ({ default: m.MetaTagGenerator })));
const AIBlogGenerator = lazy(() => import('./pages/tools/AIBlogGenerator').then(m => ({ default: m.AIBlogGenerator })));
const RobotsTxtGenerator = lazy(() => import('./pages/tools/RobotsTxtGenerator').then(m => ({ default: m.RobotsTxtGenerator })));
const XmlSitemapGenerator = lazy(() => import('./pages/tools/XmlSitemapGenerator').then(m => ({ default: m.XmlSitemapGenerator })));
const CssMinifier = lazy(() => import('./pages/tools/CssMinifier').then(m => ({ default: m.CssMinifier })));
const JsMinifier = lazy(() => import('./pages/tools/JsMinifier').then(m => ({ default: m.JsMinifier })));
const AIArticleRewriter = lazy(() => import('./pages/tools/AIArticleRewriter').then(m => ({ default: m.AIArticleRewriter })));
const AISalesEmail = lazy(() => import('./pages/tools/AISalesEmail').then(m => ({ default: m.AISalesEmail })));
const AISocialBio = lazy(() => import('./pages/tools/AISocialBio').then(m => ({ default: m.AISocialBio })));
const AIContentIdeas = lazy(() => import('./pages/tools/AIContentIdeas').then(m => ({ default: m.AIContentIdeas })));
const SchemaValidator = lazy(() => import('./pages/tools/SchemaValidator').then(m => ({ default: m.SchemaValidator })));
const KeywordDensity = lazy(() => import('./pages/tools/KeywordDensity').then(m => ({ default: m.KeywordDensity })));
const ContentAnalyzer = lazy(() => import('./pages/tools/ContentAnalyzer').then(m => ({ default: m.ContentAnalyzer })));
const WebsiteAnalyzer = lazy(() => import('./pages/tools/WebsiteAnalyzer').then(m => ({ default: m.WebsiteAnalyzer })));
const BacklinkChecker = lazy(() => import('./pages/tools/BacklinkChecker').then(m => ({ default: m.BacklinkChecker })));
const PlagiarismChecker = lazy(() => import('./pages/tools/PlagiarismChecker').then(m => ({ default: m.PlagiarismChecker })));
const AIProductDescription = lazy(() => import('./pages/tools/AIProductDescription').then(m => ({ default: m.AIProductDescription })));
const PrivacyPolicyGenerator = lazy(() => import('./pages/tools/PrivacyPolicyGenerator').then(m => ({ default: m.PrivacyPolicyGenerator })));
const DAChecker = lazy(() => import('./pages/tools/DAChecker').then(m => ({ default: m.DAChecker })));
const BrokenLinkChecker = lazy(() => import('./pages/tools/BrokenLinkChecker').then(m => ({ default: m.BrokenLinkChecker })));
const AISocialCaption = lazy(() => import('./pages/tools/AISocialCaption').then(m => ({ default: m.AISocialCaption })));
const URLEncoderDecoder = lazy(() => import('./pages/tools/URLEncoderDecoder').then(m => ({ default: m.URLEncoderDecoder })));
const KeywordSuggestionTool = lazy(() => import('./pages/tools/KeywordSuggestionTool').then(m => ({ default: m.KeywordSuggestionTool })));
const LongTailKeywordGenerator = lazy(() => import('./pages/tools/LongTailKeywordGenerator').then(m => ({ default: m.LongTailKeywordGenerator })));
const PageAuthorityChecker = lazy(() => import('./pages/tools/PageAuthorityChecker').then(m => ({ default: m.PageAuthorityChecker })));
const GoogleIndexChecker = lazy(() => import('./pages/tools/GoogleIndexChecker').then(m => ({ default: m.GoogleIndexChecker })));
const XMLSitemapValidator = lazy(() => import('./pages/tools/XMLSitemapValidator').then(m => ({ default: m.XMLSitemapValidator })));
const KeywordPositionChecker = lazy(() => import('./pages/tools/KeywordPositionChecker').then(m => ({ default: m.KeywordPositionChecker })));
const WordCounter = lazy(() => import('./pages/tools/WordCounter').then(m => ({ default: m.WordCounter })));
const CharacterCounter = lazy(() => import('./pages/tools/CharacterCounter').then(m => ({ default: m.CharacterCounter })));
const CaseConverter = lazy(() => import('./pages/tools/CaseConverter').then(m => ({ default: m.CaseConverter })));
const ReverseImageSearch = lazy(() => import('./pages/tools/ReverseImageSearch').then(m => ({ default: m.ReverseImageSearch })));
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor').then(m => ({ default: m.ImageCompressor })));
const FaviconGenerator = lazy(() => import('./pages/tools/FaviconGenerator').then(m => ({ default: m.FaviconGenerator })));
const HtaccessGenerator = lazy(() => import('./pages/tools/HtaccessGenerator').then(m => ({ default: m.HtaccessGenerator })));
const SSLChecker = lazy(() => import('./pages/tools/SSLChecker').then(m => ({ default: m.SSLChecker })));
const WhatIsMyIP = lazy(() => import('./pages/tools/WhatIsMyIP').then(m => ({ default: m.WhatIsMyIP })));
const ServerStatusChecker = lazy(() => import('./pages/tools/ServerStatusChecker').then(m => ({ default: m.ServerStatusChecker })));
const WebsiteScreenshot = lazy(() => import('./pages/tools/WebsiteScreenshot').then(m => ({ default: m.WebsiteScreenshot })));
const URLRewritingTool = lazy(() => import('./pages/tools/URLRewritingTool').then(m => ({ default: m.URLRewritingTool })));
const GrammarChecker = lazy(() => import('./pages/tools/GrammarChecker').then(m => ({ default: m.GrammarChecker })));
const ReadabilityChecker = lazy(() => import('./pages/tools/ReadabilityChecker').then(m => ({ default: m.ReadabilityChecker })));
const MD5Generator = lazy(() => import('./pages/tools/MD5Generator').then(m => ({ default: m.MD5Generator })));
const SHA1Generator = lazy(() => import('./pages/tools/SHA1Generator').then(m => ({ default: m.SHA1Generator })));
const Base64EncoderDecoder = lazy(() => import('./pages/tools/Base64EncoderDecoder').then(m => ({ default: m.Base64EncoderDecoder })));
const HTMLMinifier = lazy(() => import('./pages/tools/HTMLMinifier').then(m => ({ default: m.HTMLMinifier })));
const JSONFormatter = lazy(() => import('./pages/tools/JSONFormatter').then(m => ({ default: m.JSONFormatter })));
const UTMBuilder = lazy(() => import('./pages/tools/UTMBuilder').then(m => ({ default: m.UTMBuilder })));
const OpenGraphChecker = lazy(() => import('./pages/tools/OpenGraphChecker').then(m => ({ default: m.OpenGraphChecker })));
const TwitterCardGenerator = lazy(() => import('./pages/tools/TwitterCardGenerator').then(m => ({ default: m.TwitterCardGenerator })));
const CanonicalTagGenerator = lazy(() => import('./pages/tools/CanonicalTagGenerator').then(m => ({ default: m.CanonicalTagGenerator })));
const HTTPHeadersChecker = lazy(() => import('./pages/tools/HTTPHeadersChecker').then(m => ({ default: m.HTTPHeadersChecker })));
const KeywordClusteringTool = lazy(() => import('./pages/tools/KeywordClusteringTool').then(m => ({ default: m.KeywordClusteringTool })));
const SERPSimulator = lazy(() => import('./pages/tools/SERPSimulator').then(m => ({ default: m.SERPSimulator })));
const LSIKeywordGenerator = lazy(() => import('./pages/tools/LSIKeywordGenerator').then(m => ({ default: m.LSIKeywordGenerator })));
const BulkURLChecker = lazy(() => import('./pages/tools/BulkURLChecker').then(m => ({ default: m.BulkURLChecker })));
const HreflangTagGenerator = lazy(() => import('./pages/tools/HreflangTagGenerator').then(m => ({ default: m.HreflangTagGenerator })));
const SchemaGeneratorFAQ = lazy(() => import('./pages/tools/SchemaGeneratorFAQ').then(m => ({ default: m.SchemaGeneratorFAQ })));
const SchemaGeneratorLocal = lazy(() => import('./pages/tools/SchemaGeneratorLocal').then(m => ({ default: m.SchemaGeneratorLocal })));
const SchemaGeneratorReview = lazy(() => import('./pages/tools/SchemaGeneratorReview').then(m => ({ default: m.SchemaGeneratorReview })));
const MetaDescriptionGenerator = lazy(() => import('./pages/tools/MetaDescriptionGenerator').then(m => ({ default: m.MetaDescriptionGenerator })));
const TitleTagGenerator = lazy(() => import('./pages/tools/TitleTagGenerator').then(m => ({ default: m.TitleTagGenerator })));
const BlogPostTitleGenerator = lazy(() => import('./pages/tools/BlogPostTitleGenerator').then(m => ({ default: m.BlogPostTitleGenerator })));
const ContentOutlineGenerator = lazy(() => import('./pages/tools/ContentOutlineGenerator').then(m => ({ default: m.ContentOutlineGenerator })));
const ParagraphRewriter = lazy(() => import('./pages/tools/ParagraphRewriter').then(m => ({ default: m.ParagraphRewriter })));
const SentenceExpander = lazy(() => import('./pages/tools/SentenceExpander').then(m => ({ default: m.SentenceExpander })));
const TextSummarizer = lazy(() => import('./pages/tools/TextSummarizer').then(m => ({ default: m.TextSummarizer })));
const ReadabilityImprover = lazy(() => import('./pages/tools/ReadabilityImprover').then(m => ({ default: m.ReadabilityImprover })));
const KeywordTypoGenerator = lazy(() => import('./pages/tools/KeywordTypoGenerator').then(m => ({ default: m.KeywordTypoGenerator })));
const GoogleAutocompleteExtractor = lazy(() => import('./pages/tools/GoogleAutocompleteExtractor').then(m => ({ default: m.GoogleAutocompleteExtractor })));
const YouTubeKeywordTool = lazy(() => import('./pages/tools/YouTubeKeywordTool').then(m => ({ default: m.YouTubeKeywordTool })));
const AmazonKeywordTool = lazy(() => import('./pages/tools/AmazonKeywordTool').then(m => ({ default: m.AmazonKeywordTool })));
const BingKeywordTool = lazy(() => import('./pages/tools/BingKeywordTool').then(m => ({ default: m.BingKeywordTool })));
const YandexKeywordTool = lazy(() => import('./pages/tools/YandexKeywordTool').then(m => ({ default: m.YandexKeywordTool })));
const AppStoreKeywordTool = lazy(() => import('./pages/tools/AppStoreKeywordTool').then(m => ({ default: m.AppStoreKeywordTool })));
const SEOReportGenerator = lazy(() => import('./pages/tools/SEOReportGenerator').then(m => ({ default: m.SEOReportGenerator })));
const CompetitorAnalysisTool = lazy(() => import('./pages/tools/CompetitorAnalysisTool').then(m => ({ default: m.CompetitorAnalysisTool })));
const BacklinkMaker = lazy(() => import('./pages/tools/BacklinkMaker').then(m => ({ default: m.BacklinkMaker })));
const LinkValueCalculator = lazy(() => import('./pages/tools/LinkValueCalculator').then(m => ({ default: m.LinkValueCalculator })));
const WebsiteSpeedTest = lazy(() => import('./pages/tools/WebsiteSpeedTest').then(m => ({ default: m.WebsiteSpeedTest })));
const MobileFriendlyTest = lazy(() => import('./pages/tools/MobileFriendlyTest').then(m => ({ default: m.MobileFriendlyTest })));
const CoreWebVitalsChecker = lazy(() => import('./pages/tools/CoreWebVitalsChecker').then(m => ({ default: m.CoreWebVitalsChecker })));
const HTMLValidator = lazy(() => import('./pages/tools/HTMLValidator').then(m => ({ default: m.HTMLValidator })));
const CSSValidator = lazy(() => import('./pages/tools/CSSValidator').then(m => ({ default: m.CSSValidator })));
const XMLSitemapFormatter = lazy(() => import('./pages/tools/XMLSitemapFormatter').then(m => ({ default: m.XMLSitemapFormatter })));
const RobotsTxtTester = lazy(() => import('./pages/tools/RobotsTxtTester').then(m => ({ default: m.RobotsTxtTester })));
const RedirectChecker = lazy(() => import('./pages/tools/RedirectChecker').then(m => ({ default: m.RedirectChecker })));
const HTTP2Checker = lazy(() => import('./pages/tools/HTTP2Checker').then(m => ({ default: m.HTTP2Checker })));
const DNSLookupTool = lazy(() => import('./pages/tools/DNSLookupTool').then(m => ({ default: m.DNSLookupTool })));
const WHOISLookup = lazy(() => import('./pages/tools/WHOISLookup').then(m => ({ default: m.WHOISLookup })));
const IPLocationFinder = lazy(() => import('./pages/tools/IPLocationFinder').then(m => ({ default: m.IPLocationFinder })));
const ReverseIPDomainChecker = lazy(() => import('./pages/tools/ReverseIPDomainChecker').then(m => ({ default: m.ReverseIPDomainChecker })));
const ServerPortScanner = lazy(() => import('./pages/tools/ServerPortScanner').then(m => ({ default: m.ServerPortScanner })));
const EmailPrivacyChecker = lazy(() => import('./pages/tools/EmailPrivacyChecker').then(m => ({ default: m.EmailPrivacyChecker })));
const SafeBrowsingChecker = lazy(() => import('./pages/tools/SafeBrowsingChecker').then(m => ({ default: m.SafeBrowsingChecker })));
const GoogleCacheChecker = lazy(() => import('./pages/tools/GoogleCacheChecker').then(m => ({ default: m.GoogleCacheChecker })));
const MozrankChecker = lazy(() => import('./pages/tools/MozrankChecker').then(m => ({ default: m.MozrankChecker })));
const AlexaRankChecker = lazy(() => import('./pages/tools/AlexaRankChecker').then(m => ({ default: m.AlexaRankChecker })));
const KeywordROICalculator = lazy(() => import('./pages/tools/KeywordROICalculator').then(m => ({ default: m.KeywordROICalculator })));
const CPCCalculator = lazy(() => import('./pages/tools/CPCCalculator').then(m => ({ default: m.CPCCalculator })));
const URLSlugGenerator = lazy(() => import('./pages/tools/URLSlugGenerator').then(m => ({ default: m.URLSlugGenerator })));
const DomainAgeChecker = lazy(() => import('./pages/tools/DomainAgeChecker').then(m => ({ default: m.DomainAgeChecker })));
 // Initialize i18n

export default function App() {
  const { isAuthenticated, fetchSubscription } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscription();
    }
  }, [isAuthenticated, fetchSubscription]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
      <Routes>
        {/* Auth Routes without Header/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Main Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Tools />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="settings" element={<AccountSettings />} />
          
          {/* Protected Tools */}
          <Route element={<ProtectedToolRoute />}>
            <Route path="tools/website-analyzer" element={<WebsiteAnalyzer />} />
            <Route path="tools/meta-tag-generator" element={<MetaTagGenerator />} />
            <Route path="tools/ai-blog-generator" element={<AIBlogGenerator />} />
            <Route path="tools/robots-txt-generator" element={<RobotsTxtGenerator />} />
            <Route path="tools/xml-sitemap-generator" element={<XmlSitemapGenerator />} />
            <Route path="tools/css-minifier" element={<CssMinifier />} />
            <Route path="tools/js-minifier" element={<JsMinifier />} />
            <Route path="tools/ai-article-rewriter" element={<AIArticleRewriter />} />
            <Route path="tools/ai-sales-email" element={<AISalesEmail />} />
            <Route path="tools/ai-social-bio" element={<AISocialBio />} />
            <Route path="tools/ai-content-ideas" element={<AIContentIdeas />} />
            <Route path="tools/schema-validator" element={<SchemaValidator />} />
            <Route path="tools/keyword-density" element={<KeywordDensity />} />
            <Route path="tools/content-analyzer" element={<ContentAnalyzer />} />
            <Route path="tools/backlink-checker" element={<BacklinkChecker />} />
            <Route path="tools/plagiarism-checker" element={<PlagiarismChecker />} />
            <Route path="tools/ai-product-description" element={<AIProductDescription />} />
            <Route path="tools/privacy-policy-generator" element={<PrivacyPolicyGenerator />} />
            <Route path="tools/da-checker" element={<DAChecker />} />
            <Route path="tools/broken-link-checker" element={<BrokenLinkChecker />} />
            <Route path="tools/ai-social-caption" element={<AISocialCaption />} />
            <Route path="tools/url-encoder-decoder" element={<URLEncoderDecoder />} />
            <Route path="tools/keyword-suggestion-tool" element={<KeywordSuggestionTool />} />
            <Route path="tools/long-tail-keyword-generator" element={<LongTailKeywordGenerator />} />
            <Route path="tools/page-authority-checker" element={<PageAuthorityChecker />} />
            <Route path="tools/google-index-checker" element={<GoogleIndexChecker />} />
            <Route path="tools/xml-sitemap-validator" element={<XMLSitemapValidator />} />
            <Route path="tools/keyword-position-checker" element={<KeywordPositionChecker />} />
            <Route path="tools/word-counter" element={<WordCounter />} />
            <Route path="tools/character-counter" element={<CharacterCounter />} />
            <Route path="tools/case-converter" element={<CaseConverter />} />
            <Route path="tools/reverse-image-search" element={<ReverseImageSearch />} />
            <Route path="tools/image-compressor" element={<ImageCompressor />} />
            <Route path="tools/favicon-generator" element={<FaviconGenerator />} />
            <Route path="tools/htaccess-generator" element={<HtaccessGenerator />} />
            <Route path="tools/ssl-checker" element={<SSLChecker />} />
            <Route path="tools/what-is-my-ip" element={<WhatIsMyIP />} />
            <Route path="tools/server-status-checker" element={<ServerStatusChecker />} />
            <Route path="tools/website-screenshot" element={<WebsiteScreenshot />} />
            <Route path="tools/url-rewriting-tool" element={<URLRewritingTool />} />
            <Route path="tools/grammar-checker" element={<GrammarChecker />} />
            <Route path="tools/readability-checker" element={<ReadabilityChecker />} />
            <Route path="tools/md5-generator" element={<MD5Generator />} />
            <Route path="tools/sha1-generator" element={<SHA1Generator />} />
            <Route path="tools/base64-encoder-decoder" element={<Base64EncoderDecoder />} />
            <Route path="tools/html-minifier" element={<HTMLMinifier />} />
            <Route path="tools/json-formatter" element={<JSONFormatter />} />
            <Route path="tools/utm-builder" element={<UTMBuilder />} />
            <Route path="tools/open-graph-checker" element={<OpenGraphChecker />} />
            <Route path="tools/twitter-card-generator" element={<TwitterCardGenerator />} />
            <Route path="tools/canonical-tag-generator" element={<CanonicalTagGenerator />} />
            <Route path="tools/http-headers-checker" element={<HTTPHeadersChecker />} />
            <Route path="tools/keyword-clustering-tool" element={<KeywordClusteringTool />} />
            <Route path="tools/serp-simulator" element={<SERPSimulator />} />
            <Route path="tools/lsi-keyword-generator" element={<LSIKeywordGenerator />} />
            <Route path="tools/bulk-url-checker" element={<BulkURLChecker />} />
            <Route path="tools/hreflang-tag-generator" element={<HreflangTagGenerator />} />
            <Route path="tools/schema-generator-faq" element={<SchemaGeneratorFAQ />} />
            <Route path="tools/schema-generator-local" element={<SchemaGeneratorLocal />} />
            <Route path="tools/schema-generator-review" element={<SchemaGeneratorReview />} />
            <Route path="tools/meta-description-generator" element={<MetaDescriptionGenerator />} />
            <Route path="tools/title-tag-generator" element={<TitleTagGenerator />} />
            <Route path="tools/blog-post-title-generator" element={<BlogPostTitleGenerator />} />
            <Route path="tools/content-outline-generator" element={<ContentOutlineGenerator />} />
            <Route path="tools/paragraph-rewriter" element={<ParagraphRewriter />} />
            <Route path="tools/sentence-expander" element={<SentenceExpander />} />
            <Route path="tools/text-summarizer" element={<TextSummarizer />} />
            <Route path="tools/readability-improver" element={<ReadabilityImprover />} />
            <Route path="tools/keyword-typo-generator" element={<KeywordTypoGenerator />} />
            <Route path="tools/google-autocomplete-extractor" element={<GoogleAutocompleteExtractor />} />
            <Route path="tools/youtube-keyword-tool" element={<YouTubeKeywordTool />} />
            <Route path="tools/amazon-keyword-tool" element={<AmazonKeywordTool />} />
            <Route path="tools/bing-keyword-tool" element={<BingKeywordTool />} />
            <Route path="tools/yandex-keyword-tool" element={<YandexKeywordTool />} />
            <Route path="tools/app-store-keyword-tool" element={<AppStoreKeywordTool />} />
            <Route path="tools/seo-report-generator" element={<SEOReportGenerator />} />
            <Route path="tools/competitor-analysis-tool" element={<CompetitorAnalysisTool />} />
            <Route path="tools/backlink-maker" element={<BacklinkMaker />} />
            <Route path="tools/link-value-calculator" element={<LinkValueCalculator />} />
            <Route path="tools/website-speed-test" element={<WebsiteSpeedTest />} />
            <Route path="tools/mobile-friendly-test" element={<MobileFriendlyTest />} />
            <Route path="tools/core-web-vitals-checker" element={<CoreWebVitalsChecker />} />
            <Route path="tools/html-validator" element={<HTMLValidator />} />
            <Route path="tools/css-validator" element={<CSSValidator />} />
            <Route path="tools/xml-sitemap-formatter" element={<XMLSitemapFormatter />} />
            <Route path="tools/robots-txt-tester" element={<RobotsTxtTester />} />
            <Route path="tools/redirect-checker" element={<RedirectChecker />} />
            <Route path="tools/http2-checker" element={<HTTP2Checker />} />
            <Route path="tools/dns-lookup-tool" element={<DNSLookupTool />} />
            <Route path="tools/whois-lookup" element={<WHOISLookup />} />
            <Route path="tools/ip-location-finder" element={<IPLocationFinder />} />
            <Route path="tools/reverse-ip-domain-checker" element={<ReverseIPDomainChecker />} />
            <Route path="tools/server-port-scanner" element={<ServerPortScanner />} />
            <Route path="tools/email-privacy-checker" element={<EmailPrivacyChecker />} />
            <Route path="tools/safe-browsing-checker" element={<SafeBrowsingChecker />} />
            <Route path="tools/google-cache-checker" element={<GoogleCacheChecker />} />
            <Route path="tools/mozrank-checker" element={<MozrankChecker />} />
            <Route path="tools/alexa-rank-checker" element={<AlexaRankChecker />} />
            <Route path="tools/keyword-roi-calculator" element={<KeywordROICalculator />} />
            <Route path="tools/cpc-calculator" element={<CPCCalculator />} />
            <Route path="tools/url-slug-generator" element={<URLSlugGenerator />} />
            <Route path="tools/domain-age-checker" element={<DomainAgeChecker />} />
          </Route>
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
