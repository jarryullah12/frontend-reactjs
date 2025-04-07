import React, { useState, useEffect } from 'react';
import '../styles/stories.css';
import { useStories, useUser, useAppDispatch } from '../redux/hooks';
import { addStory, cleanupExpiredStories } from '../redux/slices/storiesSlice';
import StoryViewer from './StoryViewer';
import { DEFAULT_USER_ICON } from '../assets/images/defaultImages';

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  storyId?: string;
}

const Stories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stories } = useStories();
  const { currentUser } = useUser();
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [storyText, setStoryText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingStoryId, setViewingStoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Clean up expired stories on component mount
  useEffect(() => {
    dispatch(cleanupExpiredStories());
    console.log("Current stories in state:", stories);
  }, [dispatch]);

  // Process stories data
  const processedStories: StoryUser[] = [
    // Add story option is always first
    {
      id: 'create',
      name: 'Add story',
      avatar: '',
      hasStory: false,
    }
  ];

  // Group stories by user
  const userStories = new Map<string, string>();
  
  // Get the latest story ID for each user
  stories.forEach(story => {
    if (!userStories.has(story.userId) || 
        new Date(story.timestamp) > new Date(userStories.get(story.userId) || '')) {
      userStories.set(story.userId, story.id);
    }
  });

  // Add users with stories
  userStories.forEach((storyId, userId) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      processedStories.push({
        id: userId,
        name: story.userName,
        avatar: story.image,
        hasStory: true,
        storyId: storyId
      });
    }
  });

  // Handle file upload for story
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        console.log("File selected:", file.name, file.type, file.size);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Please select an image file');
          return;
        }
        
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          setError('Image size should be less than 5MB');
          return;
        }
        
        // Create a FileReader to read the file as a data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const imageDataUrl = event.target.result as string;
            console.log("Image loaded as data URL");
            setStoryImage(imageDataUrl);
            setError(null);
          }
        };
        reader.onerror = () => {
          console.error("FileReader error");
          setError('Failed to read image file. Please try again.');
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError('Failed to upload image. Please try again.');
    }
  };

  // Handle story creation
  const handleCreateStory = () => {
    if (!storyImage) {
      setError('Please select an image for your story');
      return;
    }
    
    if (!currentUser) {
      setError('You must be logged in to create a story');
      return;
    }
    
    try {
      console.log("Creating story with:", {
        userId: currentUser.id || 'default-user-id',
        userName: currentUser.name || 'User',
        userAvatar: currentUser.avatar || 'https://randomuser.me/api/portraits/men/72.jpg',
        content: storyText.trim() || undefined,
        image: storyImage
      });
      
      setIsSubmitting(true);
      
      dispatch(addStory({
        userId: currentUser.id || 'default-user-id',
        userName: currentUser.name || 'User',
        userAvatar: currentUser.avatar || 'https://randomuser.me/api/portraits/men/72.jpg',
        content: storyText.trim() || undefined,
        image: storyImage,
        timestamp: new Date().toISOString()
      }));
      
      // Reset form
      setStoryImage(null);
      setStoryText('');
      setIsSubmitting(false);
      setShowStoryCreator(false);
      setError(null);
      
      console.log("Story created successfully");
    } catch (err) {
      console.error("Error creating story:", err);
      setError('Failed to create story. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Handle viewing a story
  const handleViewStory = (storyId: string) => {
    console.log("Viewing story:", storyId);
    setViewingStoryId(storyId);
  };

  return (
    <div className="bg-white dark:bg-dark-secondary p-4 rounded-lg shadow-sm mb-4 dark:border dark:border-dark-border transition-colors">
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {processedStories.map((user) => (
          <div key={user.id} className="flex flex-col items-center min-w-[80px]">
            {user.id === 'create' ? (
              <div 
                onClick={() => {
                  if (!currentUser) {
                    setError('You must be logged in to create a story');
                    return;
                  }
                  setShowStoryCreator(true);
                }}
                className="cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 text-center truncate w-full">
                  Add story
                </span>
              </div>
            ) : (
              <div 
                onClick={() => user.storyId && handleViewStory(user.storyId)}
                className="cursor-pointer"
              >
                <div className={`relative ${user.hasStory ? 'p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full' : ''}`}>
                  <div className="w-16 h-16 rounded-full p-[2px] bg-white dark:bg-dark-bg">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={DEFAULT_USER_ICON}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 text-center truncate w-full">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Story Creator Modal */}
      {showStoryCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Create Story</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => {
                  setShowStoryCreator(false);
                  setStoryImage(null);
                  setStoryText('');
                  setError(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <img 
                  src={currentUser?.avatar || DEFAULT_USER_ICON}
                  alt="Your profile"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="font-medium dark:text-white">{currentUser?.name || "Current User"}</div>
              </div>
              
              {storyImage ? (
                <div className="relative mb-4">
                  <img 
                    src={storyImage} 
                    alt="Story preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => setStoryImage(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center h-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to upload an image</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
              
              <textarea 
                placeholder="Add a caption to your story..."
                className="w-full border border-gray-200 dark:border-dark-border rounded-lg p-3 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm bg-white dark:bg-dark-bg dark:text-white dark:placeholder-gray-400"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-opacity-80"
                onClick={() => {
                  setShowStoryCreator(false);
                  setStoryImage(null);
                  setStoryText('');
                  setError(null);
                }}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-white ${
                  storyImage && !isSubmitting
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-blue-300 cursor-not-allowed'
                }`}
                disabled={!storyImage || isSubmitting}
                onClick={handleCreateStory}
              >
                {isSubmitting ? 'Creating...' : 'Create Story'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Viewer */}
      {viewingStoryId && (
        <StoryViewer 
          storyId={viewingStoryId} 
          onClose={() => setViewingStoryId(null)} 
        />
      )}
    </div>
  );
};

export default Stories;