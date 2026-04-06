import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, FileText, Zap, Code, Shield, BarChart, PenTool, 
  MessageSquare, Mail, Lightbulb, Hash, Briefcase, Share2, Globe,
  Link as LinkIcon, ShieldCheck, ShoppingBag, Link2Off, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';
import { SEO } from '../components/SEO';

export function Tools() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { user, isAuthenticated, subscription } = useAuthStore();
  const navigate = useNavigate();

  const FREE_TRIAL_TOOLS = [
    'website-analyzer',
    'keyword-density',
    'ai-blog-generator',
    'ai-article-rewriter',
    'backlink-checker',
    'plagiarism-checker',
    'ai-product-description',
    'da-checker',
    'keyword-suggestion-tool',
    'grammar-checker'
  ];

  const isAdmin = user?.role === 'admin';
  
  // Check Free Trial
  const joinDate = user?.joinDate || user?.created_at;
  const daysSinceJoin = joinDate ? Math.floor((new Date().getTime() - new Date(joinDate).getTime()) / (1000 * 3600 * 24)) : 0;
  const isTrialActive = daysSinceJoin <= 7;

  // Check Subscription
  const isPremiumActive = subscription?.isActive && subscription?.plan === 'premium';
  const isProActive = subscription?.isActive && (subscription?.plan === 'pro' || subscription?.plan === 'lifetime' || subscription?.plan === 'lifetime pro');

  const checkIsApproved = (toolId: string) => {
    const isFreeTrialTool = FREE_TRIAL_TOOLS.includes(toolId);
    if (isAdmin || isProActive) return true;
    if (isPremiumActive && isFreeTrialTool) return true;
    if (isTrialActive && isFreeTrialTool) return true;
    return false;
  };

  const handleToolClick = (e: React.MouseEvent, toolId: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert('Please log in to access this tool.');
      navigate('/login');
      return;
    }

    if (!checkIsApproved(toolId)) {
      e.preventDefault();
      alert('Please purchase a plan to access this tool.');
      navigate('/pricing');
    }
  };

  const categories = [
    { id: 'all', name: t('tools.categories.all'), icon: <Globe className="w-4 h-4" /> },
    { id: 'seo', name: t('tools.categories.seo'), icon: <Search className="w-4 h-4" /> },
    { id: 'minifiers', name: t('tools.categories.minifiers'), icon: <Code className="w-4 h-4" /> },
    { id: 'validators', name: t('tools.categories.validators'), icon: <Shield className="w-4 h-4" /> },
    { id: 'keyword', name: t('tools.categories.keyword'), icon: <Hash className="w-4 h-4" /> },
    { id: 'analysis', name: t('tools.categories.analysis'), icon: <BarChart className="w-4 h-4" /> },
    { id: 'ai_content', name: t('tools.categories.ai_content'), icon: <PenTool className="w-4 h-4" /> },
    { id: 'ai_email', name: t('tools.categories.ai_email'), icon: <Mail className="w-4 h-4" /> },
    { id: 'ai_ideas', name: t('tools.categories.ai_ideas'), icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'ai_social', name: t('tools.categories.ai_social'), icon: <Share2 className="w-4 h-4" /> },
    { id: 'utility', name: "Utility", icon: <Briefcase className="w-4 h-4" /> },
  ];

  const tools = [
    // SEO Tools
    { id: 'meta-tag-generator', name: t('tools_list.items.meta_tag.name'), category: 'seo', description: t('tools_list.items.meta_tag.desc'), icon: <FileText className="w-5 h-5" /> },
    { id: 'robots-txt-generator', name: t('tools_list.items.robots.name'), category: 'seo', description: t('tools_list.items.robots.desc'), icon: <FileText className="w-5 h-5" /> },
    { id: 'xml-sitemap-generator', name: t('tools_list.items.sitemap.name'), category: 'seo', description: t('tools_list.items.sitemap.desc'), icon: <FileText className="w-5 h-5" /> },
    { id: 'backlink-checker', name: t('tools_list.items.backlink_checker.name'), category: 'seo', description: t('tools_list.items.backlink_checker.desc'), icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'da-checker', name: t('tools_list.items.da_checker.name'), category: 'seo', description: t('tools_list.items.da_checker.desc'), icon: <Zap className="w-5 h-5" /> },
    { id: 'broken-link-checker', name: t('tools_list.items.broken_link.name'), category: 'seo', description: t('tools_list.items.broken_link.desc'), icon: <Link2Off className="w-5 h-5" /> },
    
    // Validators
    { id: 'schema-validator', name: t('tools_list.items.schema.name'), category: 'validators', description: t('tools_list.items.schema.desc'), icon: <Shield className="w-5 h-5" /> },
    { id: 'plagiarism-checker', name: t('tools_list.items.plagiarism_checker.name'), category: 'validators', description: t('tools_list.items.plagiarism_checker.desc'), icon: <ShieldCheck className="w-5 h-5" /> },

    // Keyword & Ranking
    { id: 'keyword-density', name: t('tools_list.items.density.name'), category: 'keyword', description: t('tools_list.items.density.desc'), icon: <Hash className="w-5 h-5" /> },

    // Website Analysis
    { id: 'website-analyzer', name: t('tools_list.items.website_analyzer.name'), category: 'analysis', description: t('tools_list.items.website_analyzer.desc'), icon: <BarChart className="w-5 h-5" /> },
    { id: 'content-analyzer', name: t('tools_list.items.analyzer.name'), category: 'analysis', description: t('tools_list.items.analyzer.desc'), icon: <BarChart className="w-5 h-5" /> },

    // Minifiers
    { id: 'css-minifier', name: t('tools_list.items.css_min.name'), category: 'minifiers', description: t('tools_list.items.css_min.desc'), icon: <Code className="w-5 h-5" /> },
    { id: 'js-minifier', name: t('tools_list.items.js_min.name'), category: 'minifiers', description: t('tools_list.items.js_min.desc'), icon: <Code className="w-5 h-5" /> },
    
    // AI Content
    { id: 'ai-blog-generator', name: t('tools_list.items.blog_gen.name'), category: 'ai_content', description: t('tools_list.items.blog_gen.desc'), icon: <PenTool className="w-5 h-5" /> },
    { id: 'ai-article-rewriter', name: t('tools_list.items.rewriter.name'), category: 'ai_content', description: t('tools_list.items.rewriter.desc'), icon: <PenTool className="w-5 h-5" /> },
    { id: 'ai-product-description', name: t('tools_list.items.product_description.name'), category: 'ai_content', description: t('tools_list.items.product_description.desc'), icon: <ShoppingBag className="w-5 h-5" /> },
    
    // AI Ideas
    { id: 'ai-content-ideas', name: t('tools_list.items.ideas.name'), category: 'ai_ideas', description: t('tools_list.items.ideas.desc'), icon: <Lightbulb className="w-5 h-5" /> },

    // AI Email
    { id: 'ai-sales-email', name: t('tools_list.items.sales_email.name'), category: 'ai_email', description: t('tools_list.items.sales_email.desc'), icon: <Mail className="w-5 h-5" /> },
    
    // AI Social
    { id: 'ai-social-bio', name: t('tools_list.items.bio.name'), category: 'ai_social', description: t('tools_list.items.bio.desc'), icon: <Share2 className="w-5 h-5" /> },
    { id: 'ai-social-caption', name: t('tools_list.items.social_caption.name'), category: 'ai_social', description: t('tools_list.items.social_caption.desc'), icon: <MessageSquare className="w-5 h-5" /> },

    // Utility
    { id: 'keyword-suggestion-tool', name: 'Keyword Suggestion Tool', category: 'keyword', description: 'Get keyword suggestions for your seed keyword.', icon: <Hash className="w-5 h-5" /> },
    { id: 'long-tail-keyword-generator', name: 'Long Tail Keyword Generator', category: 'keyword', description: 'Generate long tail keywords easily.', icon: <Hash className="w-5 h-5" /> },
    { id: 'page-authority-checker', name: 'Page Authority Checker', category: 'seo', description: 'Check the page authority of any URL.', icon: <Zap className="w-5 h-5" /> },
    { id: 'google-index-checker', name: 'Google Index Checker', category: 'seo', description: 'Check if your URL is indexed by Google.', icon: <Search className="w-5 h-5" /> },
    { id: 'xml-sitemap-validator', name: 'XML Sitemap Validator', category: 'validators', description: 'Validate your XML sitemap format.', icon: <Shield className="w-5 h-5" /> },
    { id: 'keyword-position-checker', name: 'Keyword Position Checker', category: 'keyword', description: 'Check your keyword ranking position.', icon: <BarChart className="w-5 h-5" /> },
    { id: 'word-counter', name: 'Word Counter', category: 'utility', description: 'Count words and characters in your text.', icon: <FileText className="w-5 h-5" /> },
    { id: 'character-counter', name: 'Character Counter', category: 'utility', description: 'Count characters with and without spaces.', icon: <FileText className="w-5 h-5" /> },
    { id: 'case-converter', name: 'Case Converter', category: 'utility', description: 'Convert text to uppercase, lowercase, title case, etc.', icon: <FileText className="w-5 h-5" /> },
    { id: 'reverse-image-search', name: 'Reverse Image Search', category: 'utility', description: 'Search for similar images across the web.', icon: <Search className="w-5 h-5" /> },
    { id: 'image-compressor', name: 'Image Compressor', category: 'utility', description: 'Compress images without losing quality.', icon: <FileText className="w-5 h-5" /> },
    { id: 'favicon-generator', name: 'Favicon Generator', category: 'utility', description: 'Generate favicons for your website.', icon: <Globe className="w-5 h-5" /> },
    { id: 'htaccess-generator', name: 'Htaccess Generator', category: 'utility', description: 'Generate .htaccess files easily.', icon: <Code className="w-5 h-5" /> },
    { id: 'ssl-checker', name: 'SSL Checker', category: 'validators', description: 'Check your website SSL certificate.', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'what-is-my-ip', name: 'What Is My IP', category: 'utility', description: 'Find out your public IP address.', icon: <Globe className="w-5 h-5" /> },
    { id: 'server-status-checker', name: 'Server Status Checker', category: 'analysis', description: 'Check the status of your server.', icon: <Zap className="w-5 h-5" /> },
    { id: 'website-screenshot', name: 'Website Screenshot Generator', category: 'utility', description: 'Generate a screenshot of any website.', icon: <Globe className="w-5 h-5" /> },
    { id: 'url-rewriting-tool', name: 'URL Rewriting Tool', category: 'seo', description: 'Rewrite dynamic URLs to static URLs.', icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'grammar-checker', name: 'Grammar Checker', category: 'ai_content', description: 'Check your text for grammar errors.', icon: <PenTool className="w-5 h-5" /> },
    { id: 'readability-checker', name: 'Readability Checker', category: 'analysis', description: 'Check the readability score of your text.', icon: <FileText className="w-5 h-5" /> },
    { id: 'md5-generator', name: 'MD5 Generator', category: 'utility', description: 'Generate MD5 hash for any text.', icon: <Lock className="w-5 h-5" /> },
    { id: 'sha1-generator', name: 'SHA1 Generator', category: 'utility', description: 'Generate SHA1 hash for any text.', icon: <Lock className="w-5 h-5" /> },
    { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', category: 'utility', description: 'Encode or decode text to Base64.', icon: <Code className="w-5 h-5" /> },
    { id: 'html-minifier', name: 'HTML Minifier', category: 'minifiers', description: 'Minify HTML code to reduce file size.', icon: <Code className="w-5 h-5" /> },
    { id: 'json-formatter', name: 'JSON Formatter', category: 'utility', description: 'Format and validate JSON data.', icon: <Code className="w-5 h-5" /> },
    { id: 'utm-builder', name: 'UTM Builder', category: 'seo', description: 'Build UTM tracking URLs for campaigns.', icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'open-graph-checker', name: 'Open Graph Checker', category: 'seo', description: 'Check Open Graph tags of any URL.', icon: <Share2 className="w-5 h-5" /> },
    { id: 'twitter-card-generator', name: 'Twitter Card Generator', category: 'seo', description: 'Generate Twitter Card meta tags.', icon: <Share2 className="w-5 h-5" /> },
    { id: 'canonical-tag-generator', name: 'Canonical Tag Generator', category: 'seo', description: 'Generate canonical tags for your pages.', icon: <Code className="w-5 h-5" /> },
    { id: 'http-headers-checker', name: 'HTTP Headers Checker', category: 'analysis', description: 'Check HTTP headers returned by a server.', icon: <Zap className="w-5 h-5" /> },
    { id: 'privacy-policy-generator', name: t('tools_list.items.privacy_policy.name'), category: 'utility', description: t('tools_list.items.privacy_policy.desc'), icon: <FileText className="w-5 h-5" /> },
    { id: 'url-encoder-decoder', name: t('tools_list.items.url_codec.name'), category: 'utility', description: t('tools_list.items.url_codec.desc'), icon: <Lock className="w-5 h-5" /> },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title="All SEO Tools" 
        description="Explore our complete collection of free SEO tools, AI content generators, and website analysis utilities."
        keywords="SEO tools list, free SEO utilities, AI content tools, website analysis, keyword research tools"
      />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t('tools_list.categories_title')}</h2>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      activeCategory === category.id
                        ? "bg-[#4f39f6]/10 text-[#4f39f6] dark:bg-[#4f39f6]/20 dark:text-[#4f39f6]"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('tools_list.title')}</h1>
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f39f6] focus:border-[#4f39f6] sm:text-sm transition-shadow"
                placeholder={t('tools.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  to={`/tools/${tool.id}`}
                  onClick={(e) => handleToolClick(e, tool.id)}
                  className="block h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-[#4f39f6] dark:hover:border-[#4f39f6] hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4f39f6]/10 dark:bg-[#4f39f6]/20 text-[#4f39f6] rounded-xl group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#4f39f6] transition-colors flex items-center gap-2">
                        {tool.name}
                        {!checkIsApproved(tool.id) && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  {!checkIsApproved(tool.id) && (
                    <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Unlock Tool
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t('tools_list.no_tools')}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t('tools_list.no_tools_desc')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
