import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isSessionValid } from '../utils/sessionManager';

const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated as admin and session is valid
    const checkAuth = () => {
      const adminAuthenticated = isSessionValid('admin');
      setIsAuthenticated(adminAuthenticated);
      setIsLoading(false);
      
      // If not authenticated, redirect immediately
      if (!adminAuthenticated && !isLoading) {
        navigate('/admin/login', { replace: true });
      }
    };
    
    checkAuth();
    
    // Set up interval to periodically check session validity
    const sessionCheckInterval = setInterval(() => {
      const adminAuthenticated = isSessionValid('admin');
      if (adminAuthenticated !== isAuthenticated) {
        setIsAuthenticated(adminAuthenticated);
        
        // If session became invalid, redirect immediately
        if (!adminAuthenticated) {
          navigate('/admin/login', { replace: true });
        }
      }
    }, 10000); // Check every 10 seconds for demo purposes
    
    return () => clearInterval(sessionCheckInterval);
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    // Show loading spinner while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to admin login page
  if (!isAuthenticated) {
    // Use both Navigate component and programmatic navigation for reliability
    navigate('/admin/login', { state: { from: location }, replace: true });
    return null; // Don't render anything while redirecting
  }

  // If authenticated, render the protected component
  return children;
};

export default AdminProtectedRoute;
