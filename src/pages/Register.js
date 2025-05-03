import React, { useState, useEffect } from 'react';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Logo from '../assets/logo.svg';
import { useDispatch, useSelector } from '../redux/mockRedux';
import { register } from '../redux/actions/authActions';

const Register = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth || {});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  // Use Redux state for loading and error
  const isLoading = auth.loading;
  
  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigateTo('home');
    }
  }, [auth.isAuthenticated, navigateTo]);

  // Redirect after successful registration
  useEffect(() => {
    if (auth.registeredUser) {
      // Wait a moment to show success message before redirecting
      const timer = setTimeout(() => {
        navigateTo('login');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [auth.registeredUser, navigateTo]);

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
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Clear any previous errors
        setErrors({});
        
        // Use the proper Redux register action
        const result = await dispatch(register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }));
        
        if (result.success) {
          // Show success message
          alert('Registration successful! Please login with your credentials.');
          
          // Navigate to login after a short delay
          setTimeout(() => {
            navigateTo('login');
          }, 1000);
        } else {
          // Handle registration failure
          setErrors({ general: result.error || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        // Handle unexpected errors
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <button 
              onClick={() => navigateTo('login')} 
              className="font-medium text-primary hover:text-primary-dark"
            >
              sign in to your existing account
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
            <div className="space-y-4">
              <FormInput
                id="name"
                name="name"
                type="text"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
                placeholder="Enter your full name"
              />
              
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
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                error={errors.phone}
                placeholder="Enter your phone number"
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
                placeholder="Create a password"
                autoComplete="new-password"
              />
              
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <button type="button" className="text-primary hover:text-primary-dark">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-primary hover:text-primary-dark">
                  Privacy Policy
                </button>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </form>
        </Card>
        
        <div className="text-center mt-4">
          <button 
            onClick={() => navigateTo('home')} 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            u2190 Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
