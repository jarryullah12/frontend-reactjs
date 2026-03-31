import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAdminStore } from '@/store';
import { SEO } from '../components/SEO';

const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { blogs, fetchBlogs } = useAdminStore();
  
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const post = blogs.find(p => p.slug === id || p.id === id);
  const htmlContent = post ? post.content : '<p>Content coming soon...</p>';
  
  // Calculate word count
  const wordCount = htmlContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-[#4f39f6] hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-950 min-h-screen"
    >
      <SEO 
        title={post.title} 
        description={stripHtml(post.content).substring(0, 160)}
        image={post.image}
        keywords={`${post.category}, SEO, marketing, blog`}
      />
      {/* Header & Image Section */}
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4f39f6] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="mb-6">
            <span className="px-3 py-1 bg-[#4f39f6]/10 text-[#4f39f6] text-xs font-semibold rounded-full uppercase tracking-wide inline-block">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-10">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read ({wordCount} words)</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-12">
            <img 
              src={post.image} 
              alt={`Cover image for ${post.title}`}
              className="w-full h-auto max-h-[500px] object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
              width="1200"
              height="600"
            />
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <div className="md:w-80 space-y-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Posts</h3>
              <div className="space-y-4">
                {blogs.filter(p => p.slug !== id && p.id !== id).slice(0, 3).map(p => (
                  <Link key={p.id} to={`/blog/${p.slug || p.id}`} className="block group">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#4f39f6] transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <span className="text-xs text-gray-500 mt-1 block">{p.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
