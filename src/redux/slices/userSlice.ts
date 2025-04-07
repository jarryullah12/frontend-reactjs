import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE_PICTURE, DEFAULT_COVER_PHOTO } from '../../assets/images/defaultImages';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  following: number;
  followers: number;
  posts: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  mutualFriends?: number;
}

export interface Follower {
  id: string;
  name: string;
  image: string;
  followDate: string;
}

export interface Connection {
  id: string;
  name: string;
  image: string;
  role: string;
  company: string;
  mutualCount: number;
}

export interface BirthdayReminder {
  id: string;
  name: string;
  image: string;
  date: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  action: string;
  content: string;
  timestamp: string;
}

export interface SignupData {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

interface UserState {
  currentUser: UserProfile | null;
  allUsers: UserProfile[];
  friends: Friend[];
  followers: Follower[];
  connections: Connection[];
  birthdayReminders: BirthdayReminder[];
  recentActivities: ActivityItem[];
  loading: boolean;
  error: string | null;
  isSigningUp: boolean;
  signupSuccess: boolean;
  signupError: string | null;
  isLoggingIn: boolean;
  loginSuccess: boolean;
  loginError: string | null;
  isAuthenticated: boolean;
  isRequestingPasswordReset: boolean;
  passwordResetRequested: boolean;
  passwordResetError: string | null;
}

// Mock data for followers
const mockFollowers: Follower[] = [
  {
    id: '1',
    name: 'Jessica Parker',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    followDate: 'Jan 2023'
  },
  {
    id: '2',
    name: 'Robert Chen',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    followDate: 'Mar 2023'
  },
  {
    id: '3',
    name: 'Sophia Williams',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    followDate: 'Dec 2022'
  },
  {
    id: '4',
    name: 'David Miller',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    followDate: 'Feb 2023'
  }
];

// Mock data for birthday reminders
const mockBirthdayReminders: BirthdayReminder[] = [
  {
    id: '1',
    name: 'Your Birthday',
    image: '',
    date: 'Today'
  },
  {
    id: '2',
    name: 'Emma Watson',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    date: 'Today'
  },
  {
    id: '3',
    name: 'Michael Brown',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: 'Today'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    date: 'Today'
  }
];

// Mock data for recent activities
const mockRecentActivities: ActivityItem[] = [
  {
    id: '1',
    userId: '1',
    userName: 'User',
    userImage: '',
    action: 'commented on your post',
    content: 'This is amazing! Thanks for sharing this insight with us.',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    userId: '1',
    userName: 'User',
    userImage: '',
    action: 'commented on your post',
    content: 'This is amazing! Thanks for sharing this insight with us.',
    timestamp: '2 hours ago'
  },
  {
    id: '3',
    userId: '1',
    userName: 'User',
    userImage: '',
    action: 'commented on your post',
    content: 'This is amazing! Thanks for sharing this insight with us.',
    timestamp: '2 hours ago'
  }
];

// Mock data for connections
const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    role: 'UX Designer',
    company: 'Adobe',
    mutualCount: 12
  },
  {
    id: '2',
    name: 'Michael Smith',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    role: 'Software Engineer',
    company: 'Google',
    mutualCount: 8
  },
  {
    id: '3',
    name: 'Sarah Williams',
    image: 'https://randomuser.me/api/portraits/women/37.jpg',
    role: 'Product Manager',
    company: 'Microsoft',
    mutualCount: 15
  },
  {
    id: '4',
    name: 'James Wilson',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    role: 'Frontend Developer',
    company: 'Facebook',
    mutualCount: 5
  }
];

// Mock data for friends
const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Amanda Reed',
    avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
    mutualFriends: 16
  },
  {
    id: '2',
    name: 'Samuel Bishop',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    mutualFriends: 22
  },
  {
    id: '3',
    name: 'Bryan Knight',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    mutualFriends: 1
  },
  {
    id: '4',
    name: 'Amanda Reed',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    email: 'amanda.reed@example.com',
    mutualFriends: 15
  }
];

