import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Friend } from './userSlice';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: Message | null;
  messages: Message[];
  unreadCount: number;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

interface ChatsState {
  chats: Chat[];
  contacts: Contact[];
  activeChat: string | null;
  loading: boolean;
  error: string | null;
}

// Mock contacts data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'john.doe@example.com',
    status: 'online',
  },
  {
    id: '2',
    name: 'Sarah Kim',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'sarah.kim@example.com',
    status: 'online',
  },
  {
    id: '3',
    name: 'Alex Morgan',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    email: 'alex.morgan@example.com',
    status: 'offline',
    lastSeen: '2h ago'
  },
  {
    id: '4',
    name: 'Lisa Ray',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    email: 'lisa.ray@example.com',
    status: 'online',
  },
  {
    id: '5',
    name: 'Robert Fox',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    email: 'robert.fox@example.com',
    status: 'away',
    lastSeen: '1h ago'
  }
];

// Helper function to convert friends to contacts
const friendsToContacts = (friends: Friend[]): Contact[] => {
  return friends.map(friend => ({
    id: friend.id,
    name: friend.name,
    avatar: friend.avatar,
    email: friend.email,
    status: Math.random() > 0.3 ? 'online' : Math.random() > 0.5 ? 'offline' : 'away',
    lastSeen: Math.random() > 0.5 ? '1h ago' : '30m ago'
  }));
};

// Async thunk for fetching contacts
export const fetchContactsAsync = createAsyncThunk<Contact[], Friend[] | undefined>(
  'chats/fetchContacts',
  async (friends, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // If friends are provided, convert them to contacts
      if (friends && friends.length > 0) {
        return friendsToContacts(friends);
      }
      
      // Otherwise return mock contacts
      return mockContacts;
    } catch (error) {
      return rejectWithValue('Failed to fetch contacts');
    }
  }
);

const initialState: ChatsState = {
  chats: [],
  contacts: [],
  activeChat: null,
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.messages.push(message);
        chat.lastMessage = message;
        if (message.senderId !== 'currentUser') {
          chat.unreadCount += 1;
        }
      }
    },
    markChatAsRead: (state, action: PayloadAction<string>) => {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
        chat.messages.forEach(msg => {
          msg.read = true;
        });
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setChats,
  setContacts,
  setActiveChat,
  addMessage,
  markChatAsRead,
  setLoading,
  setError
} = chatsSlice.actions;

export default chatsSlice.reducer;