import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from '../contexts/SessionContext';
import { loginSuccess, logout as logoutAction } from '../redux/slices/userSlice';

/**
 * SessionAuthConnector
 * 
 * This component connects the session management system with the Redux store.
 * It ensures that the Redux store's authentication state is synchronized with
 * the session state from cookies.
 */
const SessionAuthConnector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { session, isLoading, logout } = useSession();

  useEffect(() => {
    // Skip if still loading session data
    if (isLoading) return;

    // If user is authenticated in session, update Redux store
    if (session.isAuthenticated && session.userId) {
      // In a real app, you would fetch the user profile from an API
      // For now, we'll create a minimal user object
      const user = {
        id: session.userId,
        name: 'User',
        username: 'sessionuser',
        email: 'session@example.com',
        avatar: 'https://via.placeholder.com/150',
        coverPhoto: 'https://via.placeholder.com/1200x300',
        bio: '',
        location: '',
        website: '',
        joinDate: new Date().toISOString().split('T')[0],
        following: 0,
        followers: 0,
        posts: 0
      };
      
      dispatch(loginSuccess(user));
    } else {
      // If not authenticated, ensure Redux store is also logged out
      dispatch(logoutAction());
    }
  }, [dispatch, session, isLoading]);

  // Handle logout from Redux
  useEffect(() => {
    const handleLogout = () => {
      logout(); // Clear session cookies and context
      dispatch(logoutAction()); // Clear Redux state
    };

    // Attach to window for global access
    (window as any).handleLogout = handleLogout;

    return () => {
      delete (window as any).handleLogout;
    };
  }, [dispatch, logout]);

  return <>{children}</>;
};

export default SessionAuthConnector;