// API service for user operations
const apiService = {
  // Register a new user
  signup: async (data: SignupData): Promise<UserProfile> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Get existing users or initialize empty array
          const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Check if email already exists
          if (existingUsers.find((user: any) => user.email === data.email)) {
            reject(new Error('Email already registered'));
            return;
          }
          
          const newUser: UserProfile = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name || 'New User',
            username: data.username || 'newuser',
            email: data.email,
            avatar: DEFAULT_PROFILE_PICTURE,
            coverPhoto: DEFAULT_COVER_PHOTO,
            bio: '',
            location: '',
            website: '',
            joinDate: new Date().toISOString(),
            following: 0,
            followers: 0,
            posts: 0
          };
          
          // Store user with password in users array
          existingUsers.push({ ...newUser, password: data.password });
          localStorage.setItem('users', JSON.stringify(existingUsers));
          
          // Store current user without password
          localStorage.setItem('user', JSON.stringify(newUser));
          
          resolve(newUser);
        } catch (error: any) {
          reject(new Error(error.message || 'Registration failed'));
        }
      }, 1000);
    });
  },
  
  // Login user
  login: async (data: LoginData): Promise<{ user: UserProfile; token: string }> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Get users from localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Find user by email
          const user = users.find((u: any) => u.email === data.email);
          
          // Check if user exists
          if (!user) {
            reject(new Error('User not found'));
            return;
          }
          
          // Check if password matches
          if (user.password !== data.password) {
            reject(new Error('Invalid password'));
            return;
          }
          
          // Create user profile without password
          const userProfile: UserProfile = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar || DEFAULT_PROFILE_PICTURE,
            coverPhoto: user.coverPhoto || DEFAULT_COVER_PHOTO,
            bio: user.bio || '',
            location: user.location || '',
            website: user.website || '',
            joinDate: user.joinDate,
            following: user.following || 0,
            followers: user.followers || 0,
            posts: user.posts || 0
          };
          
          // Generate token
          const token = `auth-token-${Date.now()}`;
          
          // Store in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userProfile));
          localStorage.setItem('token', token);
          
          resolve({ user: userProfile, token });
        } catch (error: any) {
          reject(new Error(error.message || 'Login failed'));
        }
      }, 1000);
    });
  },
  
  // Logout user
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Clear all authentication data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('SESSION_STORAGE_KEY');
        
        // Clear cookies if any
        document.cookie.split(';').forEach(cookie => {
          document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        
        resolve();
      }, 500);
    });
  },
  
  // Update user profile
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Get current user data
          const userStr = localStorage.getItem('user');
          if (!userStr) {
            reject(new Error('User not authenticated'));
            return;
          }
          
          const currentUser = JSON.parse(userStr);
          const updatedUser = { ...currentUser, ...data };
          
          // Update in localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Update in users array
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
          
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data, password: users[userIndex].password };
            localStorage.setItem('users', JSON.stringify(users));
          }
          
          resolve(updatedUser);
        } catch (error: any) {
          reject(new Error(error.message || 'Failed to update profile'));
        }
      }, 500);
    });
  },
  
  // Update profile image
  updateProfileImage: async (imageFile: File | string): Promise<{ avatar: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Get current user
          const userStr = localStorage.getItem('user');
          if (!userStr) {
            reject(new Error('User not authenticated'));
            return;
          }
          
          // In a real app, this would upload the image to a server
          // For now, just use the string or a placeholder
          const avatarUrl = typeof imageFile === 'string' ? imageFile : DEFAULT_PROFILE_PICTURE;
          
          // Update user in localStorage
          const user = JSON.parse(userStr);
          user.avatar = avatarUrl;
          localStorage.setItem('user', JSON.stringify(user));
          
          // Update in users array
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userIndex = users.findIndex((u: any) => u.id === user.id);
          
          if (userIndex !== -1) {
            users[userIndex].avatar = avatarUrl;
            localStorage.setItem('users', JSON.stringify(users));
          }
          
          resolve({ avatar: avatarUrl });
        } catch (error: any) {
          reject(new Error(error.message || 'Failed to update profile image'));
        }
      }, 500);
    });
  },
  
  // Update cover photo
  updateCoverPhoto: async (imageFile: File | string): Promise<{ coverPhoto: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Get current user
          const userStr = localStorage.getItem('user');
          if (!userStr) {
            reject(new Error('User not authenticated'));
            return;
          }
          
          // In a real app, this would upload the image to a server
          // For now, just use the string or a placeholder
          const coverPhotoUrl = typeof imageFile === 'string' ? imageFile : DEFAULT_COVER_PHOTO;
          
          // Update user in localStorage
          const user = JSON.parse(userStr);
          user.coverPhoto = coverPhotoUrl;
          localStorage.setItem('user', JSON.stringify(user));
          
          // Update in users array
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userIndex = users.findIndex((u: any) => u.id === user.id);
          
          if (userIndex !== -1) {
            users[userIndex].coverPhoto = coverPhotoUrl;
            localStorage.setItem('users', JSON.stringify(users));
          }
          
          resolve({ coverPhoto: coverPhotoUrl });
        } catch (error: any) {
          reject(new Error(error.message || 'Failed to update cover photo'));
        }
      }, 500);
    });
  }
};

