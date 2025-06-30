import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Initialize users array from localStorage or with default test user
  const initializeUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        return JSON.parse(storedUsers);
      } catch (e) {
        console.error('Error parsing users from localStorage:', e);
      }
    }
    
    // Default user if no users exist
    const defaultUsers = [
      {
        id: '1',
        email: 'user@example.com',
        password: 'password123', // In a real app, this would be hashed
        name: 'John Doe'
      }
    ];
    
    // Store default users
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        setToken(token);
        setCurrentUser(JSON.parse(user));
        setIsAuthenticated(true);
        console.log('User authenticated from localStorage:', JSON.parse(user));
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    // Initialize users if not already done
    initializeUsers();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login with:', { email, password });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get users from localStorage
      const users = initializeUsers();
      
      // Find user with matching email and password
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Create a user object without the password for storage
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name
        };
        
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setCurrentUser(userData);
        setToken(token);
        setIsAuthenticated(true);
        setLoading(false);
        console.log('Login successful:', userData);
        return true;
      } else {
        console.log('Login failed: Invalid credentials');
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting registration with:', {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current users
      const users = initializeUsers();
      
      // Check if email is already in use
      if (users.some(user => user.email === userData.email)) {
        console.log('Registration failed: Email already in use');
        setError('Email already in use');
        setLoading(false);
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Math.floor(Math.random() * 10000).toString(),
        email: userData.email,
        password: userData.password, // In a real app, this would be hashed
        name: `${userData.firstName} ${userData.lastName}`
      };
      
      // Add to users array
      users.push(newUser);
      
      // Save updated users to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      // Create a user object without the password for storage
      const userDataForStorage = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      
      // Log in the new user
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDataForStorage));
      
      setCurrentUser(userDataForStorage);
      setToken(token);
      setIsAuthenticated(true);
      setLoading(false);
      console.log('Registration successful:', userDataForStorage);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
