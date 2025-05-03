import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo.svg';
import { useSelector, useDispatch } from '../../redux/mockRedux';
import { logout } from '../../redux/actions/authActions';

const AdminLayout = ({ children, navigateTo, currentPage = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth || {});
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.user || {};
  const isAdmin = isAuthenticated && user.role === 'admin';

  // Check if user is authenticated as admin on component mount
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      // Redirect to admin login if not authenticated as admin
      // Uncomment the line below to enable automatic redirect
      // navigateTo('admin-login');
    }
  }, [isAuthenticated, isAdmin, navigateTo]);

  const handleLogout = () => {
    dispatch(logout());
    // Show a brief message before redirecting
    alert('You have been logged out successfully');
    // Navigate to admin login page
    navigateTo('admin-login');
  };

  const navItems = [
    { page: 'admin', label: 'Dashboard', icon: '📊' },
    { page: 'admin-doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { page: 'admin-patients', label: 'Patients', icon: '🧑' },
    { page: 'admin-appointments', label: 'Appointments', icon: '📅' },
    { page: 'admin-settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (page) => {
    return currentPage === page;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => navigateTo('admin')} className="flex items-center">
            <img src={Logo} alt="Prescripto" className="h-8" />
            <span className="ml-2 text-primary font-bold text-xl">Prescripto</span>
          </button>
          <button className="md:hidden text-gray-500" onClick={() => setSidebarOpen(false)}>
            <span className="text-xl">×</span>
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => navigateTo(item.page)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors w-full text-left ${isActive(item.page) ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button className="md:hidden text-gray-500 mr-4" onClick={() => setSidebarOpen(true)}>
                <span className="text-xl">☰</span>
              </button>
              <div className="flex space-x-4">
                {!isAuthenticated || !isAdmin ? (
                  // Show login/register buttons when not authenticated as admin
                  <>
                    <button 
                      onClick={() => navigateTo('admin-login')} 
                      className="text-gray-600 hover:text-primary text-sm font-medium"
                    >
                      Admin Login
                    </button>
                    <button 
                      onClick={() => navigateTo('admin-register')} 
                      className="text-gray-600 hover:text-primary text-sm font-medium"
                    >
                      Admin Register
                    </button>
                  </>
                ) : (
                  // Show logout button when authenticated as admin
                  <button 
                    onClick={handleLogout} 
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Admin Logout
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated && isAdmin ? (
                // Show admin info when authenticated
                <>
                  <span className="mr-2 text-sm font-medium">
                    Welcome, {user.name || 'Admin'}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">👤</span>
                  </div>
                </>
              ) : (
                // Show generic admin text when not authenticated
                <>
                  <span className="mr-2 text-sm font-medium">Admin Panel</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">👤</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
