import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { FiCheckCircle } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const OrderSuccessPage = () => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Clear cart on successful order and get order details
  useEffect(() => {
    // Get order details from localStorage first to ensure we have them
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        console.log('Order details loaded:', parsedOrder); // Debug log
        setOrderDetails(parsedOrder);
      } catch (error) {
        console.error('Error parsing order details:', error);
      }
    } else {
      console.log('No order details found in localStorage');
    }
    
    // Clear cart after we've retrieved the order details
    dispatch(clearCart());
  }, [dispatch]);
  
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Checkout', link: '/checkout' },
    { label: 'Order Success' }
  ];
  
  // Fallback values if no order details are found
  const fallbackOrderNumber = `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const fallbackDate = new Date().toLocaleDateString();
  
  return (
    <div className="py-8">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <div className="text-green-500 flex justify-center mb-4">
            <FiCheckCircle size={64} />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
          
          <p className="text-lg mb-6">
            Your order {orderDetails?.orderNumber || fallbackOrderNumber} has been placed successfully.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="flex justify-between border-b border-gray-200 py-3">
              <span className="font-medium">Order Number:</span>
              <span>{orderDetails?.orderNumber || fallbackOrderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-3">
              <span className="font-medium">Date:</span>
              <span>{orderDetails?.orderDate || fallbackDate}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-3">
              <span className="font-medium">Email:</span>
              <span>{orderDetails?.email || 'customer@example.com'}</span>
            </div>
            
            {orderDetails?.phone && (
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Phone:</span>
                <span>{orderDetails.phone}</span>
              </div>
            )}
            
            {(orderDetails?.firstName || orderDetails?.lastName) && (
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Customer:</span>
                <span>{`${orderDetails?.firstName || ''} ${orderDetails?.lastName || ''}`}</span>
              </div>
            )}
            
            {orderDetails?.address && (
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Shipping Address:</span>
                <span className="text-right">
                  {orderDetails.address}<br />
                  {orderDetails.city}, {orderDetails.state} {orderDetails.postcode}<br />
                  {orderDetails.country}
                </span>
              </div>
            )}
            
            <div className="border-b border-gray-200 py-3">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Items:</span>
                <span></span>
              </div>
              {orderDetails?.items && orderDetails.items.length > 0 ? (
                <div className="text-left">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500">Loading order items...</div>
              )}
            </div>
            
            {orderDetails?.subtotal && (
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Subtotal:</span>
                <span>${orderDetails.subtotal}</span>
              </div>
            )}
            
            {orderDetails?.shipping && (
              <div className="flex justify-between border-b border-gray-200 py-3">
                <span className="font-medium">Shipping:</span>
                <span>${orderDetails.shipping}</span>
              </div>
            )}
            
            <div className="flex justify-between py-3">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${orderDetails?.total || 'XXX.XX'}</span>
            </div>
          </div>
          
          <p className="mb-8">
            We've sent you an email with all the details of your order.
            If you have any questions, please feel free to contact our customer support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/account"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md transition-colors"
            >
              View Your Account
            </Link>
            <Link
              to="/shop"
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 