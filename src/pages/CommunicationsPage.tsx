import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

// Define interfaces for our data structures
interface ConnectionSetting {
  id: string;
  name: string;
  description: string;
}

interface MessageSetting {
  id: string;
  name: string;
  description: string;
}

interface VisibilitySetting {
  id: string;
  name: string;
  description: string;
}

const CommunicationsPage: React.FC = () => {
  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("connection");
  
  // Modal visibility states
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [showMessageSettingsModal, setShowMessageSettingsModal] = useState(false);
  const [showVisibilitySettingsModal, setShowVisibilitySettingsModal] = useState(false);
  
  // Settings states
  const [selectedConnectionSetting, setSelectedConnectionSetting] = useState("email-only");
  const [selectedMessageSetting, setSelectedMessageSetting] = useState("connections-only");
  const [selectedVisibilitySetting, setSelectedVisibilitySetting] = useState("everyone");
  
  // Message request filter state
  const [filterMessageRequests, setFilterMessageRequests] = useState(true);
  
  // Read receipts state
  const [sendReadReceipts, setSendReadReceipts] = useState(true);
  
  // Profile visibility options
  const [profileVisibleInSearch, setProfileVisibleInSearch] = useState(true);
  const [allowEmailLookup, setAllowEmailLookup] = useState(true);
  const [allowPhoneLookup, setAllowPhoneLookup] = useState(false);
  
  // Connection settings data
  const connectionSettings: ConnectionSetting[] = [
    {
      id: "everyone",
      name: "Everyone on social (recommended)",
      description: "Allow anyone on the platform to send you connection requests"
    },
    {
      id: "email-only",
      name: "Only people who know your email address",
      description: "Limit connection requests to people who have your email address"
    },
    {
      id: "mutual-connections",
      name: "Only people who appear in your mutual connection list",
      description: "Only allow connections from people who share connections with you"
    }
  ];
  
  // Message settings data
  const messageSettings: MessageSetting[] = [
    {
      id: "everyone",
      name: "Everyone",
      description: "Allow anyone on the platform to message you"
    },
    {
      id: "connections-only",
      name: "Connections only",
      description: "Only allow messages from people you're connected with"
    },
    {
      id: "connections-plus",
      name: "Connections + message requests",
      description: "Allow connections to message directly, others will send requests"
    }
  ];
  
  // Visibility settings data
  const visibilitySettings: VisibilitySetting[] = [
    {
      id: "everyone",
      name: "Everyone",
      description: "Your profile is visible to anyone on the platform"
    },
    {
      id: "connections-only",
      name: "Connections only",
      description: "Only your connections can see your full profile"
    },
    {
      id: "private",
      name: "Private mode",
      description: "Your profile is hidden from search and only visible to approved connections"
    }
  ];
  
  // Handler functions
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleConnectionSettingChange = (settingId: string) => {
    setSelectedConnectionSetting(settingId);
  };
  
  const handleMessageSettingChange = (settingId: string) => {
    setSelectedMessageSetting(settingId);
  };
  
  const handleVisibilitySettingChange = (settingId: string) => {
    setSelectedVisibilitySetting(settingId);
  };
  
  const handleToggleMessageFilter = () => {
    setFilterMessageRequests(!filterMessageRequests);
  };
  
  const handleToggleReadReceipts = () => {
    setSendReadReceipts(!sendReadReceipts);
  };
  
  const handleToggleProfileVisibility = () => {
    setProfileVisibleInSearch(!profileVisibleInSearch);
  };
  
  const handleToggleEmailLookup = () => {
    setAllowEmailLookup(!allowEmailLookup);
  };
  
  const handleTogglePhoneLookup = () => {
    setAllowPhoneLookup(!allowPhoneLookup);
  };
  
  const handleSaveChanges = () => {
    // Here you would typically send the updated settings to an API
    alert("Communication settings saved successfully!");
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
                  className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-md transition-colors"
                >
                  <div className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="font-medium">Communications</span>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-7 7-7-7" />
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
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h1 className="text-xl font-bold mb-2 dark:text-white">Who can connect with you?</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to.
              </p>
              
              <div className="space-y-6">
                {/* Connection Request Section */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 cursor-pointer"
                    onClick={() => toggleSection("connection")}
                  >
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">Connection request</h3>
                    <button className="text-blue-500 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform" style={{ transform: expandedSection === "connection" ? 'rotate(180deg)' : '' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {expandedSection === "connection" && (
                    <div className="p-4 space-y-4">
                      {connectionSettings.map((setting) => (
                        <div key={setting.id} className="flex items-center">
                          <input
                            id={setting.id}
                            name="connection-visibility"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-dark-bg"
                            checked={selectedConnectionSetting === setting.id}
                            onChange={() => handleConnectionSettingChange(setting.id)}
                          />
                          <label htmlFor={setting.id} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            {setting.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Who can message you */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 cursor-pointer"
                    onClick={() => toggleSection("message")}
                  >
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">Who can message you</h3>
                    <button className="text-blue-500 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform" style={{ transform: expandedSection === "message" ? 'rotate(180deg)' : '' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {expandedSection === "message" && (
                    <div className="p-4 space-y-4">
                      {messageSettings.map((setting) => (
                        <div key={setting.id} className="flex items-center">
                          <input
                            id={setting.id}
                            name="message-visibility"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-dark-bg"
                            checked={selectedMessageSetting === setting.id}
                            onChange={() => handleMessageSettingChange(setting.id)}
                          />
                          <label htmlFor={setting.id} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            {setting.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* How people can find you */}
                <div className="border dark:border-dark-border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 cursor-pointer"
                    onClick={() => toggleSection("visibility")}
                  >
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">How people can find you</h3>
                    <button className="text-blue-500 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform" style={{ transform: expandedSection === "visibility" ? 'rotate(180deg)' : '' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {expandedSection === "visibility" && (
                    <div className="p-4 space-y-4">
                      {visibilitySettings.map((setting) => (
                        <div key={setting.id} className="flex items-center">
                          <input
                            id={setting.id}
                            name="visibility-setting"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-dark-bg"
                            checked={selectedVisibilitySetting === setting.id}
                            onChange={() => handleVisibilitySettingChange(setting.id)}
                          />
                          <label htmlFor={setting.id} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            {setting.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" 
                  onClick={handleSaveChanges}
                >
                  Save changes
                </button>
                
                <button 
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => setShowConnectionModal(true)}
                >
                  Manage connection settings
                </button>
                
                <button 
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => setShowMessageSettingsModal(true)}
                >
                  Message preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connection Settings Modal */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connection Settings</h3>
              <button 
                onClick={() => setShowConnectionModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Who can send you connection requests?</h4>
                <div className="space-y-4">
                  {connectionSettings.map((setting) => (
                    <div key={setting.id} className="p-3 border border-gray-200 dark:border-dark-border rounded-lg">
                      <div className="flex items-center">
                        <input
                          id={`modal-${setting.id}`}
                          name="modal-connection-visibility"
                          type="radio"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-dark-bg"
                          checked={selectedConnectionSetting === setting.id}
                          onChange={() => handleConnectionSettingChange(setting.id)}
                        />
                        <label htmlFor={`modal-${setting.id}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                          {setting.name}
                        </label>
                      </div>
                      <p className="mt-1 ml-7 text-xs text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Connection request notifications</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Email me when I receive connection requests
                  </span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="connection-email-toggle" 
                      id="connection-email-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      defaultChecked
                    />
                    <label 
                      htmlFor="connection-email-toggle" 
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer bg-blue-500"
                    ></label>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Push notifications for connection requests
                  </span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="connection-push-toggle" 
                      id="connection-push-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      defaultChecked
                    />
                    <label 
                      htmlFor="connection-push-toggle" 
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer bg-blue-500"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end">
              <button 
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md mr-2"
                onClick={() => setShowConnectionModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => {
                  // Here you would typically send the updated settings to an API
                  alert("Connection settings updated successfully");
                  setShowConnectionModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Message Settings Modal */}
      {showMessageSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Message Preferences</h3>
              <button 
                onClick={() => setShowMessageSettingsModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Who can message you?</h4>
                <div className="space-y-4">
                  {messageSettings.map((setting) => (
                    <div key={setting.id} className="p-3 border border-gray-200 dark:border-dark-border rounded-lg">
                      <div className="flex items-center">
                        <input
                          id={`modal-${setting.id}`}
                          name="modal-message-visibility"
                          type="radio"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-dark-bg"
                          checked={selectedMessageSetting === setting.id}
                          onChange={() => handleMessageSettingChange(setting.id)}
                        />
                        <label htmlFor={`modal-${setting.id}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                          {setting.name}
                        </label>
                      </div>
                      <p className="mt-1 ml-7 text-xs text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message filtering</h4>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Filter message requests
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Hide message requests that may be offensive or spam
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="filter-toggle" 
                      id="filter-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      checked={filterMessageRequests}
                      onChange={handleToggleMessageFilter}
                    />
                    <label 
                      htmlFor="filter-toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${filterMessageRequests ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Read receipts</h4>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Send read receipts
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Let others know when you've read their messages
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="read-receipt-toggle" 
                      id="read-receipt-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      checked={sendReadReceipts}
                      onChange={handleToggleReadReceipts}
                    />
                    <label 
                      htmlFor="read-receipt-toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${sendReadReceipts ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end">
              <button 
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md mr-2"
                onClick={() => setShowMessageSettingsModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => {
                  // Here you would typically send the updated settings to an API
                  alert("Message preferences updated successfully");
                  setShowMessageSettingsModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Visibility Settings Modal */}
      {showVisibilitySettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Visibility</h3>
              <button 
                onClick={() => setShowVisibilitySettingsModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Who can see your profile?</h4>
                <div className="space-y-4">
                  {visibilitySettings.map((setting) => (
                    <div key={setting.id} className="p-3 border border-gray-200 dark:border-dark-border rounded-lg">
                      <div className="flex items-center">
                        <input
                          id={`modal-visibility-${setting.id}`}
                          name="modal-visibility-setting"
                          type="radio"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-dark-bg"
                          checked={selectedVisibilitySetting === setting.id}
                          onChange={() => handleVisibilitySettingChange(setting.id)}
                        />
                        <label htmlFor={`modal-visibility-${setting.id}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                          {setting.name}
                        </label>
                      </div>
                      <p className="mt-1 ml-7 text-xs text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search visibility</h4>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Show profile in search results
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Allow your profile to appear in search results
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="search-visibility-toggle" 
                      id="search-visibility-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      checked={profileVisibleInSearch}
                      onChange={handleToggleProfileVisibility}
                    />
                    <label 
                      htmlFor="search-visibility-toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${profileVisibleInSearch ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile discovery</h4>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Allow email address lookup
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Let people find you using your email address
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="email-lookup-toggle" 
                      id="email-lookup-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      checked={allowEmailLookup}
                      onChange={handleToggleEmailLookup}
                    />
                    <label 
                      htmlFor="email-lookup-toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${allowEmailLookup ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Allow phone number lookup
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Let people find you using your phone number
                    </p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="phone-lookup-toggle" 
                      id="phone-lookup-toggle"
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      checked={allowPhoneLookup}
                      onChange={handleTogglePhoneLookup}
                    />
                    <label 
                      htmlFor="phone-lookup-toggle" 
                      className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${allowPhoneLookup ? 'bg-blue-500' : ''}`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end">
              <button 
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md mr-2"
                onClick={() => setShowVisibilitySettingsModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => {
                  // Here you would typically send the updated settings to an API
                  alert("Visibility settings updated successfully");
                  setShowVisibilitySettingsModal(false);
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

export default CommunicationsPage;