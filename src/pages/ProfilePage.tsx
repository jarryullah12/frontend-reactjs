import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { useSession } from '../contexts/SessionContext';
import ProfileInfo from '../components/ProfileInfo';
import AboutSection from '../components/AboutSection';
import PhotosSection from '../components/PhotosSection';
import FriendsSection from '../components/FriendsSection';
import FollowersSection from '../components/FollowersSection';
import ConnectionsSection from '../components/ConnectionsSection';
import InterestsSection from '../components/InterestsSection';
import Post from '../components/Post';
import PostComposer from '../components/PostComposer';
import DefaultProfileImage from '../components/DefaultProfileImage';
// Birthday Reminders and Recent Activity components removed
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Comment } from '../redux/slices/postsSlice';
import { 
  updateProfileImage, 
  updateCoverPhoto, 
  fetchUserDataAsync, 
  updateProfileImageAsync, 
  updateCoverPhotoAsync 
} from '../redux/slices/userSlice';
import { DEFAULT_PROFILE_PICTURE, DEFAULT_COVER_PHOTO } from '../assets/images/defaultImages';

// Define a ProfileComment interface that matches the structure in the Post component
interface ProfileComment {
  id: string;
  user: {
    name: string;
    image: string;
  };
  text: string;
  time: string;
  replies?: number;
  likes?: number;
}

// Define a ProfilePost interface
interface ProfilePost {
  id: string;
  user: {
    name: string;
    image: string;
    title?: string;
    company?: string;
    time?: string;
  };
  content: string;
  images?: string[];
  likes: number;
  shares: number;
  comments: number;
  commentsList: Comment[];
  replies: ProfileComment[];
  isLiked?: boolean;
}

// Define a Profile interface
interface ProfileData {
  name: string;
  verified: boolean;
  connections: number;
  role: string;
  location: string;
  joinDate: string;
  coverImage: string;
  profileImage: string;
  bio: string;
  birthDate: string;
  status: string;
  email: string;
  workplace?: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const postsFromRedux = useAppSelector(state => state.posts.posts);
  const currentUser = useAppSelector(state => state.user.currentUser);
  const friendsFromRedux = useAppSelector(state => state.user.friends);
  const followersFromRedux = useAppSelector(state => state.user.followers);
  const connectionsFromRedux = useAppSelector(state => state.user.connections);
  const dispatch = useAppDispatch();
  const { session } = useSession();
  
  // Fetch user data (friends, followers, connections) when component mounts
  useEffect(() => {
    dispatch(fetchUserDataAsync());
  }, [dispatch]);
  
  // Default profile image and cover photo URLs
  const defaultProfileImage = DEFAULT_PROFILE_PICTURE;
  const defaultCoverImage = DEFAULT_COVER_PHOTO; // This now points to our new cover photo
  
