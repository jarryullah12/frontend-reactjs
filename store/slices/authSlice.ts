import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'client' | 'admin';
  joinDate?: string;
}

interface AuthState {
  client: {
    user: User | null;
    isAuthenticated: boolean;
  };
  admin: {
    user: User | null;
    isAuthenticated: boolean;
  };
}

// Helper to load initial state from localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState_v2');
    if (serializedState === null) {
      return { 
        client: { user: null, isAuthenticated: false },
        admin: { user: null, isAuthenticated: false }
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { 
      client: { user: null, isAuthenticated: false },
      admin: { user: null, isAuthenticated: false }
    };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // --- Client Actions ---
    loginClient: (state, action: PayloadAction<User>) => {
      state.client.user = action.payload;
      state.client.isAuthenticated = true;
      localStorage.setItem('authState_v2', JSON.stringify(state));
    },
    logoutClient: (state) => {
      state.client.user = null;
      state.client.isAuthenticated = false;
      localStorage.setItem('authState_v2', JSON.stringify(state));
    },
    updateClientProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.client.user) {
        state.client.user = { ...state.client.user, ...action.payload };
        localStorage.setItem('authState_v2', JSON.stringify(state));
      }
    },

    // --- Admin Actions ---
    loginAdmin: (state, action: PayloadAction<User>) => {
      state.admin.user = action.payload;
      state.admin.isAuthenticated = true;
      localStorage.setItem('authState_v2', JSON.stringify(state));
    },
    logoutAdmin: (state) => {
      state.admin.user = null;
      state.admin.isAuthenticated = false;
      localStorage.setItem('authState_v2', JSON.stringify(state));
    },
    updateAdminProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.admin.user) {
        state.admin.user = { ...state.admin.user, ...action.payload };
        localStorage.setItem('authState_v2', JSON.stringify(state));
      }
    },
  },
});

export const { 
  loginClient, logoutClient, updateClientProfile,
  loginAdmin, logoutAdmin, updateAdminProfile 
} = authSlice.actions;

export default authSlice.reducer;