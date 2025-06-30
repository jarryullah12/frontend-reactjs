import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  // Stats data
  const stats = [
    { id: 1, value: '24', label: 'AWARD WINS' },
    { id: 2, value: '860', label: 'SEATS IN HOUSE' },
    { id: 3, value: '31', label: 'VIP LOUNGES' },
    { id: 4, value: '920', label: 'HOURS LIVE' }
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <div className="flex items-center justify-center text-sm text-gray-300">
              <Link to="/" className="hover:text-orange-500">Home</Link>
              <span className="mx-2">›</span>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dotted Line Separator */}
      <div className="border-b border-dotted border-gray-600"></div>

      {/* Proving the Best Film Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="max-w-2xl text-center">
              <div className="text-sm text-orange-500 mb-2 text-center">Get To Know</div>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Proving the Best Film Services</h2>
              
              <p className="text-gray-300 mb-6 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
              
              {/* Years of Innovation */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 text-center">7 Years of Innovation</h3>
                <p className="text-gray-300 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                </p>
              </div>
              
              {/* Discover More button removed */}
            </div>
          </div>
        </div>
      </section>



      {/* Stats Section */}
      <section className="py-10 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.id} className="text-center">
                <div className="flex justify-center mb-2">
                  {stat.id === 1 && (
                    <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
                    </svg>
                  )}
                  {stat.id === 2 && (
                    <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                    </svg>
                  )}
                  {stat.id === 3 && (
                    <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  )}
                  {stat.id === 4 && (
                    <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-8 flex justify-center">
        <div className="w-16 border-t-2 border-orange-500"></div>
      </div>






    </div>
  );
};

export default AboutPage;
