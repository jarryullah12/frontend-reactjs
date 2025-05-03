import React, { useEffect } from 'react';
import Logo from '../../assets/logo.svg';
import { useSelector, useDispatch } from '../../redux/mockRedux';
import { logout } from '../../redux/actions/authActions';
import { isSessionValid, checkAuth } from '../../utils/authUtils';

const Header = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth || {});
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.user;
  
  // Check session validity on component mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      // Check if session is still valid
      if (!isSessionValid()) {
        // Session expired, log the user out
        handleLogout();
      }
    }
  }, [isAuthenticated]);
  
  // Logout handler
  const handleLogout = () => {
    // Dispatch logout action from Redux actions
    dispatch(logout());
    
    // Clear all session data
    sessionStorage.clear();
    
    // Show a brief message before redirecting
    alert('You have been logged out successfully');
    
    // Navigate to login page
    navigateTo('login');
  };
  
  // Check authentication on initial render
  useEffect(() => {
    // This will redirect to login if session is invalid
    checkAuth(navigateTo);
    
    // Set up interval to periodically check session validity (every minute)
    const sessionCheckInterval = setInterval(() => {
      if (isAuthenticated && !isSessionValid()) {
        // Session expired, log the user out
        handleLogout();
      }
    }, 60000); // Check every minute
    
    // Clean up interval on component unmount
    return () => clearInterval(sessionCheckInterval);
  }, []);
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => navigateTo('home')} className="flex items-center">
            <img src={Logo} alt="Prescripto" className="h-8" />
            <span className="ml-2 text-primary font-bold text-xl">Prescripto</span>
          </button>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigateTo('home')} className="font-medium text-gray-700 hover:text-primary transition-colors">
            HOME
          </button>
          <button onClick={() => navigateTo('doctors')} className="font-medium text-gray-700 hover:text-primary transition-colors">
            ALL DOCTORS
          </button>
          <button onClick={() => navigateTo('about')} className="font-medium text-gray-700 hover:text-primary transition-colors">
            ABOUT
          </button>
          <button onClick={() => navigateTo('contact')} className="font-medium text-gray-700 hover:text-primary transition-colors">
            CONTACT
          </button>
        </nav>
        <div className="flex items-center space-x-3">
          {!isAuthenticated ? (
            // Show login/register buttons when not authenticated
            <>
              <button onClick={() => navigateTo('login')} className="text-primary hover:text-primary-dark font-medium">
                Login
              </button>
              <button onClick={() => navigateTo('register')} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                Register
              </button>
            </>
          ) : (
            // Show user info and logout button when authenticated
            <>
              <div className="text-sm text-gray-700 mr-2">
                Welcome, <span className="font-medium">{user?.name || 'User'}</span>
              </div>
              <button 
                onClick={() => navigateTo('appointments')} 
                className="text-primary hover:text-primary-dark font-medium mr-4"
              >
                My Appointments
              </button>
              <button 
                onClick={handleLogout} 
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
              <button 
                onClick={() => navigateTo('profile')} 
                className="bg-gray-100 rounded-full p-2"
              >
                <span className="text-gray-500">👤</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
