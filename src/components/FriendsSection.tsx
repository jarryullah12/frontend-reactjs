import React, { useState } from 'react';

interface Friend {
  id: number;
  name: string;
  image: string;
  mutualCount: number;
}

interface FriendsSectionProps {
  friends: Friend[];
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ friends }) => {
  const [friendsData, setFriendsData] = useState<(Friend & { status: 'friends' | 'unfriended' | 'blocked' | 'messaging' })[]>(
    friends.map(friend => ({ ...friend, status: 'friends' }))
  );
  
  const [pendingRequests, setPendingRequests] = useState<{ id: number; name: string; image: string }[]>([
    {
      id: 101,
      name: 'Michael Johnson',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 102,
      name: 'Emma Wilson',
      image: 'https://randomuser.me/api/portraits/women/22.jpg'
    }
  ]);
  
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  
  const handleFriendAction = (id: number, action: 'unfriend' | 'block') => {
    setFriendsData(prevFriends => 
      prevFriends.map(friend => 
        friend.id === id 
          ? { ...friend, status: action === 'unfriend' ? 'unfriended' : 'blocked' } 
          : friend
      )
    );
    setShowDropdown(null);
  };
  
  const handleRequestAction = (id: number, action: 'accept' | 'decline') => {
    if (action === 'accept') {
      const acceptedRequest = pendingRequests.find(req => req.id === id);
      if (acceptedRequest) {
        setFriendsData(prev => [
          ...prev, 
          { 
            ...acceptedRequest, 
            status: 'friends', 
            mutualCount: Math.floor(Math.random() * 20) 
          }
        ]);
      }
    }
    
    setPendingRequests(prev => prev.filter(req => req.id !== id));
  };
  
  const handleMessageClick = (id: number) => {
    // First set the status to messaging
    setFriendsData(prevFriends => 
      prevFriends.map(friend => 
        friend.id === id 
          ? { ...friend, status: 'messaging' } 
          : friend
      )
    );
    
    // Then simulate sending a message after a short delay
    setTimeout(() => {
      alert(`Message sent to ${friendsData.find(friend => friend.id === id)?.name}`);
      // Reset status back to friends
      setFriendsData(prevFriends => 
        prevFriends.map(friend => 
          friend.id === id 
            ? { ...friend, status: 'friends' } 
            : friend
        )
      );
    }, 500);
  };
  
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Friends</h2>
        <div className="relative">
          <button 
            className={`text-sm font-medium px-3 py-1 rounded-md ${
              pendingRequests.length > 0 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setShowPendingRequests(!showPendingRequests)}
          >
            Friend Requests
            {pendingRequests.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {pendingRequests.length}
              </span>
            )}
          </button>
          
          {showPendingRequests && pendingRequests.length > 0 && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-3 z-10 border dark:border-dark-border">
              <h3 className="text-sm font-medium mb-2 dark:text-white">Friend Requests</h3>
              <div className="space-y-3">
                {pendingRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={request.image} 
                        alt={request.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <span className="font-medium text-sm dark:text-white">{request.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleRequestAction(request.id, 'accept')}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleRequestAction(request.id, 'decline')}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {friendsData
          .filter(friend => friend.status === 'friends' || friend.status === 'messaging')
          .map(friend => (
            <div key={friend.id} className="relative">
              <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 text-center">
                <div className="relative inline-block">
                  <img 
                    src={friend.image} 
                    alt={friend.name} 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                  />
                  <button 
                    className="absolute -top-1 -right-1 bg-white dark:bg-dark-secondary rounded-full p-1 shadow-sm border dark:border-dark-border"
                    onClick={() => setShowDropdown(showDropdown === friend.id ? null : friend.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDropdown === friend.id && (
                    <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-dark-secondary rounded-md shadow-lg z-10 border dark:border-dark-border">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button 
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg"
                            onClick={() => handleFriendAction(friend.id, 'unfriend')}
                          >
                            Unfriend
                          </button>
                        </li>
                        <li>
                          <button 
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg text-red-500"
                            onClick={() => handleFriendAction(friend.id, 'block')}
                          >
                            Block
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm dark:text-white">{friend.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{friend.mutualCount} mutual friends</p>
                <button 
                  className={`mt-2 text-xs px-2 py-1 rounded-md ${friend.status === 'messaging' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => handleMessageClick(friend.id)}
                  disabled={friend.status === 'messaging'}
                >
                  {friend.status === 'messaging' ? 'Sending...' : 'Message'}
                </button>
              </div>
            </div>
          ))}
      </div>
      
      {friendsData.filter(friend => friend.status === 'friends' || friend.status === 'messaging').length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No friends to display</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
            Find Friends
          </button>
        </div>
      )}
      
      {friendsData.filter(friend => friend.status === 'friends' || friend.status === 'messaging').length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-blue-500 dark:text-blue-400 text-sm font-medium">
            See All Friends
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendsSection;