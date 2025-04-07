import React, { useState, useEffect } from 'react';

interface Connection {
  id: number;
  name: string;
  image: string;
  role: string;
  company: string;
  mutualCount: number;
}

type ConnectionStatus = 'connected' | 'disconnected' | 'blocked' | 'messaging' | 'endorsed' | 'pending' | 'sent' | 'recent';

interface ConnectionWithStatus extends Connection {
  status: ConnectionStatus;
  isFollowing?: boolean;
  date?: string; // Date when connection was established or request was sent
}

interface ConnectionsSectionProps {
  connections: Connection[];
}

const ConnectionsSection: React.FC<ConnectionsSectionProps> = ({ connections }) => {
  // Generate some sample dates for connections
  const getRandomDate = () => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30); // Random number of days ago (0-30)
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Initialize connections with dates and some with different statuses
  const initialConnections = connections.map((connection, index) => {
    // Assign different statuses to some connections for demo purposes
    let status: ConnectionStatus = 'connected';
    if (index % 10 === 0) status = 'pending';
    if (index % 7 === 0) status = 'sent';
    if (index < 5) status = 'recent';
    
    return { 
      ...connection, 
      status,
      isFollowing: false,
      date: getRandomDate()
    };
  });

  const [connectionsData, setConnectionsData] = useState<ConnectionWithStatus[]>(initialConnections);
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'pending' | 'sent'>('all');
  
  // Log connections data when it changes
  useEffect(() => {
    console.log('Connections data updated:', connectionsData);
  }, [connectionsData]);
  
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [showEndorseModal, setShowEndorseModal] = useState<number | null>(null);
  
  const handleConnectionAction = (id: number, action: 'disconnect' | 'block' | 'endorse' | 'follow' | 'unfollow' | 'remove' | 'accept' | 'reject') => {
    console.log(`Handling action: ${action} for connection ID: ${id}`);
    
    if (action === 'follow' || action === 'unfollow') {
      setConnectionsData(prevConnections => 
        prevConnections.map(connection => 
          connection.id === id 
            ? { ...connection, isFollowing: action === 'follow' } 
            : connection
        )
      );
    } else if (action === 'endorse') {
      setShowEndorseModal(id);
    } else if (action === 'remove') {
      console.log('Removing connection with ID:', id);
      // Remove the connection
      setConnectionsData(prevConnections => {
        const filteredConnections = prevConnections.filter(connection => connection.id !== id);
        console.log('Connections after removal:', filteredConnections);
        return filteredConnections;
      });
      // Show alert
      setTimeout(() => {
        alert(`Connection removed successfully`);
      }, 300);
    } else if (action === 'accept') {
      setConnectionsData(prevConnections => 
        prevConnections.map(connection => 
          connection.id === id 
            ? { ...connection, status: 'connected' as ConnectionStatus } 
            : connection
        )
      );
      setTimeout(() => {
        alert(`Connection request accepted`);
      }, 300);
    } else if (action === 'reject') {
      setConnectionsData(prevConnections => {
        const filteredConnections = prevConnections.filter(connection => connection.id !== id);
        return filteredConnections;
      });
      setTimeout(() => {
        alert(`Connection request rejected`);
      }, 300);
    } else {
      setConnectionsData(prevConnections => 
        prevConnections.map(connection => 
          connection.id === id 
            ? { ...connection, status: action === 'disconnect' ? 'disconnected' as ConnectionStatus : 'blocked' as ConnectionStatus } 
            : connection
        )
      );
    }
    setShowDropdown(null);
  };
  
  const handleEndorseSubmit = (id: number) => {
    setConnectionsData(prevConnections => 
      prevConnections.map(connection => 
        connection.id === id 
          ? { ...connection, status: 'endorsed' as ConnectionStatus } 
          : connection
      )
    );
    
    setTimeout(() => {
      setConnectionsData(prevConnections => 
        prevConnections.map(connection => 
          connection.id === id 
            ? { ...connection, status: 'connected' as ConnectionStatus } 
            : connection
        )
      );
      alert(`You have endorsed ${connectionsData.find(connection => connection.id === id)?.name}`);
    }, 1000);
    
    setShowEndorseModal(null);
  };
  
  const handleMessageClick = (id: number) => {
    console.log('Message button clicked for connection ID:', id);
    
    // Find the connection name before updating state
    const connectionName = connectionsData.find(connection => connection.id === id)?.name;
    
    // First set the status to messaging
    setConnectionsData(prevConnections => 
      prevConnections.map(connection => 
        connection.id === id 
          ? { ...connection, status: 'messaging' as ConnectionStatus } 
          : connection
      )
    );
    
    // Then simulate sending a message after a short delay
    setTimeout(() => {
      alert(`Message sent to ${connectionName}`);
      // Reset status back to connected
      setConnectionsData(prevConnections => 
        prevConnections.map(connection => 
          connection.id === id 
            ? { ...connection, status: 'connected' as ConnectionStatus } 
            : connection
        )
      );
    }, 500);
  };
  
  const handleSendInvite = (id: number) => {
    setConnectionsData(prevConnections => 
      prevConnections.map(connection => 
        connection.id === id 
          ? { ...connection, status: 'pending' as ConnectionStatus } 
          : connection
      )
    );
    
    setTimeout(() => {
      alert(`Invitation sent to ${connectionsData.find(connection => connection.id === id)?.name}`);
      setConnectionsData(prevConnections => 
        prevConnections.map(connection => 
          connection.id === id 
            ? { ...connection, status: 'connected' as ConnectionStatus } 
            : connection
        )
      );
    }, 800);
  };
  
  // Filter connections based on active tab
  const filteredConnections = connectionsData.filter(connection => {
    switch (activeTab) {
      case 'all':
        return ['connected', 'messaging', 'endorsed', 'recent'].includes(connection.status);
      case 'recent':
        return connection.status === 'recent';
      case 'pending':
        return connection.status === 'pending';
      case 'sent':
        return connection.status === 'sent';
      default:
        return true;
    }
  });

  // Get count of pending requests
  const pendingCount = connectionsData.filter(c => c.status === 'pending').length;
  
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">My Network</h2>
        <span className="text-sm font-medium px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {connectionsData.filter(connection => ['connected', 'messaging', 'endorsed', 'recent'].includes(connection.status)).length}
        </span>
      </div>
      
      <div className="flex mb-4 space-x-2 border-b pb-3 overflow-x-auto">
        <button 
          className={`px-4 py-2 ${activeTab === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full text-sm font-medium whitespace-nowrap`}
          onClick={() => setActiveTab('all')}
        >
          All Connections
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'recent' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full text-sm font-medium whitespace-nowrap`}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'pending' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full text-sm font-medium whitespace-nowrap`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Requests ({pendingCount})
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'sent' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full text-sm font-medium whitespace-nowrap`}
          onClick={() => setActiveTab('sent')}
        >
          Sent
        </button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 dark:text-white">
        {activeTab === 'all' && 'All Connections'}
        {activeTab === 'recent' && 'Recent Connections'}
        {activeTab === 'pending' && 'Pending Requests'}
        {activeTab === 'sent' && 'Sent Requests'}
      </h3>
      
      <div className="divide-y dark:divide-dark-border">
        {filteredConnections.length > 0 ? (
          filteredConnections.map(connection => (
            <div key={connection.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center mb-3 sm:mb-0">
                <img 
                  src={connection.image} 
                  alt={connection.name} 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium dark:text-white">{connection.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{connection.role}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex -space-x-2 mr-2">
                      {/* Mutual connection avatars */}
                      <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {connection.mutualCount} shared connections
                      {connection.date && ` • ${connection.date}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                {/* Show different actions based on connection status */}
                {(['connected', 'recent', 'endorsed'] as ConnectionStatus[]).includes(connection.status) && (
                  <>
                    <button 
                      className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm flex-1 sm:flex-none"
                      onClick={() => handleMessageClick(connection.id)}
                    >
                      {connection.status === 'messaging' ? 'Sending...' : 'Message'}
                    </button>
                    <button 
                      className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm flex-1 sm:flex-none"
                      onClick={() => handleConnectionAction(connection.id, 'remove')}
                    >
                      Remove
                    </button>
                  </>
                )}
                
                {connection.status === 'pending' && (
                  <>
                    <button 
                      className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm flex-1 sm:flex-none"
                      onClick={() => handleConnectionAction(connection.id, 'accept')}
                    >
                      Accept
                    </button>
                    <button 
                      className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm flex-1 sm:flex-none"
                      onClick={() => handleConnectionAction(connection.id, 'reject')}
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {connection.status === 'sent' && (
                  <button 
                    className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm flex-1 sm:flex-none"
                    onClick={() => handleConnectionAction(connection.id, 'remove')}
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">
              {activeTab === 'all' && 'No connections to display'}
              {activeTab === 'recent' && 'No recent connections'}
              {activeTab === 'pending' && 'No pending requests'}
              {activeTab === 'sent' && 'No sent requests'}
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
              Find Connections
            </button>
          </div>
        )}
      </div>
      
      {/* Endorse modal */}
      {showEndorseModal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Endorse {connectionsData.find(c => c.id === showEndorseModal)?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">What skills would you like to endorse?</p>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input type="checkbox" id="skill1" className="mr-2" />
                <label htmlFor="skill1" className="text-sm dark:text-gray-200">Leadership</label>
              </div>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="skill2" className="mr-2" />
                <label htmlFor="skill2" className="text-sm dark:text-gray-200">Communication</label>
              </div>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="skill3" className="mr-2" />
                <label htmlFor="skill3" className="text-sm dark:text-gray-200">
                  {connectionsData.find(c => c.id === showEndorseModal)?.role} Skills
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
                onClick={() => setShowEndorseModal(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
                onClick={() => handleEndorseSubmit(showEndorseModal)}
              >
                Endorse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionsSection;
