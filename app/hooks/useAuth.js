
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, resetPasswordRequest } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { 
    user, 
    loading, 
    error, 
    isAuthenticated, 
    resetPasswordSuccess, 
    resetPasswordMessage 
  } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  // Handle input changes
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
  
  // Login handler
  const handleLogin = async (e, loginData = null) => {
    if (e) e.preventDefault();
    
    // Use provided loginData if available, otherwise use internal formData
    const dataToUse = loginData || formData;
    
    // Validate form
    const errors = {};
    if (!dataToUse.email) errors.email = 'Email is required';
    if (!dataToUse.password) errors.password = 'Password is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Dispatch login action
    dispatch(login(dataToUse));
  };
  
  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Dispatch register action
    dispatch(register({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName
        }
      }
    }));
  };
  
  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
  };
  
  // Reset password handler
  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Dispatch reset password action
    dispatch(resetPasswordRequest({ email: formData.email }));
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    });
    setFormErrors({});
  };
  
  return {
    user,
    loading,
    error,
    isAuthenticated,
    resetPasswordSuccess,
    resetPasswordMessage,
    formData,
    formErrors,
    handleInputChange,
    handleLogin,
    handleRegister,
    handleLogout,
    handleResetPasswordRequest,
    resetForm
  };
};

export default useAuth;
