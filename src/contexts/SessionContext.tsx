import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { SESSION_STORAGE_KEY } from '../utils/sessionUtils';
import { useAppDispatch } from '../redux/hooks';
import { logoutAsync } from '../redux/slices/userSlice';

// Define session data interface
interface SessionData {
  userId: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  expiresAt: Date | null;
  profilePicture: string | null;
}

// Define session context interface
interface SessionContextType {
  session: SessionData;
  login: (userId: string, token: string, rememberMe?: boolean, email?: string, profilePicture?: string) => void;
  logout: () => void;
  updateProfilePicture: (profilePicture: string) => void;
  isLoading: boolean;
}

// Create context with default values
const SessionContext = createContext<SessionContextType>({
  session: {
    userId: null,
    email: null,
    token: null,
    isAuthenticated: false,
    expiresAt: null,
    profilePicture: null,
  },
  login: () => {},
  logout: () => {},
  updateProfilePicture: () => {},
  isLoading: true,
});

// Cookie names
const TOKEN_COOKIE = 'social_app_token';
const USER_ID_COOKIE = 'social_app_user_id';
const USER_EMAIL_COOKIE = 'social_app_user_email';
const EXPIRES_AT_COOKIE = 'social_app_expires_at';
const PROFILE_PICTURE_COOKIE = 'social_app_profile_picture';

// Session provider component
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<SessionData>({
    userId: null,
    email: null,
    token: null,
    isAuthenticated: false,
    expiresAt: null,
    profilePicture: null,
  });

  // Initialize session from cookies on component mount
  useEffect(() => {
    const initializeSession = () => {
      const token = Cookies.get(TOKEN_COOKIE);
      const userId = Cookies.get(USER_ID_COOKIE);
      const userEmail = Cookies.get(USER_EMAIL_COOKIE);
      const expiresAtStr = Cookies.get(EXPIRES_AT_COOKIE);
      const profilePicture = Cookies.get(PROFILE_PICTURE_COOKIE) || null;
      
      if (token && userId && expiresAtStr) {
        const expiresAt = new Date(expiresAtStr);
        
        // Check if session is still valid
        if (expiresAt > new Date()) {
          setSession({
            userId,
            email: userEmail || null,
            token,
            isAuthenticated: true,
            expiresAt,
            profilePicture,
          });
        } else {
          // Clear expired cookies
          Cookies.remove(TOKEN_COOKIE);
          Cookies.remove(USER_ID_COOKIE);
          Cookies.remove(USER_EMAIL_COOKIE);
          Cookies.remove(EXPIRES_AT_COOKIE);
          Cookies.remove(PROFILE_PICTURE_COOKIE);
        }
      }
      
      setIsLoading(false);
    };

    initializeSession();
  }, []);

  // Login function
  const login = (userId: string, token: string, rememberMe = false, email?: string, profilePicture?: string) => {
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
    if (email) Cookies.set(USER_EMAIL_COOKIE, email, cookieOptions);
    if (profilePicture) Cookies.set(PROFILE_PICTURE_COOKIE, profilePicture, cookieOptions);
    Cookies.set(EXPIRES_AT_COOKIE, expiresAt.toISOString(), cookieOptions);
    
    // Store token in localStorage for API requests
    localStorage.setItem('token', token);
    
    // Update session state
    setSession({
      userId,
      email: email || null,
      token,
      isAuthenticated: true,
      expiresAt,
      profilePicture: profilePicture || null,
    });
  };

  // Logout function
  const logout = () => {
    // Dispatch logout action to Redux
    dispatch(logoutAsync());
    
    // Clear cookies
    Cookies.remove(TOKEN_COOKIE);
    Cookies.remove(USER_ID_COOKIE);
    Cookies.remove(USER_EMAIL_COOKIE);
    Cookies.remove(EXPIRES_AT_COOKIE);
    Cookies.remove(PROFILE_PICTURE_COOKIE);
    
    // Clear session storage
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset session state
    setSession({
      userId: null,
      email: null,
      token: null,
      isAuthenticated: false,
      expiresAt: null,
      profilePicture: null,
    });
  };

  // Update profile picture function
  const updateProfilePicture = (profilePicture: string) => {
    if (!session.isAuthenticated) return;
    
    // Set cookie
    const cookieOptions = { 
      expires: session.expiresAt || undefined,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const
    };
    
    Cookies.set(PROFILE_PICTURE_COOKIE, profilePicture, cookieOptions);
    
    // Update session state
    setSession({
      ...session,
      profilePicture,
    });
  };

  return (
    <SessionContext.Provider value={{ session, login, logout, updateProfilePicture, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook for using session context
export const useSession = () => useContext(SessionContext);

export default SessionContext;
