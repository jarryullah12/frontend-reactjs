import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const LostPasswordPage = () => {
  const { 
    loading, 
    error, 
    formData, 
    formErrors, 
    handleInputChange, 
    handleResetPasswordRequest,
    resetForm,
    resetPasswordSuccess,
    resetPasswordMessage
  } = useAuth();

  // Reset form on unmount
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container">
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Login', path: '/login' },
            { label: 'Reset Password', path: '/lost-password' }
          ]} 
        />
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
              <p className="text-gray-600">
                Enter your email address below and we'll send you a link to reset your password.
              </p>
            </div>
            
            {resetPasswordSuccess && (
              <div className="mb-6 p-3 bg-green-50 text-green-700 text-sm rounded-md">
                {resetPasswordMessage}
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleResetPasswordRequest}>
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                autoComplete="email"
                icon={<FiMail className="text-gray-400" />}
                error={formErrors.email}
                disabled={resetPasswordSuccess}
              />
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={resetPasswordSuccess}
              >
                {resetPasswordSuccess ? 'Email Sent' : 'Reset Password'}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPasswordPage; 