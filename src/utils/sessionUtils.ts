import Cookies from 'js-cookie';

// Cookie names
export const TOKEN_COOKIE = 'social_app_token';
export const USER_ID_COOKIE = 'social_app_user_id';
export const EXPIRES_AT_COOKIE = 'social_app_expires_at';

// Session storage keys
export const SESSION_STORAGE_KEY = 'social_app_session';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = Cookies.get(TOKEN_COOKIE);
  const expiresAtStr = Cookies.get(EXPIRES_AT_COOKIE);
  
  if (!token || !expiresAtStr) {
    return false;
  }
  
  // Check if token is expired
  const expiresAt = new Date(expiresAtStr);
  return expiresAt > new Date();
};

/**
 * Get the current user's ID
 */
export const getUserId = (): string | null => {
  return Cookies.get(USER_ID_COOKIE) || null;
};

/**
 * Get the current authentication token
 */
export const getToken = (): string | null => {
  return Cookies.get(TOKEN_COOKIE) || null;
};

/**
 * Clear all session data (cookies and session storage)
 */
export const clearSession = (): void => {
  // Clear cookies
  Cookies.remove(TOKEN_COOKIE);
  Cookies.remove(USER_ID_COOKIE);
  Cookies.remove(EXPIRES_AT_COOKIE);
  
  // Clear session storage
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
};

/**
 * Set session data
 */
export const setSessionData = (
  userId: string, 
  token: string, 
  rememberMe: boolean = false
): void => {
  // Set expiration date (30 days if remember me, 1 day otherwise)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (rememberMe ? 30 : 1));
  
  // Set cookies
  const cookieOptions = { 
    expires: expiresAt,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };
  
  Cookies.set(TOKEN_COOKIE, token, cookieOptions);
  Cookies.set(USER_ID_COOKIE, userId, cookieOptions);
  Cookies.set(EXPIRES_AT_COOKIE, expiresAt.toISOString(), cookieOptions);
  
  // Store in session storage for quick access
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
    userId,
    token,
    expiresAt: expiresAt.toISOString()
  }));
};

/**
 * Get session expiration date
 */
export const getSessionExpiration = (): Date | null => {
  const expiresAtStr = Cookies.get(EXPIRES_AT_COOKIE);
  return expiresAtStr ? new Date(expiresAtStr) : null;
};
