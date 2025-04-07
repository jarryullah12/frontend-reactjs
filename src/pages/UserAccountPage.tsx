import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const UserAccountPage: React.FC = () => {
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
                  className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-md transition-colors"
                >
                  <div className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium">Account</span>
                </Link>
                
                <Link 
                  to="/notification" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-yellow-500 dark:text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Notification</span>
                </Link>
                
                <Link 
                  to="/privacy-and-safety" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-green-500 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Privacy and safety</span>
                </Link>
                
                <Link 
                  to="/communications" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-purple-500 dark:text-purple-400">
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
                ©2024 Wesbestica
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Information */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold dark:text-white">Profile Information</h1>
                <button className="text-blue-500 dark:text-blue-400 hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                    <div className="text-gray-800 dark:text-gray-200">John Doe</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                    <div className="text-gray-800 dark:text-gray-200">johndoe@example.com</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                    <div className="text-gray-800 dark:text-gray-200">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</label>
                    <div className="text-gray-800 dark:text-gray-200">January 15, 1990</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</label>
                    <div className="text-gray-800 dark:text-gray-200">Male</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</label>
                    <div className="text-gray-800 dark:text-gray-200">New York, NY</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Account Security */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h2 className="text-xl font-bold mb-6 dark:text-white">Account Security</h2>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">Change</button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Two-factor authentication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Account recovery</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Keep your recovery information up to date</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">Update</button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Connected accounts</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your connected social accounts</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">Manage</button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium dark:text-white">Active sessions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">See where you're currently logged in</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">View all</button>
                </div>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h2 className="text-xl font-bold mb-6 dark:text-white">Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Language</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">English (United States)</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">Change</button>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Time zone</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">(GMT-05:00) Eastern Time (US & Canada)</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">Change</button>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b dark:border-dark-border">
                  <div>
                    <h3 className="font-medium dark:text-white">Dark mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme when available</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h3 className="font-medium dark:text-white">Email notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your email preferences</p>
                  </div>
                  <button className="text-blue-500 dark:text-blue-400 hover:underline">Manage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage; 