import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2L38 12V32L20 42L2 32V12L20 2Z" fill="#4f39f6" />
      <path d="M20 12L30 18V28L20 34L10 28V18L20 12Z" fill="white" />
      <path d="M20 18L25 21V25L20 28L15 25V21L20 18Z" fill="#4f39f6" />
    </svg>
  );
};
