import React from 'react';

interface ConnectionCardProps {
  name: string;
  image: string;
  title?: string;
  sharedConnections: string[];
  onRemove: () => void;
  onMessage: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  name,
  image,
  title,
  sharedConnections,
  onRemove,
  onMessage
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
            {title && <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>}
          </div>
        </div>
        <button 
          onClick={onRemove} 
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Remove
        </button>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-2">
            {sharedConnections.slice(0, 3).map((connection, index) => (
              <div key={index} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white dark:border-dark-secondary">
                <img src={connection} alt="Shared connection" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {sharedConnections.length} shared {sharedConnections.length === 1 ? 'connection' : 'connections'}
          </span>
        </div>
        
        <button 
          onClick={onMessage} 
          className="px-4 py-1 text-xs bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ConnectionCard; 