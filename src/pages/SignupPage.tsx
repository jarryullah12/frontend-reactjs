import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signupAsync, clearSignupState } from '../redux/slices/userSlice';
import { useSession } from '../contexts/SessionContext';

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useSession();
  const { isSigningUp, signupSuccess, signupError, currentUser } = useAppSelector(state => state.user);

  useEffect(() => {
    // Clear signup state when component mounts
    dispatch(clearSignupState());
  }, [dispatch]);

  useEffect(() => {
    // Handle signup success - auto-login the user
    if (signupSuccess && currentUser) {
      // Generate a token (in a real app, this would come from the API)
      const userId = currentUser.id;
      const token = `token-${Date.now()}`;
      
      // Login the user with session
      login(userId, token, rememberMe);
      
      // Navigate to home page
      navigate('/');
    }
  }, [signupSuccess, currentUser, navigate, rememberMe, login]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    // Check for password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }
    
    if (!hasSpecialChar) {
      setError('Password must contain at least one special character');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(signupAsync({
        email,
        password,
        name: email.split('@')[0], // Use part of email as name
        username: email.split('@')[0] // Use part of email as username
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-8 dark:border dark:border-dark-border transition-colors">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign up</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account? <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">Sign in here</Link>
          </p>
        </div>

        {(error || signupError) && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || signupError}
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
              disabled={isSigningUp}
            />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm -mt-2">We'll never share your email with anyone else.</p>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-3 border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSigningUp}
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
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
            Write your password...
            <button type="button" className="ml-1 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </p>

          <div>
            <input
              type="password"
              required
              className="w-full px-3 py-3 border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSigningUp}
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-dark-bg dark:border-dark-border"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              disabled={isSigningUp}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Keep me signed in
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
              disabled={isSigningUp}
            >
              {isSigningUp ? 'Signing up...' : 'Sign me up'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          2022 <span className="text-blue-500 dark:text-blue-400">Webestica</span>. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default SignupPage;