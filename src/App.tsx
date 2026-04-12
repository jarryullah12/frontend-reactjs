/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
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
import { AccountSettings } from './pages/AccountSettings';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';
import { MetaTagGenerator } from './pages/tools/MetaTagGenerator';
import { AIBlogGenerator } from './pages/tools/AIBlogGenerator';
import { RobotsTxtGenerator } from './pages/tools/RobotsTxtGenerator';
import { XmlSitemapGenerator } from './pages/tools/XmlSitemapGenerator';
import { CssMinifier } from './pages/tools/CssMinifier';
import { JsMinifier } from './pages/tools/JsMinifier';
import { AIArticleRewriter } from './pages/tools/AIArticleRewriter';
import { AISalesEmail } from './pages/tools/AISalesEmail';
import { AISocialBio } from './pages/tools/AISocialBio';
import { AIContentIdeas } from './pages/tools/AIContentIdeas';
import { SchemaValidator } from './pages/tools/SchemaValidator';
import { KeywordDensity } from './pages/tools/KeywordDensity';
import { ContentAnalyzer } from './pages/tools/ContentAnalyzer';
import { WebsiteAnalyzer } from './pages/tools/WebsiteAnalyzer';
import { BacklinkChecker } from './pages/tools/BacklinkChecker';
import { PlagiarismChecker } from './pages/tools/PlagiarismChecker';
import { AIProductDescription } from './pages/tools/AIProductDescription';
import { PrivacyPolicyGenerator } from './pages/tools/PrivacyPolicyGenerator';
import { DAChecker } from './pages/tools/DAChecker';
import { BrokenLinkChecker } from './pages/tools/BrokenLinkChecker';
import { AISocialCaption } from './pages/tools/AISocialCaption';
import { URLEncoderDecoder } from './pages/tools/URLEncoderDecoder';
import { KeywordSuggestionTool } from './pages/tools/KeywordSuggestionTool';
import { LongTailKeywordGenerator } from './pages/tools/LongTailKeywordGenerator';
import { PageAuthorityChecker } from './pages/tools/PageAuthorityChecker';
import { GoogleIndexChecker } from './pages/tools/GoogleIndexChecker';
import { XMLSitemapValidator } from './pages/tools/XMLSitemapValidator';
import { KeywordPositionChecker } from './pages/tools/KeywordPositionChecker';
import { WordCounter } from './pages/tools/WordCounter';
import { CharacterCounter } from './pages/tools/CharacterCounter';
import { CaseConverter } from './pages/tools/CaseConverter';
import { ReverseImageSearch } from './pages/tools/ReverseImageSearch';
import { ImageCompressor } from './pages/tools/ImageCompressor';
import { FaviconGenerator } from './pages/tools/FaviconGenerator';
import { HtaccessGenerator } from './pages/tools/HtaccessGenerator';
import { SSLChecker } from './pages/tools/SSLChecker';
import { WhatIsMyIP } from './pages/tools/WhatIsMyIP';
import { ServerStatusChecker } from './pages/tools/ServerStatusChecker';
import { WebsiteScreenshot } from './pages/tools/WebsiteScreenshot';
import { URLRewritingTool } from './pages/tools/URLRewritingTool';
import { GrammarChecker } from './pages/tools/GrammarChecker';
import { ReadabilityChecker } from './pages/tools/ReadabilityChecker';
import { MD5Generator } from './pages/tools/MD5Generator';
import { SHA1Generator } from './pages/tools/SHA1Generator';
import { Base64EncoderDecoder } from './pages/tools/Base64EncoderDecoder';
import { HTMLMinifier } from './pages/tools/HTMLMinifier';
import { JSONFormatter } from './pages/tools/JSONFormatter';
import { UTMBuilder } from './pages/tools/UTMBuilder';
import { OpenGraphChecker } from './pages/tools/OpenGraphChecker';
import { TwitterCardGenerator } from './pages/tools/TwitterCardGenerator';
import { CanonicalTagGenerator } from './pages/tools/CanonicalTagGenerator';
import { HTTPHeadersChecker } from './pages/tools/HTTPHeadersChecker';
import { KeywordClusteringTool } from "./pages/tools/KeywordClusteringTool";
import { SERPSimulator } from "./pages/tools/SERPSimulator";
import { LSIKeywordGenerator } from "./pages/tools/LSIKeywordGenerator";
import { BulkURLChecker } from "./pages/tools/BulkURLChecker";
import { HreflangTagGenerator } from "./pages/tools/HreflangTagGenerator";
import { SchemaGeneratorFAQ } from "./pages/tools/SchemaGeneratorFAQ";
import { SchemaGeneratorLocal } from "./pages/tools/SchemaGeneratorLocal";
import { SchemaGeneratorReview } from "./pages/tools/SchemaGeneratorReview";
import { MetaDescriptionGenerator } from "./pages/tools/MetaDescriptionGenerator";
import { TitleTagGenerator } from "./pages/tools/TitleTagGenerator";
import { BlogPostTitleGenerator } from "./pages/tools/BlogPostTitleGenerator";
import { ContentOutlineGenerator } from "./pages/tools/ContentOutlineGenerator";
import { ParagraphRewriter } from "./pages/tools/ParagraphRewriter";
import { SentenceExpander } from "./pages/tools/SentenceExpander";
import { TextSummarizer } from "./pages/tools/TextSummarizer";
import { ReadabilityImprover } from "./pages/tools/ReadabilityImprover";
import { KeywordTypoGenerator } from "./pages/tools/KeywordTypoGenerator";
import { GoogleAutocompleteExtractor } from "./pages/tools/GoogleAutocompleteExtractor";
import { YouTubeKeywordTool } from "./pages/tools/YouTubeKeywordTool";
import { AmazonKeywordTool } from "./pages/tools/AmazonKeywordTool";
import { BingKeywordTool } from "./pages/tools/BingKeywordTool";
import { YandexKeywordTool } from "./pages/tools/YandexKeywordTool";
import { AppStoreKeywordTool } from "./pages/tools/AppStoreKeywordTool";
import { SEOReportGenerator } from "./pages/tools/SEOReportGenerator";
import { CompetitorAnalysisTool } from "./pages/tools/CompetitorAnalysisTool";
import { BacklinkMaker } from "./pages/tools/BacklinkMaker";
import { LinkValueCalculator } from "./pages/tools/LinkValueCalculator";
import { WebsiteSpeedTest } from "./pages/tools/WebsiteSpeedTest";
import { MobileFriendlyTest } from "./pages/tools/MobileFriendlyTest";
import { CoreWebVitalsChecker } from "./pages/tools/CoreWebVitalsChecker";
import { HTMLValidator } from "./pages/tools/HTMLValidator";
import { CSSValidator } from "./pages/tools/CSSValidator";
import { XMLSitemapFormatter } from "./pages/tools/XMLSitemapFormatter";
import { RobotsTxtTester } from "./pages/tools/RobotsTxtTester";
import { RedirectChecker } from "./pages/tools/RedirectChecker";
import { HTTP2Checker } from "./pages/tools/HTTP2Checker";
import { DNSLookupTool } from "./pages/tools/DNSLookupTool";
import { WHOISLookup } from "./pages/tools/WHOISLookup";
import { IPLocationFinder } from "./pages/tools/IPLocationFinder";
import { ReverseIPDomainChecker } from "./pages/tools/ReverseIPDomainChecker";
import { ServerPortScanner } from "./pages/tools/ServerPortScanner";
import { EmailPrivacyChecker } from "./pages/tools/EmailPrivacyChecker";
import { SafeBrowsingChecker } from "./pages/tools/SafeBrowsingChecker";
import { GoogleCacheChecker } from "./pages/tools/GoogleCacheChecker";
import { MozrankChecker } from "./pages/tools/MozrankChecker";
import { AlexaRankChecker } from "./pages/tools/AlexaRankChecker";
import { KeywordROICalculator } from "./pages/tools/KeywordROICalculator";
import { CPCCalculator } from "./pages/tools/CPCCalculator";
import { URLSlugGenerator } from "./pages/tools/URLSlugGenerator";
import { DomainAgeChecker } from "./pages/tools/DomainAgeChecker";
import './i18n/i18n'; // Initialize i18n

export default function App() {
  const { isAuthenticated, fetchSubscription } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscription();
    }
  }, [isAuthenticated, fetchSubscription]);

  return (
    <BrowserRouter>
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
          <Route path="blog/:id" element={<BlogPost />} />
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
    </BrowserRouter>
  );
}
