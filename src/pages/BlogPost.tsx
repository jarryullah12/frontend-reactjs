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

// Sanitize Quill HTML: collapse \n inside text nodes so pre-wrap doesn't
// render them as visible line breaks (which splits words mid-character).
const sanitizeQuillHtml = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;

  const walkNodes = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Collapse all runs of whitespace/newlines AND non-breaking spaces (\u00A0) to a single space
      // this fixes the issue where Quill stores paragraphs as one giant non-breaking word
      node.textContent = (node.textContent || '').replace(/[\r\n\u00A0]+/g, ' ').replace(/\s{2,}/g, ' ');
    } else {
      node.childNodes.forEach(walkNodes);
    }
  };

  // Only sanitize inline text — walk all child nodes
  tmp.childNodes.forEach(walkNodes);
  return tmp.innerHTML;
};

export function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { blogs, fetchBlogs } = useAdminStore();
  
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const post = blogs.find(p => p.slug === id || p.id === id);
  const rawContent = post ? post.content : '<p>Content coming soon...</p>';
  // Sanitize newlines inside text nodes (Quill stores \n mid-word, pre-wrap renders them)
  const htmlContent = typeof document !== 'undefined' ? sanitizeQuillHtml(rawContent) : rawContent;
  
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
        canonical={`https://optiseo.com/blog/${post.slug || post.id}`}
      />
      {/* Header & Image Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-20 pb-0">
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

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-4">
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
              className="w-full h-auto"
              referrerPolicy="no-referrer"
              loading="eager"
              width="1200"
              height="600"
            />
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16 pt-8">
        <div className="flex flex-col gap-16">
          {/* Main Content */}
          <div className="w-full min-w-0">
            <article
              className="blog-prose w-full"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {/* Related Posts (Moved Below) */}
          <div className="w-full border-t border-gray-200 dark:border-gray-800 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.filter(p => p.slug !== id && p.id !== id).slice(0, 3).map(p => (
                <Link key={p.id} to={`/blog/${p.slug || p.id}`} className="block group bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-[#4f39f6] dark:hover:border-[#4f39f6] transition-all">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-[#4f39f6] transition-colors line-clamp-2 mb-2">
                    {p.title}
                  </h4>
                  <span className="text-sm text-gray-500 block">{p.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
