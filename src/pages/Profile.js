import React from 'react';
import { useSelector } from '../redux/mockRedux';
import ImageWithFallback from '../components/common/ImageWithFallback';

const Profile = ({ navigateTo }) => {
  // Get user from Redux store
  const { user } = useSelector(state => state.auth || { user: null });
  
  // If no user is logged in, show login prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-4">Please log in to view your profile</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to access your profile information and appointment history.</p>
            <button 
              onClick={() => navigateTo('login')} 
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">My Profile</h1>
          <button 
            onClick={() => navigateTo('appointments')} 
            className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            My Appointments
          </button>
        </div>
        
        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Profile Image */}
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mr-8 mb-4 md:mb-0 flex-shrink-0">
                <ImageWithFallback 
                  src="/images/default-avatar.png" 
                  alt="Profile" 
                  className="w-24 h-24 text-gray-400 rounded-full object-cover"
                />
              </div>
              
              {/* Profile Information */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-medium mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
              
                {/* Action Buttons */}
                <div className="mt-6 flex justify-center md:justify-start">
                  <button 
                    onClick={() => navigateTo('profile-edit')} 
                    className="inline-flex items-center bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-lg font-medium">Contact Information</h2>
              <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Personal</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium text-primary">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Need to update your contact information?</p>
              <button 
                onClick={() => navigateTo('profile-edit')} 
                className="text-primary text-sm hover:underline mt-1 inline-flex items-center"
              >
                Edit Contact Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
