import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatBox from './ChatBox';
import { Contact as ContactType } from '../redux/slices/chatsSlice';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  online: boolean;
  lastSeen?: string;
}

interface OnlineUser {
  id: number;
  name: string;
  avatar: string;
  email?: string;
  status: string;
}

interface ContactsProps {
  contacts?: ContactType[];
  onlineUsers?: OnlineUser[];
}

const Contacts = ({ contacts, onlineUsers }: ContactsProps) => {
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  
  // Transform Redux contacts to the format needed by this component
  const transformedContacts: Contact[] = contacts && contacts.length > 0
    ? contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        avatar: contact.avatar,
        email: contact.email,
        online: contact.status === 'online',
        lastSeen: contact.status === 'away' ? 'a moment ago' : contact.status === 'offline' ? contact.lastSeen || '1h ago' : undefined
      }))
    : onlineUsers 
      ? onlineUsers.map(user => ({
          id: user.id.toString(),
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          online: user.status === 'online',
          lastSeen: user.status === 'away' ? 'a moment ago' : user.status === 'offline' ? '1h ago' : undefined
        }))
      : [
        {
          id: '1',
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          online: true
        },
        {
          id: '2',
          name: 'Sarah Kim',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          online: true
        },
        {
          id: '3',
          name: 'Alex Morgan',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          online: false,
          lastSeen: '2h ago'
        },
        {
          id: '4',
          name: 'Lisa Ray',
          avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
          online: true
        },
        {
          id: '5',
          name: 'Robert Fox',
          avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
          online: false,
          lastSeen: '1h ago'
        }
      ];

  const handleContactClick = (e: React.MouseEvent, contact: Contact) => {
    e.preventDefault();
    setActiveChat(contact);
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-4 mb-4 dark:border dark:border-dark-border transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Contacts</h2>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {transformedContacts.map(contact => (
            <Link 
              key={contact.id}
              to={`/chat/${contact.id}`}
              onClick={(e) => handleContactClick(e, contact)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors"
            >
              <div className="relative">
                <img 
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-secondary rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">{contact.name}</h3>
                {contact.email && (
                  <p className="text-xs text-gray-600 dark:text-gray-300">{contact.email}</p>
                )}
                {!contact.online && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last seen {contact.lastSeen}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      {activeChat && (
        <ChatBox 
          contact={activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}
    </>
  );
};

export default Contacts;