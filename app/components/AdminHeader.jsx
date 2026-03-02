import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import Logo from './Logo';
import { clearSession, getSessionUserData } from '../utils/sessionManager';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  
  useEffect(() => {
    // First try to get admin profile from localStorage
    const storedProfile = localStorage.getItem('adminProfile');
    if (storedProfile) {
      try {
        const profileData = JSON.parse(storedProfile);
        if (profileData.name) {
          setAdminUser({ name: profileData.name, email: profileData.email });
          return;
        }
      } catch (error) {
        console.error('Error parsing admin profile:', error);
      }
    }
    
    // Fallback to session data if no profile in localStorage
    const userData = getSessionUserData('admin');
    if (userData) {
      setAdminUser(userData);
    }
  }, []);
  
  const handleLogout = () => {
    // Clear admin session
    clearSession('admin');
    
    // Navigate to admin login page
    navigate('/admin/login');
  };
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo className="text-2xl" />
            <span className="ml-4 text-lg font-semibold text-gray-700">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            {adminUser && (
              <div className="flex items-center text-sm text-gray-600">
                <FiUser className="mr-1" />
                <span>{adminUser.name || adminUser.email || 'Admin'}</span>
              </div>
            )}
            <Link to="/" className="text-sm text-gray-600 hover:text-primary">
              View Store
            </Link>
            <button 
              className="flex items-center text-sm text-gray-600 hover:text-primary"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
