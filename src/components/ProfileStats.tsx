import React from 'react';

interface ProfileStatsProps {
  posts: number;
  followers: number;
  following: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ posts, followers, following }) => {
  return (
    <div className="flex justify-around py-3 bg-white dark:bg-dark-secondary rounded-lg shadow-sm mb-4 dark:border dark:border-dark-border transition-colors">
      <div className="text-center">
        <div className="font-bold text-lg dark:text-white">{posts}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg dark:text-white">{followers}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg dark:text-white">{following}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
      </div>
    </div>
  );
};

export default ProfileStats; 