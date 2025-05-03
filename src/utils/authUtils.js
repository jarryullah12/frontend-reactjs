/**
 * Utility functions for authentication
 */

/**
 * Check if the user session is valid
 * @returns {boolean} - True if session is valid, false otherwise
 */
export const isSessionValid = () => {
  // Check if user exists in localStorage
  const user = localStorage.getItem('user');
  if (!user) {
    return false;
  }

  // Check if session has expired
  const sessionExpiry = sessionStorage.getItem('sessionExpiry');
  if (!sessionExpiry) {
    return false;
  }

  // Compare current time with expiry time
  const now = new Date();
  const expiryTime = new Date(sessionExpiry);
  
  return now < expiryTime;
};

/**
 * Check authentication status and redirect if needed
 * @param {Function} navigateTo - Navigation function
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const checkAuth = (navigateTo) => {
  if (!isSessionValid()) {
    // Clear any existing auth data
    localStorage.removeItem('user');
    sessionStorage.removeItem('sessionExpiry');
    
    // Redirect to login page
    if (navigateTo) {
      navigateTo('login');
    }
    return false;
  }
  return true;
};

/**
 * Extend the current session
 */
export const extendSession = () => {
  // Extend session by 1 hour from now
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 1);
  sessionStorage.setItem('sessionExpiry', expiryTime.toISOString());
};

/**
 * Get current user data
 * @returns {Object|null} - User object or null if not authenticated
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