  // Profile state with default values that will be overridden by Redux data if available
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Guest User',
    verified: true,
    connections: 0,
    role: 'User',
    location: 'Unknown',
    joinDate: 'Today',
    coverImage: defaultCoverImage,
    profileImage: defaultProfileImage,
    bio: 'No bio available',
    birthDate: 'January 1, 2000',
    status: 'Unknown',
    email: 'example@gmail.com',
    workplace: [],
    education: [],
  });
  
  // Update profile data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileData(prevData => ({
        ...prevData,
        name: currentUser.name || prevData.name,
        email: currentUser.email || session.email || prevData.email,
        profileImage: currentUser.avatar || prevData.profileImage,
        coverImage: currentUser.coverPhoto || prevData.coverImage,
        location: currentUser.location || prevData.location,
        joinDate: currentUser.joinDate || prevData.joinDate,
        bio: currentUser.bio || prevData.bio,
        connections: currentUser.following || prevData.connections,
      }));
    }
  }, [currentUser]);
  
  // Handle profile updates
  const handleProfileUpdate = (updatedProfile: Partial<ProfileData>) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedProfile
    }));
    
    // If profile image is updated, also update it in Redux
    if (updatedProfile.profileImage) {
      dispatch(updateProfileImageAsync(updatedProfile.profileImage));
    }
    
    // If cover image is updated, also update it in Redux
    if (updatedProfile.coverImage) {
      dispatch(updateCoverPhotoAsync(updatedProfile.coverImage));
    }
    
    console.log('Profile updated in ProfilePage:', updatedProfile);
  };
  
  // Convert Redux friends to the format expected by FriendsSection
  const formattedFriends = friendsFromRedux.map(friend => ({
    id: parseInt(friend.id),
    name: friend.name,
    image: friend.avatar,
    mutualCount: friend.mutualFriends || 0
  }));
  
  // Convert Redux followers to the format expected by FollowersSection
  const formattedFollowers = followersFromRedux.map(follower => ({
    id: parseInt(follower.id),
    name: follower.name,
    image: follower.image,
    followDate: follower.followDate
  }));
  
  // Convert Redux connections to the format expected by ConnectionsSection
  const formattedConnections = connectionsFromRedux.map(connection => ({
    id: parseInt(connection.id),
    name: connection.name,
    image: connection.image,
    role: connection.role,
    company: connection.company,
    mutualCount: connection.mutualCount
  }));
  
  // Debug Redux posts
  useEffect(() => {
    console.log('ProfilePage - Redux posts:', postsFromRedux);
  }, [postsFromRedux]);
  
  const photos = [
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1543157145-f78c636d023d?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=500&auto=format&fit=crop&q=60',
  ];
  
  const [interests, setInterests] = useState([
    {
      id: 1,
      name: 'Technology',
      logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
      followers: '7,546,224',
      followed: false
    },
    {
      id: 2,
      name: 'Apple',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      followers: '1,028,492',
      followed: false
    },
    {
      id: 3,
      name: 'Space Exploration',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60',
      followers: '418,753',
      followed: false
    },
    {
      id: 4,
      name: 'Music',
      logo: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60',
      followers: '9,654,321',
      followed: false
    },
    {
      id: 5,
      name: 'Web Development',
      logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60',
      followers: '8,457,224',
      followed: false
    },
  ]);
  
  // Handle follow/unfollow for interests
  const handleFollowInterest = (interestId: number) => {
    console.log('handleFollowInterest called with ID:', interestId);
    
    setInterests(prevInterests => {
      const updatedInterests = prevInterests.map(interest => {
        if (interest.id === interestId) {
          const newFollowedState = !interest.followed;
          console.log(`Changing interest ${interest.name} followed state from ${interest.followed} to ${newFollowedState}`);
          
          // Calculate new followers count
          let newFollowers = interest.followers;
          if (newFollowedState) {
            newFollowers = incrementFollowersCount(interest.followers);
          } else {
            newFollowers = decrementFollowersCount(interest.followers);
          }
          
          return { 
            ...interest, 
            followed: newFollowedState,
            followers: newFollowers
          };
        }
        return interest;
      });
      
      console.log('Updated interests state:', updatedInterests);
      return updatedInterests;
    });
  };

  // Helper function to increment followers count
  const incrementFollowersCount = (followersStr: string) => {
    try {
      const followers = parseInt(followersStr.replace(/,/g, ''));
      return (followers + 1).toLocaleString();
    } catch (error) {
      console.error('Error incrementing followers count:', error);
      return followersStr;
    }
  };

  // Helper function to decrement followers count
  const decrementFollowersCount = (followersStr: string) => {
    try {
      const followers = parseInt(followersStr.replace(/,/g, ''));
      return Math.max(0, followers - 1).toLocaleString();
    } catch (error) {
      console.error('Error decrementing followers count:', error);
      return followersStr;
    }
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
      <Navbar />
      
      <div className="container-custom py-6">
        <ProfileHeader 
          name={profileData.name}
          verified={profileData.verified}
          connections={profileData.connections}
          role={profileData.role}
          location={profileData.location}
          joinDate={profileData.joinDate}
          coverImage={profileData.coverImage}
          profileImage={profileData.profileImage}
          onProfileUpdate={handleProfileUpdate}
          profileData={profileData}
        />
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 space-y-6">
            <ProfileInfo 
              bio={profileData.bio}
              birthDate={profileData.birthDate}
              status={profileData.status}
              email={profileData.email}
              role={profileData.role}
              location={profileData.location}
              joinDate={profileData.joinDate}
            />
          </div>
          
          <div className="w-full lg:w-2/3">
            <ProfileTabs onTabChange={handleTabChange} activeTab={activeTab} />
            
            {activeTab === 'posts' && (
              <>
                <PostComposer />
                {postsFromRedux.map(post => (
                  <Post 
                    key={post.id}
                    post={{
                      ...post,
                      user: {
                        name: post.userName || profileData.name,
                        image: post.userAvatar || profileData.profileImage,
                        email: post.userId === session.userId ? (session.email || '') : '',
                        time: new Date(post.timestamp).toLocaleTimeString()
                      },
                      replies: [],
                      // Transform sharedPost if it exists
                      sharedPost: post.sharedPost ? {
                        ...post.sharedPost,
                        user: {
                          name: post.sharedPost.userName,
                          image: post.sharedPost.userAvatar,
                          email: post.sharedPost.userId === session.userId ? (session.email || '') : '',
                          time: new Date(post.sharedPost.timestamp).toLocaleTimeString()
                        },
                        likes: 0,
                        shares: 0,
                        comments: 0,
                        commentsList: [],
                        replies: []
                      } : undefined
                    }}
                  />
                ))}
              </>
            )}
            
            {activeTab === 'about' && (
              <AboutSection 
                bio={profileData.bio}
                birthDate={profileData.birthDate}
                status={profileData.status}
                email={profileData.email}
                location={profileData.location}
                workplace={profileData.workplace}
                education={profileData.education}
              />
            )}
            
            {activeTab === 'friends' && (
              <FriendsSection 
                friends={formattedFriends}
              />
            )}
            
            {activeTab === 'followers' && (
              <FollowersSection 
                followers={formattedFollowers}
              />
            )}
            
            {activeTab === 'connections' && (
              <ConnectionsSection 
                connections={formattedConnections}
              />
            )}
            
            {activeTab === 'interests' && (
              <InterestsSection 
                interests={interests} 
                onFollowInterest={handleFollowInterest}
              />
            )}
            
            {activeTab === 'photos' && (
              <PhotosSection photos={photos} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;