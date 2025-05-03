import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../redux/mockRedux';

const ProfileEdit = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth || { user: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);
  
  // If no user is logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigateTo('login');
    }
  }, [user, navigateTo]);
  
  // If no user is logged in, show loading state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update user in Redux store (mock implementation)
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          ...user,
          ...formData
        }
      });
      
      setLoading(false);
      setSuccess(true);
      
      // Redirect back to profile after successful update
      setTimeout(() => {
        navigateTo('profile');
      }, 1500);
    }, 800);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigateTo('profile')}
            className="mr-4 text-primary hover:text-primary-dark"
          >
            &larr; Back to Profile
          </button>
          <h1 className="text-2xl font-medium">Edit Profile</h1>
        </div>
        
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-medium text-green-800 mb-2">Profile Updated Successfully!</h2>
            <p className="text-green-700 mb-4">
              Your profile information has been updated.
            </p>
            <p className="text-sm text-green-600">Redirecting back to your profile...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                

                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigateTo('profile')}
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
