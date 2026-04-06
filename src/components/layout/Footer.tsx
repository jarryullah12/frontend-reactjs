import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo';
import { Instagram, Github } from 'lucide-react';

const TikTok = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const WhatsApp = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
              <a href="https://www.instagram.com/jarryullah46/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E4405F] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://github.com/jarryullah12" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com/@jarryullah46" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <TikTok className="w-6 h-6" />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb7xUhLISTkU0XWHbJ3Y" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#25D366] transition-colors">
                <WhatsApp className="w-6 h-6" />
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
