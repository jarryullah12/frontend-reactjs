import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Session storage keys
const POSTS_STORAGE_KEY = 'social_app_posts';
const IMAGES_STORAGE_KEY = 'social_app_post_images';
const VIDEOS_STORAGE_KEY = 'social_app_post_videos';
const POST_IMAGES_MAP_STORAGE_KEY = 'post_images_map';

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  videos?: string[];
  likes: number;
  comments: number;
  commentsList?: Comment[];
  shares: number;
  timestamp: string;
  isLiked: boolean;
  originalPostId?: string; // Reference to original post if this is a shared post
  isShared?: boolean;
  sharedPost?: {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    images?: string[];
    videos?: string[];
    timestamp: string;
  };
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Helper function to get posts from session storage
const getPostsFromSessionStorage = (): Post[] => {
  try {
    const storedPosts = sessionStorage.getItem(POSTS_STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error('Error retrieving posts from session storage:', error);
    return [];
  }
};

// Helper function to store images in session storage
const storeImagesInSessionStorage = (postId: string, images: string[]) => {
  try {
    // Get existing image map or create a new one
    const imageMapStr = sessionStorage.getItem(IMAGES_STORAGE_KEY);
    const imageMap = imageMapStr ? JSON.parse(imageMapStr) : {};
    
    // Store images for this post
    imageMap[postId] = images;
    
    // Save back to session storage
    sessionStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imageMap));
  } catch (error) {
    console.error('Error storing images in session storage:', error);
  }
};

// Helper function to store videos in session storage
const storeVideosInSessionStorage = (postId: string, videos: string[]) => {
  try {
    // Get existing video map or create a new one
    const videoMapStr = sessionStorage.getItem(VIDEOS_STORAGE_KEY);
    const videoMap = videoMapStr ? JSON.parse(videoMapStr) : {};
    
    // Store videos for this post
    videoMap[postId] = videos;
    
    // Save back to session storage
    sessionStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videoMap));
  } catch (error) {
    console.error('Error storing videos in session storage:', error);
  }
};

// Helper function to get images from session storage
const getImagesFromSessionStorage = (postId: string): string[] => {
  try {
    // First try to get from our custom post_images_map (more reliable)
    const postImagesMapStr = sessionStorage.getItem(POST_IMAGES_MAP_STORAGE_KEY);
    if (postImagesMapStr) {
      const postImagesMap = JSON.parse(postImagesMapStr);
      if (postImagesMap[postId] && postImagesMap[postId].length > 0) {
        console.log(`Retrieved images for post ${postId} from post_images_map:`, postImagesMap[postId]);
        return postImagesMap[postId];
      }
    }
    
    // If not found, try the standard storage
    const imagesMapStr = sessionStorage.getItem(IMAGES_STORAGE_KEY);
    if (!imagesMapStr) return [];
    
    const imagesMap = JSON.parse(imagesMapStr);
    return imagesMap[postId] || [];
  } catch (error) {
    console.error('Error retrieving post images:', error);
    return [];
  }
};

// Helper function to get videos from session storage
const getVideosFromSessionStorage = (postId: string): string[] => {
  try {
    const videoMapStr = sessionStorage.getItem(VIDEOS_STORAGE_KEY);
    if (!videoMapStr) return [];
    
    const videoMap = JSON.parse(videoMapStr);
    return videoMap[postId] || [];
  } catch (error) {
    console.error('Error retrieving videos from session storage:', error);
    return [];
  }
};

