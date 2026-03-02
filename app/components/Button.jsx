import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  href,
  to,
  className = '',
  icon = null
}) => {
  // Base classes
  const baseClasses = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  // Size classes
  const sizeClasses = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  
  // Variant classes
  const variantClasses = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 border border-transparent",
    secondary: "text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500 border border-transparent",
    outline: "text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 border border-gray-300",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent",
    success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent",
    ghost: "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-blue-500"
  };
  
  // Disabled classes
  const disabledClasses = "opacity-50 cursor-not-allowed";
  
  // Full width class
  const fullWidthClass = "w-full";
  
  // Combined classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : ''}
    ${fullWidth ? fullWidthClass : ''}
    ${loading ? 'relative' : ''}
    ${className}
  `;
  
  // If to prop is provided, render a Link component from react-router-dom
  if (to) {
    return (
      <Link
        to={to}
        className={combinedClasses}
        onClick={onClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  // If href prop is provided, render an anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }
  
  // Otherwise, render a button element
  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button; 