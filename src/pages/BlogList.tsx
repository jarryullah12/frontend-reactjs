
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { PenTool, ChevronRight, ChevronLeft, Tag, Search, User } from 'lucide-react';
<<<<<<< HEAD
import { calculators } from '../data/calculators';
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  author_name: string;
}

const POSTS_PER_PAGE = 10;

export function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
<<<<<<< HEAD
  const [categories, setCategories] = useState<string[]>([]);
=======
  const [categories, setCategories] = useState<string[]>(['Loan Calculators', 'Investment & Savings']);
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
<<<<<<< HEAD
    const uniqueCategories = [...new Set(calculators.map(c => c.category))];
    setCategories(uniqueCategories);

=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
    const fetchPosts = async () => {
      setLoading(true);
      
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else if (data) {
        setPosts(data as Post[]);
        setTotalPosts(count || 0);
      }
      setLoading(false);
    };

    const debounceFetch = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [currentPage, selectedCategory, searchTerm]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-800">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            FinovaCalc <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Expert articles on personal finance, investing, loans, mortgages, and retirement planning.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Search and Category Filters */}
          <div className="mb-12">
            <div className="relative mb-6 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search for articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-full border-gray-300 px-6 py-4 pr-12 text-sm shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button 
                onClick={() => handleCategorySelect(null)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategory === null ? 'bg-brand-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategory === category ? 'bg-brand-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  <Tag className="h-4 w-4"/>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading && (
              <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading Posts...</p>
              </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-extrabold text-gray-900">No Articles Found</h2>
              <p className="mt-4 text-gray-500">Your search for "{searchTerm}" did not return any results.</p>
              <Link
                to="/upload-blog"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-base font-semibold text-white hover:bg-brand-dark transition-all duration-300"
              >
                <PenTool className="h-4 w-4" />
                Publish an Article
              </Link>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group card-hover rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm flex flex-col"
                >
                  <div className="img-zoom h-48 relative">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'; }}
                    />
                     <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary backdrop-blur-sm">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                       <span>{formatDate(post.created_at)}</span>
                       <span className="flex items-center gap-1"><User className="h-3 w-3"/> {post.author_name || 'jarryullah46'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors leading-tight line-clamp-2 flex-grow">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    <div className="mt-4 flex items-center text-brand-secondary font-semibold text-sm group-hover:text-brand-primary transition-colors">
                      Read More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-between items-center">
                    <button 
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                        className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        Previous
                    </button>
                    
                    <span className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button 
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight className="h-4 w-4"/>
                    </button>
                </div>
            )}
            </>
          )}

        </div>
      </section>
    </div>
  );
}
