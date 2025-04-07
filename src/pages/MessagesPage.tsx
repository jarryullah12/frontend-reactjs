import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import MessageInput from '../components/chat/MessageInput';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  read: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
}

const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! How are you doing today?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: '2',
      text: 'I\'m doing well, thanks for asking! How about you?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3500000),
      read: true
    },
    {
      id: '3',
      text: 'Great! I wanted to discuss the project timeline.',
      sender: 'other',
      timestamp: new Date(Date.now() - 3400000),
      read: true
    }
  ]);
  
  const [chats, setChats] = useState<ChatUser[]>([
    {
      id: '1',
      name: 'Judy Nguyen',
      lastMessage: 'Great! I wanted to discuss the project timeline.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: true,
      unreadCount: 0
    },
    {
      id: '2',
      name: 'Michael Chen',
      lastMessage: 'Can you send me those files when you get a chance?',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: true,
      unreadCount: 2
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      lastMessage: 'Looking forward to our meeting tomorrow!',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      online: false,
      unreadCount: 0
    },
    {
      id: '4',
      name: 'David Wilson',
      lastMessage: 'Thanks for your help with the presentation.',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      online: false,
      unreadCount: 0
    }
  ]);

  // State for modals
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };
    
    setMessages([...messages, newMessage]);
    
    // Update last message in chat list
    if (selectedChat) {
      const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            lastMessage: message
          };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  };

  const handleNewMessage = () => {
    if (!newMessageRecipient.trim() || !newMessageText.trim()) return;
    
    // Create a new chat
    const newChatId = Date.now().toString();
    const newChat: ChatUser = {
      id: newChatId,
      name: newMessageRecipient,
      lastMessage: newMessageText,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // Default avatar
      online: false,
      unreadCount: 0
    };
    
    // Create a new message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: newMessageText,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };
    
    setChats([newChat, ...chats]);
    setSelectedChat(newChatId);
    setMessages([newMessage]);
    setShowNewMessageModal(false);
    setNewMessageRecipient('');
    setNewMessageText('');
  };

  const handleMarkAsRead = () => {
    if (!selectedChat) return;
    
    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat) {
        return {
          ...chat,
          unreadCount: 0
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
  };

  const handleArchiveChat = () => {
    if (!selectedChat) return;
    
    // Remove the chat from the list (in a real app, you'd move it to an archived list)
    const updatedChats = chats.filter(chat => chat.id !== selectedChat);
    setChats(updatedChats);
    setSelectedChat(null);
    setShowArchiveConfirm(false);
    setShowOptionsModal(false);
  };

  const handleBlockUser = () => {
    if (!selectedChat) return;
    
    // Remove the chat from the list (in a real app, you'd add the user to a blocked list)
    const updatedChats = chats.filter(chat => chat.id !== selectedChat);
    setChats(updatedChats);
    setSelectedChat(null);
    setShowBlockConfirm(false);
    setShowOptionsModal(false);
  };

  const handleDeleteChat = () => {
    if (!selectedChat) return;
    
    // Remove the chat from the list
    const updatedChats = chats.filter(chat => chat.id !== selectedChat);
    setChats(updatedChats);
    setSelectedChat(null);
    setShowDeleteConfirm(false);
    setShowOptionsModal(false);
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-dark-bg transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-dark-secondary shadow-sm border-b dark:border-dark-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Messages</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowNewMessageModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Message
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-secondary flex flex-col">
          <div className="p-4 border-b dark:border-dark-border">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg ${
                  selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-secondary"></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold dark:text-white">{chat.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-secondary flex items-center justify-between transition-colors">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={chats.find(c => c.id === selectedChat)?.avatar}
                      alt={chats.find(c => c.id === selectedChat)?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {chats.find(c => c.id === selectedChat)?.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-dark-secondary"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold dark:text-white">{chats.find(c => c.id === selectedChat)?.name}</h3>
                    <p className="text-sm text-green-500">
                      {chats.find(c => c.id === selectedChat)?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button 
                    onClick={handleMarkAsRead}
                    className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg"
                    title="Mark as read"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setShowOptionsModal(true)}
                    className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg"
                    title="More options"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-bg transition-colors">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-dark-secondary text-gray-800 dark:text-white'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <p className={`text-xs ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          {message.sender === 'user' && (
                            <span className="text-xs text-blue-100">
                              {message.read ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-bg transition-colors">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 mt-4">Select a chat to start messaging</p>
                <button 
                  onClick={() => setShowNewMessageModal(true)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Start a new conversation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">New Message</h2>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Recipient</label>
              <input
                type="text"
                value={newMessageRecipient}
                onChange={(e) => setNewMessageRecipient(e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="w-full px-3 py-2 border dark:border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-white"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="px-4 py-2 border dark:border-dark-border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                Cancel
              </button>
              <button
                onClick={handleNewMessage}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Options Modal */}
      {showOptionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg w-full max-w-xs p-4">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Chat Options</h2>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowOptionsModal(false);
                  setShowArchiveConfirm(true);
                }}
                className="w-full text-left px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Archive Chat
              </button>
              <button
                onClick={() => {
                  setShowOptionsModal(false);
                  setShowBlockConfirm(true);
                }}
                className="w-full text-left px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Block User
              </button>
              <button
                onClick={() => {
                  setShowOptionsModal(false);
                  setShowDeleteConfirm(true);
                }}
                className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Chat
              </button>
            </div>
            <div className="mt-4 pt-2 border-t dark:border-dark-border">
              <button
                onClick={() => setShowOptionsModal(false)}
                className="w-full text-center px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Archive Confirmation Modal */}
      {showArchiveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Archive Chat</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to archive this chat? You can access it later from your archived chats.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowArchiveConfirm(false)}
                className="px-4 py-2 border dark:border-dark-border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                Cancel
              </button>
              <button
                onClick={handleArchiveChat}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Block Confirmation Modal */}
      {showBlockConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Block User</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to block this user? They won't be able to send you messages anymore.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowBlockConfirm(false)}
                className="px-4 py-2 border dark:border-dark-border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockUser}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Delete Chat</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this chat? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border dark:border-dark-border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteChat}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
