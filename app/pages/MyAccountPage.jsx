import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { FiUser, FiShoppingBag, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const MyAccountPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  
  // Fetch orders from localStorage
  useEffect(() => {
    const fetchOrders = () => {
      const lastOrder = localStorage.getItem('lastOrder');
      if (lastOrder) {
        try {
          const parsedOrder = JSON.parse(lastOrder);
          setOrders([parsedOrder]);
        } catch (error) {
          console.error('Error parsing order:', error);
        }
      }
    };
    
    fetchOrders();
  }, []);
  
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'My Account', link: '/my-account' },
  ];
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const handleAddToCart = (item) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    }));
  };
  
  // No longer needed as wishlist is removed
  
  return (
    <div className="container mx-auto px-4 py-10">
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <FiUser className="w-8 h-8 text-gray-500" />
                </div>
                <h2 className="mt-2 font-medium">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <FiUser className="mr-2" /> Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <FiShoppingBag className="mr-2" /> Orders
                  </button>
                </li>

                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <FiSettings className="mr-2" /> Account Settings
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 rounded flex items-center text-red-500 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                <p className="mb-4">
                  Hello, {user?.name}! From your account dashboard you can view your recent orders, 
                  manage your shipping and billing addresses, and edit your password and account details.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                    <FiShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">Orders</h3>
                    <p className="text-sm text-gray-500">View your order history</p>
                  </div>

                  <div className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                    <FiSettings className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">Settings</h3>
                    <p className="text-sm text-gray-500">Update your preferences</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                          <div>
                            <p className="font-medium">Order {order.orderNumber}</p>
                            <p className="text-sm text-gray-500">{order.orderDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.total}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Items</h3>
                          <div className="space-y-2">
                            {order.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                <div className="flex items-center">
                                  <div className="bg-gray-100 w-10 h-10 rounded-md flex items-center justify-center mr-3">
                                    <FiPackage />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between">
                              <p>Subtotal:</p>
                              <p>${order.subtotal}</p>
                            </div>
                            <div className="flex justify-between">
                              <p>Shipping:</p>
                              <p>${order.shipping}</p>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <p>Total:</p>
                              <p>${order.total}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h3 className="font-medium mb-2">Shipping Address</h3>
                            {order.address ? (
                              <p className="text-gray-600">
                                {order.firstName} {order.lastName}<br />
                                {order.address}<br />
                                {order.city}, {order.state} {order.postcode}<br />
                                {order.country}
                              </p>
                            ) : (
                              <p className="text-gray-500">No address provided</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            

            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email}
                      className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      type="button"
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage; 