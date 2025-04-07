import React, { useState, useRef } from 'react';
import { useSession } from '../contexts/SessionContext';
import { DEFAULT_USER_ICON } from '../assets/images/defaultImages';

interface ProfilePictureUploaderProps {
  size?: number;
  className?: string;
}

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({ 
  size = 100,
  className = ''
}) => {
  const { session, updateProfilePicture } = useSession();
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          updateProfilePicture(imageUrl);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {session.profilePicture ? (
        <img 
          src={session.profilePicture}
          alt="Profile"
          className="rounded-full object-cover cursor-pointer"
          style={{ width: size, height: size }}
          onClick={handleImageClick}
        />
      ) : (
        <div 
          className="cursor-pointer"
          onClick={handleImageClick}
          style={{ width: size, height: size }}
        >
          <img 
            src={DEFAULT_USER_ICON}
            alt="Profile"
            className="rounded-full"
            style={{ width: size, height: size }}
          />
        </div>
      )}
      
      {isHovering && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleImageClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
      )}
      
      <input 
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePictureUploader;
