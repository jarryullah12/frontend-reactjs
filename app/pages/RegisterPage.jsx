import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../redux/slices/authSlice';
import Breadcrumb from '../components/Breadcrumb';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'My account' }
  ];
  
  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/my-account');
    }
    
    // Clear previous errors when component mounts
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col md:flex-row gap-12 mt-8">
          {/* Login column */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <p className="mb-6 text-gray-600">
              If you already have an account with us, please log in.
            </p>
            <Link 
              to="/login" 
              className="bg-black text-white px-5 py-2 hover:bg-gray-800 transition-colors inline-block"
            >
              Log in
            </Link>
          </div>
          
          {/* Register column */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6">Register</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 bg-gray-50"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 bg-gray-50"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 bg-gray-50"
                  required
                  disabled={loading}
                />
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Your personal data will be used to support your experience 
                throughout this website, to manage access to your account, and for other 
                purposes described in our privacy policy.
              </p>
              
              <button
                type="submit"
                className={`bg-black text-white px-5 py-2 hover:bg-gray-800 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default RegisterPage; 