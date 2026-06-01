import { BlogPost } from '../types';
import { getSupabase } from './supabase';

// Simple in-memory cache
const postsCache: Record<string, BlogPost> = {};
let allPostsCache: BlogPost[] | null = null;

export const blogService = {
  getPostFromCache: (id: string): BlogPost | undefined => {
    return postsCache[id];
  },

  getPosts: async (
    includeContent: boolean = true,
    options?: { forceFresh?: boolean; throwOnError?: boolean }
  ): Promise<BlogPost[]> => {
    const forceFresh = options?.forceFresh === true;
    const throwOnError = options?.throwOnError === true;

    // If we have content cached and we need it, or we don't need it and have metadata cached
    if (!forceFresh && allPostsCache !== null && allPostsCache.length > 0 && (includeContent || allPostsCache.every(p => p.excerpt))) {
      console.log('blogService: returning cached posts');
      return allPostsCache;
    }

    try {
      const supabase = getSupabase();
      console.log('blogService: fetching posts, includeContent:', includeContent);
      
      const selectColumns = includeContent
        ? '*'
        : 'id,title,excerpt,author,date,category,image,status';

      let { data, error } = await supabase
        .from('blog_posts')
        .select(selectColumns)
        .order('created_at', { ascending: false });

      if (error && typeof error.message === 'string' && error.message.toLowerCase().includes('created_at')) {
        console.warn('blogService: created_at not found, retrying without created_at ordering');
        const retry = await supabase
          .from('blog_posts')
          .select(selectColumns)
          .order('date', { ascending: false });
        data = retry.data;
        error = retry.error;
      }

      if (error) {
        console.error('Supabase Blog Fetch Error:', {
          message: error.message,
          details: error.details,
          hint: (error as any).hint,
          code: (error as any).code
        });
        throw error;
      }
      
      console.log('blogService: fetched data count:', data?.length || 0);
      const posts = (data || []) as any[];
      
      // Always populate individual cache with what we have
      posts.forEach(p => {
        if (p.id) {
          // If we already have the full content in cache, don't overwrite it with metadata
          if (!postsCache[p.id] || includeContent) {
            postsCache[p.id] = { ...postsCache[p.id], ...p };
          }
        }
      });

      // Cache all posts if we requested full content, or if cache is empty
      if (includeContent) {
        allPostsCache = posts;
      } else if (allPostsCache === null) {
        allPostsCache = posts;
      }

      return posts;
    } catch (e) {
      console.error('Error fetching blog posts from Supabase:', e);
      if (throwOnError) {
        throw e;
      }
      return [];
    }
  },

  getPostById: async (id: string): Promise<BlogPost | undefined> => {
    // Only return cache if we actually have the content
    if (postsCache[id] && postsCache[id].content) {
      console.log('blogService: returning full cached post', id);
      return postsCache[id];
    }

    try {
      const { data, error } = await getSupabase().from('blog_posts').select('*').eq('id', id).single();
      if (error) throw error;
      
      if (data) {
        // Merge with existing cache to preserve any existing metadata if needed
        postsCache[id] = { ...postsCache[id], ...data };
      }
      return data;
    } catch (e) {
      console.error('Error fetching blog post by id from Supabase', e);
      return undefined;
    }
  },

  getRecentPosts: async (limit: number = 3, excludeId?: string): Promise<BlogPost[]> => {
    try {
      let query: any = getSupabase()
        .from('blog_posts')
        .select('id,title,excerpt,author,date,category,image,status')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query.limit(limit);
      if (error) throw error;
      
      const posts = (data || []) as BlogPost[];
      // Populate individual cache if we don't have it yet (metadata only)
      posts.forEach(p => {
        if (p.id) {
          // If we already have the full content in cache, don't overwrite it with metadata
          if (!postsCache[p.id]) {
            postsCache[p.id] = p;
          } else {
            // Just update metadata fields to keep content
            postsCache[p.id] = { ...p, content: postsCache[p.id].content };
          }
        }
      });

      return posts;
    } catch (e) {
      console.error('Error fetching recent posts from Supabase', e);
      return [];
    }
  },

  savePost: async (post: BlogPost): Promise<BlogPost | null> => {
    try {
      console.log('blogService: saving post:', post);
      
      // Check if ID is a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const isValidUUID = post.id && uuidRegex.test(post.id);
      
      const { id, ...postData } = post;

      if (id && isValidUUID) {
        console.log('blogService: updating existing post:', id);
        const { data, error } = await getSupabase().from('blog_posts').upsert({ id, ...postData }).select().single();
        if (error) {
          console.error('Supabase Upsert Error:', error);
          throw error;
        }
        return data;
      } else {
        console.log('blogService: inserting new post');
        const { data, error } = await getSupabase().from('blog_posts').insert(postData).select().single();
        if (error) {
          console.error('Supabase Insert Error:', error);
          throw error;
        }
        return data;
      }
    } catch (e: any) {
      console.error('Error saving blog post to Supabase:', e);
      alert('Error saving post: ' + (e.message || 'Unknown error'));
      return null;
    }
  },

  deletePost: async (id: string): Promise<void> => {
    try {
      const { error } = await getSupabase().from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Error deleting blog post from Supabase', e);
    }
  }
};
