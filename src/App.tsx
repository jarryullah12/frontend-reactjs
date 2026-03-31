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
import { Payment } from './pages/Payment';
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
          <Route path="payment" element={<Payment />} />
          
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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
