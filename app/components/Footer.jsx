import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-white">ALMAIRA</h2>
            </Link>
            <p className="text-gray-400 mt-4">
              Elevate your style with Almaira. Discover the perfect blend of fashion and comfort.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-12 after:bg-primary">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=men" className="text-gray-400 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/shop?category=women" className="text-gray-400 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/shop?category=accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/shop?category=sale-products" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-12 after:bg-primary">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-12 after:bg-primary">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get updates about our latest collections and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none flex-1" 
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex justify-center">
            <p className="text-gray-400 text-center">
              &copy; {currentYear} Almaira. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 