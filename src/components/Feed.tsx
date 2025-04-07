import React, { useEffect } from 'react';
import Post from './Post';
import { usePosts } from '../redux/hooks';
import { Post as PostType, getPostImages, getPostVideos } from '../redux/slices/postsSlice';
import { store } from '../redux/store';
import { useSession } from '../contexts/SessionContext';

const Feed = () => {
  // Get posts from Redux store using the helper hook
  const { posts, loading, error } = usePosts();
  // Get session data for user email
  const { session } = useSession();
  
  useEffect(() => {
    // Log the current state of posts
    console.log('Feed component - Current posts:', posts);
    console.log('Feed component - Loading:', loading);
    console.log('Feed component - Error:', error);
    
    // Log the entire Redux state
    console.log('Full Redux state:', store.getState());
  }, [posts, loading, error]);

  // Convert Redux posts to format expected by Post component
  const displayPosts = posts && posts.length > 0 ? 
    posts.map((post: PostType) => {
      console.log('Processing post:', post);
      
      // Get images and videos from session storage if available
      const postId = typeof post.id === 'string' ? post.id : String(post.id);
      
      // Try to get images from the post_images_map first (more reliable)
      let images = post.images;
      let videos = post.videos;
      
      try {
        // Check post_images_map first (our custom implementation)
        const postImagesMapStr = sessionStorage.getItem('post_images_map');
        if (postImagesMapStr) {
          const postImagesMap = JSON.parse(postImagesMapStr);
          if (postImagesMap[postId] && postImagesMap[postId].length > 0) {
            console.log(`Found images for post ${postId} in post_images_map:`, postImagesMap[postId]);
            images = postImagesMap[postId];
          }
        }
        
        // If not found, try the standard storage from posts slice
        if (!images || images.length === 0) {
          const storedImages = getPostImages(postId);
          if (storedImages && storedImages.length > 0) {
            console.log(`Found images for post ${postId} in standard storage:`, storedImages);
            images = storedImages;
          }
        }
        
        // Get videos
        const storedVideos = getPostVideos(postId);
        if (storedVideos && storedVideos.length > 0) {
          videos = storedVideos;
        }
      } catch (error) {
        console.error('Error retrieving media from session storage:', error);
      }
      
      return {
        id: post.id,
        userId: post.userId,
        user: {
          name: post.userName,
          image: post.userAvatar,
          email: post.userId === session.userId ? (session.email || '') : '',
          time: new Date(post.timestamp).toLocaleTimeString()
        },
        content: post.content,
        images: images,
        videos: videos,
        likes: post.likes,
        comments: post.comments,
        commentsList: post.commentsList || [],
        shares: post.shares,
        isLiked: post.isLiked
      };
    }) : [];

  console.log('Feed component - Display posts:', displayPosts);

  if (loading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error loading posts: {error}</div>;
  }

  if (displayPosts.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 text-center dark:border dark:border-dark-border transition-colors">
        <div className="text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">No posts yet</h3>
          <p className="mb-4">Be the first to share something with your network!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 transition-colors">
      {/* Posts list */}
      <div className="space-y-4">
        {displayPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;