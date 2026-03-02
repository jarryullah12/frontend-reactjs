import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiSettings, FiDollarSign, FiPackage, FiGrid, FiLogOut } from 'react-icons/fi';
import AdminHeader from '../components/AdminHeader';
import { updateSessionUserData, getSessionUserData } from '../utils/sessionManager';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: 'https://via.placeholder.com/50'
  });
  const [dashboardStats, setDashboardStats] = useState([
    { id: 1, title: 'Total Orders', value: '0', icon: <FiShoppingBag className="text-blue-500" size={24} /> },
    { id: 2, title: 'Total Sales', value: '$0', icon: <FiDollarSign className="text-green-500" size={24} /> },
    { id: 3, title: 'Total Products', value: '0', icon: <FiPackage className="text-purple-500" size={24} /> },
    { id: 4, title: 'Total Customers', value: '0', icon: <FiUsers className="text-orange-500" size={24} /> },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  
  // Admin profile state
  const [adminProfile, setAdminProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  
  // Function to handle marking an order as complete
  const handleCompleteOrder = (orderId) => {
    // Update the order status in the state
    const updatedOrders = recentOrders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Delivered' };
      }
      return order;
    });
    
    setRecentOrders(updatedOrders);
    
    // Update the order in localStorage
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        const orderData = JSON.parse(storedOrder);
        orderData.status = 'Delivered';
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };
  
  // Function to handle product deletion
  const handleDeleteProduct = (index) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
      
      // Update localStorage
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    }
  };
  
  // Function to handle admin profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Function to handle admin profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Log the data being saved
    console.log('Saving admin profile:', adminProfile);
    
    // Save admin profile to localStorage immediately
    localStorage.setItem('adminProfile', JSON.stringify(adminProfile));
    
    // Also update the session data
    updateSessionUserData('admin', {
      name: adminProfile.name,
      email: adminProfile.email,
      phone: adminProfile.phone
    });
    
    // Simulate API call with timeout for UI feedback
    setTimeout(() => {
      // Show success message
      setProfileUpdateSuccess(true);
      setIsSubmitting(false);
      
      // Force a refresh to update the header with the new name
      // This is a simple way to trigger a re-render of the AdminHeader component
      window.location.reload();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setProfileUpdateSuccess(false);
      }, 3000);
    }, 500);
  };

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
          console.log('Loaded products from localStorage:', parsedProducts);
        }
      } catch (error) {
        console.error('Error parsing products from localStorage:', error);
      }
    }
  }, []);
  
  // Load admin profile from localStorage or session
  useEffect(() => {
    // First try to load from localStorage
    const storedProfile = localStorage.getItem('adminProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        // Only set the fields we're currently using
        setAdminProfile({
          name: parsedProfile.name || '',
          email: parsedProfile.email || '',
          phone: parsedProfile.phone || ''
        });
        console.log('Loaded admin profile from localStorage:', parsedProfile);
        return;
      } catch (error) {
        console.error('Error parsing admin profile from localStorage:', error);
      }
    }
    
    // If no profile in localStorage, try to get from session
    const sessionUserData = getSessionUserData('admin');
    if (sessionUserData) {
      setAdminProfile({
        name: sessionUserData.name || '',
        email: sessionUserData.email || '',
        phone: sessionUserData.phone || ''
      });
      console.log('Loaded admin profile from session:', sessionUserData);
    }
  }, []);
  
  // Fetch dashboard statistics from user side
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Get all orders from localStorage
        const storedOrders = localStorage.getItem('lastOrder');
        let orderData = null;
        let orderCount = 0;
        let totalSales = 0;
        
        if (storedOrders) {
          try {
            orderData = JSON.parse(storedOrders);
            orderCount = 1; // We have at least one order
            totalSales = parseFloat(orderData.total) || 0;
          } catch (error) {
            console.error('Error parsing order data:', error);
          }
        }
        
        // Get products from cart or any other source
        const storedCart = localStorage.getItem('cart');
        let productCount = 0;
        if (storedCart) {
          try {
            const cartData = JSON.parse(storedCart);
            if (Array.isArray(cartData.items)) {
              productCount = cartData.items.length;
            }
          } catch (error) {
            console.error('Error parsing cart data:', error);
          }
        }
        
        // Get customer info from any user accounts or orders
        let customerCount = 0;
        if (orderData && orderData.email) {
          customerCount = 1; // We have at least one customer
        }
        
        // Update dashboard stats with real data
        setDashboardStats([
          { id: 1, title: 'Total Orders', value: orderCount.toString(), icon: <FiShoppingBag className="text-blue-500" size={24} /> },
          { id: 2, title: 'Total Sales', value: `$${totalSales.toFixed(2)}`, icon: <FiDollarSign className="text-green-500" size={24} /> },
          { id: 3, title: 'Total Products', value: productCount.toString(), icon: <FiPackage className="text-purple-500" size={24} /> },
          { id: 4, title: 'Total Customers', value: customerCount.toString(), icon: <FiUsers className="text-orange-500" size={24} /> },
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch recent orders from client side
  useEffect(() => {
    const fetchRecentOrders = async () => {
      setIsOrdersLoading(true);
      try {
        // Get order from localStorage
        const storedOrder = localStorage.getItem('lastOrder');
        
        if (storedOrder) {
          try {
            const orderData = JSON.parse(storedOrder);
            // Create an order object with the required format for the table
            const formattedOrder = {
              id: orderData.orderNumber || '#0000',
              customer: `${orderData.firstName || ''} ${orderData.lastName || ''}`.trim() || 'Guest Customer',
              date: orderData.orderDate || new Date().toLocaleDateString(),
              status: orderData.status || 'Processing', // Use stored status or default to Processing
              amount: `$${orderData.total || '0.00'}`,
              email: orderData.email || 'N/A',
              address: orderData.address || 'N/A',
              items: orderData.items || []
            };
            
            setRecentOrders([formattedOrder]);
          } catch (error) {
            console.error('Error parsing order data:', error);
            setRecentOrders([]);
          }
        } else {
          // No orders found
          setRecentOrders([]);
        }
        
        setIsOrdersLoading(false);
      } catch (error) {
        console.error('Error in orders operation:', error);
        setIsOrdersLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  // Menu items for tabs
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiGrid size={18} /> },
    { id: 'products', label: 'Products', icon: <FiPackage size={18} /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingBag size={18} /> },
    { id: 'customers', label: 'Customers', icon: <FiUsers size={18} /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={18} /> },
  ];

  // Function to render the appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {isLoading ? (
                // Loading skeleton for stats
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="animate-pulse flex justify-between items-center">
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="p-3 bg-gray-200 rounded-full h-12 w-12"></div>
                    </div>
                  </div>
                ))
              ) : (
                dashboardStats.map(stat => (
                  <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                {isOrdersLoading ? (
                  // Loading skeleton for orders table
                  <div className="animate-pulse">
                    <div className="h-10 bg-gray-100 w-full"></div>
                    {Array(5).fill(0).map((_, index) => (
                      <div key={index} className="h-16 bg-gray-50 w-full border-t border-gray-100 flex">
                        <div className="w-1/6 p-4"><div className="h-4 bg-gray-200 rounded"></div></div>
                        <div className="w-1/6 p-4"><div className="h-4 bg-gray-200 rounded"></div></div>
                        <div className="w-1/6 p-4"><div className="h-4 bg-gray-200 rounded"></div></div>
                        <div className="w-1/6 p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>
                        <div className="w-1/6 p-4"><div className="h-4 bg-gray-200 rounded"></div></div>
                        <div className="w-1/6 p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.length > 0 ? (
                        recentOrders.map(order => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                  order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button 
                                onClick={() => handleCompleteOrder(order.id)}
                                className={`py-1 px-3 rounded-md text-sm transition duration-300 ${order.status === 'Delivered' ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                                disabled={order.status === 'Delivered'}
                              >
                                {order.status === 'Delivered' ? 'Completed' : 'Complete'}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                            <p className="text-lg">No orders found</p>
                            <p className="text-sm mt-1">Orders will appear here when data is available</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Products Management</h2>
            
            {/* Product Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="footwear">Footwear</option>
                </select>
              </div>
              <button 
                onClick={() => setShowAddProductForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Product
              </button>
            </div>
            
            {/* Products Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                              <img src={product.image || 'https://via.placeholder.com/50'} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">SKU: PRD-{(index + 1).toString().padStart(4, '0')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${parseFloat(product.price).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${parseInt(product.stock) > 10 ? 'bg-green-100 text-green-800' : 
                              parseInt(product.stock) > 0 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {parseInt(product.stock) > 10 ? 'Active' : 
                             parseInt(product.stock) > 0 ? 'Low Stock' : 
                             'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleDeleteProduct(index)}
                            className="text-red-600 hover:text-red-900 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex justify-center">
                          <FiPackage className="text-gray-400" size={48} />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No Products Available</h3>
                        <p className="mt-1 text-sm text-gray-500">Products will be displayed here when added to the system.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Add New Product Form Modal */}
            {showAddProductForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Add New Product</h3>
                      <button 
                        onClick={() => setShowAddProductForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                          <input
                            type="text"
                            id="productName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select
                            id="productCategory"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          >
                            <option value="">Select Category</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Footwear">Footwear</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                          <input
                            type="number"
                            id="productPrice"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="productStock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                          <input
                            type="number"
                            id="productStock"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="0"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
                        <input
                          type="text"
                          id="productImage"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/image.jpg"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          id="productDescription"
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter product description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowAddProductForm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => {
                            // Validate form
                            if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
                              alert('Please fill in all required fields');
                              return;
                            }
                            
                            // Add the product to the products array
                            const updatedProducts = [...products, { ...newProduct }];
                            setProducts(updatedProducts);
                            
                            // Save to localStorage for persistence
                            localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
                            
                            alert('Product added successfully!');
                            setShowAddProductForm(false);
                            setNewProduct({
                              name: '',
                              category: '',
                              price: '',
                              stock: '',
                              description: '',
                              image: 'https://via.placeholder.com/50'
                            });
                          }}
                        >
                          Add Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
            
            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.length > 0 ? (
                    recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleCompleteOrder(order.id)}
                              className={`py-1 px-3 rounded-md text-sm transition duration-300 ${order.status === 'Delivered' ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                              disabled={order.status === 'Delivered'}
                            >
                              {order.status === 'Delivered' ? 'Completed' : 'Complete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex justify-center">
                          <FiShoppingBag className="text-gray-400" size={48} />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No Orders Available</h3>
                        <p className="mt-1 text-sm text-gray-500">Orders will be displayed here when received.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Order Statistics */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Processing</span>
                      <span className="text-sm font-medium text-gray-700">
                        {recentOrders.filter(o => o.status === 'Processing').length} / {recentOrders.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${recentOrders.length ? (recentOrders.filter(o => o.status === 'Processing').length / recentOrders.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Shipped</span>
                      <span className="text-sm font-medium text-gray-700">
                        {recentOrders.filter(o => o.status === 'Shipped').length} / {recentOrders.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${recentOrders.length ? (recentOrders.filter(o => o.status === 'Shipped').length / recentOrders.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Delivered</span>
                      <span className="text-sm font-medium text-gray-700">
                        {recentOrders.filter(o => o.status === 'Delivered').length} / {recentOrders.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${recentOrders.length ? (recentOrders.filter(o => o.status === 'Delivered').length / recentOrders.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                <div className="space-y-4 mt-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map(order => (
                      <div key={`activity-${order.id}`} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiShoppingBag className="text-blue-500" size={16} />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">New order {order.id}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No recent activity</p>
                  )}
                </div>
              </div>
              

            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Customers Management</h2>
            
            {/* Customers Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.length > 0 ? (
                    // Create unique customers from orders
                    [...new Map(recentOrders.map(order => [
                      order.email, 
                      {
                        name: order.customer,
                        email: order.email,
                        orders: 1,
                        spent: parseFloat(order.amount.replace('$', ''))
                      }
                    ])).values()].map((customer, index) => (
                      <tr key={`customer-${index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">{customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.orders}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${customer.spent.toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex justify-center">
                          <FiUsers className="text-gray-400" size={48} />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No Customers Available</h3>
                        <p className="mt-1 text-sm text-gray-500">Customer data will be displayed here when available.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Customer Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Customer Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">Total Customers</p>
                    <p className="text-2xl font-bold text-blue-900">{recentOrders.length > 0 ? 
                      [...new Set(recentOrders.map(order => order.email))].length : 0}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-green-900">
                      ${recentOrders.length > 0 ? 
                        (recentOrders.reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0) / recentOrders.length).toFixed(2) : 
                        '0.00'}
                    </p>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
            
            {/* Admin Profile Form */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              
              {profileUpdateSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                  Profile updated successfully!
                </div>
              )}
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={adminProfile.name}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={adminProfile.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={adminProfile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+923356471303"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md text-white font-medium transition duration-300 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <AdminHeader />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  activeTab === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;
