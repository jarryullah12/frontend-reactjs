import React from 'react';
import { FiPhone } from 'react-icons/fi';

const TopBar = () => {
  return (
    <div className="bg-primary text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <FiPhone className="mr-2" />
              <span>OUR CUSTOMER CARE - +92 33506471303</span>
            </div>
          </div>
          <div className="flex items-center">
            <a href="/contact" className="text-sm hover:text-gray-200 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 