import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../redux/hooks';

const SearchResults: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { results, isSearching, query, error } = useSearch();
  
  console.log("SearchResults component rendering with:", { 
    resultsCount: results.length, 
    isSearching, 
    query, 
    error 
  });

  if (isSearching) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-secondary border dark:border-dark-border rounded-md shadow-lg p-4 max-h-96 overflow-y-auto z-50">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-secondary border dark:border-dark-border rounded-md shadow-lg p-4 max-h-96 overflow-y-auto z-50">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-secondary border dark:border-dark-border rounded-md shadow-lg p-4 max-h-96 overflow-y-auto z-50">
        <div className="text-gray-500 dark:text-gray-400 text-center">No results found for "{query}"</div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-secondary border dark:border-dark-border rounded-md shadow-lg p-2 max-h-96 overflow-y-auto z-50">
      <div className="mb-2 px-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </div>
      </div>
      
      <div className="space-y-2">
        {results.map((result) => (
          <div 
            key={result.id} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md cursor-pointer"
            onClick={() => {
              console.log("Search result clicked:", result);
              onClose();
            }}
          >
            {result.type === 'post' && (
              <div className="flex items-start space-x-2">
                <img 
                  src={result.userAvatar} 
                  alt={result.userName} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/1.jpg";
                  }}
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{result.userName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{result.content}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
            
            {result.type === 'user' && (
              <Link to={`/profile/${result.id}`} className="flex items-center space-x-2">
                <img 
                  src={result.avatar} 
                  alt={result.name} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/1.jpg";
                  }}
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{result.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">@{result.username}</div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
