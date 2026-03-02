import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';

const HeaderCartButton = () => {
  const { items, totalQuantity } = useSelector(state => state.cart);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  
  // Create an animation effect when items are added to cart
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    
    setBtnIsHighlighted(true);
    
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  
  return (
    <Link 
      to="/cart" 
      className={`p-2 text-gray-700 hover:text-primary transition-colors relative ${
        btnIsHighlighted ? 'animate-bump' : ''
      }`}
      aria-label="Cart"
    >
      <FiShoppingCart className="w-5 h-5" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default HeaderCartButton; 