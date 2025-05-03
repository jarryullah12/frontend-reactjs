import React, { useState, useEffect } from 'react';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Logo from '../assets/logo.svg';
import { useDispatch, useSelector } from '../redux/mockRedux';
import { login } from '../redux/actions/authActions';

const Login = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth || {});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Use Redux state for loading and error
  const isLoading = auth.loading;
  
  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigateTo('home');
    }
  }, [auth.isAuthenticated, navigateTo]);

  // Set error from Redux state
  useEffect(() => {
    if (auth.error) {
      setErrors(prevErrors => ({ ...prevErrors, general: auth.error }));
    }
  }, [auth.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Clear any previous errors
      setErrors({});
      
      // Show immediate feedback
      setSuccessMessage('Signing in...');
      
      try {
        // Use the proper Redux login action
        const result = await dispatch(login({
          email: formData.email,
          password: formData.password
        }));
        
        // Check if login was successful
        if (result.success) {
          // Update success message
          setSuccessMessage('Sign in successful! Redirecting...');
          
          // Navigate to home after a short delay
          setTimeout(() => {
            navigateTo('home');
          }, 500);
        } else {
          // Handle login failure
          setSuccessMessage('');
          setErrors({ general: result.error || 'Login failed. Please try again.' });
        }
      } catch (error) {
        // Handle unexpected errors
        setSuccessMessage('');
        setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img src={Logo} alt="Prescripto" className="h-12" />
            <span className="ml-2 text-primary font-bold text-2xl">Prescripto</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <button 
              onClick={() => navigateTo('register')} 
              className="font-medium text-primary hover:text-primary-dark"
            >
              create a new account
            </button>
            {' | '}
            <button 
              onClick={() => navigateTo('admin-login')} 
              className="font-medium text-primary hover:text-primary-dark"
            >
              Admin Panel
            </button>
          </p>
        </div>
        
        <Card>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {errors.general}
              </div>
            )}
            {successMessage && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                {successMessage}
              </div>
            )}
            <div>
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
                placeholder="Enter your email"
              />
              
              <FormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  onClick={() => navigateTo('forgot-password')} 
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </Card>
        
        <div className="text-center mt-4">
          <button 
            onClick={() => navigateTo('home')} 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
