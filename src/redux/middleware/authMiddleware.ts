import { Middleware } from 'redux';
import { 
  signupRequest, 
  signupSuccess, 
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  UserProfile
} from '../slices/userSlice';

// Middleware to handle authentication actions
const authMiddleware: Middleware = store => next => action => {
  // First pass the action to the next middleware or reducer
  const result = next(action);

  // Then handle specific actions
  if (signupRequest.match(action)) {
    // Extract the signup data from the action
    const { email, password, name, username } = action.payload;
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a successful signup
        const mockUserProfile: UserProfile = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          name: name || 'New User',
          username: username || 'user_' + Math.random().toString(36).substr(2, 5),
          email,
          avatar: 'https://via.placeholder.com/150',
          coverPhoto: 'https://via.placeholder.com/1200x300',
          bio: '',
          location: '',
          website: '',
          joinDate: new Date().toISOString(),
          following: 0,
          followers: 0,
          posts: 0
        };
        
        // Dispatch success action with the user profile
        store.dispatch(signupSuccess(mockUserProfile));
        
        // In a real app, you might want to store the token in localStorage
        // localStorage.setItem('token', mockResponse.token);
      } catch (error) {
        // Handle errors
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        store.dispatch(signupFailure(errorMessage));
      }
    }, 1000); // Simulate network delay
  }
  
  // Handle login action
  if (loginRequest.match(action)) {
    // Extract the login data from the action
    const { email, password, rememberMe } = action.payload;
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we'll simulate authentication
        
        // Simple validation (in a real app, this would be done by your backend)
        if (email === 'test@example.com' && password === 'password') {
          // Mock successful login
          const mockUserProfile: UserProfile = {
            id: 'user-123',
            name: 'Test User',
            username: 'testuser',
            email,
            avatar: 'https://via.placeholder.com/150',
            coverPhoto: 'https://via.placeholder.com/1200x300',
            bio: 'This is a test user account',
            location: 'Test City',
            website: 'https://example.com',
            joinDate: '2023-01-01',
            following: 42,
            followers: 100,
            posts: 24
          };
          
          // Dispatch success action with the user profile
          store.dispatch(loginSuccess(mockUserProfile));
          
          // In a real app, you would store the authentication token
          if (rememberMe) {
            // Store token with longer expiry
            // localStorage.setItem('token', 'mock-token-with-long-expiry');
          } else {
            // Store token with shorter expiry
            // localStorage.setItem('token', 'mock-token');
          }
        } else {
          // Invalid credentials
          store.dispatch(loginFailure('Invalid email or password'));
        }
      } catch (error) {
        // Handle errors
        let errorMessage = 'An unknown error occurred during login';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        store.dispatch(loginFailure(errorMessage));
      }
    }, 1000); // Simulate network delay
  }

  // Handle forgot password action
  if (forgotPasswordRequest.match(action)) {
    // Extract the email from the action
    const { email } = action.payload;
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we'll simulate the password reset request
        
        // Validate email format (simple validation)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address');
        }
        
        // Simulate checking if email exists in the system
        // For demo, we'll accept any valid email format
        if (email) {
          // In a real app, your backend would send a password reset email
          console.log(`Password reset email would be sent to: ${email}`);
          
          // Dispatch success action
          store.dispatch(forgotPasswordSuccess());
        } else {
          // Email not found
          store.dispatch(forgotPasswordFailure('Email address not found'));
        }
      } catch (error) {
        // Handle errors
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        store.dispatch(forgotPasswordFailure(errorMessage));
      }
    }, 1000); // Simulate network delay
  }

  return result;
};

export default authMiddleware;
