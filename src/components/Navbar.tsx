import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-brand-primary/95 backdrop-blur-xl shadow-xl shadow-brand-dark/10"
        : "bg-brand-primary"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Calculator className="h-5 w-5 text-brand-dark" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Finova<span className="text-brand-accent">Calc</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive(link.path)
                    ? "text-brand-accent bg-white/10"
                    : "text-gray-200 hover:text-white hover:bg-white/5"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-accent rounded-full" />
                )}
              </Link>
            ))}
            {/* <Link
              to="/upload-blog"
              className="ml-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-accent px-4 py-2 text-sm font-bold text-brand-dark hover:bg-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-brand-accent/20"
            >
              Admin
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <span className="sr-only">Menu</span>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pb-4 pt-2 space-y-1 bg-brand-dark/50 backdrop-blur-xl border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                isActive(link.path)
                  ? "text-brand-accent bg-white/10"
                  : "text-gray-200 hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/upload-blog"
            className="block rounded-xl px-4 py-3 text-base font-medium text-brand-accent hover:bg-white/10 transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
