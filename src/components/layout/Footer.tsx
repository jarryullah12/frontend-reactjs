import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo';
import { Linkedin, Github } from 'lucide-react';

const TikTok = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  const { t } = useTranslation();

  const tools = [
    { id: 'meta-tag-generator', name: t('tools_list.items.meta_tag.name') },
    { id: 'robots-txt-generator', name: t('tools_list.items.robots.name') },
    { id: 'xml-sitemap-generator', name: t('tools_list.items.sitemap.name') },
    { id: 'schema-validator', name: t('tools_list.items.schema.name') },
    { id: 'keyword-density', name: t('tools_list.items.density.name') },
    { id: 'content-analyzer', name: t('tools_list.items.analyzer.name') },
    { id: 'css-minifier', name: t('tools_list.items.css_min.name') },
    { id: 'js-minifier', name: t('tools_list.items.js_min.name') },
    { id: 'ai-blog-generator', name: t('tools_list.items.blog_gen.name') },
    { id: 'ai-article-rewriter', name: t('tools_list.items.rewriter.name') },
    { id: 'ai-content-ideas', name: t('tools_list.items.ideas.name') },
    { id: 'ai-sales-email', name: t('tools_list.items.sales_email.name') },
    { id: 'ai-social-bio', name: t('tools_list.items.bio.name') },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo className="w-8 h-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#4f39f6] to-purple-600 bg-clip-text text-transparent">
                OptiSEO
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/muhammad-jarry-ullah-a6b05b306/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0077b5] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/jarryullah12" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com/@jarryullah46" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <TikTok className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('footer.product')}</h3>
            <ul className="space-y-3">
              <li><Link to="/tools" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('nav.tools')}</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('nav.pricing')}</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('nav.contact')}</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">{t('footer.terms')}</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('nav.tools')}</h3>
            <ul className="space-y-3">
              {tools.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <Link to={`/tools/${tool.id}`} className="text-sm text-gray-500 hover:text-[#4f39f6] dark:text-gray-400 dark:hover:text-[#4f39f6]">
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tools" className="text-sm font-medium text-[#4f39f6] hover:text-[#4f39f6]/80">
                  View all tools
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} OptiSEO. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
