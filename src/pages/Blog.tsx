import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAdminStore } from '@/store';
import { SEO } from '../components/SEO';

const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html.replace(/<\/p>/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
  return tmp.textContent || tmp.innerText || "";
};

export function Blog() {
  const { t } = useTranslation();
  const { blogs, fetchBlogs } = useAdminStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const posts = blogs.map(blog => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: stripHtml(blog.content).substring(0, 150) + '...',
    image: blog.image,
    category: blog.category,
    author: blog.author,
    date: blog.date,
  }));

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <SEO 
        title="SEO & Marketing Blog" 
        description="Read the latest articles, tips, and strategies on SEO, digital marketing, and content creation."
        keywords="SEO blog, digital marketing tips, content creation strategies, OptiSEO blog"
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{t('blog.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('blog.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
          >
            <div className="relative h-48 overflow-hidden">
              <Link to={`/blog/${post.slug || post.id}`}>
                <img
                  src={post.image}
                  alt={`Cover image for blog post: ${post.title}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="800"
                  height="400"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[#4f39f6] dark:text-[#4f39f6] text-xs font-semibold rounded-full uppercase tracking-wide">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <Link to={`/blog/${post.slug || post.id}`}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#4f39f6] dark:group-hover:text-[#4f39f6] transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-1 whitespace-pre-wrap">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition-colors inline-flex items-center gap-2">
          {t('blog.load_more')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