// Async thunk for user signup
export const signupAsync = createAsyncThunk(
  'user/signup',
  async (data: SignupData, { rejectWithValue }) => {
    try {
      const response = await apiService.signup(data);
      
      // Generate and store token
      const token = `auth-token-${Date.now()}`;
      localStorage.setItem('token', token);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sign up');
    }
  }
);

// Async thunk for user login
export const loginAsync = createAsyncThunk(
  'user/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await apiService.login(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to login');
    }
  }
);

// Async thunk for user logout
export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to logout');
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfileAsync = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const response = await apiService.updateProfile(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

// Async thunk for updating profile image
export const updateProfileImageAsync = createAsyncThunk(
  'user/updateProfileImage',
  async (imageFile: File | string, { rejectWithValue }) => {
    try {
      const response = await apiService.updateProfileImage(imageFile);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile image');
    }
  }
);

// Async thunk for updating cover photo
export const updateCoverPhotoAsync = createAsyncThunk(
  'user/updateCoverPhoto',
  async (imageFile: File | string, { rejectWithValue }) => {
    try {
      const response = await apiService.updateCoverPhoto(imageFile);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update cover photo');
    }
  }
);

// Async thunk for fetching user data including friends, followers, and connections
export const fetchUserDataAsync = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        friends: mockFriends,
        followers: mockFollowers,
        connections: mockConnections
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

// Check if user is already logged in
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

// Initial state
const initialState: UserState = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  allUsers: [],
  friends: [],
  followers: [],
  connections: [],
  birthdayReminders: mockBirthdayReminders,
  recentActivities: mockRecentActivities,
  loading: false,
  error: null,
  isSigningUp: false,
  signupSuccess: false,
  signupError: null,
  isLoggingIn: false,
  loginSuccess: false,
  loginError: null,
  isAuthenticated: !!storedUser && !!storedToken,
  isRequestingPasswordReset: false,
  passwordResetRequested: false,
  passwordResetError: null,
};

