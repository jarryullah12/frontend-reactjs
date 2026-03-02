/**
 * Session management utility for the application
 * Handles creating, validating, and clearing sessions
 */

// Session duration in milliseconds (30 minutes)
const SESSION_DURATION = 30 * 60 * 1000;

/**
 * Create a new session
 * @param {string} userType - 'user' or 'admin'
 * @param {Object} userData - User data to store in session
 */
export const createSession = (userType, userData) => {
  const now = new Date().getTime();
  const sessionData = {
    userData,
    expiresAt: now + SESSION_DURATION,
  };
  
  // Store session data in localStorage
  localStorage.setItem(`${userType}Session`, JSON.stringify(sessionData));
  localStorage.setItem(`${userType}Authenticated`, 'true');
};

/**
 * Check if a session is valid
 * @param {string} userType - 'user' or 'admin'
 * @returns {boolean} - Whether the session is valid
 */
export const isSessionValid = (userType) => {
  try {
    const sessionData = JSON.parse(localStorage.getItem(`${userType}Session`));
    const now = new Date().getTime();
    
    // If session doesn't exist or is expired
    if (!sessionData || now > sessionData.expiresAt) {
      clearSession(userType);
      return false;
    }
    
    // Extend session on activity
    extendSession(userType);
    return true;
  } catch (error) {
    console.error('Error checking session validity:', error);
    clearSession(userType);
    return false;
  }
};

/**
 * Extend the current session
 * @param {string} userType - 'user' or 'admin'
 */
export const extendSession = (userType) => {
  try {
    const sessionData = JSON.parse(localStorage.getItem(`${userType}Session`));
    if (sessionData) {
      const now = new Date().getTime();
      sessionData.expiresAt = now + SESSION_DURATION;
      localStorage.setItem(`${userType}Session`, JSON.stringify(sessionData));
    }
  } catch (error) {
    console.error('Error extending session:', error);
  }
};

/**
 * Clear the session
 * @param {string} userType - 'user' or 'admin'
 */
export const clearSession = (userType) => {
  localStorage.removeItem(`${userType}Session`);
  localStorage.removeItem(`${userType}Authenticated`);
};

/**
 * Get user data from session
 * @param {string} userType - 'user' or 'admin'
 * @returns {Object|null} - User data or null if session is invalid
 */
export const getSessionUserData = (userType) => {
  if (!isSessionValid(userType)) {
    return null;
  }
  
  try {
    const sessionData = JSON.parse(localStorage.getItem(`${userType}Session`));
    return sessionData.userData;
  } catch (error) {
    console.error('Error getting session user data:', error);
    return null;
  }
};

/**
 * Update user data in the session
 * @param {string} userType - 'user' or 'admin'
 * @param {Object} updatedUserData - Updated user data
 * @returns {boolean} - Whether the update was successful
 */
export const updateSessionUserData = (userType, updatedUserData) => {
  if (!isSessionValid(userType)) {
    return false;
  }
  
  try {
    const sessionData = JSON.parse(localStorage.getItem(`${userType}Session`));
    
    // Merge the updated data with existing user data
    sessionData.userData = { ...sessionData.userData, ...updatedUserData };
    
    // Save the updated session data
    localStorage.setItem(`${userType}Session`, JSON.stringify(sessionData));
    
    return true;
  } catch (error) {
    console.error('Error updating session user data:', error);
    return false;
  }
};
