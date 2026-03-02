import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../redux/slices/wishlistSlice';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import useCart from '../hooks/useCart';

const ProductCard = ({ product, index = 0 }) => {
  const { id, name, price, image, badge, oldPrice } = product;
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlist.some(item => item.id === id);
  
  const { handleAddToCart, isInCart } = useCart();
  
  // Animation delay for staggered appearance
  const animationDelay = `${index * 100}ms`;
  
  const handleAddProductToCart = () => {
    handleAddToCart(product);
  };
  
  const handleToggleWishlist = () => {
    dispatch(toggleWishlistItem({
      id,
      name,
      price,
      image
    }));
  };
  
  return (
    <div 
      className="group bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 product-card-animate"
      style={{ 
        animationName: 'fadeInUp',
        animationDuration: '0.6s', 
        animationDelay: animationDelay, 
        animationFillMode: 'both' 
      }}
    >
      {/* Product Image */}
      <div className="relative bg-gray-100 aspect-[3/4] overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded uppercase tracking-wider animate-fadeIn">
            {badge}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isWishlisted
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-md hover:shadow-lg transform hover:scale-110`}
            aria-label="Add to wishlist"
          >
            <FiHeart className={isWishlisted ? 'fill-current' : ''} />
          </button>
          
          <button
            onClick={handleAddProductToCart}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 ${
              isInCart(id) 
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-white text-gray-700 hover:bg-primary hover:text-white'
            }`}
            aria-label="Add to cart"
          >
            <FiShoppingCart className={isInCart(id) ? 'fill-current' : ''} />
          </button>
          
          <Link
            to={`/product/${id}`}
            className="w-9 h-9 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Quick view"
          >
            <FiEye />
          </Link>
        </div>
        
        {/* Add to Cart Bar (visible on hover) */}
        <div 
          className="absolute left-0 right-0 bottom-0 bg-white p-2 flex justify-center items-center text-sm font-medium text-gray-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          onClick={handleAddProductToCart}
        >
          <button className="flex items-center justify-center w-full py-2 hover:text-primary transition-colors">
            <FiShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link 
          to={`/product/${id}`} 
          className="block transition-colors duration-300 hover:text-primary"
        >
          <h3 className="font-medium text-gray-900 mb-1 transition-transform duration-300 group-hover:translate-x-1">{name}</h3>
        </Link>
        
        <div className="flex items-center">
          <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      {/* Background highlight effect on hover */}
      <div className="absolute inset-0 bg-primary/5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10 rounded-lg"></div>
    </div>
  );
};

export default ProductCard; 