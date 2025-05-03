import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  shadow = 'sm',
  border = true,
  padding = true,
}) => {
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden ${border ? 'border border-gray-100' : ''} ${shadowStyles[shadow]} ${className}`}
    >
      {(title || subtitle) && (
        <div className={`${padding ? 'p-4 sm:p-6' : ''} border-b border-gray-100 ${headerClassName}`}>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={`${padding ? 'p-4 sm:p-6' : ''} ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`${padding ? 'p-4 sm:p-6' : ''} border-t border-gray-100 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
