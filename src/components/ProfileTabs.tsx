import React from 'react';

interface ProfileTabsProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ onTabChange, activeTab }) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm mb-6 overflow-x-auto dark:border dark:border-dark-border transition-colors">
      <div className="flex border-b border-gray-200 dark:border-dark-border">
        <button 
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'posts' ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          onClick={() => onTabChange('posts')}
        >
          Posts
        </button>
        
        <button 
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'about' ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          onClick={() => onTabChange('about')}
        >
          About
        </button>
        
        <button 
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'friends' ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          onClick={() => onTabChange('friends')}
        >
          Friends
        </button>
        
        <button 
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'followers' ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          onClick={() => onTabChange('followers')}
        >
          Followers
        </button>
        
        <button 
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap flex items-center ${activeTab === 'connections' ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          onClick={() => onTabChange('connections')}
        >
          Connections
          <span className="ml-1 px-1.5 py-0.5 bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-gray-300 rounded-full text-xs">230</span>
        </button>
        
        <button 
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'interests' ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          onClick={() => onTabChange('interests')}
        >
          Interests
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;