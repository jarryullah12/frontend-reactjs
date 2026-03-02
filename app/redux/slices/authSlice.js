
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/supabase';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password, username } = userData;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });
      if (error) throw error;
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    return null;
  }
);

export const resetPasswordRequest = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (data, { rejectWithValue }) => {
    try {
      await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: window.location.origin + '/update-password',
      });
      return { success: true, message: 'Password reset link sent to your email' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Check for stored user on initial load
const storedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,
  resetPasswordSuccess: false,
  resetPasswordMessage: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResetPasswordStatus: (state) => {
      state.resetPasswordSuccess = false;
      state.resetPasswordMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Reset password cases
      .addCase(resetPasswordRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
        state.resetPasswordMessage = null;
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        state.resetPasswordMessage = action.payload.message;
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.resetPasswordSuccess = false;
      });
  }
});

export const { clearError, clearResetPasswordStatus } = authSlice.actions;

export default authSlice.reducer;
