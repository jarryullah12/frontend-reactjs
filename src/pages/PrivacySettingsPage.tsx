import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

// Define TypeScript interfaces
interface ActivityLog {
  id: number;
  device: string;
  location: string;
  ip: string;
  time: string;
  isCurrentDevice: boolean;
}

const PrivacySettingsPage: React.FC = () => {
  // Modal states
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showLoginActivityModal, setShowLoginActivityModal] = useState(false);
  const [showDataManagementModal, setShowDataManagementModal] = useState(false);
  const [showSearchHistoryModal, setShowSearchHistoryModal] = useState(false);
  const [showPermittedServicesModal, setShowPermittedServicesModal] = useState(false);
  
  // Form states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [searchHistoryEnabled, setSearchHistoryEnabled] = useState(true);
  const [dataDownloadFormat, setDataDownloadFormat] = useState('json');
  
  // Sample login activity data
  const [loginActivities, setLoginActivities] = useState<ActivityLog[]>([
    {
      id: 1,
      device: "Windows PC - Chrome",
      location: "New Delhi, India",
      ip: "192.168.1.1",
      time: "Just now",
      isCurrentDevice: true
    },
    {
      id: 2,
      device: "iPhone - Safari",
      location: "Mumbai, India",
      ip: "192.168.1.2",
      time: "Yesterday at 3:45 PM",
      isCurrentDevice: false
    },
    {
      id: 3,
      device: "MacBook - Firefox",
      location: "Bangalore, India",
      ip: "192.168.1.3",
      time: "March 25, 2025 at 10:30 AM",
      isCurrentDevice: false
    }
  ]);
  
  // Sample permitted services
  const [permittedServices, setPermittedServices] = useState([
    { id: 1, name: "Google", enabled: true },
    { id: 2, name: "Facebook", enabled: false },
    { id: 3, name: "Twitter", enabled: true },
    { id: 4, name: "Microsoft", enabled: false },
    { id: 5, name: "Apple", enabled: true }
  ]);
  
  // Action handlers
  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };
  
  const handleTwoFactorSave = () => {
    // Here you would typically send the two-factor settings to an API
    alert(`Two-factor authentication ${twoFactorEnabled ? 'enabled' : 'disabled'}`);
    setShowTwoFactorModal(false);
  };
  
  const handleLogoutDevice = (id: number) => {
    // Here you would typically send a logout request to an API
    setLoginActivities(loginActivities.filter(activity => activity.id !== id));
    alert("Device logged out successfully");
  };
  
  const handleClearSearchHistory = () => {
    // Here you would typically send a clear history request to an API
    alert("Search history cleared successfully");
    setShowSearchHistoryModal(false);
  };
  
  const handleToggleSearchHistory = () => {
    setSearchHistoryEnabled(!searchHistoryEnabled);
    // Here you would typically send the updated setting to an API
  };
  
  const handleDownloadData = () => {
    // Here you would typically initiate a data download
    alert(`Downloading data in ${dataDownloadFormat} format. You will receive an email when it's ready.`);
    setShowDataManagementModal(false);
  };
  
  const handleToggleService = (id: number) => {
    setPermittedServices(permittedServices.map(service => 
      service.id === id ? { ...service, enabled: !service.enabled } : service
    ));
    // Here you would typically send the updated settings to an API
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden dark:border dark:border-dark-border transition-colors">
              <div className="space-y-1 p-2">
                <Link 
                  to="/account" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Account</span>
                </Link>
                
                <Link 
                  to="/notification" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-blue-500 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Notification</span>
                </Link>
                
                <Link 
                  to="/privacy-and-safety" 
                  className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-md transition-colors"
                >
                  <div className="mr-3 text-blue-500 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium">Privacy and safety</span>
                </Link>
                
                <Link 
                  to="/communications" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Communications</span>
                </Link>
                
                <Link 
                  to="/messaging" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-blue-500 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Messaging</span>
                </Link>
                
                <Link 
                  to="/close-account" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-red-500 dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Close account</span>
                </Link>
              </div>
              
              <div className="border-t dark:border-dark-border p-4 text-center">
                <Link to="/profile" className="text-blue-500 dark:text-blue-400 hover:underline text-sm">
                  View Profile
                </Link>
              </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex justify-center space-x-2">
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/settings" className="hover:underline">Settings</Link>
                <Link to="/support" className="hover:underline">Support</Link>
              </div>
              <div className="flex justify-center space-x-2">
                <Link to="/docs" className="hover:underline">Docs</Link>
                <Link to="/help" className="hover:underline">Help</Link>
                <Link to="/privacy" className="hover:underline">Privacy & terms</Link>
              </div>
              <div className="mt-1">
                2024 Wesbestica
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h1 className="text-xl font-bold mb-2 dark:text-white">Privacy and safety</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                See information about your account, download an archive of your data, or learn about your account deactivation options
              </p>
              
              <div className="space-y-4">
                {/* Two-factor authentication */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium dark:text-white">Use two-factor authentication</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Unaffected occasional thoroughly. Adieus it no wonders spirit houses.
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center text-sm font-medium transition-colors"
                      onClick={() => setShowTwoFactorModal(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Change
                    </button>
                  </div>
                </div>
                
                {/* Login activity */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium dark:text-white">Login activity</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Select the language you use on social
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center text-sm font-medium transition-colors"
                      onClick={() => setShowLoginActivityModal(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      View
                    </button>
                  </div>
                </div>
                
                {/* Manage your data and activity */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium dark:text-white">Manage your data and activity</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Select a language for translation
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center text-sm font-medium transition-colors"
                      onClick={() => setShowDataManagementModal(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Change
                    </button>
                  </div>
                </div>
                
                {/* Search history */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium dark:text-white">Search history</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Choose to autoplay videos on social
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center text-sm font-medium transition-colors"
                      onClick={() => setShowSearchHistoryModal(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Change
                    </button>
                  </div>
                </div>
                
                {/* Permitted services */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium dark:text-white">Permitted services</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Choose if this feature appears on your profile
                      </p>
                    </div>
                    <button 
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center text-sm font-medium transition-colors"
                      onClick={() => setShowPermittedServicesModal(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Change
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
              <button 
                onClick={() => setShowTwoFactorModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-blue-500 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Enable Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="toggle"
                      checked={twoFactorEnabled}
                      onChange={handleTwoFactorToggle}
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${twoFactorEnabled ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
              </div>
              
              {twoFactorEnabled && (
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Verification Method</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          id="sms" 
                          name="verification-method" 
                          type="radio" 
                          defaultChecked 
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="sms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Text message (SMS)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="app" 
                          name="verification-method" 
                          type="radio" 
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="app" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Authentication app
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      id="verification-code"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter the code sent to your phone or generated by your authentication app
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end space-x-2">
              <button 
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md"
                onClick={() => setShowTwoFactorModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={handleTwoFactorSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Activity Modal */}
      {showLoginActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Login Activity</h3>
              <button 
                onClick={() => setShowLoginActivityModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">Where You're Logged In</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We'll alert you if we see a login from a new location.
                </p>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {loginActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start border-b border-gray-200 dark:border-dark-border pb-4 last:border-0 last:pb-0">
                    <div className="mr-3 text-blue-500 dark:text-blue-400 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {activity.device.includes("Windows") ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        ) : activity.device.includes("iPhone") ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        )}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                            {activity.device}
                            {activity.isCurrentDevice && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                                Active
                              </span>
                            )}
                          </h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {activity.location} • IP: {activity.ip}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                        {!activity.isCurrentDevice && (
                          <button 
                            className="px-3 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                            onClick={() => handleLogoutDevice(activity.id)}
                          >
                            Logout
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-between">
              <button 
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                onClick={() => {
                  // Here you would typically send a logout all request to an API
                  setLoginActivities([loginActivities.find(a => a.isCurrentDevice)].filter(Boolean) as ActivityLog[]);
                  alert("All other devices logged out successfully");
                }}
              >
                Logout of all other devices
              </button>
              
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => setShowLoginActivityModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Management Modal */}
      {showDataManagementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manage Your Data</h3>
              <button 
                onClick={() => setShowDataManagementModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500 dark:text-blue-400 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Download Your Data</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Get a copy of your data, including posts, photos, comments, and more
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 ml-9">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data Format
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          id="json" 
                          name="data-format" 
                          type="radio" 
                          checked={dataDownloadFormat === 'json'}
                          onChange={() => setDataDownloadFormat('json')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="json" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          JSON (recommended for developers)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="html" 
                          name="data-format" 
                          type="radio" 
                          checked={dataDownloadFormat === 'html'}
                          onChange={() => setDataDownloadFormat('html')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="html" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          HTML (viewable in a browser)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="csv" 
                          name="data-format" 
                          type="radio" 
                          checked={dataDownloadFormat === 'csv'}
                          onChange={() => setDataDownloadFormat('csv')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label htmlFor="csv" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          CSV (for spreadsheet applications)
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                    onClick={handleDownloadData}
                  >
                    Request Download
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Data preparation may take up to 24 hours. You'll receive an email with a download link when it's ready.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-start">
                  <div className="mr-3 text-red-500 dark:text-red-400 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Delete Your Data</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Permanently delete your account and all associated data
                    </p>
                    <button 
                      className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                      onClick={() => {
                        // Here you would typically redirect to account deletion page
                        alert("This action requires additional confirmation. Redirecting to account deletion page.");
                        setShowDataManagementModal(false);
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end">
              <button 
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md"
                onClick={() => setShowDataManagementModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Search History Modal */}
      {showSearchHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Search History</h3>
              <button 
                onClick={() => setShowSearchHistoryModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-blue-500 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Save Search History</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We use your search history to improve your experience
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="search-toggle" 
                      id="search-toggle"
                      checked={searchHistoryEnabled}
                      onChange={handleToggleSearchHistory}
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="search-toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${searchHistoryEnabled ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-lg border border-gray-200 dark:border-dark-border">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Searches</h4>
                  
                  {searchHistoryEnabled ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">web design inspiration</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">ui/ux trends 2025</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">best design tools</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Search history is disabled. Enable it to see your recent searches.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-between">
              {searchHistoryEnabled && (
                <button 
                  className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  onClick={handleClearSearchHistory}
                >
                  Clear search history
                </button>
              )}
              
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md ml-auto"
                onClick={() => setShowSearchHistoryModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Permitted Services Modal */}
      {showPermittedServicesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Permitted Services</h3>
              <button 
                onClick={() => setShowPermittedServicesModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Control which third-party services can access your account information. Disabling a service may limit functionality in some areas.
                </p>
              </div>
              
              <div className="space-y-4">
                {permittedServices.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-dark-border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {service.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-gray-200">{service.name}</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {service.enabled ? 'Currently has access' : 'Access revoked'}
                        </p>
                      </div>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name={`toggle-${service.id}`} 
                        id={`toggle-${service.id}`}
                        checked={service.enabled}
                        onChange={() => handleToggleService(service.id)}
                        className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label 
                        htmlFor={`toggle-${service.id}`} 
                        className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${service.enabled ? 'bg-blue-500' : ''}`}
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end">
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => {
                  // Here you would typically send the updated settings to an API
                  alert("Service permissions updated successfully");
                  setShowPermittedServicesModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettingsPage;