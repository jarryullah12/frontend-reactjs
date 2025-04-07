import React from 'react';

interface UserSuggestion {
  id: string | number;
  name: string;
  username: string;
  image: string;
}

interface WhoToFollowProps {
  suggestions: UserSuggestion[];
}

const WhoToFollow = ({ suggestions }: WhoToFollowProps) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-4 transition-colors">
      <h3 className="font-semibold text-lg mb-4 dark:text-white">Who to follow</h3>
      
      <div className="space-y-4">
        {suggestions.map(user => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <div className="font-medium dark:text-white">{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</div>
              </div>
            </div>
            <button className="text-blue-500 dark:text-blue-400 font-medium border border-blue-500 dark:border-blue-400 rounded-full px-4 py-1 text-sm hover:bg-blue-50 dark:hover:bg-dark-bg">
              Follow
            </button>
          </div>
        ))}
      </div>
      
      <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 mt-4 text-sm font-medium">Show more</button>
    </div>
  );
};

export default WhoToFollow; 