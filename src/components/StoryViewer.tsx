import React, { useState, useEffect } from 'react';
import { useStories, useUser, useAppDispatch } from '../redux/hooks';
import { viewStory, deleteStory } from '../redux/slices/storiesSlice';

interface StoryViewerProps {
  storyId: string;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ storyId, onClose }) => {
  const dispatch = useAppDispatch();
  const { stories } = useStories();
  const { currentUser } = useUser();
  const [currentStory, setCurrentStory] = useState<any | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find the story by ID
  useEffect(() => {
    console.log("StoryViewer: Looking for story with ID:", storyId);
    console.log("StoryViewer: Available stories:", stories);
    
    try {
      const story = stories.find(s => s.id === storyId);
      if (story) {
        console.log("StoryViewer: Found story:", story);
        setCurrentStory(story);
        
        // Mark story as viewed
        if (currentUser) {
          console.log("StoryViewer: Marking story as viewed by:", currentUser.id);
          dispatch(viewStory({ storyId, userId: currentUser.id }));
        } else {
          console.warn("StoryViewer: No current user found, cannot mark story as viewed");
        }
      } else {
        // Story not found, close the viewer
        console.error("StoryViewer: Story not found with ID:", storyId);
        setError("Story not found");
        setTimeout(onClose, 1000);
      }
    } catch (err) {
      console.error("StoryViewer: Error finding story:", err);
      setError("Error loading story");
    }
  }, [storyId, stories, dispatch, currentUser, onClose]);

  // Progress bar animation
  useEffect(() => {
    if (!currentStory || isPaused) return;
    
    const duration = 5000; // 5 seconds per story
    const interval = 50; // Update progress every 50ms
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + step;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onClose, 300); // Close after progress bar completes
          return 100;
        }
        return newProgress;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [currentStory, isPaused, onClose]);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        // Space bar to pause/resume
        setIsPaused(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle delete story
  const handleDeleteStory = () => {
    if (!currentStory || !currentUser) {
      console.error("StoryViewer: Cannot delete story - missing story or user");
      return;
    }
    
    if (currentStory.userId === currentUser.id) {
      console.log("StoryViewer: Deleting story:", currentStory.id);
      dispatch(deleteStory(currentStory.id));
      onClose();
    } else {
      console.warn("StoryViewer: User does not have permission to delete this story");
      setError("You don't have permission to delete this story");
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md w-full text-center">
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!currentStory) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-xl">Loading story...</div>
      </div>
    );
  }

  const isOwner = currentUser && currentStory.userId === currentUser.id;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 text-white z-10"
        onClick={onClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
        <div 
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Story content */}
      <div className="relative max-w-lg w-full h-full max-h-screen flex items-center justify-center">
        <div className="relative w-full max-h-[80vh] rounded-lg overflow-hidden">
          {/* Story image */}
          <img 
            src={currentStory.image} 
            alt="Story" 
            className="w-full h-full object-contain"
            onClick={() => setIsPaused(prev => !prev)}
            onError={() => {
              console.error("StoryViewer: Error loading image:", currentStory.image);
              setError("Failed to load image");
            }}
          />
          
          {/* User info */}
          <div className="absolute top-4 left-4 flex items-center">
            <img 
              src={currentStory.userAvatar} 
              alt={currentStory.userName} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
              onError={(e) => {
                // Fallback for avatar
                (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/1.jpg";
              }}
            />
            <div className="ml-2 text-white">
              <div className="font-medium">{currentStory.userName}</div>
              <div className="text-xs opacity-80">
                {new Date(currentStory.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          {/* Story text */}
          {currentStory.content && (
            <div className="absolute bottom-8 left-0 right-0 p-4 text-white text-center text-lg font-medium">
              {currentStory.content}
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="text-white text-sm">
              {currentStory.viewers.length} {currentStory.viewers.length === 1 ? 'view' : 'views'}
            </div>
            
            {isOwner && (
              <button 
                className="text-red-500 text-sm flex items-center"
                onClick={handleDeleteStory}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
          
          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
