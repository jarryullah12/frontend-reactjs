import { store } from './store';
// import { setPosts } from './slices/postsSlice';
// import { setCurrentUser, setFriends } from './slices/userSlice';
// import { setChats, setContacts } from './slices/chatsSlice';
import { setThemeMode } from './slices/themeSlice';

// Initialize with app preferences when app starts
export const initializeStore = () => {
  /* 
  // Posts data - removed to only show posts from registered users
  const posts = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      content: 'Just published a new article about React and Redux!',
      likes: 42,
      comments: 5,
      shares: 12,
      timestamp: new Date().toISOString(),
      isLiked: false
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      content: 'Beautiful day for hiking! ',
      images: ['https://source.unsplash.com/random/800x600/?hiking'],
      likes: 78,
      comments: 12,
      shares: 3,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isLiked: true
    }
  ];

  // User data - removed to only show registered users
  const currentUser = {
    id: 'user1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverPhoto: 'https://source.unsplash.com/random/1200x400/?gradient',
    bio: 'Frontend Developer | React Enthusiast',
    location: 'San Francisco, CA',
    website: 'johndoe.com',
    joinDate: 'January 2020',
    following: 235,
    followers: 852,
    posts: 43
  };

  // Friends data - removed to only show registered users
  const friends = [
    {
      id: 'friend1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      mutualFriends: 5
    },
    {
      id: 'friend2',
      name: 'Mike Williams',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      mutualFriends: 12
    }
  ];

  // Chats data - removed to only show chats from registered users
  const chats = [
    {
      id: 'chat1',
      participants: ['user1', 'friend1'],
      lastMessage: {
        id: 'msg1',
        senderId: 'friend1',
        receiverId: 'user1',
        content: 'Hey, how are you doing?',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: true
      },
      messages: [
        {
          id: 'msg1',
          senderId: 'friend1',
          receiverId: 'user1',
          content: 'Hey, how are you doing?',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          read: true
        }
      ],
      unreadCount: 0
    }
  ];

  // Contacts data - removed to only show contacts from registered users
  const contacts = [
    {
      id: 'friend1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      status: 'online' as 'online'
    },
    {
      id: 'friend2',
      name: 'Mike Williams',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      status: 'offline' as 'offline',
      lastSeen: '2 hours ago'
    }
  ];
  */

  // Theme - start with light mode
  const theme = 'light';

  // Dispatch only theme data to the store
  // store.dispatch(setPosts(posts));
  // store.dispatch(setCurrentUser(currentUser));
  // store.dispatch(setFriends(friends));
  // store.dispatch(setChats(chats));
  // store.dispatch(setContacts(contacts));
  store.dispatch(setThemeMode(theme));
};