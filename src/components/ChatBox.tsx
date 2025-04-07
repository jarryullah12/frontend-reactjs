import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
}

interface ChatBoxProps {
  contact: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  };
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ contact, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there!',
      sender: 'contact',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Hello! How are you?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: '3',
      text: 'I am good, thanks!',
      sender: 'contact',
      timestamp: new Date(Date.now() - 2400000)
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-dark-secondary rounded-lg shadow-lg flex flex-col overflow-hidden dark:border dark:border-dark-border transition-colors z-50">
      {/* Chat Header */}
      <div className="bg-white dark:bg-dark-secondary border-b dark:border-dark-border p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            {contact.online && (
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white dark:border-dark-secondary rounded-full"></span>
            )}
          </div>
          <h3 className="font-medium text-sm dark:text-white">{contact.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96 dark:bg-dark-secondary">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-2 ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-gray-200'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t dark:border-dark-border p-2 dark:bg-dark-secondary">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-1 border dark:border-dark-border rounded-full text-sm focus:outline-none focus:border-blue-500 dark:bg-dark-bg dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400 dark:disabled:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox; 