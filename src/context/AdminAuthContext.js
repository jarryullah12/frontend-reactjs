import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the admin auth context
const AdminAuthContext = createContext();

// Custom hook to use the admin auth context
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  // Initialize admins array from localStorage or with default admin
  const initializeAdmins = () => {
    const storedAdmins = localStorage.getItem('admins');
    if (storedAdmins) {
      try {
        return JSON.parse(storedAdmins);
      } catch (e) {
        console.error('Error parsing admins from localStorage:', e);
      }
    }
    
    // Default admin if no admins exist
    const defaultAdmins = [
      {
        id: 'admin1',
        email: 'admin@example.com',
        password: 'admin123', // In a real app, this would be hashed
        name: 'Admin User',
        isAdmin: true
      }
    ];
    
    // Store default admins
    localStorage.setItem('admins', JSON.stringify(defaultAdmins));
    return defaultAdmins;
  };

  // Check if admin is already logged in
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('admin');
    
    if (adminToken && admin) {
      try {
        setAdminToken(adminToken);
        setCurrentAdmin(JSON.parse(admin));
        setIsAdminAuthenticated(true);
        console.log('Admin authenticated from localStorage:', JSON.parse(admin));
      } catch (e) {
        console.error('Error parsing admin from localStorage:', e);
        // Clear invalid data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
      }
    }
    
    // Initialize admins if not already done
    initializeAdmins();
  }, []);

  // Admin Login function
  const adminLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting admin login with:', { email });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get admins from localStorage
      const admins = initializeAdmins();
      
      // Find admin with matching email and password
      const admin = admins.find(a => a.email === email && a.password === password);
      
      if (admin) {
        // Create an admin object without the password for storage
        const adminData = {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          isAdmin: true
        };
        
        const token = 'admin-jwt-token-' + Math.random().toString(36).substring(2);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('admin', JSON.stringify(adminData));
        
        setCurrentAdmin(adminData);
        setAdminToken(token);
        setIsAdminAuthenticated(true);
        setLoading(false);
        console.log('Admin login successful:', adminData);
        return true;
      } else {
        console.log('Admin login failed: Invalid credentials');
        setError('Invalid admin email or password');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError(error.message || 'Admin login failed');
      setLoading(false);
      return false;
    }
  };

  // Admin Register function
  const adminRegister = async (adminData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting admin registration with:', {
        email: adminData.email,
        name: adminData.name
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current admins
      const admins = initializeAdmins();
      
      // Check if email is already in use
      if (admins.some(admin => admin.email === adminData.email)) {
        console.log('Admin registration failed: Email already in use');
        setError('Email already in use');
        setLoading(false);
        return false;
      }
      
      // Create new admin
      const newAdmin = {
        id: 'admin-' + Math.floor(Math.random() * 10000).toString(),
        email: adminData.email,
        password: adminData.password, // In a real app, this would be hashed
        name: adminData.name,
        isAdmin: true
      };
      
      // Add to admins array
      admins.push(newAdmin);
      
      // Save updated admins to localStorage
      localStorage.setItem('admins', JSON.stringify(admins));
      
      // Create an admin object without the password for storage
      const adminDataForStorage = {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        isAdmin: true
      };
      
      // Log in the new admin
      const token = 'admin-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('adminToken', token);
      localStorage.setItem('admin', JSON.stringify(adminDataForStorage));
      
      setCurrentAdmin(adminDataForStorage);
      setAdminToken(token);
      setIsAdminAuthenticated(true);
      setLoading(false);
      console.log('Admin registration successful:', adminDataForStorage);
      return true;
    } catch (error) {
      console.error('Admin registration error:', error);
      setError(error.message || 'Admin registration failed');
      setLoading(false);
      return false;
    }
  };

  // Admin Logout function
  const adminLogout = () => {
    console.log('Logging out admin');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setCurrentAdmin(null);
    setAdminToken(null);
    setIsAdminAuthenticated(false);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    currentAdmin,
    adminToken,
    isAdminAuthenticated,
    loading,
    error,
    adminLogin,
    adminRegister,
    adminLogout,
    clearError
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
