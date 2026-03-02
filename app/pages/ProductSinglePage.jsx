import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import Breadcrumb from '../components/Breadcrumb';
import useCart from '../hooks/useCart';

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector((state) => state.products);
  
  const { handleAddToCart, isInCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
    }
  }, [dispatch, id]);
  
  const handleAddProductToCart = () => {
    if (currentProduct) {
      handleAddToCart(currentProduct, quantity);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Breadcrumb items
  const breadcrumbItems = currentProduct ? [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: currentProduct.name, link: `/products/${currentProduct.id}` }
  ] : [];
  

  
  if (loading) {
    return <div className="container mx-auto px-4 py-10">Loading...</div>;
  }
  
  if (error) {
    return <div className="container mx-auto px-4 py-10">Error: {error}</div>;
  }
  
  if (!currentProduct) {
    return <div className="container mx-auto px-4 py-10">Product not found</div>;
  }
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{currentProduct.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={currentProduct.gallery ? currentProduct.gallery[selectedImage] : currentProduct.image} 
                alt={currentProduct.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {currentProduct.gallery && currentProduct.gallery.length > 0 && currentProduct.gallery.map((img, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                  <img 
                    src={img} 
                    alt={`${currentProduct.name} thumbnail ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{currentProduct.name}</h1>
            <p className="text-2xl font-bold text-primary mb-4">${currentProduct.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{currentProduct.description}</p>
              
              <div className="flex items-center mb-2">
                <span className="font-medium w-20">SKU:</span>
                <span className="text-gray-600">{currentProduct.sku}</span>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="font-medium w-20">Category:</span>
                <span className="text-gray-600">{currentProduct.categories?.join(', ')}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="font-medium w-20">Stock:</span>
                <span className="text-gray-600">{currentProduct.stock > 0 ? `${currentProduct.stock} In Stock` : 'Out of Stock'}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-gray-300 rounded-md mr-4">
                  <button 
                    className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className={`flex items-center justify-center px-6 py-2 rounded-md font-medium transition-colors ${
                    isInCart(currentProduct.id)
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-primary hover:bg-primary-dark text-white'
                  }`}
                  onClick={handleAddProductToCart}
                >
                  {isInCart(currentProduct.id)
                    ? 'Update Cart'
                    : 'Add to Cart'
                  }
                </button>
              </div>
              

            </div>
          </div>
        </div>
        
        {/* Product Description Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'information' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('information')}
            >
              Additional Information
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (0)
            </button>
          </div>
          
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{currentProduct.description}</p>
            </div>
          )}
          
          {/* Additional Information Tab */}
          {activeTab === 'information' && (
            <div className="prose max-w-none">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <th className="py-3 text-left text-gray-600 w-1/4">SKU</th>
                    <td className="py-3">{currentProduct.sku}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-3 text-left text-gray-600 w-1/4">Categories</th>
                    <td className="py-3">{currentProduct.categories?.join(', ')}</td>
                  </tr>
                  {currentProduct.tags && currentProduct.tags.length > 0 && (
                    <tr className="border-b">
                      <th className="py-3 text-left text-gray-600 w-1/4">Tags</th>
                      <td className="py-3">{currentProduct.tags?.join(', ')}</td>
                    </tr>
                  )}
                  <tr className="border-b">
                    <th className="py-3 text-left text-gray-600 w-1/4">Stock</th>
                    <td className="py-3">{currentProduct.stock > 0 ? `${currentProduct.stock} In Stock` : 'Out of Stock'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">There are no reviews yet.</p>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Be the first to review "{currentProduct.name}"</h3>
                <p className="mb-4 text-gray-600">Your email address will not be published. Required fields are marked *</p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating *</label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button"
                          className="text-gray-300 hover:text-yellow-400 text-2xl"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                    <textarea 
                      id="review" 
                      rows="4" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Write your review here..."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        

      </div>
    </div>
  );
};

export default ProductSinglePage; 