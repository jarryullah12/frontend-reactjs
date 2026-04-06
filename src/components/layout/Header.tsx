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
    { id: 'meta-tag-generator', name: 'Meta Tag Generator' },
    { id: 'robots-txt-generator', name: 'Robots.txt Generator' },
    { id: 'xml-sitemap-generator', name: 'XML Sitemap Generator' },
    { id: 'schema-validator', name: 'Schema Validator' },
    { id: 'keyword-density', name: 'Keyword Density Checker' },
    { id: 'website-analyzer', name: 'Website Analyzer' },
    { id: 'content-analyzer', name: 'Content Analyzer' },
    { id: 'css-minifier', name: 'CSS Minifier' },
    { id: 'js-minifier', name: 'JS Minifier' },
    { id: 'ai-blog-generator', name: 'AI Blog Generator' },
    { id: 'ai-article-rewriter', name: 'AI Article Rewriter' },
    { id: 'ai-content-ideas', name: 'AI Content Ideas' },
    { id: 'ai-sales-email', name: 'AI Sales Email' },
    { id: 'ai-social-bio', name: 'AI Social Bio' },
    { id: 'backlink-checker', name: 'Backlink Checker' },
    { id: 'plagiarism-checker', name: 'Plagiarism Checker' },
    { id: 'ai-product-description', name: 'AI Product Description' },
    { id: 'privacy-policy-generator', name: 'Privacy Policy Generator' },
    { id: 'da-checker', name: 'DA Checker' },
    { id: 'broken-link-checker', name: 'Broken Link Checker' },
    { id: 'ai-social-caption', name: 'AI Social Caption' },
    { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder' },
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
            <div className="relative">
              <button 
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors"
              >
                {t('nav.tools')}
                {isToolsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-50 max-h-[60vh] overflow-y-auto">
                  {tools.map((tool) => (
                    <Link 
                      key={tool.id} 
                      to={`/tools/${tool.id}`} 
                      onClick={() => setIsToolsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#4f39f6] dark:hover:text-[#4f39f6]"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/pricing" className="hover:text-[#4f39f6] dark:hover:text-[#4f39f6] transition-colors">{t('nav.pricing')}</Link>
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
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center justify-between w-full"
              >
                {t('nav.tools')}
                {isToolsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isToolsOpen && (
                <div className="flex flex-col gap-2 pl-4">
                  {tools.map((tool) => (
                    <Link key={tool.id} to={`/tools/${tool.id}`} onClick={() => { setIsMenuOpen(false); setIsToolsOpen(false); }}>{tool.name}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>{t('nav.pricing')}</Link>
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
