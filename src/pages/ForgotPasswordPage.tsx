import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { forgotPasswordRequest, clearForgotPasswordState } from '../redux/slices/userSlice';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { 
    isRequestingPasswordReset, 
    passwordResetRequested, 
    passwordResetError 
  } = useAppSelector(state => state.user);

  useEffect(() => {
    // Clear forgot password state when component mounts
    dispatch(clearForgotPasswordState());
  }, [dispatch]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError(null);
    
    // Dispatch forgot password request
    dispatch(forgotPasswordRequest({ email }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-8 dark:border dark:border-dark-border transition-colors">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot password?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter the email address associated with account.
          </p>
        </div>

        {passwordResetRequested && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Password reset instructions have been sent to your email. Please check your inbox.
          </div>
        )}

        {(error || passwordResetError) && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || passwordResetError}
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              required
              className="w-full px-3 py-3 border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isRequestingPasswordReset || passwordResetRequested}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            We'll send you a link to reset your password
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Back to <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">Sign in</Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
              disabled={isRequestingPasswordReset || passwordResetRequested}
            >
              {isRequestingPasswordReset ? 'Processing...' : 'Reset password'}
            </button>
          </div>
        </form>

        {passwordResetRequested && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Return to login
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy;2024 <span className="text-blue-500 dark:text-blue-400">Webestica</span>. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;