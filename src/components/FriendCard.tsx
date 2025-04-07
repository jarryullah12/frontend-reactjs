import React from 'react';
import { useSession } from '../contexts/SessionContext';

interface FriendCardProps {
  name: string;
  image: string;
  mutualConnections: number;
  email?: string;
}

const FriendCard: React.FC<FriendCardProps> = ({
  name,
  image,
  mutualConnections,
  email
}) => {
  const { session } = useSession();
  return (
    <div className="p-3 border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-secondary rounded-lg text-center transition-colors">
      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="font-medium text-sm mb-1 dark:text-white">{name}</h3>
      {email && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {email}
        </p>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {mutualConnections} mutual {mutualConnections === 1 ? 'connection' : 'connections'}
      </p>
      
      <div className="flex gap-1 mt-2">
        <button className="flex-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-md text-xs transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button className="flex-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-1 rounded-md text-xs transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FriendCard; 