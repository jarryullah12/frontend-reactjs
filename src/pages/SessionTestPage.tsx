import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

const SessionTestPage: React.FC = () => {
  const { session, login, logout } = useSession();
  const navigate = useNavigate();

  const handleTestLogin = () => {
    // Simulate a login with test values
    login('test-user-123', 'test-token-abc', true);
  };

  const handleTestLogout = () => {
    // Logout the user
    logout();
  };

  const navigateToProtectedPage = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-8 dark:border dark:border-dark-border transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Session Management Test</h1>
        
        <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-bg rounded-md">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Current Session State:</h2>
          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-40">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={handleTestLogin}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Test Login
            </button>
            
            <button
              onClick={handleTestLogout}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Test Logout
            </button>
          </div>
          
          <button
            onClick={navigateToProtectedPage}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Navigate to Protected Page
          </button>
          
          <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This page is for testing the session management system. Use the buttons above to test login and logout functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTestPage;
