import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import SEO from '../components/SEO';
import { generateSlug } from '../utils/slugify';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log('Blog: starting posts fetch');
        const allPosts = await blogService.getPosts(false);
        console.log('Blog: fetched posts count:', allPosts.length);

        const publishedPosts = allPosts.filter(p => p.status === 'published');
        console.log('Blog: filtered published posts:', publishedPosts.length);
        setPosts(publishedPosts);
      } catch (err) {
        console.error('Error in Blog page fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePreFetch = (id: string) => {
    blogService.getPostById(id);
  };

  const BlogSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 h-[600px]">
          <div className="h-64 bg-slate-200 dark:bg-slate-800" />
          <div className="p-10 space-y-4">
            <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="w-full h-8 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="w-full h-24 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 text-center">
            <div className="w-32 h-6 bg-blue-50 dark:bg-blue-900/30 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-12 bg-slate-100 dark:bg-slate-900 mx-auto mb-6 rounded animate-pulse" />
            <div className="w-96 h-4 bg-slate-100 dark:bg-slate-900 mx-auto rounded animate-pulse" />
          </header>
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-4 py-20">
      <SEO 
        title="Career Blog - ProResumeLab"
        description="Expert advice on resumes, cover letters, interviews, and climbing the corporate ladder in the age of AI."
        keywords="career advice, resume blog, job hunt tips, interview preparation, AI career tools"
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest mb-6">
            <BookOpen size={14} />
            Career Insights
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            ProResume<span className="text-blue-600">Blog</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-medium text-lg">
            Expert advice on resumes, cover letters, interviews, and climbing the corporate ladder in the age of AI.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length > 0 ? posts.map((post) => (
            <article 
              key={post.id} 
              onMouseEnter={() => handlePreFetch(post.id)}
              className="group bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600'} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-xl">
                    {post.category || 'Insights'}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-blue-600" />
                    {post.date || new Date().toISOString().split('T')[0]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-blue-600" />
                    {post.author || 'Admin'}
                  </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <Link 
                  to={`/blog/${generateSlug(post.title)}-${post.id}`} 
                  className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-widest group-hover:gap-3 transition-all"
                >
                  Read Full Article
                  <ArrowRight size={16} className="text-blue-600" />
                </Link>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-medium">No articles found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
