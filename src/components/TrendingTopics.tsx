import React from 'react';

interface TrendingTopic {
  id: string | number;
  tag: string;
  count: string;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
}

const TrendingTopics = ({ topics }: TrendingTopicsProps) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-4 mt-4 transition-colors">
      <h3 className="font-semibold text-lg mb-4 dark:text-white">Trending topics</h3>
      
      <div className="space-y-3">
        {topics.map(topic => (
          <div key={topic.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-blue-500 dark:text-blue-400">#{topic.tag}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{topic.count} posts</div>
            </div>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 mt-4 text-sm font-medium">Show more</button>
    </div>
  );
};

export default TrendingTopics; 