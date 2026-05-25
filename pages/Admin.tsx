
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser, getSupabase } from '../services/supabase';
import { blogService } from '../services/blogService';
import { BlogPost, User } from '../types';
import { isAdminEmail } from '../utils/auth';
import { LayoutDashboard, FileText, Plus, Trash2, Edit, Save, X, Eye, CheckCircle, Clock, Users, Shield, Mail, Calendar, Search, RefreshCw } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Admin: React.FC<{ user?: User | null }> = ({ user: appUser }) => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'users'>('blogs');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(
    appUser?.role === 'admin' || isAdminEmail(appUser?.email)
  );
  const [blogsError, setBlogsError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      // If we already know from App.tsx, we can skip the initial redirect risk
      if (appUser?.role === 'admin' || isAdminEmail(appUser?.email)) {
        setIsAdmin(true);
        await fetchData();
        return;
      }

      const authUser = await getAuthenticatedUser(3, 250);
      if (!authUser) {
        navigate('/login');
        return;
      }

      await processProfile(authUser.id, authUser.email);
    };

    const processProfile = async (userId: string, userEmail?: string | null) => {
      const { data: profile } = await getSupabase()
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      const hasAdminAccess = profile?.role === 'admin' || isAdminEmail(userEmail);
      if (!hasAdminAccess) {
        navigate('/');
        return;
      }

      if (profile?.role !== 'admin' && isAdminEmail(userEmail)) {
        await getSupabase().from('profiles').update({ role: 'admin' }).eq('id', userId);
      }

      setIsAdmin(true);
      await fetchData();
    };

    checkAdmin();
  }, [navigate, appUser]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchBlogs(), fetchUsers()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setBlogsError(null);
      const posts = await blogService.getPosts(true, { forceFresh: true, throwOnError: true });
      setBlogs(posts);
    } catch (err) {
      console.error('Error fetching blogs for admin:', err);
      setBlogs([]);
      setBlogsError('Blog fetch failed from database. Check blog_posts table policies/columns in Supabase.');
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await getSupabase()
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const supabase = getSupabase();
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (!error) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        alert('Error deleting post: ' + error.message);
      }
    }
  };

  const toggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const supabase = getSupabase();
    const { error } = await supabase
      .from('blog_posts')
      .update({ status: newStatus })
      .eq('id', post.id);
    
    if (!error) {
      setBlogs(blogs.map(b => b.id === post.id ? { ...b, status: newStatus } : b));
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    category: 'Career Development',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.content) {
      alert('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      const postToSave = {
        ...currentPost,
        date: currentPost.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      
      const saved = await blogService.savePost(postToSave as BlogPost);
      if (saved) {
        setIsEditing(false);
        setCurrentPost({
          title: '',
          excerpt: '',
          content: '',
          author: 'Admin',
          category: 'Career Development',
          status: 'draft',
          image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        });
        fetchBlogs();
      }
    } catch (err) {
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const startNew = () => {
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      category: 'Career Development',
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
    setIsEditing(true);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];

  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest animate-pulse">Verifying Credentials</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Connecting to secure administrative layer...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tighter">
            <LayoutDashboard className="text-blue-600" size={36} />
            Control Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Platform overview and management console</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'blogs' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Blog Management
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            User Directory
          </button>
        </div>
      </div>

      {activeTab === 'blogs' ? (
        <>
          {isEditing ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                  {currentPost.id ? 'Refining Article' : 'Drafting New Article'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-600 transition">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Article Title</label>
                    <input 
                      type="text" 
                      value={currentPost.title}
                      onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                      className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-lg font-black transition-all outline-none" 
                      placeholder="e.g., The Future of AI in Recruitment"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Author Identity</label>
                    <input 
                      type="text" 
                      value={currentPost.author}
                      onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold transition-all outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Knowledge Vertical</label>
                    <select 
                      value={currentPost.category}
                      onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold transition-all outline-none appearance-none"
                    >
                      <option>Career Development</option>
                      <option>Resume Tips</option>
                      <option>Interview Prep</option>
                      <option>Industry Insights</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Featured Asset URL</label>
                    <input 
                      type="text" 
                      value={currentPost.image}
                      onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold transition-all outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Publish Date</label>
                    <input 
                      type="text" 
                      value={currentPost.date}
                      onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold transition-all outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Core Summary (Excerpt)</label>
                    <textarea 
                      value={currentPost.excerpt}
                      onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold transition-all outline-none h-24"
                      placeholder="Brief overview for the card display..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Article Body Content (Rich Text)</label>
                    <div className="quill-editor-container">
                      <ReactQuill 
                        theme="snow"
                        value={currentPost.content}
                        onChange={(content) => setCurrentPost({ ...currentPost, content })}
                        modules={quillModules}
                        formats={quillFormats}
                        className="bg-white dark:bg-slate-900 rounded-2xl"
                      />
                    </div>
                    <style>{`
                      .quill-editor-container .ql-toolbar {
                        border-top-left-radius: 1rem;
                        border-top-right-radius: 1rem;
                        border-color: transparent !important;
                        background: #f8fafc;
                        padding: 0.75rem;
                      }
                      .dark .quill-editor-container .ql-toolbar {
                        background: #1e293b;
                      }
                      .quill-editor-container .ql-container {
                        border-bottom-left-radius: 1rem;
                        border-bottom-right-radius: 1rem;
                        border-color: #f1f5f9 !important;
                        min-height: 400px;
                        font-size: 1rem;
                      }
                      .dark .quill-editor-container .ql-container {
                        border-color: #1e293b !important;
                        color: #f8fafc;
                      }
                      .quill-editor-container .ql-editor {
                        min-height: 400px;
                        padding: 1.5rem;
                      }
                    `}</style>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Visibility Status</label>
                    <div className="flex gap-4">
                      {['draft', 'published'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setCurrentPost({ ...currentPost, status: s })}
                          className={`flex-1 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                            currentPost.status === s 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20' 
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                          }`}
                        >
                          {s === 'published' ? <CheckCircle size={14} className="inline mr-2" /> : <Clock size={14} className="inline mr-2" />}
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-10 border-t border-slate-50 dark:border-slate-800">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 rounded-2xl font-black text-slate-500 hover:text-slate-700 transition"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-2xl shadow-blue-500/30 flex items-center gap-3"
                  >
                    {loading ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
                    {currentPost.id ? 'Commit Changes' : 'Initialize Article'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <button 
                  onClick={startNew}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition flex items-center gap-3 shadow-2xl shadow-blue-500/20"
                >
                  <Plus size={20} /> Initialize New Article
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <FileText size={22} className="text-blue-600" />
                    Article Inventory ({blogs.length})
                  </h2>
                  <button onClick={fetchBlogs} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition">
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  {blogsError && (
                    <div className="mx-8 mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
                      {blogsError}
                    </div>
                  )}
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Info</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">State</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {blogs.length === 0 && !loading ? (
                        <tr>
                          <td colSpan={3} className="px-8 py-24 text-center">
                            <div className="mb-4 flex justify-center">
                              <FileText size={48} className="text-slate-200 dark:text-slate-800" />
                            </div>
                            <p className="text-slate-500 font-bold">The article inventory is currently empty.</p>
                          </td>
                        </tr>
                      ) : blogs.map((post) => (
                        <tr key={post.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm">
                                {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" /> : <div className="w-full h-full flex items-center justify-center font-black text-slate-300">N/A</div>}
                              </div>
                              <div>
                                <h4 className="font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-tight">
                                  <span>{post.category}</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                                  <span>{post.date}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <button 
                              onClick={() => toggleStatus(post)}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                post.status === 'published' 
                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                              }`}
                            >
                              {post.status === 'published' ? <CheckCircle size={14} /> : <Clock size={14} />}
                              {post.status}
                            </button>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition"
                                title="View live"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition"
                                title="Edit context"
                                onClick={() => startEdit(post)}
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDelete(post.id)}
                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                                title="Purge entry"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Population</p>
               <h3 className="text-4xl font-black text-slate-900 dark:text-white">{users.length}</h3>
             </div>
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">System Admins</p>
               <h3 className="text-4xl font-black text-blue-600">{users.filter(u => u.role === 'admin').length}</h3>
             </div>
             <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Users</p>
               <h3 className="text-4xl font-black text-emerald-500">{users.filter(u => u.role !== 'admin').length}</h3>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <Users size={22} className="text-blue-600" />
                User Directory
              </h2>
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Query by identity or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-600/5 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Role</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registered Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-24 text-center text-slate-500 font-bold">No identities match your query.</td>
                    </tr>
                  ) : filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 border border-slate-100 dark:border-slate-800 group-hover:border-blue-200 transition-colors uppercase">
                            {user.name?.substring(0, 2) || user.email.substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 dark:text-white capitalize">{user.name || 'Anonymous User'}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                              <Mail size={12} />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400'}`}>
                          <Shield size={12} />
                          {user.role || 'user'}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <Calendar size={14} />
                          {user.id ? (new Date(parseInt(user.id.substring(0,8), 16) * 1000).toLocaleDateString()) : 'N/A'}
                        </div>
                        <p className="text-[10px] text-slate-300 font-medium mt-1">ID: ...{user.id.substring(24)}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="inline-flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
