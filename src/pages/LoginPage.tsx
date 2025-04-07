import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginAsync, clearLoginState } from '../redux/slices/userSlice';
import { useSession } from '../contexts/SessionContext';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useSession();
  const { isLoggingIn, loginSuccess, loginError, isAuthenticated, currentUser } = useAppSelector(state => state.user);

  // Get the redirect path from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    // Clear login state when component mounts
    dispatch(clearLoginState());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to home page on successful login
    if (isAuthenticated && loginSuccess && currentUser) {
      // Set session data using the current user from Redux store
      const userId = currentUser.id;
      const token = `token-${Date.now()}`; // In a real app, this would come from your API
      const userEmail = currentUser.email;
      
      // Set the session with email
      login(userId, token, rememberMe, userEmail);
      
      // Navigate to the original intended destination
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loginSuccess, currentUser, navigate, login, rememberMe, from]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Basic password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(loginAsync({
        email,
        password,
        rememberMe
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-8 dark:border dark:border-dark-border transition-colors">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign in</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account? <Link to="/signup" className="text-blue-500 dark:text-blue-400 hover:underline">Click here to sign up</Link>
          </p>
        </div>

        {(error || loginError) && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || loginError}
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              required
              className="w-full px-3 py-3 border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-3 border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-dark-bg dark:border-dark-border"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={isLoggingIn}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me?
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="text-blue-500 dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          2024 <span className="text-blue-500 dark:text-blue-400">Webestica</span>. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default LoginPage;