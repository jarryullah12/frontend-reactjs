import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';

const WishlistPage = () => {
  // Sample wishlist items
  const wishlistItems = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      inStock: true
    },
    {
      id: 2,
      name: 'Leather Jacket',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8amFja2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      inStock: true
    },
    {
      id: 3,
      name: 'Leather Handbag',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      inStock: false
    }
  ];
  
  const handleRemoveFromWishlist = (id) => {
    // This would dispatch an action to remove the item from the wishlist
    console.log(`Remove item ${id} from wishlist`);
  };
  
  const handleAddToCart = (item) => {
    // This would dispatch an action to add the item to the cart
    console.log(`Add item ${item.id} to cart`);
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">My Wishlist</h1>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {wishlistItems.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                {/* Product Image */}
                <div className="md:w-40 lg:w-48 h-40 flex-shrink-0 bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Details */}
                <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-primary font-semibold mt-1">${item.price.toFixed(2)}</p>
                    <p className={`mt-2 ${item.inStock ? 'text-green-600' : 'text-red-500'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0">
                    <button
                      className="flex items-center text-gray-600 hover:text-red-500 mr-6 transition-colors"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <FiTrash2 className="mr-2" />
                      <span>Remove</span>
                    </button>
                    
                    <button
                      className={`flex items-center justify-center px-4 py-2 rounded-md ${
                        item.inStock 
                          ? 'bg-primary hover:bg-primary-dark text-white' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={() => item.inStock && handleAddToCart(item)}
                      disabled={!item.inStock}
                    >
                      <FiShoppingCart className="mr-2" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">You don't have any products in your wishlist yet.</p>
            <Link 
              to="/shop" 
              className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 