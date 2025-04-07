import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const NotificationSettingsPage: React.FC = () => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleAction = (type: string) => {
    setActionType(type);
    setShowActionModal(true);
  };

  const closeActionModal = () => {
    setShowActionModal(false);
    setActionType('');
  };

  const executeAction = () => {
    switch(actionType) {
      case 'digest':
        alert('Your notification digest settings have been updated.');
        break;
      case 'mute':
        alert('Notifications have been muted for the selected period.');
        break;
      case 'custom':
        alert('Custom notification settings page will open.');
        break;
      case 'history':
        alert('Redirecting to notification history page...');
        break;
      default:
        break;
    }
    closeActionModal();
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
                  className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-md transition-colors"
                >
                  <div className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="font-medium">Notification</span>
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
                2024 Wesbestica
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-6">
            {/* Email notifications section */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h1 className="text-xl font-bold mb-4 dark:text-white">Email notifications</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Select the kinds of email notifications you'd like to receive. You can turn these off anytime.
              </p>
              
              <div className="space-y-6">
                <div className="border-b dark:border-dark-border pb-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold dark:text-white">Updates</h3>
                    <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full transition-colors">
                      Edit all
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="comments"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700 dark:text-gray-200">Comments</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified when someone comments on your posts.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="mentions"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="mentions" className="font-medium text-gray-700 dark:text-gray-200">Mentions</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified when someone mentions you.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="follows"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="follows" className="font-medium text-gray-700 dark:text-gray-200">Follows</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified when someone follows you.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b dark:border-dark-border pb-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold dark:text-white">Messages</h3>
                    <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full transition-colors">
                      Edit all
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="direct-messages"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="direct-messages" className="font-medium text-gray-700 dark:text-gray-200">Direct messages</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified when you receive a direct message.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="message-requests"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="message-requests" className="font-medium text-gray-700 dark:text-gray-200">Message requests</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified when you receive message requests.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold dark:text-white">Account & Security</h3>
                    <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full transition-colors">
                      Edit all
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="account-activity"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="account-activity" className="font-medium text-gray-700 dark:text-gray-200">Account activity</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified about your account activity and security updates.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="policy-updates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="policy-updates" className="font-medium text-gray-700 dark:text-gray-200">Policy updates</label>
                        <p className="text-gray-500 dark:text-gray-400">Get notified about important policy updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Push notifications section */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold dark:text-white">Push notifications</h2>
                <div className="flex items-center">
                  <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-200">Status: </span>
                  <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Enabled</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Control the notifications you receive on your desktop or mobile device.
              </p>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h3 className="font-medium">All push notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable or disable all push notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h3 className="font-medium">Comments and replies</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When someone comments on your posts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h3 className="font-medium">New followers</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When someone follows your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h3 className="font-medium">Direct messages</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When you receive a new message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h3 className="font-medium">Account updates</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Security and privacy notices</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Save preferences
                </button>
              </div>
            </div>
            
            {/* Notification Actions Section */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Notification Actions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Manage how you receive and interact with notifications.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => handleAction('digest')}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                      <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">Daily Digest</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive a daily summary instead of individual notifications</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => handleAction('mute')}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-3">
                      <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">Mute Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily silence all notifications</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => handleAction('custom')}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                      <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">Custom Schedules</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Set up custom notification delivery times</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => handleAction('history')}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                      <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">Notification History</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">View all past notifications</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold dark:text-white">
                {actionType === 'digest' && 'Daily Notification Digest'}
                {actionType === 'mute' && 'Mute Notifications'}
                {actionType === 'custom' && 'Custom Notification Schedule'}
                {actionType === 'history' && 'Notification History'}
              </h3>
              <button 
                onClick={closeActionModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              {actionType === 'digest' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Instead of receiving individual notifications throughout the day, get a single daily summary of all activity.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="digest-morning"
                        type="radio"
                        name="digest-time"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        defaultChecked
                      />
                      <label htmlFor="digest-morning" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Morning (8:00 AM)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="digest-afternoon"
                        type="radio"
                        name="digest-time"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                      />
                      <label htmlFor="digest-afternoon" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Afternoon (1:00 PM)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="digest-evening"
                        type="radio"
                        name="digest-time"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                      />
                      <label htmlFor="digest-evening" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Evening (6:00 PM)
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {actionType === 'mute' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Temporarily silence all notifications. You'll still receive them when you unmute.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="mute-1hour"
                        type="radio"
                        name="mute-duration"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                        defaultChecked
                      />
                      <label htmlFor="mute-1hour" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        1 hour
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="mute-8hours"
                        type="radio"
                        name="mute-duration"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                      />
                      <label htmlFor="mute-8hours" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        8 hours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="mute-24hours"
                        type="radio"
                        name="mute-duration"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                      />
                      <label htmlFor="mute-24hours" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        24 hours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="mute-until"
                        type="radio"
                        name="mute-duration"
                        className="h-4 w-4 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-dark-bg"
                      />
                      <label htmlFor="mute-until" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Until I turn them back on
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {actionType === 'custom' && (
                <p className="text-gray-600 dark:text-gray-300">
                  Create a custom schedule for when you receive notifications. This helps reduce interruptions during your focused work hours or quiet times.
                </p>
              )}
              {actionType === 'history' && (
                <p className="text-gray-600 dark:text-gray-300">
                  View a complete history of all notifications you've received. You can filter by type, date, or search for specific content.
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeActionModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeAction}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                {actionType === 'history' ? 'View History' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingsPage;