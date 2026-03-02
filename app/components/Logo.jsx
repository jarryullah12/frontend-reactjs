import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`font-bold ${className}`}>
      <span className="text-primary">A</span>LMAIRA
    </Link>
  );
};

export default Logo; 