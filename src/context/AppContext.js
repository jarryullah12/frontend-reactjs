import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('prescripto_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('prescripto_user');
      }
    }

    // Check for dark mode preference
    const storedDarkMode = localStorage.getItem('prescripto_dark_mode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('prescripto_dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Login function
  const login = (userData) => {
    setLoading(true);
    // In a real app, you would make an API call here
    setTimeout(() => {
      setCurrentUser(userData);
      localStorage.setItem('prescripto_user', JSON.stringify(userData));
      showNotification('success', 'Login successful!');
      setLoading(false);
    }, 1000);
  };

  // Logout function
  const logout = () => {
    setLoading(true);
    // In a real app, you would make an API call here
    setTimeout(() => {
      setCurrentUser(null);
      localStorage.removeItem('prescripto_user');
      showNotification('info', 'You have been logged out');
      setLoading(false);
    }, 1000);
  };

  // Show notification
  const showNotification = (type, message, duration = 3000) => {
    setNotification({ type, message, duration });
  };

  // Clear notification
  const clearNotification = () => {
    setNotification(null);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Context value
  const value = {
    currentUser,
    loading,
    notification,
    darkMode,
    login,
    logout,
    showNotification,
    clearNotification,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
