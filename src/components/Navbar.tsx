import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAppDispatch, useAppSelector, useTheme, usePosts, useSearch } from '../redux/hooks';
import { setSearchQuery, setSearchResults, startSearching, clearSearchResults } from '../redux/slices/searchSlice';
import SearchResults from './SearchResults';
import ProfileImageUploader from './ProfileImageUploader';
import ProfileImage from './ProfileImage';
import { useSession } from '../contexts/SessionContext';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);
  const { mode } = useTheme();
  const postsState = usePosts();
  const { query, results } = useSearch();
  const isDarkMode = mode === 'dark';
  const { session } = useSession();
  
  console.log("Navbar component - posts from Redux:", postsState);
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileImageUploader, setShowProfileImageUploader] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Call the global handleLogout function
    (window as any).handleLogout();
    // Navigate to login page
    navigate('/login');
    // Close mobile menu and dropdowns
    setShowMobileMenu(false);
    setActiveDropdown(null);
  };

  // Toggle function for dropdowns
  const toggleDropdown = (dropdown: string) => {
    // Explicitly toggle the dropdown state
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
    // Reset nested dropdown when main dropdown changes
    setActiveNestedDropdown(null);
  };

  // Toggle nested dropdown
  const toggleNestedDropdown = (e: React.MouseEvent, dropdown: string) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveNestedDropdown(activeNestedDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveNestedDropdown(null);
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    // Only add the event listener if the dropdown is open
    if (activeDropdown || showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown, showSearchResults]);

  const performSearch = (searchTerm: string) => {
    console.log('Performing search for:', searchTerm);
    
    if (!searchTerm.trim()) {
      dispatch(clearSearchResults());
      return;
    }
    
    dispatch(startSearching());
    dispatch(setSearchQuery(searchTerm));
    
    // Search in posts
    console.log('Posts available for search:', postsState.posts);
    
    const postsToSearch = postsState.posts || [];
    
    const postResults = postsToSearch
      .filter((post: any) => {
        const content = post.content ? post.content.toLowerCase() : '';
        const userName = post.userName ? post.userName.toLowerCase() : '';
        const searchTermLower = searchTerm.toLowerCase();
        
        console.log(`Checking post: "${content.substring(0, 20)}..." by ${userName}`);
        
        return content.includes(searchTermLower) || userName.includes(searchTermLower);
      })
      .map((post: any) => ({
        ...post,
        type: 'post'
      }));
    
    console.log('Search results:', postResults);
    
    // Combine results
    const allResults = [...postResults];
    
    // Set results in Redux
    dispatch(setSearchResults(allResults));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search form submitted with query:', localSearchQuery);
    performSearch(localSearchQuery);
    setShowSearchResults(true);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search input changed to:', value);
    setLocalSearchQuery(value);
    
    // Auto-search after typing
    if (value.length >= 2) {
      performSearch(value);
      setShowSearchResults(true);
    } else if (value.length === 0) {
      dispatch(clearSearchResults());
      setShowSearchResults(false);
    }
  };

  const handleSearchInputFocus = () => {
    if (localSearchQuery.length >= 2 && results.length > 0) {
      setShowSearchResults(true);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <header className={`bg-white dark:bg-dark-bg border-b dark:border-dark-border shadow-sm relative z-50 transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      {/* Main Navbar */}
      <div className="container-custom flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-blue-500 text-white p-2 rounded-full mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg">
              <span className="text-blue-600 dark:text-blue-400">Social</span><span className="text-blue-500 dark:text-blue-300">Spark</span>
            </span>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="hidden sm:block flex-1 max-w-xs mx-4" ref={searchRef}>
          <form onSubmit={handleSearch} className="flex h-8 relative -mt-1">
            <input
              type="text"
              placeholder="Search..."
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              className="w-full h-full px-4 bg-gray-100 dark:bg-dark-secondary border border-gray-200 dark:border-dark-border rounded-l-md text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-dark-secondary transition-colors"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white h-full px-3 rounded-r-md transition-colors flex items-center justify-center text-sm"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Search Results Dropdown */}
            {showSearchResults && <SearchResults onClose={closeSearchResults} />}
          </form>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="text-gray-600 dark:text-gray-300 p-2 rounded-md lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation - Desktop */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* User Profile Image and Authentication Buttons */}
          {session.isAuthenticated ? (
            <div className="flex items-center ml-2 space-x-3">
              {/* Profile Button */}
              <Link to="/profile" className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded-md text-sm font-medium transition-colors">
                Profile
              </Link>
              
              {/* Settings Button */}
              <Link to="/account-settings" className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded-md text-sm font-medium transition-colors">
                Settings
              </Link>
            </div>
          ) : (
            <div className="flex items-center ml-4 space-x-3">
              <Link to="/login" className="px-4 py-2 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-md text-sm font-medium transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors">
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Theme Toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
          
          {/* Notifications */}
          <div className="relative ml-4">
            <Link 
              to="/notifications-page"
              className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-secondary relative inline-block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>

            </Link>
          </div>
          
          {/* Messages */}
          <div className="relative ml-4">
            <Link 
              to="/messages"
              className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-secondary relative inline-block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>

            </Link>
          </div>
          
          {/* User Profile Image - Moved to the end */}
          {session.isAuthenticated && (
            <div className="relative ml-4">
              <div 
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                onClick={() => setShowProfileImageUploader(true)}
              >
                <ProfileImage 
                  src={currentUser?.avatar} 
                  alt="Your profile" 
                  size={32}
                  className="w-full h-full object-cover"
                />
              </div>
              {session.email && (
                <div className="absolute top-10 right-0 bg-white dark:bg-dark-secondary shadow-md rounded-md px-3 py-2 text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {session.email}
                </div>
              )}
            </div>
          )}
          
          {/* Logout Button */}
          {session.isAuthenticated && (
            <div className="ml-4">
              <button 
                onClick={handleLogout}
                className="px-3 py-1 text-red-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white dark:bg-dark-bg border-t dark:border-dark-border">
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="flex h-10 mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={localSearchQuery}
                onChange={handleSearchInputChange}
                className="w-full h-full px-4 bg-gray-100 dark:bg-dark-secondary border border-gray-200 dark:border-dark-border rounded-l-md text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-dark-secondary transition-colors"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white h-full px-3 rounded-r-md transition-colors flex items-center justify-center"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
            
            <div className="space-y-2">
              {session.isAuthenticated ? (
                <>
                  <div className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300">
                    <Link to="/profile" className="block hover:bg-gray-100 dark:hover:bg-dark-secondary py-1 px-1 rounded">
                      {session.email ? session.email : "Profile"}
                    </Link>
                  </div>
                  <Link to="/messages" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary">
                    Messages
                  </Link>
                  
                  {/* Notifications in Mobile Menu */}
                  <Link to="/notifications-page" className="flex items-center justify-between py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notifications

                    </div>
                  </Link>
                  
                  <Link to="/settings" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary">
                    Settings
                  </Link>
                  <div className="py-2 px-3 flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                    <ThemeToggle />
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary">
                    Login
                  </Link>
                  <Link to="/signup" className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary">
                    Sign Up
                  </Link>
                  <div className="py-2 px-3 flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                    <ThemeToggle />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Image Uploader Modal */}
      {showProfileImageUploader && (
        <ProfileImageUploader 
          currentImage={currentUser?.avatar || "https://randomuser.me/api/portraits/men/72.jpg"}
          onClose={() => setShowProfileImageUploader(false)}
        />
      )}
    </header>
  );
};

export default Navbar;