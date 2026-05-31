import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore, useAuthStore } from '@/store';
import { Moon, Sun, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '../Logo';
import { supabase } from '@/lib/supabase';

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out from Supabase:', err);
    }
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const tools = [
    { id: 'meta-tag-generator', name: t('tools_list.items.meta_tag.name') },
    { id: 'robots-txt-generator', name: t('tools_list.items.robots.name') },
    { id: 'xml-sitemap-generator', name: t('tools_list.items.sitemap.name') },
    { id: 'backlink-checker', name: t('tools_list.items.backlink_checker.name') },
    { id: 'da-checker', name: t('tools_list.items.da_checker.name') },
    { id: 'broken-link-checker', name: t('tools_list.items.broken_link.name') },
    { id: 'schema-validator', name: t('tools_list.items.schema.name') },
    { id: 'plagiarism-checker', name: t('tools_list.items.plagiarism_checker.name') },
    { id: 'keyword-density', name: t('tools_list.items.density.name') },
    { id: 'website-analyzer', name: t('tools_list.items.website_analyzer.name') },
    { id: 'content-analyzer', name: t('tools_list.items.analyzer.name') },
    { id: 'css-minifier', name: t('tools_list.items.css_min.name') },
    { id: 'js-minifier', name: t('tools_list.items.js_min.name') },
    { id: 'ai-blog-generator', name: t('tools_list.items.blog_gen.name') },
    { id: 'ai-article-rewriter', name: t('tools_list.items.rewriter.name') },
    { id: 'ai-product-description', name: t('tools_list.items.product_description.name') },
    { id: 'ai-content-ideas', name: t('tools_list.items.ideas.name') },
    { id: 'ai-sales-email', name: t('tools_list.items.sales_email.name') },
    { id: 'ai-social-bio', name: t('tools_list.items.bio.name') },
    { id: 'ai-social-caption', name: t('tools_list.items.social_caption.name') },
    { id: 'keyword-suggestion-tool', name: 'Keyword Suggestion Tool' },
    { id: 'long-tail-keyword-generator', name: 'Long Tail Keyword Generator' },
    { id: 'page-authority-checker', name: 'Page Authority Checker' },
    { id: 'google-index-checker', name: 'Google Index Checker' },
    { id: 'xml-sitemap-validator', name: 'XML Sitemap Validator' },
    { id: 'keyword-position-checker', name: 'Keyword Position Checker' },
    { id: 'word-counter', name: 'Word Counter' },
    { id: 'character-counter', name: 'Character Counter' },
    { id: 'case-converter', name: 'Case Converter' },
    { id: 'reverse-image-search', name: 'Reverse Image Search' },
    { id: 'image-compressor', name: 'Image Compressor' },
    { id: 'favicon-generator', name: 'Favicon Generator' },
    { id: 'htaccess-generator', name: 'Htaccess Generator' },
    { id: 'ssl-checker', name: 'SSL Checker' },
    { id: 'what-is-my-ip', name: 'What Is My IP' },
    { id: 'server-status-checker', name: 'Server Status Checker' },
    { id: 'website-screenshot', name: 'Website Screenshot Generator' },
    { id: 'url-rewriting-tool', name: 'URL Rewriting Tool' },
    { id: 'grammar-checker', name: 'Grammar Checker' },
    { id: 'readability-checker', name: 'Readability Checker' },
    { id: 'md5-generator', name: 'MD5 Generator' },
    { id: 'sha1-generator', name: 'SHA1 Generator' },
    { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder' },
    { id: 'html-minifier', name: 'HTML Minifier' },
    { id: 'json-formatter', name: 'JSON Formatter' },
    { id: 'utm-builder', name: 'UTM Builder' },
    { id: 'open-graph-checker', name: 'Open Graph Checker' },
    { id: 'twitter-card-generator', name: 'Twitter Card Generator' },
    { id: 'canonical-tag-generator', name: 'Canonical Tag Generator' },
    { id: 'http-headers-checker', name: 'HTTP Headers Checker' },
    { id: 'privacy-policy-generator', name: t('tools_list.items.privacy_policy.name') },
    { id: 'url-encoder-decoder', name: t('tools_list.items.url_codec.name') },
    { id: 'keyword-clustering-tool', name: 'Keyword Clustering Tool' },
    { id: 'serp-simulator', name: 'SERP Simulator' },
    { id: 'lsi-keyword-generator', name: 'LSI Keyword Generator' },
    { id: 'bulk-url-checker', name: 'Bulk URL Checker' },
    { id: 'hreflang-tag-generator', name: 'Hreflang Tag Generator' },
    { id: 'schema-generator-faq', name: 'Schema Generator (FAQ)' },
    { id: 'schema-generator-local', name: 'Schema Generator (Local Business)' },
    { id: 'schema-generator-review', name: 'Schema Generator (Review)' },
    { id: 'meta-description-generator', name: 'Meta Description Generator' },
    { id: 'title-tag-generator', name: 'Title Tag Generator' },
    { id: 'blog-post-title-generator', name: 'Blog Post Title Generator' },
    { id: 'content-outline-generator', name: 'Content Outline Generator' },
    { id: 'paragraph-rewriter', name: 'Paragraph Rewriter' },
    { id: 'sentence-expander', name: 'Sentence Expander' },
    { id: 'text-summarizer', name: 'Text Summarizer' },
    { id: 'readability-improver', name: 'Readability Improver' },
    { id: 'keyword-typo-generator', name: 'Keyword Typo Generator' },
    { id: 'google-autocomplete-extractor', name: 'Google Autocomplete Extractor' },
    { id: 'youtube-keyword-tool', name: 'YouTube Keyword Tool' },
    { id: 'amazon-keyword-tool', name: 'Amazon Keyword Tool' },
    { id: 'bing-keyword-tool', name: 'Bing Keyword Tool' },
    { id: 'yandex-keyword-tool', name: 'Yandex Keyword Tool' },
    { id: 'app-store-keyword-tool', name: 'App Store Keyword Tool' },
    { id: 'seo-report-generator', name: 'SEO Report Generator' },
    { id: 'competitor-analysis-tool', name: 'Competitor Analysis Tool' },
    { id: 'backlink-maker', name: 'Backlink Maker' },
    { id: 'link-value-calculator', name: 'Link Value Calculator' },
    { id: 'website-speed-test', name: 'Website Speed Test' },
    { id: 'mobile-friendly-test', name: 'Mobile Friendly Test' },
    { id: 'core-web-vitals-checker', name: 'Core Web Vitals Checker' },
    { id: 'html-validator', name: 'HTML Validator' },
    { id: 'css-validator', name: 'CSS Validator' },
    { id: 'xml-sitemap-formatter', name: 'XML Sitemap Formatter' },
    { id: 'robots-txt-tester', name: 'Robots.txt Tester' },
    { id: 'redirect-checker', name: 'Redirect Checker' },
    { id: 'http2-checker', name: 'HTTP/2 Checker' },
    { id: 'dns-lookup-tool', name: 'DNS Lookup Tool' },
    { id: 'whois-lookup', name: 'WHOIS Lookup' },
    { id: 'ip-location-finder', name: 'IP Location Finder' },
    { id: 'reverse-ip-domain-checker', name: 'Reverse IP Domain Checker' },
    { id: 'server-port-scanner', name: 'Server Port Scanner' },
    { id: 'email-privacy-checker', name: 'Email Privacy Checker' },
    { id: 'safe-browsing-checker', name: 'Safe Browsing Checker' },
    { id: 'google-cache-checker', name: 'Google Cache Checker' },
    { id: 'mozrank-checker', name: 'Mozrank Checker' },
    { id: 'alexa-rank-checker', name: 'Alexa Rank Checker' },
    { id: 'keyword-roi-calculator', name: 'Keyword ROI Calculator' },
    { id: 'cpc-calculator', name: 'CPC Calculator' },
    { id: 'url-slug-generator', name: 'URL Slug Generator' },
    { id: 'domain-age-checker', name: 'Domain Age Checker' }
  ];

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4f39f6] to-purple-600 bg-clip-text text-transparent">
              OptiSEO
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link to="/tools" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.tools')}</Link>
            <Link to="/pricing" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.pricing')}</Link>
            <Link to="/docs" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.docs')}</Link>
            <Link to="/blog" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.blog')}</Link>
            <Link to="/contact" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.contact')}</Link>
            <Link to="/about" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.about')}</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/settings" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] rounded-md hover:bg-[#4f39f6]/90 transition-colors"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">
                {t('nav.login')}
              </Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-[#4f39f6] rounded-md hover:bg-[#4f39f6]/90 transition-colors">
                {t('nav.signup')}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link to="/tools" onClick={() => setIsMenuOpen(false)}>{t('nav.tools')}</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>{t('nav.pricing')}</Link>
            <Link to="/docs" onClick={() => setIsMenuOpen(false)}>{t('nav.docs')}</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>{t('nav.blog')}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
          </nav>
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
            {isAuthenticated ? (
              <>
                <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-center text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-md">
                  Settings
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 text-center text-sm font-medium text-white bg-[#4f39f6] rounded-md">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-center text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-md">
                  {t('nav.login')}
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-center text-sm font-medium text-white bg-indigo-600 rounded-md">
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
