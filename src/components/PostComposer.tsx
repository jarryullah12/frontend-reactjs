import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addPost } from '../redux/slices/postsSlice';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import PostProfileImage from './PostProfileImage';
import { useSession } from '../contexts/SessionContext';

const PostComposer = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);
  const { session } = useSession();
  const [postText, setPostText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showBirthdayInput, setShowBirthdayInput] = useState(false);
  const [location, setLocation] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => {
        // Create a persistent URL for the file
        const objectUrl = URL.createObjectURL(file);
        
        // Store the image data in sessionStorage for persistence
        try {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target && event.target.result) {
              // Store the image data URL in sessionStorage with a unique key
              const imageKey = `image_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
              sessionStorage.setItem(imageKey, event.target.result.toString());
              
              // Associate the key with the objectUrl for later retrieval
              const imageMapStr = sessionStorage.getItem('image_url_map') || '{}';
              const imageMap = JSON.parse(imageMapStr);
              imageMap[objectUrl] = imageKey;
              sessionStorage.setItem('image_url_map', JSON.stringify(imageMap));
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Error storing image in sessionStorage:', error);
        }
        
        return objectUrl;
      });
      setImages([...images, ...newImages]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newVideos = Array.from(e.target.files).map(file => {
        return URL.createObjectURL(file);
      });
      setVideos([...videos, ...newVideos]);
    }
  };
  
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    const cursorPosition = textareaRef.current?.selectionStart || postText.length;
    const updatedText = 
      postText.substring(0, cursorPosition) + 
      emoji + 
      postText.substring(cursorPosition);
    
    setPostText(updatedText);
    
    setShowEmojiPicker(false);
  };
  
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    if (!showEmojiPicker) {
      setShowLocationInput(false);
      setShowBirthdayInput(false);
    }
  };
  
  const toggleLocationInput = () => {
    setShowLocationInput(!showLocationInput);
    if (!showLocationInput) {
      setShowEmojiPicker(false);
      setShowBirthdayInput(false);
    }
  };
  
  const toggleBirthdayInput = () => {
    setShowBirthdayInput(!showBirthdayInput);
    if (!showBirthdayInput) {
      setShowEmojiPicker(false);
      setShowLocationInput(false);
    }
  };
  
  const addLocation = () => {
    if (location.trim()) {
      const locationText = `📍 ${location.trim()}`;
      setPostText(postText ? `${postText}\n\n${locationText}` : locationText);
      setLocation('');
      setShowLocationInput(false);
    }
  };
  
  const addBirthday = () => {
    if (birthday) {
      const birthdayDate = new Date(birthday);
      const formattedDate = birthdayDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const birthdayText = `🎂 Celebrating birthday on ${formattedDate}`;
      setPostText(postText ? `${postText}\n\n${birthdayText}` : birthdayText);
      setBirthday('');
      setShowBirthdayInput(false);
    }
  };

  const handlePost = () => {
    if (!postText.trim() && images.length === 0 && videos.length === 0) return;
    
    setIsSubmitting(true);
    
    // Ensure images are properly stored in session storage
    const imageUrls = [...images];
    const postId = uuidv4();
    
    // Store the image URLs in a separate map for this post
    if (images.length > 0) {
      try {
        const postImagesMap = sessionStorage.getItem('post_images_map') || '{}';
        const imagesMap = JSON.parse(postImagesMap);
        imagesMap[postId] = imageUrls;
        sessionStorage.setItem('post_images_map', JSON.stringify(imagesMap));
        
        // Also store in the image storage format used by the posts slice
        const imageMapStr = sessionStorage.getItem('social_app_post_images') || '{}';
        const imageMap = JSON.parse(imageMapStr);
        imageMap[postId] = imageUrls;
        sessionStorage.setItem('social_app_post_images', JSON.stringify(imageMap));
      } catch (error) {
        console.error('Error storing image URLs in session storage:', error);
      }
    }
    
    const newPost = {
      id: postId,
      userId: currentUser?.id || 'default-user',
      userName: currentUser?.name || 'Current User',
      userAvatar: currentUser?.avatar || '',
      content: postText,
      images: images.length > 0 ? [...images] : undefined,
      videos: videos.length > 0 ? [...videos] : undefined,
      likes: 0,
      comments: 0,
      commentsList: [], 
      shares: 0,
      timestamp: new Date().toISOString(),
      isLiked: false
    };
    
    console.log('Creating new post with images and videos:', newPost);
    
    dispatch(addPost(newPost));
    
    setPostText('');
    setImages([]);
    setVideos([]);
    setIsSubmitting(false);
  };

  return (
    <div className="transition-colors relative">
      {session.email && (
        <div className="absolute top-0 right-0 text-xs text-gray-500 dark:text-gray-400 p-1">
          {session.email}
        </div>
      )}
      <div className="flex">
        <div className="mr-3">
          <PostProfileImage />
        </div>
        <div className="flex-1">
          <textarea 
            ref={textareaRef}
            placeholder={`Share your thoughts${session.email ? ` as ${session.email}` : ''}...`} 
            className="w-full border border-gray-200 dark:border-dark-border rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm bg-white dark:bg-dark-bg dark:text-white dark:placeholder-gray-400"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>

          {(images.length > 0 || videos.length > 0) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt="Upload preview" className="h-20 w-20 object-cover rounded" />
                  <button 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </div>
              ))}
              {videos.map((video, index) => (
                <div key={index} className="relative">
                  <video 
                    src={video} 
                    className="h-20 w-20 object-cover rounded" 
                    controls={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1.998 1.998 0 012 9.87v4.263a1.998 1.998 0 001.555.832l3.197-2.132a1.998 1.998 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Location Input */}
          {showLocationInput && (
            <div className="mt-2 flex">
              <input
                type="text"
                placeholder="Enter location..."
                className="flex-1 border border-gray-200 dark:border-dark-border rounded-l-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-bg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-3 rounded-r-lg text-sm"
                onClick={addLocation}
              >
                Add
              </button>
            </div>
          )}
          
          {/* Birthday Input */}
          {showBirthdayInput && (
            <div className="mt-2 flex">
              <input
                type="date"
                className="flex-1 border border-gray-200 dark:border-dark-border rounded-l-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-bg"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-3 rounded-r-lg text-sm"
                onClick={addBirthday}
              >
                Add
              </button>
            </div>
          )}
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="mt-2 relative z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" />
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-between mt-3">
            <div className="flex space-x-2">
              {/* Image upload button */}
              <label className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-1 cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  multiple
                  onChange={handleImageUpload}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </label>
              
              {/* Video upload button */}
              <label className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-1 cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="video/*" 
                  multiple
                  onChange={handleVideoUpload}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </label>
              
              {/* Emoji button */}
              <button 
                className={`flex items-center ${showEmojiPicker ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'} p-1`}
                onClick={toggleEmojiPicker}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {/* Location button */}
              <button 
                className={`flex items-center ${showLocationInput ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'} p-1`}
                onClick={toggleLocationInput}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* Birthday button */}
              <button 
                className={`flex items-center ${showBirthdayInput ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'} p-1`}
                onClick={toggleBirthdayInput}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            
            <button 
              className={`px-4 py-2 rounded-full font-medium text-sm ${
                (postText.trim() || images.length > 0 || videos.length > 0) && !isSubmitting
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-blue-200 text-white cursor-not-allowed dark:bg-blue-900 dark:bg-opacity-50'
              }`}
              disabled={(!postText.trim() && images.length === 0 && videos.length === 0) || isSubmitting}
              onClick={handlePost}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;