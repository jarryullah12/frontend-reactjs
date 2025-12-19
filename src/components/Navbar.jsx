import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User as UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice';
import { selectIsAuthenticated } from '../store/authSlice';

const Navbar = () => {
    const cartCount = useSelector(selectCartCount);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-bold text-primary tracking-tighter hover:text-black transition-colors">
                            LuxeStore
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/shop" className="text-gray-600 hover:text-primary font-medium transition-colors">
                            Shop
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        {isAuthenticated ? (
                            <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors" title="My Profile">
                                <UserIcon className="w-6 h-6" />
                            </Link>
                        ) : (
                            <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">
                                Sign In
                            </Link>
                        )}

                        <Link to="/cart" className="relative group">
                            <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                                <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-primary" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 animate-slide-in-right">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link
                            to="/"
                            className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/shop"
                            className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            to="/about"
                            className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        {isAuthenticated ? (
                            <Link
                                to="/profile"
                                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Profile
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        )}
                        <Link
                            to="/cart"
                            className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="flex items-center">
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                <span className="bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
