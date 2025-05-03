import React from 'react';
import Logo from '../../assets/logo.svg';

const Footer = ({ navigateTo }) => {
  return (
    <footer className="bg-white pt-10 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img src={Logo} alt="Prescripto" className="h-8" />
              <span className="ml-2 text-primary font-bold text-xl">Prescripto</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              At Prescripto, our mission is to make healthcare accessible to everyone. We believe that quality healthcare should be convenient, transparent, and personalized. Our platform connects patients with trusted healthcare professionals, making it easy to book appointments, consult with specialists, and manage your health journey.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('home')} className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="text-gray-600 hover:text-primary transition-colors">
                  About us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">GET IN TOUCH</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Faisalabad, Pakistan</li>
              <li className="text-gray-600">+92 335 6471303</li>
              <li className="text-gray-600">jarryullah46@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">Copyright 2025 - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
