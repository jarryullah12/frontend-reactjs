import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import MessageInput from '../components/chat/MessageInput';
import { useSession } from '../contexts/SessionContext';
import { useUser } from '../redux/hooks';
import { setContacts, setChats, Chat as ChatType, Contact } from '../redux/slices/chatsSlice';
import { UserProfile } from '../redux/slices/userSlice';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  online: boolean;
}

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setLocalChats] = useState<ChatUser[]>([]);
  const { session } = useSession();
  const { currentUser, allUsers } = useUser();
  const dispatch = useDispatch();

  // Load registered users when the component mounts
  useEffect(() => {
    if (session.isAuthenticated && currentUser) {
      // Convert registered users to chat contacts
      const registeredUsers = allUsers
        .filter((user: UserProfile) => user.id !== currentUser.id) // Don't include current user
        .map((user: UserProfile) => ({
          id: user.id,
          name: user.name,
          lastMessage: "Click to start chatting",
          avatar: user.avatar,
          online: Math.random() > 0.5, // Random online status for demo
        }));
      
      setLocalChats(registeredUsers);
      
      // Set up initial chats in Redux store
      const initialChats = registeredUsers.map((user: ChatUser) => ({
        id: user.id,
        participants: [currentUser.id, user.id],
        lastMessage: null,
        messages: [],
        unreadCount: 0
      }));
      
      dispatch(setChats(initialChats));
      
      // Set up contacts in Redux store
      const contacts: Contact[] = registeredUsers.map((user: ChatUser) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        status: user.online ? 'online' : 'offline' as 'online' | 'offline' | 'away'
      }));
      
      dispatch(setContacts(contacts));
    } else {
      // If not authenticated, show empty chats
      setLocalChats([]);
    }
  }, [session.isAuthenticated, currentUser, allUsers, dispatch]);

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !selectedChat) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Update the chat list with the new message
    setLocalChats(prev => 
      prev.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, lastMessage: message } 
          : chat
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg transition-colors">
      <div className="w-1/4 border-r border-gray-200 dark:border-dark-border bg-white dark:bg-dark-secondary">
        {session.isAuthenticated ? (
          <ChatList 
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
              Please log in to see your chats
            </p>
            <a 
              href="/login" 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
            >
              Login
            </a>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        {session.isAuthenticated ? (
          <>
            <ChatWindow 
              messages={messages}
              selectedChat={chats.find(chat => chat.id === selectedChat)}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              Please log in to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;