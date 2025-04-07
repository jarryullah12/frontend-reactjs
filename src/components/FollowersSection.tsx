import React, { useState } from 'react';

interface Follower {
  id: number;
  name: string;
  image: string;
  followDate: string;
}

interface FollowersSectionProps {
  followers: Follower[];
}

const FollowersSection: React.FC<FollowersSectionProps> = ({ followers }) => {
  const [followersData, setFollowersData] = useState<(Follower & { status: 'following' | 'removed' | 'blocked' | 'followingBack' | 'followedBack' })[]>(
    followers.map(follower => ({ ...follower, status: 'following' }))
  );
  
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  
  const handleFollowerAction = (id: number, action: 'remove' | 'block') => {
    setFollowersData(prevFollowers => 
      prevFollowers.map(follower => 
        follower.id === id 
          ? { ...follower, status: action === 'remove' ? 'removed' : 'blocked' } 
          : follower
      )
    );
    setShowDropdown(null);
  };
  
  const handleFollowBack = (id: number) => {
    // First set status to followingBack (in progress)
    setFollowersData(prevFollowers => 
      prevFollowers.map(follower => 
        follower.id === id 
          ? { ...follower, status: 'followingBack' } 
          : follower
      )
    );
    
    // Then simulate the follow back action after a short delay
    setTimeout(() => {
      alert(`You are now following ${followersData.find(follower => follower.id === id)?.name}`);
      // Update status to followedBack (completed)
      setFollowersData(prevFollowers => 
        prevFollowers.map(follower => 
          follower.id === id 
            ? { ...follower, status: 'followedBack' } 
            : follower
        )
      );
    }, 500);
  };
  
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Followers</h2>
        <span className="text-sm font-medium px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {followersData.filter(follower => follower.status === 'following' || follower.status === 'followingBack' || follower.status === 'followedBack').length}
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {followersData
          .filter(follower => follower.status === 'following' || follower.status === 'followingBack' || follower.status === 'followedBack')
          .map(follower => (
            <div key={follower.id} className="relative">
              <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 text-center">
                <div className="relative inline-block">
                  <img 
                    src={follower.image} 
                    alt={follower.name} 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                  />
                  <button 
                    className="absolute -top-1 -right-1 bg-white dark:bg-dark-secondary rounded-full p-1 shadow-sm border dark:border-dark-border"
                    onClick={() => setShowDropdown(showDropdown === follower.id ? null : follower.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDropdown === follower.id && (
                    <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-dark-secondary rounded-md shadow-lg z-10 border dark:border-dark-border">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button 
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg"
                            onClick={() => handleFollowerAction(follower.id, 'remove')}
                          >
                            Remove follower
                          </button>
                        </li>
                        <li>
                          <button 
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg text-red-500"
                            onClick={() => handleFollowerAction(follower.id, 'block')}
                          >
                            Block
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm dark:text-white">{follower.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Following since {follower.followDate}</p>
                {follower.status === 'following' && (
                  <button 
                    className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                    onClick={() => handleFollowBack(follower.id)}
                  >
                    Follow back
                  </button>
                )}
                {follower.status === 'followingBack' && (
                  <button 
                    className="mt-2 text-xs bg-blue-400 text-white px-2 py-1 rounded-md cursor-wait"
                    disabled
                  >
                    Following...
                  </button>
                )}
                {follower.status === 'followedBack' && (
                  <button 
                    className="mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded-md"
                    disabled
                  >
                    Following
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      
      {followersData.filter(follower => follower.status === 'following' || follower.status === 'followingBack' || follower.status === 'followedBack').length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No followers yet</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
            Find People
          </button>
        </div>
      )}
      
      {followersData.filter(follower => follower.status === 'following' || follower.status === 'followingBack' || follower.status === 'followedBack').length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-blue-500 dark:text-blue-400 text-sm font-medium">
            See All Followers
          </button>
        </div>
      )}
    </div>
  );
};

export default FollowersSection;
