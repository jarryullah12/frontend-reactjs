import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { 
    isAuthenticated, 
    loading, 
    error,
    handleLogin,
    resetForm
  } = useAuth();
  
  // Local form state to ensure inputs work properly
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);
  
  // Reset form on unmount
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);
  
  // Handle input changes locally
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container">
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Login', path: '/login' }
          ]} 
        />
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={(e) => {
              e.preventDefault();
              
              // Validate form
              const errors = {};
              if (!formData.email) errors.email = 'Email is required';
              if (!formData.password) errors.password = 'Password is required';
              
              if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
              }
              
              // Call the login function from useAuth with the form data
              handleLogin(e, formData);
            }}>
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                autoComplete="email"
                icon={<FiUser className="text-gray-400" />}
                error={formErrors.email}
              />
              
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                icon={<FiLock className="text-gray-400" />}
                error={formErrors.password}
              />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/lost-password" className="text-blue-600 hover:text-blue-800">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Sign In
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <Link to="/admin" className="text-blue-600 hover:underline font-medium">
                  Admin Panel
                </Link>
              </p>
            </div>
            
            {/* Social login section removed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 