import React, { useState, useEffect } from 'react';
import { useAuthStore, useAdminStore } from '@/store';
import { Navigate, Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Plus, 
  Trash2, 
  Shield, 
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  BarChart,
  Clock,
  Star,
  Zap,
  CreditCard,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { SEO } from '../components/SEO';
import Editor from 'react-simple-wysiwyg';

const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export function Admin() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const { blogs, users, payments, fetchBlogs, fetchUsers, fetchPayments, addBlog, deleteBlog, deleteUser, updateUserRole, updatePaymentStatus } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'users' | 'blogs' | 'dashboard' | 'payments'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Pagination State
  const [usersPage, setUsersPage] = useState(1);
  const [blogsPage, setBlogsPage] = useState(1);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const itemsPerPage = 10;
  
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    category: 'SEO',
    image: 'https://picsum.photos/seed/blog/800/400',
    author: 'Admin'
  });

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchBlogs();
      fetchUsers();
      fetchPayments();
    }
  }, [isAuthenticated, user, fetchBlogs, fetchUsers, fetchPayments]);

  // Security check: Only allow admin role
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    addBlog(newBlog);
    setIsAddBlogModalOpen(false);
    setNewBlog({
      title: '',
      content: '',
      category: 'SEO',
      image: 'https://picsum.photos/seed/blog/800/400',
      author: 'Admin'
    });
  };

  const premiumUsersCount = users.filter(u => u.role === 'premium').length;
  const freeUsersCount = users.filter(u => u.role !== 'premium' && u.role !== 'admin').length;

  // Pagination and Filtering Logic
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice((usersPage - 1) * itemsPerPage, usersPage * itemsPerPage);
  const totalUsersPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.category.toLowerCase().includes(searchQuery.toLowerCase()));
  const paginatedBlogs = filteredBlogs.slice((blogsPage - 1) * itemsPerPage, blogsPage * itemsPerPage);
  const totalBlogsPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const filteredPayments = payments.filter(p => 
    p.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedPayments = filteredPayments.slice((paymentsPage - 1) * itemsPerPage, paymentsPage * itemsPerPage);
  const totalPaymentsPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handleTabChange = (tab: 'users' | 'blogs' | 'dashboard' | 'payments') => {
    setActiveTab(tab);
    setUsersPage(1);
    setBlogsPage(1);
    setPaymentsPage(1);
    setSearchQuery('');
  };

  return (
    <>
      <SEO title="Admin Dashboard - OptiSEO" description="Manage users and blogs." noindex />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4f39f6] rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-xl">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              activeTab === 'dashboard' 
                ? "bg-[#4f39f6] text-white shadow-lg shadow-[#4f39f6]/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => handleTabChange('users')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              activeTab === 'users' 
                ? "bg-[#4f39f6] text-white shadow-lg shadow-[#4f39f6]/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Users className="w-5 h-5" />
            User Management
          </button>
          <button
            onClick={() => handleTabChange('blogs')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              activeTab === 'blogs' 
                ? "bg-[#4f39f6] text-white shadow-lg shadow-[#4f39f6]/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <FileText className="w-5 h-5" />
            Blog Management
          </button>
          <button
            onClick={() => handleTabChange('payments')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              activeTab === 'payments' 
                ? "bg-[#4f39f6] text-white shadow-lg shadow-[#4f39f6]/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <CreditCard className="w-5 h-5" />
            Payments
          </button>
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              Back to Website
            </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold">
            {activeTab === 'dashboard' ? 'Dashboard Overview' : 
             activeTab === 'users' ? 'User Management' : 
             activeTab === 'blogs' ? 'Blog Management' : 
             'Payment Management'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#4f39f6] transition-all"
              />
            </div>
            {activeTab === 'blogs' && (
              <button 
                onClick={() => setIsAddBlogModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#4f39f6] text-white rounded-lg text-sm font-medium hover:bg-[#4f39f6]/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Blog
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#4f39f6]/10 text-[#4f39f6] rounded-xl">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <h3 className="text-2xl font-bold">{users.length}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blog Posts</p>
                        <h3 className="text-2xl font-bold">{blogs.length}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Free Users</p>
                        <h3 className="text-2xl font-bold">{freeUsersCount}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Premium Users</p>
                        <h3 className="text-2xl font-bold">{premiumUsersCount}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {users.slice(0, 5).map((u, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{u.name} joined the platform</p>
                              <p className="text-xs text-gray-500">{u.joinDate}</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Success</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'users' ? (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {paginatedUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold">
                                {u.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{u.name}</p>
                                <p className="text-sm text-gray-500">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                              u.role === 'admin' 
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" 
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            )}>
                              <Shield className="w-3 h-3" />
                              {u.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {u.joinDate}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {u.payment_proof && (
                                <button 
                                  onClick={() => setSelectedImage(u.payment_proof!)}
                                  className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                  title="View Payment Proof"
                                >
                                  <CreditCard className="w-4 h-4" />
                                </button>
                              )}
                              <button 
                                onClick={() => updateUserRole(u.id, u.role === 'admin' ? 'user' : 'admin')}
                                className="p-2 text-gray-400 hover:text-[#4f39f6] transition-colors"
                                title="Toggle Role"
                              >
                                <Shield className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteUser(u.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {totalUsersPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Showing {(usersPage - 1) * itemsPerPage + 1} to {Math.min(usersPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setUsersPage(p => Math.max(1, p - 1))}
                          disabled={usersPage === 1}
                          className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalUsersPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setUsersPage(i + 1)}
                              className={cn(
                                "w-8 h-8 rounded-md text-sm flex items-center justify-center transition-colors",
                                usersPage === i + 1
                                  ? "bg-[#4f39f6] text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              )}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setUsersPage(p => Math.min(totalUsersPages, p + 1))}
                          disabled={usersPage === totalUsersPages}
                          className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeTab === 'blogs' ? (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedBlogs.map((blog) => (
                    <div key={blog.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt={`Blog post cover image: ${blog.title}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          width="400"
                          height="225"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#4f39f6]">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <Link to={`/blog/${blog.slug || blog.id}`} className="hover:text-[#4f39f6] transition-colors">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{stripHtml(blog.content)}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <UserIcon className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-gray-500">{blog.author}</span>
                          </div>
                          <button 
                            onClick={() => deleteBlog(blog.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalBlogsPages > 1 && (
                  <div className="px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm">
                    <p className="text-sm text-gray-500">
                      Showing {(blogsPage - 1) * itemsPerPage + 1} to {Math.min(blogsPage * itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} blogs
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBlogsPage(p => Math.max(1, p - 1))}
                        disabled={blogsPage === 1}
                        className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalBlogsPages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setBlogsPage(i + 1)}
                            className={cn(
                              "w-8 h-8 rounded-md text-sm flex items-center justify-center transition-colors",
                              blogsPage === i + 1
                                ? "bg-[#4f39f6] text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setBlogsPage(p => Math.min(totalBlogsPages, p + 1))}
                        disabled={blogsPage === totalBlogsPages}
                        className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'payments' ? (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {paginatedPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium">{p.user_email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              p.status === 'approved' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              p.status === 'rejected' ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            )}>
                              {p.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(p.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {p.screenshot && (
                                <button 
                                  onClick={() => setSelectedImage(p.screenshot)}
                                  className="p-2 text-gray-400 hover:text-[#4f39f6] transition-colors"
                                  title="View Proof"
                                >
                                  <CreditCard className="w-4 h-4" />
                                </button>
                              )}
                              {p.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => updatePaymentStatus(p.id, 'approved', p.user_id)}
                                    className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                    title="Approve"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => updatePaymentStatus(p.id, 'rejected', p.user_id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {totalPaymentsPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Showing {(paymentsPage - 1) * itemsPerPage + 1} to {Math.min(paymentsPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPaymentsPage(p => Math.max(1, p - 1))}
                          disabled={paymentsPage === 1}
                          className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPaymentsPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPaymentsPage(i + 1)}
                              className={cn(
                                "w-8 h-8 rounded-md text-sm flex items-center justify-center transition-colors",
                                paymentsPage === i + 1
                                  ? "bg-[#4f39f6] text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              )}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setPaymentsPage(p => Math.min(totalPaymentsPages, p + 1))}
                          disabled={paymentsPage === totalPaymentsPages}
                          className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">Select a tab to view content</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add Blog Modal */}
      <AnimatePresence>
        {isAddBlogModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddBlogModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Add New Blog Post</h3>
                  <button 
                    onClick={() => setIsAddBlogModalOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>
                <form onSubmit={handleAddBlog} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input 
                      type="text" 
                      required
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#4f39f6] transition-all"
                      placeholder="Enter blog title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select 
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#4f39f6] transition-all"
                      >
                        <option>SEO</option>
                        <option>AI</option>
                        <option>Marketing</option>
                        <option>Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Author</label>
                      <input 
                        type="text" 
                        required
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#4f39f6] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input 
                      type="url" 
                      required
                      value={newBlog.image}
                      onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-[#4f39f6] transition-all"
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Editor 
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      containerProps={{ className: "w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus-within:ring-2 focus-within:ring-[#4f39f6] transition-all flex flex-col min-h-[300px] overflow-hidden" }}
                      className="prose dark:prose-invert max-w-none p-4 flex-1 overflow-y-auto max-h-[500px] focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#4f39f6] text-white rounded-xl font-bold shadow-lg shadow-[#4f39f6]/20 hover:bg-[#4f39f6]/90 transition-all"
                  >
                    Publish Blog Post
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <XCircle className="w-8 h-8" />
              </button>
              <img 
                src={selectedImage} 
                alt="Payment Proof Receipt" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
