import { takeLatest, put, delay } from 'redux-saga/effects';
import { 
  signupRequest, 
  signupSuccess, 
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  setLoading,
  setAllUsers,
  UserProfile
} from '../slices/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SignupData, LoginData } from '../slices/userSlice';

// Worker Saga: Will be fired on SIGNUP_REQUEST actions
function* handleSignup(action: PayloadAction<SignupData>) {
  try {
    yield put(setLoading(true));
    
    // Simulate API call
    yield delay(1500);
    
    // Create a new user from the signup data
    const newUser: UserProfile = {
      id: `user-${Date.now()}`, // Generate a unique ID
      email: action.payload.email,
      name: action.payload.name || 'New User',
      username: action.payload.username || `user${Date.now()}`,
      avatar: 'https://via.placeholder.com/150', // Default avatar
      coverPhoto: 'https://via.placeholder.com/1200x300', // Default cover photo
      bio: '',
      location: '',
      website: '',
      joinDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      followers: 0,
      following: 0,
      posts: 0
    };
    
    // Store user in session
    const token = `token-${Date.now()}`; // Generate a simple token
    
    // Use the SessionContext's login function
    // In a real app, this would be done through a proper API call
    // For now, we'll just simulate it
    
    // Return the new user
    yield put(signupSuccess(newUser));
    
    // Set all users in the store - in a real app, this would fetch from an API
    yield put(setAllUsers([newUser]));
    
    // Return the user ID and token to be used by the session
    return { userId: newUser.id, token };
  } catch (error) {
    yield put(signupFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
    return null;
  }
}

// Worker Saga: Will be fired on LOGIN_REQUEST actions
function* handleLogin(action: PayloadAction<LoginData>) {
  try {
    yield put(setLoading(true));
    
    // Simulate API call
    yield delay(1500);
    
    // In a real app, you would call your API here to validate credentials
    // const response = yield call(api.login, action.payload);
    
    // For demonstration, create a user based on login email
    const user: UserProfile = {
      id: `user-${Date.now()}`, // In a real app, this would come from the backend
      email: action.payload.email,
      name: action.payload.email.split('@')[0], // Use part of email as name
      username: action.payload.email.split('@')[0],
      avatar: 'https://via.placeholder.com/150', // Default avatar
      coverPhoto: 'https://via.placeholder.com/1200x300', // Default cover photo
      bio: '',
      location: '',
      website: '',
      joinDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      followers: 0,
      following: 0,
      posts: 0
    };
    
    // Generate a token
    const token = `token-${Date.now()}`;
    
    // Update Redux state
    yield put(loginSuccess(user));
    
    // In a real app, you would fetch all users from an API
    yield put(setAllUsers([user]));
    
    // Return the user ID and token to be used by the session
    return { userId: user.id, token, rememberMe: action.payload.rememberMe };
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
    return null;
  }
}

// Watcher Saga: Watches for actions and calls the appropriate handler
export function* userSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(loginRequest.type, handleLogin);
}
