import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const resolveApiBase = () => {
  const configuredApiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  if (configuredApiUrl) {
    return configuredApiUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  return '';
};

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  subscription: {
    plan: string;
    expiresAt: string | null;
    isActive: boolean;
  } | null;
  login: (user: any) => void;
  logout: () => void;
  fetchSubscription: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      subscription: null,
      login: (user) => set({ 
        isAuthenticated: true, 
        user: { 
          ...user, 
          role: user.isAdminSession ? 'admin' : (user.role || 'user')
        } 
      }),
      logout: () => set({ isAuthenticated: false, user: null, subscription: null }),
      fetchSubscription: async () => {
        const user = get().user;
        if (!user) return;

        // Fetch join_date and role to keep the local session fresh
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (userData) {
          const joinDate = new Date(userData.join_date || user.joinDate);
          const twoMonthsAgo = new Date();
          twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

          let hasPurchased = userData.role !== 'user';
          if (!hasPurchased) {
            const { data: payments } = await supabase.from('payments').select('id').eq('user_id', user.id).eq('status', 'approved').limit(1);
            if (payments && payments.length > 0) hasPurchased = true;
          }

          if (userData.role !== 'admin' && !hasPurchased && joinDate < twoMonthsAgo) {
            await supabase.from('users').delete().eq('id', user.id);
            await supabase.auth.signOut();
            set({ isAuthenticated: false, user: null, subscription: null });
            // Let the frontend know so it can show an alert or redirect, typically the app will redirect to login once auth state changes
            if (window.location.pathname !== '/login') {
                window.location.href = '/login?error=account_disabled';
            }
            return;
          }

          set({ 
            user: { 
              ...user, 
              joinDate: userData.join_date || user.joinDate,
              role: userData.role || user.role
            } 
          });
        }
        
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .order('approved_at', { ascending: false })
          .limit(1);
          
        if (!error && data && data.length > 0) {
          const payment = data[0];
          const plan = payment.plan || 'pro'; // Default to pro if no plan column
          const approvedAt = new Date(payment.approved_at || payment.date);
          
          let expiresAt: string | null = null;
          let isActive = true;
          
          if (plan.toLowerCase() === 'yearly plan 1' || plan.toLowerCase() === 'yearly plan 2' || plan.toLowerCase() === 'yearly plan 3') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          } else if (plan.toLowerCase() === '1 year plan' || plan.toLowerCase() === 'yearly' || plan.toLowerCase() === 'yearly plan') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setDate(expiryDate.getDate() + 365); // 1 year
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          } else if (plan.toLowerCase() === '5 year plan' || plan.toLowerCase() === '5 year') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setDate(expiryDate.getDate() + (365 * 5)); // 5 years
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          } else if (plan.toLowerCase() === '10 year plan' || plan.toLowerCase() === '10 year') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setDate(expiryDate.getDate() + (365 * 10)); // 10 years
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          } else if (plan.toLowerCase() !== 'lifetime' && plan.toLowerCase() !== 'lifetime pro') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setDate(expiryDate.getDate() + 30); // 30 days for premium/pro
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          }
          
          set({
            subscription: {
              plan: plan.toLowerCase(),
              expiresAt,
              isActive
            }
          });
        } else if (userData && userData.role && userData.role !== 'user') {
          // Fallback to role-based expiry for Lemon Squeezy Users
          const plan = userData.role;
          const approvedAt = userData.subscription_created ? new Date(userData.subscription_created) : new Date(userData.join_date);
          
          let expiresAt: string | null = null;
          let isActive = true;
          
          if (plan.toLowerCase() === 'yearly plan 1' || plan.toLowerCase() === 'yearly plan 2' || plan.toLowerCase() === 'yearly plan 3') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          } else if (plan.toLowerCase() === '1 year plan' || plan.toLowerCase() === 'yearly' || plan.toLowerCase() === 'yearly plan') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setDate(expiryDate.getDate() + 365); // 1 year
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          } else if (plan.toLowerCase() !== 'lifetime' && plan.toLowerCase() !== 'admin') {
            const expiryDate = new Date(approvedAt);
            expiryDate.setDate(expiryDate.getDate() + 30); // 30 days for premium/pro
            expiresAt = expiryDate.toISOString();
            isActive = new Date() < expiryDate;
          }
          
          set({
            subscription: {
              plan: plan.toLowerCase(),
              expiresAt,
              isActive
            }
          });
        } else {
          set({ subscription: null });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

import { supabase } from '../lib/supabase';

interface Blog {
  id: string;
  slug?: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  payment_proof?: string;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  user_email: string;
  screenshot: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  approved_at?: string;
  plan?: string;
}

interface AdminState {
  blogs: Blog[];
  users: User[];
  payments: PaymentRecord[];
  fetchBlogs: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchPayments: () => Promise<void>;
  addBlog: (blog: Omit<Blog, 'id' | 'date'>) => Promise<void>;
  updateBlog: (id: string, blog: Partial<Omit<Blog, 'id' | 'date'>>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUserRole: (id: string, role: string) => Promise<void>;
  updatePaymentStatus: (id: string, status: 'approved' | 'rejected', userId: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      blogs: [],
      users: [],
      payments: [],
      fetchBlogs: async () => {
        const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
        if (!error && data) {
          const mappedBlogs = data.map((b: any) => ({
            ...b,
            date: new Date(b.date).toISOString().split('T')[0]
          }));
          set({ blogs: mappedBlogs });
        }
      },
    fetchUsers: async () => {
      const { data, error } = await supabase.from('users').select('*').order('join_date', { ascending: false });
      if (!error && data) {
        // Map join_date to joinDate for the frontend
        const mappedUsers = data.map((u: any) => ({
          ...u,
          joinDate: new Date(u.join_date).toISOString().split('T')[0]
        }));
        set({ users: mappedUsers });
      }
    },
    addBlog: async (blog) => {
      const slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
        
      const { data, error } = await supabase.from('blogs').insert([{
        title: blog.title,
        slug: slug,
        content: blog.content,
        author: blog.author,
        category: blog.category,
        image: blog.image
      }]).select();
      if (!error && data) {
        const newBlog = {
          ...data[0],
          date: new Date(data[0].date).toISOString().split('T')[0]
        };
        set((state) => ({ blogs: [newBlog, ...state.blogs] }));

        const apiBase = resolveApiBase();
        const endpoint = apiBase ? `${apiBase}/api/sitemap/blog` : '/api/sitemap/blog';
        const blogSlug = newBlog.slug || slug;

        if (blogSlug) {
          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug: blogSlug }),
            });

            if (!response.ok) {
              const responseText = await response.text();
              console.error('Sitemap update failed:', response.status, responseText);
            }
          } catch (sitemapError) {
            console.error('Error updating sitemap after blog creation:', sitemapError);
          }
        }
      } else {
        console.error('Error adding blog:', error);
      }
    },
    updateBlog: async (id, blog) => {
      let slug = blog.title
        ? blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : undefined;
      
      const updateData: any = { ...blog };
      if (slug) updateData.slug = slug;

      const { data, error } = await supabase.from('blogs').update(updateData).eq('id', id).select();
      if (!error && data) {
        const updatedBlog = {
          ...data[0],
          date: new Date(data[0].date).toISOString().split('T')[0]
        };
        set((state) => ({
          blogs: state.blogs.map((b) => b.id === id ? updatedBlog : b)
        }));
      } else {
        console.error('Error updating blog:', error);
      }
    },
    deleteBlog: async (id) => {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) {
        set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }));
      }
    },
    deleteUser: async (id) => {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (!error) {
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
      }
    },
    updateUserRole: async (id, role) => {
      const { error } = await supabase.from('users').update({ role }).eq('id', id);
      if (!error) {
        set((state) => ({
          users: state.users.map((u) => u.id === id ? { ...u, role } : u)
        }));
      }
    },
    fetchPayments: async () => {
      const { data, error } = await supabase.from('payments').select('*').order('date', { ascending: false });
      if (!error && data) {
        set({ payments: data });
      }
    },
    updatePaymentStatus: async (id, status, userId) => {
      const updateData: any = { status };
      if (status === 'approved') {
        updateData.approved_at = new Date().toISOString();
      }
      
      const { error } = await supabase.from('payments').update(updateData).eq('id', id);
      if (!error) {
        set((state) => ({
          payments: state.payments.map((p) => p.id === id ? { ...p, ...updateData } : p)
        }));
        
        // If approved, update user role
        if (status === 'approved') {
          const payment = get().payments.find(p => p.id === id);
          const newRole = payment?.plan ? payment.plan.toLowerCase() : 'premium';
          await get().updateUserRole(userId, newRole);
        }
      }
    },
  }),
  {
    name: 'admin-storage',
    partialize: (state) => ({ blogs: state.blogs }), // Only persist blogs for fast loading
  }
  )
);
