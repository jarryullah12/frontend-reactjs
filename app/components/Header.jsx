import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import TopBar from './TopBar';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="relative z-40">
      <TopBar />
      
      <div 
        className={`bg-white py-4 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Logo className="text-3xl" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`font-medium hover:text-primary transition-colors ${
                  location.pathname === '/' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`font-medium hover:text-primary transition-colors ${
                  location.pathname === '/shop' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/cart" 
                className={`font-medium hover:text-primary transition-colors ${
                  location.pathname === '/cart' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Cart
              </Link>
              <Link 
                to="/checkout" 
                className={`font-medium hover:text-primary transition-colors ${
                  location.pathname === '/checkout' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Checkout
              </Link>
              <Link 
                to="/account" 
                className={`font-medium hover:text-primary transition-colors ${
                  location.pathname === '/account' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                My Account
              </Link>
            </nav>
            
            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                className="p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              
              {/* Cart */}
              <HeaderCartButton />
              
              {/* Account */}
              <Link 
                to="/account" 
                className="p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Account"
              >
                <FiUser className="w-5 h-5" />
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={toggleMenu}
                className="p-2 text-gray-700 md:hidden"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5">
          <button 
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-700"
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <Logo className="mb-8 text-2xl" />
          
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium hover:text-primary transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`font-medium hover:text-primary transition-colors ${
                location.pathname === '/shop' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Shop
            </Link>
            <Link 
              to="/cart" 
              className={`font-medium hover:text-primary transition-colors ${
                location.pathname === '/cart' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Cart
            </Link>
            <Link 
              to="/checkout" 
              className={`font-medium hover:text-primary transition-colors ${
                location.pathname === '/checkout' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Checkout
            </Link>
            <Link 
              to="/account" 
              className={`font-medium hover:text-primary transition-colors ${
                location.pathname === '/account' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              My Account
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
