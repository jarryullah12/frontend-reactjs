import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import SEO from '../components/SEO';
import { generateSlug } from '../utils/slugify';

const BlogPostDetail: React.FC = () => {
  const { id: slugParam } = useParams<{ id: string }>();
  // Extract UUID from the slug URL (e.g., my-post-title-34c21...)
  // Or fallback to the param itself if it's purely an ID
  const id = slugParam?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)?.[0] || slugParam;

  const [post, setPost] = useState<BlogPost | null>(() => {
    if (id) {
      const cached = blogService.getPostFromCache(id);
      if (cached && cached.content) return cached;
    }
    return null;
  });
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(!post);
 
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    if (id.startsWith('demo-article')) {
      const demoPost = {
        id: id,
        title: "How to structure your resume in 2026",
        excerpt: "Learn the best tips and tricks to optimize your ATS resume to get noticed by recruiters faster.",
        content: "<p>When structuring your resume in 2026, you must prioritize Machine Learning ATS (Applicant Tracking Systems) parsers while keeping the document highly readable for a human recruiter.</p><h3>1. The Summary Section</h3><p>Start with a high-impact professional summary. Avoid generic objective statements. Focus on your years of experience, core skills, and absolute top achievement.</p><h3>2. Experience & Impact</h3><p>Instead of listing responsibilities, list quantifiable achievements. Use the XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z].' For example: <strong>Increased revenue by 15% through implementing a new CRM system.</strong></p><h3>3. Skills Matrix</h3><p>Group your skills logically. Hard skills (technologies, languages, certifications) should be right at the top beneath the summary or integrated into the experience bullet points.</p>",
        author: "Demo Author",
        date: "May 20, 2026",
        category: "Career Tips",
        status: "published" as const,
        image: `https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200`,
      };
      setPost(demoPost);
      setLoading(false);
      
      // Still fetch recent posts if possible, but mock them if it's just dummy view
      setRecentPosts([]);
      return;
    }

    // Check cache synchronously for fast switching
    const cached = blogService.getPostFromCache(id);
    if (cached && cached.content) {
      setPost(cached);
      setLoading(false);
    } else {
      setLoading(true);
      setPost(cached || null); // show whatever partial data we have, if we implement partial rendering
    }

    // Fire network requests concurrently
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log('BlogPostDetail: fetching post:', id);
        const found = await blogService.getPostById(id);
        
        if (found) {
          console.log('BlogPostDetail: post found');
          setPost(found);
        } else {
          console.log('BlogPostDetail: post not found');
        }
      } catch (err) {
        console.error('Error fetching post detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    blogService.getRecentPosts(3, id).then(recent => {
      setRecentPosts(recent);
    }).catch(err => {
      console.error('Error fetching recent posts:', err);
    });

  }, [id]);

  if (!loading && !post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-4">Post not found</h2>
          <Link to="/blog" className="text-blue-600 font-bold hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Skeleton UI for faster perceived load
  const Skeleton = () => (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 animate-pulse">
      <div className="bg-slate-900 pt-32 pb-48 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="w-24 h-4 bg-slate-800 rounded mb-8" />
          <div className="w-32 h-6 bg-slate-800 rounded-full mb-6" />
          <div className="w-3/4 h-12 bg-slate-800 rounded mb-8" />
          <div className="flex gap-4">
            <div className="w-24 h-4 bg-slate-800 rounded" />
            <div className="w-24 h-4 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-20">
        <div className="aspect-video rounded-[2.5rem] bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="max-w-4xl mx-auto px-6 mt-16 space-y-4">
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded" />
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded" />
        <div className="w-2/3 h-4 bg-slate-100 dark:bg-slate-900 rounded" />
      </div>
    </div>
  );

  if (loading && !post) {
    return <Skeleton />;
  }
 
  // Calculate accurate read time skipping HTML and base64 junk
  const getReadTime = (content: string | undefined) => {
    if (!content) return 1;
    const text = content.replace(/<[^>]*>/g, ' ');
    const cleanText = text.replace(/data:image\/[^;]+;base64,[^\s"]+/g, '');
    const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };
 
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <SEO
        title={`${post.title} - ProResumeLab Blog`}
        description={post.excerpt}
        keywords={`${post.category}, career growth, resume tips, job hunt`}
        image={post.image}
        type="article"
      />
 
      {/* ─── Inline styles for blog-content word-break fix ─── */}
      <style>{`
        .prose,
        .prose *,
        .blog-content,
        .blog-content * {
          box-sizing: border-box !important;
          letter-spacing: normal !important;
          word-spacing: normal !important;
          line-height: 1.6 !important;
          word-break: keep-all !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          white-space: normal !important;
          text-align: left !important;
          text-rendering: auto !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          -moz-hyphens: none !important;
          -ms-hyphens: none !important;
        }

        .prose p,
        .blog-content p,
        .blog-content span,
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6,
        .blog-content li,
        .blog-content div {
          box-sizing: border-box !important;
          letter-spacing: normal !important;
          word-spacing: normal !important;
          line-height: 1.6 !important;
          word-break: keep-all !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          white-space: normal !important;
          text-align: left !important;
          text-rendering: auto !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          -moz-hyphens: none !important;
          -ms-hyphens: none !important;
        }

        .dark .blog-content,
        .dark .blog-content p,
        .dark .blog-content span,
        .dark .blog-content li,
        .dark .blog-content h1,
        .dark .blog-content h2,
        .dark .blog-content h3,
        .dark .blog-content h4,
        .dark .blog-content h5,
        .dark .blog-content h6,
        .dark .blog-content strong,
        .dark .blog-content em,
        .dark .blog-content blockquote,
        .dark .blog-content table,
        .dark .blog-content tr,
        .dark .blog-content td,
        .dark .blog-content th {
          background-color: transparent !important;
          color: #f8fafc !important; /* slate-50 */
        }
        .dark .blog-content a {
          color: #60a5fa !important; /* blue-400 */
          background-color: transparent !important;
        }
        .dark .blog-content code {
          background-color: #1e293b !important; /* slate-800 */
          color: #f8fafc !important;
          padding: 2px 4px;
          border-radius: 4px;
        }
        .dark .blog-content pre {
          background-color: #0f172a !important; /* slate-900 */
          color: #f8fafc !important;
          border: 1px solid #1e293b;
        }
        .blog-content img,
        .blog-content video,
        .blog-content iframe {
          max-width: 100% !important;
          height: auto;
        }
        /* Code blocks — allow horizontal scroll, no forced wrap */
        .blog-content pre,
        .blog-content pre * {
          overflow-x: auto !important;
          white-space: pre !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          word-wrap: normal !important;
        }
        /* Links — wrap standardly but break long URLs safely if needed */
        .blog-content a {
          word-break: break-all !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
      `}</style>
 
      {/* Hero Section */}
      <div className="bg-slate-900 pt-32 pb-48 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
 
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-black uppercase text-[10px] tracking-widest mb-8 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Insights
          </Link>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 font-black text-[10px] uppercase tracking-widest mb-6"
          >
            {post.category}
          </motion.div>
 
          {/* FIX: break-words + overflow-wrap on title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight break-words"
          >
            {post.title}
          </motion.h1>
 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-slate-400 text-xs font-black uppercase tracking-widest"
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              {post.author}
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Clock size={16} className="text-blue-500" />
              {getReadTime(post.content)} min read
            </div>
          </motion.div>
        </div>
      </div>
 
      {/* Featured Image — Breaking out of the background */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-950"
        >
          <img
            src={post.image || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
 
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 mt-16 relative z-10 w-full max-w-full block box-border text-left break-words">
        {post.content ? (
          <div
            className="blog-content block w-full max-w-full prose prose-slate lg:prose-xl dark:prose-invert prose-img:max-w-full prose-img:h-auto prose-img:rounded-3xl prose-img:shadow-2xl prose-img:mx-auto prose-headings:font-black prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:max-w-full prose-pre:overflow-x-auto text-slate-700 dark:text-white leading-relaxed font-medium text-left"
            style={{ 
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              letterSpacing: 'normal',
              wordSpacing: 'normal',
              lineHeight: 1.6,
              textAlign: 'left',
              wordBreak: 'keep-all', 
              overflowWrap: 'break-word', 
              wordWrap: 'break-word', 
              whiteSpace: 'normal',
              textRendering: 'auto',
              WebkitHyphens: 'none',
              msHyphens: 'none',
              hyphens: 'none'
            }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/&nbsp;/g, ' ').replace(/[\u00A0]/g, ' ').replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '') }}
          />
        ) : (
          <div className="animate-pulse space-y-4 pt-8 pb-32">
            <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded" />
            <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded" />
            <div className="w-11/12 h-4 bg-slate-100 dark:bg-slate-900 rounded" />
            <div className="w-3/4 h-4 bg-slate-100 dark:bg-slate-900 rounded" />
            <div className="w-full h-48 bg-slate-100 dark:bg-slate-900 rounded mt-8" />
          </div>
        )}

        {/* Footer info */}
        <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 shrink-0 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl">
              {post.author[0]}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Author</p>
              {/* FIX: break-words on author name */}
              <h4 className="text-xl font-black text-slate-900 dark:text-white break-words">{post.author}</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Career Development Expert & Senior Editor</p>
            </div>
          </div>
        </div>
      </div>
 
      {/* Recent Articles Section */}
      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-32">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Recent Articles</h2>
              <p className="text-slate-500 font-medium">Continue reading our latest insights</p>
            </div>
            <Link
              to="/blog"
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer min-w-0"
              >
                <Link to={`/blog/${generateSlug(article.title)}-${article.id}`}>
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  {/* FIX: break-words on card titles */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 break-words">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                      Read <ChevronRight size={10} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
 
export default BlogPostDetail;
