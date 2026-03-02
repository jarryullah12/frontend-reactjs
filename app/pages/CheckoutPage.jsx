import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../components/Breadcrumb';

const CheckoutPage = () => {
  const [couponVisible, setCouponVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Pakistan',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    notes: '',
    paymentMethod: 'credit'
  });
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderError, setOrderError] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart items from redux store
  const { items: cartItems } = useSelector(state => state.cart);
  
  // Add sample cart items if cart is empty (for testing purposes)
  const effectiveCartItems = cartItems.length > 0 ? cartItems : [
    { id: 1, name: 'Classic White T-Shirt', price: 24.99, quantity: 2 },
    { id: 2, name: 'Slim Fit Jeans', price: 49.99, quantity: 1 },
    { id: 3, name: 'Leather Belt', price: 19.99, quantity: 1 }
  ];
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Checkout' }
  ];
  
  // Calculate totals
  const subtotal = effectiveCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const total = subtotal + shipping;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handlePaymentSuccess = (details) => {
    setPaymentComplete(true);
    setOrderProcessing(false);
    
    // In a real app, you would:
    // 1. Send the order to your backend
    // 2. Clear the cart
    // 3. Redirect to a success page
    
    // For now, we'll simulate this with a timeout
    setTimeout(() => {
      // dispatch(clearCart());
      navigate('/order-success');
    }, 2000);
  };
  
  const handlePaymentError = (error) => {
    setOrderError(error.message || 'Payment failed. Please try again.');
    setOrderProcessing(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation would go here
    setOrderProcessing(true);
    
    // Generate a random order number
    const orderNumber = `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const orderDate = new Date().toLocaleDateString();
    
    // Simulate successful payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setOrderProcessing(false);
      
      // Save order details to localStorage
      const orderDetails = {
        orderNumber,
        orderDate,
        email: formData.email || 'customer@example.com',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        address: formData.address1 || '',
        city: formData.city || '',
        state: formData.state || '',
        country: formData.country || '',
        postcode: formData.postcode || '',
        phone: formData.phone || '',
        items: effectiveCartItems,
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2)
      };
      
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        // In a real app, you would clear the cart here
        // dispatch(clearCart());
        navigate('/order-success');
      }, 1500);
    }, 1000);
  };
  
  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />
        

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Billing details */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 bg-white"
                >
                  <option value="Pakistan">Pakistan</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 mb-2"
                  placeholder="House number and street name"
                  required
                />
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  State / County <span className="text-red-500">*</span>
                </label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 bg-white"
                >
                  <option value="">Select an option...</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">Khyber Pakhtunkhwa</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Postcode / ZIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2"
                  required
                />
              </div>
            </form>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Additional information</h3>
              <div className="mb-4">
                <label className="block mb-1 text-sm">
                  Order notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 h-24"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Your order</h2>
            <div className="border border-gray-200">
              <div className="flex justify-between p-4 border-b border-gray-200 font-medium">
                <div>Product</div>
                <div>Subtotal</div>
              </div>
              
              {/* Cart items */}
              {effectiveCartItems.map(item => (
                <div key={item.id} className="flex justify-between p-4 border-b border-gray-200">
                  <div>{item.name} × {item.quantity}</div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              
              {/* Subtotal */}
              <div className="flex justify-between p-4 border-b border-gray-200">
                <div>Subtotal</div>
                <div>${subtotal.toFixed(2)}</div>
              </div>
              
              {/* Total */}
              <div className="flex justify-between p-4 font-medium">
                <div>Total</div>
                <div className="text-lg">${total.toFixed(2)}</div>
              </div>
            </div>
            
            {orderError && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {orderError}
              </div>
            )}
            
            {paymentComplete ? (
              <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Payment successful! Redirecting to order confirmation...
              </div>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={orderProcessing}
                className={`mt-6 w-full py-3 px-4 transition-colors ${
                  orderProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {orderProcessing ? 'Processing...' : 'Complete Order'}
              </button>
            )}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Almaira Shop developed by ThemeHunk</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 