// Initialize state with posts from session storage
const initialState: PostsState = {
  posts: getPostsFromSessionStorage(),
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      console.log('Setting posts in slice:', action.payload);
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
      
      // Save posts to session storage
      try {
        sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving posts to session storage:', error);
      }
    },
    addPost: (state, action: PayloadAction<any>) => {
      const newPost = { ...action.payload };
      state.posts.unshift(newPost);
      
      // Save updated posts to session storage
      sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
      
      // Store images separately if present
      if (newPost.images && newPost.images.length > 0) {
        storeImagesInSessionStorage(newPost.id, newPost.images);
        console.log(`Storing ${newPost.images.length} images for post ${newPost.id}:`, newPost.images);
        
        // Also store in custom post_images_map for redundancy
        try {
          const postImagesMapStr = sessionStorage.getItem(POST_IMAGES_MAP_STORAGE_KEY) || '{}';
          const postImagesMap = JSON.parse(postImagesMapStr);
          postImagesMap[newPost.id] = newPost.images;
          sessionStorage.setItem(POST_IMAGES_MAP_STORAGE_KEY, JSON.stringify(postImagesMap));
        } catch (error) {
          console.error('Error storing images in post_images_map:', error);
        }
      }
      
      // Store videos separately if present
      if (newPost.videos && newPost.videos.length > 0) {
        storeVideosInSessionStorage(newPost.id, newPost.videos);
        console.log(`Storing ${newPost.videos.length} videos for post ${newPost.id}:`, newPost.videos);
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      console.log('Deleting post with ID:', action.payload);
      state.posts = state.posts.filter(post => post.id !== action.payload);
      
      // Save updated posts to session storage
      try {
        sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
        
        // Remove images and videos for the deleted post
        const imageMapStr = sessionStorage.getItem(IMAGES_STORAGE_KEY);
        if (imageMapStr) {
          const imageMap = JSON.parse(imageMapStr);
          if (imageMap[action.payload]) {
            delete imageMap[action.payload];
            sessionStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imageMap));
          }
        }
        
        const videoMapStr = sessionStorage.getItem(VIDEOS_STORAGE_KEY);
        if (videoMapStr) {
          const videoMap = JSON.parse(videoMapStr);
          if (videoMap[action.payload]) {
            delete videoMap[action.payload];
            sessionStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(videoMap));
          }
        }
      } catch (error) {
        console.error('Error saving posts to session storage:', error);
      }
    },
    sharePost: (state, action: PayloadAction<{ 
      postId: string; 
      userId: string; 
      userName: string; 
      userAvatar: string;
      shareComment?: string;
    }>) => {
      const { postId, userId, userName, userAvatar, shareComment } = action.payload;
      
      // Find the original post
      const originalPost = state.posts.find(post => post.id === postId);
      
      if (originalPost) {
        // Increment share count on original post
        originalPost.shares += 1;
        
        // Create a new post as a shared version of the original
        const sharedPost = {
          id: crypto.randomUUID(),
          userId,
          userName,
          userAvatar,
          content: shareComment || '',
          sharedPost: {
            id: originalPost.id,
            userId: originalPost.userId,
            userName: originalPost.userName,
            userAvatar: originalPost.userAvatar,
            content: originalPost.content,
            images: originalPost.images,
            videos: originalPost.videos,
            timestamp: originalPost.timestamp
          },
          isShared: true,
          originalPostId: originalPost.id,
          likes: 0,
          comments: 0,
          commentsList: [],
          shares: 0,
          timestamp: new Date().toISOString(),
          isLiked: false
        };
        
        // Add the new shared post to the beginning of the posts array
        state.posts.unshift(sharedPost);
        
        // Save updated posts to session storage
        try {
          sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
        } catch (error) {
          console.error('Error saving posts to session storage:', error);
        }
      }
    },
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(post => post.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        
        // Save updated posts to session storage
        try {
          sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
        } catch (error) {
          console.error('Error saving posts to session storage:', error);
        }
      }
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const post = state.posts.find(post => post.id === action.payload.postId);
      if (post) {
        if (!post.commentsList) {
          post.commentsList = [];
        }
        post.commentsList.push(action.payload);
        post.comments += 1;
        
        // Save updated posts to session storage
        try {
          sessionStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
        } catch (error) {
          console.error('Error saving posts to session storage:', error);
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setPosts, 
  addPost, 
  deletePost, 
  sharePost,
  likePost, 
  addComment, 
  setLoading, 
  setError 
} = postsSlice.actions;

// Helper function to clear posts from session storage
export const clearPostsFromSessionStorage = () => {
  try {
    sessionStorage.removeItem(POSTS_STORAGE_KEY);
    sessionStorage.removeItem(IMAGES_STORAGE_KEY);
    sessionStorage.removeItem(VIDEOS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing posts from session storage:', error);
  }
};

// Helper functions to access post media
export const getPostImages = (postId: string): string[] => {
  return getImagesFromSessionStorage(postId);
};

export const getPostVideos = (postId: string): string[] => {
  return getVideosFromSessionStorage(postId);
};

// Helper function to store post images in both storage locations
export const storePostImages = (postId: string, images: string[]): void => {
  storeImagesInSessionStorage(postId, images);
  
  // Also store in custom post_images_map
  try {
    const postImagesMapStr = sessionStorage.getItem(POST_IMAGES_MAP_STORAGE_KEY) || '{}';
    const postImagesMap = JSON.parse(postImagesMapStr);
    postImagesMap[postId] = images;
    sessionStorage.setItem(POST_IMAGES_MAP_STORAGE_KEY, JSON.stringify(postImagesMap));
  } catch (error) {
    console.error('Error storing images in post_images_map:', error);
  }
};

// Helper function to store post videos
export const storePostVideos = (postId: string, videos: string[]): void => {
  storeVideosInSessionStorage(postId, videos);
};

export default postsSlice.reducer;