import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../redux/hooks';
import { useSession } from '../contexts/SessionContext';
import ProfileImage from './ProfileImage';

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { currentUser } = useUser();
  const { session } = useSession();
  
  const menuItems = [
    { label: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Profile', path: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { 
      label: 'Connections', 
      path: '/connections', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      hasDropdown: true,
      dropdownItems: [
        { label: 'View All', path: '/connections' },
        { label: 'Pending Requests (3)', path: '/connections/pending', badge: '3' },
        { label: 'Find Connections', path: '/connections/find' },
        { label: 'Manage Connections', path: '/connections/manage' },
      ]
    },
    { label: 'Create Page', path: '/create-page', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  ];

  const settingsItems = [
    { label: 'Account Settings', path: '/account-settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { label: 'Notifications', path: '/notification', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { label: 'Privacy & Safety', path: '/privacy-and-safety', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { label: 'Messaging', path: '/messaging', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { label: 'Communications', path: '/communications', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];
  
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <aside className="hidden lg:block w-64 h-screen sticky top-16">
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-4 mb-4 dark:border dark:border-dark-border transition-colors">
        <div className="mb-4">
          {session.email ? (
            <h3 className="font-bold dark:text-white">{session.email}</h3>
          ) : (
            <>
              <h3 className="font-bold dark:text-white">{currentUser?.name || "Guest User"}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{currentUser?.username || "guest"}</p>
            </>
          )}
        </div>
        
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-bold dark:text-white">{currentUser?.following || 0}</p>
            <p className="text-gray-500 dark:text-gray-400">Following</p>
          </div>
          <div>
            <p className="font-bold dark:text-white">{currentUser?.followers || 0}</p>
            <p className="text-gray-500 dark:text-gray-400">Followers</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-4 mb-4 dark:border dark:border-dark-border transition-colors">
        <h3 className="font-bold mb-3 dark:text-white">Menu</h3>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              {item.hasDropdown ? (
                <div>
                  <button 
                    onClick={() => toggleDropdown(item.label)}
                    className={`w-full flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg dark:text-gray-300 transition-colors ${activeDropdown === item.label ? 'bg-gray-100 dark:bg-dark-bg' : ''}`}
                  >
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">3</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform ${activeDropdown === item.label ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {activeDropdown === item.label && (
                    <div className="pl-9 mt-1 space-y-1 bg-gray-50 dark:bg-dark-bg rounded-md py-2">
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <Link 
                          key={dropdownIndex}
                          to={dropdownItem.path} 
                          className="flex items-center justify-between py-1.5 px-3 text-sm rounded hover:bg-gray-100 dark:hover:bg-dark-secondary dark:text-gray-300 transition-colors"
                        >
                          <span>{dropdownItem.label}</span>
                          {dropdownItem.badge && (
                            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {dropdownItem.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to={item.path} 
                  className="flex items-center space-x-2 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg dark:text-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-4 mb-4 dark:border dark:border-dark-border transition-colors">
        <h3 className="font-bold mb-3 dark:text-white">Settings</h3>
        <nav className="space-y-1">
          {settingsItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className="flex items-center space-x-2 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg dark:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Trending Topics section removed */}
    </aside>
  );
};

export default Sidebar;