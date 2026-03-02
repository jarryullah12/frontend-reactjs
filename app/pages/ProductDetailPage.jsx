import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiShare2 } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  // This would normally come from an API or context
  const product = {
    id: parseInt(id),
    name: 'T-Shirt with Logo',
    price: 18.00,
    oldPrice: 22.00,
    image: '/products/tshirt.png',
    gallery: [
      '/products/tshirt.png',
      '/products/tshirt-alt.png',
      '/products/tshirt-back.png',
    ],
    description: 'This is a simple t-shirt with our logo on it. Perfect for casual wear and made with 100% cotton for comfort.',
    category: 'clothing',
    tags: ['clothing', 't-shirt', 'casual'],
    sku: 'TSH-001',
    badge: 'sale'
  };
  
  // Related products (would normally be fetched based on the current product)
  const relatedProducts = [
    {
      id: 1,
      name: 'Beanie with Logo',
      price: 18.00,
      image: '/products/beanie.png',
      category: 'accessories',
    },
    {
      id: 2,
      name: 'Hoodie with Pocket',
      price: 35.00,
      image: '/products/hoodie.png',
      category: 'clothing',
    },
    {
      id: 3,
      name: 'Cap',
      price: 16.00,
      image: '/products/cap.png',
      category: 'accessories',
      badge: 'sale'
    },
    {
      id: 4,
      name: 'Belt',
      price: 55.00,
      image: '/products/belt.png',
      category: 'accessories',
    }
  ];
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div className="py-12">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>
        
        {/* Product Detail */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src={product.image} alt={product.name} className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((img, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                  <img src={img} alt={`${product.name} - view ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              {product.oldPrice && (
                <span className="text-gray-400 line-through mr-3 text-lg">£{product.oldPrice.toFixed(2)}</span>
              )}
              <span className="text-primary font-bold text-2xl">£{product.price.toFixed(2)}</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Add to cart */}
            <div className="flex items-center mb-6">
              <div className="border border-gray-300 rounded-md flex items-center mr-4">
                <button 
                  className="px-3 py-2 text-gray-500 hover:text-primary"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-3 py-2">{quantity}</span>
                <button 
                  className="px-3 py-2 text-gray-500 hover:text-primary"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button className="btn btn-primary flex items-center">
                <FiShoppingBag className="mr-2" />
                ADD TO CART
              </button>
            </div>
            
            {/* Wishlist & Share */}
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center text-gray-500 hover:text-primary">
                <FiHeart className="mr-2" />
                Add to wishlist
              </button>
              <button className="flex items-center text-gray-500 hover:text-primary">
                <FiShare2 className="mr-2" />
                Share
              </button>
            </div>
            
            {/* Meta Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-2">
                <span className="font-medium">SKU:</span> {product.sku}
              </div>
              <div className="mb-2">
                <span className="font-medium">Category:</span>{' '}
                <Link to={`/category/${product.category}`} className="text-primary hover:underline">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </div>
              <div>
                <span className="font-medium">Tags:</span>{' '}
                {product.tags.map((tag, index) => (
                  <span key={tag}>
                    <Link to={`/tag/${tag}`} className="text-primary hover:underline">
                      {tag}
                    </Link>
                    {index < product.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 