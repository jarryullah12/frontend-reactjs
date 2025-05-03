import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useSelector, useDispatch } from '../../redux/mockRedux';
import { logout, updateProfile } from '../../redux/actions/authActions';

const AdminSettings = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth || {});
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.user || {};
  const isAdmin = isAuthenticated && user.role === 'admin';
  const loading = auth.loading;

  // State for admin profile
  const [adminProfile, setAdminProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Administrator',
    password: '',
    confirmPassword: '',
  });

  // State for UI
  const [localLoading, setLocalLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load user data when component mounts or when user changes
  useEffect(() => {
    if (isAuthenticated && isAdmin && user) {
      setAdminProfile({
        name: user.name || 'Admin User',
        email: user.email || 'admin@example.com',
        phone: user.phone || '',
        role: user.role || 'Administrator',
        password: '',
        confirmPassword: '',
      });
    } else {
      // If not authenticated as admin, redirect to login
      // Uncomment the line below to enable automatic redirect
      // navigateTo('admin-login');
    }
  }, [isAuthenticated, isAdmin, user, navigateTo]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Handle profile change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // Handle save profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validate password if provided
    if (adminProfile.password && adminProfile.password !== adminProfile.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setLocalLoading(false);
      return;
    }

    try {
      // Prepare profile data
      const profileData = {
        name: adminProfile.name,
        email: adminProfile.email,
        phone: adminProfile.phone,
      };
      
      // Add password if provided
      if (adminProfile.password) {
        profileData.password = adminProfile.password;
      }
      
      // Use the updateProfile action
      const result = await dispatch(updateProfile(profileData));
      
      if (result.success) {
        setSuccessMessage('Profile updated successfully!');
        
        // Clear password fields
        setAdminProfile(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      } else {
        setErrorMessage(result.error || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  // Render content based on authentication status
  const renderUnauthenticatedContent = () => (
    <div className="p-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-gray-600 mb-6">Please log in with your admin credentials to access settings.</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigateTo('admin-login')} 
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );

  // Render authenticated content
  const renderAuthenticatedContent = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}
      
      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold">Admin Profile</h2>
        </div>
        <form onSubmit={handleSaveProfile}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={adminProfile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={adminProfile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={adminProfile.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={adminProfile.role}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={adminProfile.password}
                  onChange={handleProfileChange}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={adminProfile.confirmPassword}
                  onChange={handleProfileChange}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              disabled={loading || localLoading}
              className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors ${
                (loading || localLoading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {(loading || localLoading) ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-settings">
      {isAuthenticated && isAdmin ? renderAuthenticatedContent() : renderUnauthenticatedContent()}
    </AdminLayout>
  );
};

export default AdminSettings;
