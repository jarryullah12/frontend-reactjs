
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import supabase
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronRight } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
  author_name: string;
  author_bio: string;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (postError || !postData) {
        console.error('Error fetching post:', postError);
        setError(true);
        setLoading(false);
        return;
      }

      setPost(postData as Post);

      const { data: relatedData, error: relatedError } = await supabase
        .from('posts')
        .select('*')
        .eq('category', postData.category)
        .neq('slug', slug)
        .limit(3);

      if (relatedError) {
        console.error('Error fetching related posts:', relatedError);
      } else {
        setRelatedPosts(relatedData as Post[]);
      }
      
      setLoading(false);
    };

    fetchPost();
  }, [slug]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen grid place-items-center bg-white px-6 py-24">
        <div className="text-center">
          <p className="text-base font-semibold text-brand-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Post Not Found</h1>
          <p className="mt-4 text-gray-500">Sorry, we could not find the blog post you are looking for.</p>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gray-800">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 px-3 py-1 text-xs font-semibold text-brand-accent mb-4">
                <Tag className="h-3 w-3" /> {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author_name || 'jarryullah46'}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(post.created_at)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
             <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-auto rounded-xl shadow-lg mb-8"
              />
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <aside>
            <div className="sticky top-24">
              {/* Author Card */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                  <div className="flex items-center gap-4">
                      <img src="https://www.gravatar.com/avatar/?d=mp" alt={post.author_name || 'jarryullah46'} className="h-16 w-16 rounded-full"/>
                      <div>
                          <h4 className="font-bold text-gray-800">{post.author_name || 'jarryullah46'}</h4>
                      </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                      {post.author_bio || 'Jarryullah is a passionate writer and finance enthusiast who loves to simplify complex financial topics.'}
                  </p>
              </div>

              {/* Related Posts */}
              <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                  {relatedPosts.length > 0 ? (
                    <ul className="space-y-4">
                        {relatedPosts.map(relatedPost => (
                            <li key={relatedPost.id}>
                                <Link to={`/blog/${relatedPost.slug}`} className="group block">
                                    <span className="font-semibold text-gray-800 group-hover:text-brand-primary transition-colors line-clamp-2">{relatedPost.title}</span>
                                    <span className="text-sm text-gray-500 block mt-1">In {relatedPost.category}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No related articles found.</p>
                  )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </div>
  );
}
