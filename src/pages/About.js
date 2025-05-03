import React from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';

const About = ({ navigateTo }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About Prescripto</h1>
        

        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600">
              At Prescripto, our mission is to make healthcare accessible to everyone. We believe that quality healthcare should be convenient, transparent, and personalized. Our platform connects patients with trusted healthcare professionals, making it easy to book appointments, consult with specialists, and manage your health journey.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-gray-600">
              Founded in 2020, Prescripto is a team of healthcare professionals, technologists, and customer service experts dedicated to transforming the healthcare experience. We work closely with doctors and medical facilities to ensure that our platform offers the highest quality of care.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-lg mb-2">Patient-Centered Care</h3>
                <p className="text-gray-600">
                  We put patients first in everything we do, ensuring that their needs and preferences guide our decisions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-lg mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously seek new ways to improve healthcare delivery through technology and creative solutions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-lg mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We uphold the highest standards of honesty, transparency, and ethical conduct in all our interactions.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Online appointment booking with specialists</li>
              <li>Secure patient-doctor communication</li>
              <li>Digital health records management</li>
              <li>Medication reminders and prescription management</li>
              <li>Health articles and resources</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
