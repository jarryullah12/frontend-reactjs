import React, { useState, useRef, useEffect } from 'react';
import EditProfileModal from './EditProfileModal';
import ProfileImage from './ProfileImage';
import { useAppDispatch } from '../redux/hooks';
import { updateProfileImage, updateProfileImageAsync, updateCoverPhotoAsync } from '../redux/slices/userSlice';
import { DEFAULT_COVER_PHOTO } from '../assets/images/defaultImages';
import { useSession } from '../contexts/SessionContext';

interface ProfileHeaderProps {
  name: string;
  verified: boolean;
  connections: number;
  role: string;
  location: string;
  joinDate: string;
  coverImage: string;
  profileImage: string;
  onProfileUpdate?: (updatedProfile: any) => void;
  profileData?: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  verified,
  connections,
  role,
  location,
  joinDate,
  coverImage,
  profileImage,
  onProfileUpdate,
  profileData
}) => {
  const dispatch = useAppDispatch();
  const { session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [friendStatus, setFriendStatus] = useState<'none' | 'requested' | 'friends'>('none');
  const [showCoverUploadOptions, setShowCoverUploadOptions] = useState(false);
  const [localCoverImage, setLocalCoverImage] = useState(coverImage);
  const [localProfileImage, setLocalProfileImage] = useState(profileImage);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileDataState, setProfileData] = useState({
    name,
    bio: profileData?.bio || "He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed. Moderate do subjects to distance.",
    role: profileData?.role || role,
    location: profileData?.location || location,
    birthDate: profileData?.birthDate || "October 20, 1990",
    status: profileData?.status || "Single",
    email: profileData?.email || "example@gmail.com",
    joinDate: profileData?.joinDate || joinDate
  });

  // Update local state when props change
  useEffect(() => {
    setLocalCoverImage(coverImage || DEFAULT_COVER_PHOTO);
    setLocalProfileImage(profileImage);
  }, [coverImage, profileImage]);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleFriendRequest = () => {
    if (friendStatus === 'none') {
      setFriendStatus('requested');
    } else if (friendStatus === 'requested') {
      setFriendStatus('none');
    } else if (friendStatus === 'friends') {
      setFriendStatus('none');
    }
  };

  const handleCoverImageClick = () => {
    setShowCoverUploadOptions(!showCoverUploadOptions);
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setLocalCoverImage(imageUrl);
          setShowCoverUploadOptions(false);
          
          // Update the cover image in parent component and Redux
          if (onProfileUpdate) {
            onProfileUpdate({
              coverImage: imageUrl
            });
          }
          
          // Update in Redux using the async thunk
          dispatch(updateCoverPhotoAsync(imageUrl));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setLocalProfileImage(imageUrl);
          
          // Update the profile image in parent component
          if (onProfileUpdate) {
            onProfileUpdate({
              profileImage: imageUrl
            });
          }
          
          // Update in Redux using the async thunk
          dispatch(updateProfileImageAsync(imageUrl));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditProfileClick = () => {
    setShowEditProfileModal(true);
  };

  const handleProfileSave = (updatedProfile: any) => {
    // Update local state
    setProfileData(prevState => ({
      ...prevState,
      ...updatedProfile
    }));
    
    // Update parent component's state
    if (onProfileUpdate) {
      onProfileUpdate(updatedProfile);
    }
    
    // Close modal
    setShowEditProfileModal(false);
    
    // If profile image was updated, update it in Redux
    if (updatedProfile.profileImage && updatedProfile.profileImage !== localProfileImage) {
      dispatch(updateProfileImageAsync(updatedProfile.profileImage));
    }
    
    // If cover image was updated, update it in Redux
    if (updatedProfile.coverImage && updatedProfile.coverImage !== localCoverImage) {
      dispatch(updateCoverPhotoAsync(updatedProfile.coverImage));
    }
  };

  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm mb-6 overflow-hidden dark:border dark:border-dark-border transition-colors">
      {/* Cover photo */}
      <div className="h-48 md:h-64 relative">
        <img
          src={localCoverImage || DEFAULT_COVER_PHOTO}
          alt="Cover"
          className="w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          onError={(e) => {
            // If the image fails to load, use the default cover photo
            e.currentTarget.src = DEFAULT_COVER_PHOTO;
          }}
        />

        {/* Cover photo edit overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center cursor-pointer"
          onClick={handleCoverImageClick}
        >
          <div className="opacity-0 hover:opacity-100 transition-opacity">
            <button className="bg-white dark:bg-dark-secondary rounded-full p-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4H7v10a2 2 0 002 2h3v-1a2 2 0 00-1.07-1.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cover upload options */}
        {showCoverUploadOptions && (
          <div className="absolute top-4 right-4 bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-3 z-10">
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={coverInputRef}
                onChange={handleCoverImageUpload}
              />
              <button 
                className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => coverInputRef.current?.click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Photo
              </button>
              <button 
                className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                onClick={() => {
                  setLocalCoverImage(coverImage);
                  setShowCoverUploadOptions(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
                Reset Photo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile info section */}
      <div className="px-4 py-5 sm:px-6 -mt-16 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end">
          {/* Profile image */}
          <div className="flex-shrink-0 relative">
            <div 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-dark-secondary overflow-hidden bg-white dark:bg-dark-secondary cursor-pointer"
              onClick={() => profileInputRef.current?.click()}
            >
              <ProfileImage
                src={localProfileImage}
                alt={name}
                size={128}
              />
              
              {/* Profile image edit overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all flex items-center justify-center rounded-full">
                <div className="opacity-0 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4H7v10a2 2 0 002 2h3v-1a2 2 0 00-1.07-1.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={profileInputRef}
              onChange={handleProfileImageUpload}
            />
          </div>

          {/* Name and buttons */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  {profileDataState.name}
                  {verified && (
                    <span className="ml-2 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </h1>
              </div>
              
              <div className="mt-3 sm:mt-0 flex space-x-2">
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    friendStatus === 'none' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : friendStatus === 'requested' 
                        ? 'bg-gray-200 dark:bg-dark-third hover:bg-gray-300 dark:hover:bg-opacity-80 text-gray-800 dark:text-gray-200' 
                        : 'bg-gray-200 dark:bg-dark-third hover:bg-gray-300 dark:hover:bg-opacity-80 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={handleFriendRequest}
                >
                  {friendStatus === 'none' ? 'Add Friend' : friendStatus === 'requested' ? 'Cancel Request' : 'Friends'}
                </button>
                
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isFollowing 
                      ? 'bg-gray-200 dark:bg-dark-third hover:bg-gray-300 dark:hover:bg-opacity-80 text-gray-800 dark:text-gray-200' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                
                <button 
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-dark-third hover:bg-gray-300 dark:hover:bg-opacity-80 text-gray-800 dark:text-gray-200"
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
                
                <button className="p-2 rounded-full bg-gray-200 dark:bg-dark-third hover:bg-gray-300 dark:hover:bg-opacity-80 text-gray-800 dark:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Friend and Follow Stats */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {connections} friends
              </div>

              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {Math.floor(connections * 1.5)} followers
              </div>
            </div>

            {/* Job info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profileDataState.role}
              </div>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profileDataState.location}
              </div>

              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined on {profileDataState.joinDate}
              </div>
              
              {/* Email from session */}
              {session.email && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {session.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal 
          profile={{
            name: profileDataState.name,
            bio: profileDataState.bio,
            role: profileDataState.role,
            location: profileDataState.location,
            birthDate: profileDataState.birthDate,
            status: profileDataState.status,
            email: profileDataState.email,
            joinDate: profileDataState.joinDate,
            profileImage: localProfileImage,
            coverImage: localCoverImage
          }}
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
