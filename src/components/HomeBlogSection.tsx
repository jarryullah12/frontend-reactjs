import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAdminStore } from '@/store';

const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html.replace(/<\/p>/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
  return tmp.textContent || tmp.innerText || "";
};

export function HomeBlogSection() {
  const { t } = useTranslation();
  const { blogs, fetchBlogs } = useAdminStore();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

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

  const totalPages = Math.ceil(posts.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + blogsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover the latest SEO strategies, tips, and industry news to help you rank higher.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#4f39f6] dark:group-hover:text-[#4f39f6] transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-1 whitespace-pre-wrap">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-[#4f39f6] text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
