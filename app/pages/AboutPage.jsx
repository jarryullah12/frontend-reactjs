import React from 'react';
import { FiTruck, FiCreditCard, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const AboutPage = () => {

  
  // Core values
  const coreValues = [
    {
      icon: <FiTruck className="h-8 w-8" />,
      title: 'Fast Delivery',
      description: 'We offer speedy delivery services to ensure your products reach you as quickly as possible.'
    },

    {
      icon: <FiHeadphones className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Our customer support team is always available to help you with any questions or concerns.'
    }
  ];
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Our Store</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing the best shopping experience with quality products, exceptional service, and a commitment to customer satisfaction.
          </p>
        </div>
        
        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
              alt="Our Store" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2025, our journey began with a simple vision: to create a shopping destination that offers high-quality products and an exceptional customer experience. What started as a small boutique has now grown into a trusted online retailer, serving customers around the world.
            </p>

            <p className="text-gray-600">
              Today, we continue to uphold these values as we expand our product range and reach. Our dedicated team works tirelessly to source the best products and create a seamless shopping experience for our valued customers.
            </p>
          </div>
        </div>
        
        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Our Core Values</h2>
          
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8 text-center w-full">
                <div className="text-primary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default AboutPage; 