// ... rest of the code remains the same ...
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
    },
    setFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
    },
    setFollowers: (state, action: PayloadAction<Follower[]>) => {
      state.followers = action.payload;
    },
    addFollower: (state, action: PayloadAction<Follower>) => {
      state.followers.push(action.payload);
    },
    removeFollower: (state, action: PayloadAction<string>) => {
      state.followers = state.followers.filter(follower => follower.id !== action.payload);
    },
    setConnections: (state, action: PayloadAction<Connection[]>) => {
      state.connections = action.payload;
    },
    addConnection: (state, action: PayloadAction<Connection>) => {
      state.connections.push(action.payload);
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter(connection => connection.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<UserProfile[]>) => {
      state.allUsers = action.payload;
    },
    signupRequest: (state, action: PayloadAction<SignupData>) => {
      state.isSigningUp = true;
      state.signupSuccess = false;
      state.signupError = null;
    },
    signupSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isSigningUp = false;
      state.signupSuccess = true;
      state.currentUser = action.payload;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isSigningUp = false;
      state.signupSuccess = false;
      state.signupError = action.payload;
    },
    clearSignupState: (state) => {
      state.isSigningUp = false;
      state.signupSuccess = false;
      state.signupError = null;
    },
    loginRequest: (state, action: PayloadAction<LoginData>) => {
      state.isLoggingIn = true;
      state.loginSuccess = false;
      state.loginError = null;
    },
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isLoggingIn = false;
      state.loginSuccess = true;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggingIn = false;
      state.loginSuccess = false;
      state.loginError = action.payload;
      state.isAuthenticated = false;
    },
    clearLoginState: (state) => {
      state.isLoggingIn = false;
      state.loginSuccess = false;
      state.loginError = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loginSuccess = false;
    },
    forgotPasswordRequest: (state, action: PayloadAction<ForgotPasswordData>) => {
      state.isRequestingPasswordReset = true;
      state.passwordResetRequested = false;
      state.passwordResetError = null;
    },
    forgotPasswordSuccess: (state) => {
      state.isRequestingPasswordReset = false;
      state.passwordResetRequested = true;
    },
    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.isRequestingPasswordReset = false;
      state.passwordResetRequested = false;
      state.passwordResetError = action.payload;
    },
    clearForgotPasswordState: (state) => {
      state.isRequestingPasswordReset = false;
      state.passwordResetRequested = false;
      state.passwordResetError = null;
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.avatar = action.payload;
      }
    },
    updateCoverPhoto: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.coverPhoto = action.payload;
      }
    },
    setBirthdayReminders: (state, action: PayloadAction<BirthdayReminder[]>) => {
      state.birthdayReminders = action.payload;
    },
    addBirthdayReminder: (state, action: PayloadAction<BirthdayReminder>) => {
      state.birthdayReminders.push(action.payload);
    },
    removeBirthdayReminder: (state, action: PayloadAction<string>) => {
      state.birthdayReminders = state.birthdayReminders.filter(reminder => reminder.id !== action.payload);
    },
    setRecentActivities: (state, action: PayloadAction<ActivityItem[]>) => {
      state.recentActivities = action.payload;
    },
    addActivity: (state, action: PayloadAction<ActivityItem>) => {
      state.recentActivities.unshift(action.payload);
    },
    removeActivity: (state, action: PayloadAction<string>) => {
      state.recentActivities = state.recentActivities.filter(activity => activity.id !== action.payload);
    },
    sendBirthdayWishes: (state, action: PayloadAction<string>) => {
      // In a real app, this would trigger an API call
      // For now, we'll just mark it in the state somehow
      const reminderIndex = state.birthdayReminders.findIndex(reminder => reminder.id === action.payload);
      if (reminderIndex !== -1) {
        // Add a 'wished' property to the reminder
        state.birthdayReminders[reminderIndex] = {
          ...state.birthdayReminders[reminderIndex],
          wished: true
        } as BirthdayReminder;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup reducers
      .addCase(signupAsync.pending, (state) => {
        state.isSigningUp = true;
        state.signupSuccess = false;
        state.signupError = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.signupSuccess = true;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.isSigningUp = false;
        state.signupSuccess = false;
        state.signupError = action.payload as string;
      })
      
      // Login reducers
      .addCase(loginAsync.pending, (state) => {
        state.isLoggingIn = true;
        state.loginSuccess = false;
        state.loginError = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.loginSuccess = true;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginSuccess = false;
        state.loginError = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Logout reducers
      .addCase(logoutAsync.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.loginSuccess = false;
      })
      
      // Fetch user data reducers
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload.friends;
        state.followers = action.payload.followers;
        state.connections = action.payload.connections;
      })
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update profile reducers
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      // Update profile image reducers
      .addCase(updateProfileImageAsync.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.avatar = action.payload.avatar;
        }
      })
      .addCase(updateProfileImageAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      // Update cover photo reducers
      .addCase(updateCoverPhotoAsync.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.coverPhoto = action.payload.coverPhoto;
        }
      })
      .addCase(updateCoverPhotoAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { 
  setCurrentUser, 
  setFriends, 
  addFriend, 
  removeFriend,
  setFollowers,
  addFollower,
  removeFollower,
  setConnections,
  addConnection,
  removeConnection,
  setLoading, 
  setError,
  setAllUsers,
  signupRequest,
  signupSuccess,
  signupFailure,
  clearSignupState,
  loginRequest,
  loginSuccess,
  loginFailure,
  clearLoginState,
  logout,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearForgotPasswordState,
  updateProfileImage,
  updateCoverPhoto,
  setBirthdayReminders,
  addBirthdayReminder,
  removeBirthdayReminder,
  setRecentActivities,
  addActivity,
  removeActivity,
  sendBirthdayWishes
} = userSlice.actions;

export default userSlice.reducer;