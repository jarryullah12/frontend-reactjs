import React, { useState } from 'react';
import Layout from '../components/Layout';
import ConnectionCard from '../components/ConnectionCard';

const ConnectionsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  const connections = [
    {
      id: 1,
      name: 'Lori Ferguson',
      image: 'https://randomuser.me/api/portraits/women/36.jpg',
      title: 'Full Stack Web Developer',
      sharedConnections: [
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://randomuser.me/api/portraits/men/43.jpg',
        'https://randomuser.me/api/portraits/women/52.jpg',
      ],
      type: 'existing'
    },
    {
      id: 2,
      name: 'Carolyn Ortiz',
      image: 'https://randomuser.me/api/portraits/women/21.jpg',
      title: 'Web Developer | Freelancer',
      sharedConnections: [
        'https://randomuser.me/api/portraits/women/43.jpg',
        'https://randomuser.me/api/portraits/men/28.jpg',
      ],
      type: 'existing'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      image: 'https://randomuser.me/api/portraits/men/55.jpg',
      title: 'UI/UX Designer',
      sharedConnections: [
        'https://randomuser.me/api/portraits/men/54.jpg',
        'https://randomuser.me/api/portraits/men/26.jpg',
      ],
      type: 'existing'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      title: 'Product Manager',
      sharedConnections: [
        'https://randomuser.me/api/portraits/men/19.jpg',
        'https://randomuser.me/api/portraits/women/33.jpg',
        'https://randomuser.me/api/portraits/men/54.jpg',
        'https://randomuser.me/api/portraits/women/19.jpg',
      ],
      type: 'request'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
      title: 'Backend Developer',
      sharedConnections: [
        'https://randomuser.me/api/portraits/men/35.jpg',
        'https://randomuser.me/api/portraits/women/25.jpg',
      ],
      type: 'request'
    },
    {
      id: 6,
      name: 'Jennifer Brown',
      image: 'https://randomuser.me/api/portraits/women/76.jpg',
      title: 'Data Scientist',
      sharedConnections: [
        'https://randomuser.me/api/portraits/women/29.jpg',
      ],
      type: 'request'
    },
    {
      id: 7,
      name: 'David Miller',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      title: 'Software Engineer',
      sharedConnections: [
        'https://randomuser.me/api/portraits/men/25.jpg',
        'https://randomuser.me/api/portraits/women/27.jpg',
      ],
      type: 'sent'
    },
    {
      id: 8,
      name: 'Emily Clark',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      title: 'Marketing Specialist',
      sharedConnections: [
        'https://randomuser.me/api/portraits/women/35.jpg',
      ],
      type: 'sent'
    },
  ];
  
  const filteredConnections = filter === 'all' 
    ? connections 
    : filter === 'recent'
      ? connections.filter(c => c.type === 'existing').slice(0, 2)
      : filter === 'requests'
        ? connections.filter(c => c.type === 'request')
        : connections.filter(c => c.type === 'sent');

  const handleRemoveConnection = (id: number) => {
    console.log('Remove connection:', id);
    // Implement connection removal logic
  };

  const handleMessageConnection = (id: number) => {
    console.log('Message connection:', id);
    // Implement messaging logic
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow p-6 mb-6 dark:border dark:border-dark-border transition-colors">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">My Network</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Manage your connections and network</p>
          
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-hover'}`}
              onClick={() => setFilter('all')}
            >
              All Connections
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'recent' 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-hover'}`}
              onClick={() => setFilter('recent')}
            >
              Recent
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'requests' 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-hover'}`}
              onClick={() => setFilter('requests')}
            >
              Pending Requests ({connections.filter(c => c.type === 'request').length})
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'sent' 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-hover'}`}
              onClick={() => setFilter('sent')}
            >
              Sent
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow mb-6 dark:border dark:border-dark-border transition-colors">
          <div className="p-4 border-b dark:border-dark-border">
            <h2 className="text-xl font-semibold dark:text-white">
              {filter === 'all' ? 'All Connections' : 
               filter === 'recent' ? 'Recent Connections' :
               filter === 'requests' ? 'Pending Requests' : 'Sent Requests'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {filteredConnections.map((connection, index) => (
              <div 
                key={connection.id} 
                className={`p-4 ${index % 2 === 0 ? 'border-r dark:border-dark-border' : ''} ${index < filteredConnections.length - 2 ? 'border-b dark:border-dark-border' : ''}`}
              >
                <ConnectionCard 
                  name={connection.name}
                  image={connection.image}
                  title={connection.title}
                  sharedConnections={connection.sharedConnections}
                  onRemove={() => handleRemoveConnection(connection.id)}
                  onMessage={() => handleMessageConnection(connection.id)}
                />
              </div>
            ))}
          </div>
          
          {filteredConnections.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No connections found in this category</p>
            </div>
          )}
          
          {filteredConnections.length > 6 && (
            <div className="p-4 text-center border-t dark:border-dark-border">
              <button className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white font-medium rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-secondary transition-colors">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ConnectionsPage; 