import React from 'react';

const Contact = ({ navigateTo }) => {

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Get in Touch</h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Have questions about our services or need assistance? We're here to help. Reach out to us using the contact information below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="bg-primary bg-opacity-10 p-4 rounded-full mr-4">
                  <span className="text-primary text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Our Location</h3>
                  <p className="text-gray-600">Faisalabad, Pakistan</p>
                  <p className="text-gray-500 text-sm mt-1">Main Hospital Building</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="bg-primary bg-opacity-10 p-4 rounded-full mr-4">
                  <span className="text-primary text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Phone Number</h3>
                  <p className="text-gray-600">+92 335 6471303</p>
                  <p className="text-gray-500 text-sm mt-1">Available during working hours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="bg-primary bg-opacity-10 p-4 rounded-full mr-4">
                  <span className="text-primary text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Email Address</h3>
                  <p className="text-gray-600">jarryullah46@gmail.com</p>
                  <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start">
                <div className="bg-primary bg-opacity-10 p-4 rounded-full mr-4">
                  <span className="text-primary text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Working Hours</h3>
                  <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-500 text-sm mt-1">Closed on Sundays</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to action section removed as requested */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
