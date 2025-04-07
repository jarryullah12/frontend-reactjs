import React from 'react';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  online: boolean;
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-dark-border">
        <h2 className="text-xl font-semibold dark:text-white">Active chats</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Search for chats"
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg ${
              selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
            onClick={() => onSelectChat(chat.id)}
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
              <h3 className="font-semibold dark:text-white">{chat.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList; 