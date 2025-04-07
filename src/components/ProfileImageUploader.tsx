import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileImage } from '../redux/slices/userSlice';

interface ProfileImageUploaderProps {
  currentImage: string;
  onClose: () => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ currentImage, onClose }) => {
  const [previewImage, setPreviewImage] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      setIsUploading(true);
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setPreviewImage(imageUrl);
          setIsUploading(false);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real app, you would upload the image to a server here
    // For now, we'll just update the Redux state
    dispatch(updateProfileImage(previewImage));
    onClose();
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl w-full max-w-md p-6 dark:border dark:border-dark-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Update Profile Picture</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 mb-4">
            {isUploading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <img 
                src={previewImage} 
                alt="Profile Preview" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          <div className="flex space-x-3 mb-4">
            <button
              onClick={handleSelectImage}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Select Image
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isUploading || previewImage === currentImage}
            className={`w-full py-2 rounded-md transition-colors ${
              isUploading || previewImage === currentImage
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
