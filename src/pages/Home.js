import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { useDoctors } from '../hooks/useRedux';

// Specialty icons
const specialtyIcons = {
  general: '👨‍⚕️',
  gynecologist: '👩‍⚕️',
  dermatologist: '🧬',
  pediatrician: '👶',
  neurologist: '🧠',
  cardiologist: '❤️',
};

const Home = ({ navigateTo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { doctors, loading, error, fetchDoctors } = useDoctors();
  const [topDoctors, setTopDoctors] = useState([]);

  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        console.log('Fetching doctors data from localStorage...');
        await fetchDoctors();
      } catch (err) {
        console.error('Error loading doctors:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDoctors();
  }, [fetchDoctors]);

  // Get top doctors when doctors data changes
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      // Get top 8 doctors (or all if less than 8)
      const top = doctors.slice(0, 8);
      console.log('Top doctors from localStorage:', top);
      setTopDoctors(top);
    }
  }, [doctors]);

  const specialties = [
    { id: 'general', name: 'General physician', icon: specialtyIcons.general },
    { id: 'gynecologist', name: 'Gynecologist', icon: specialtyIcons.gynecologist },
    { id: 'dermatologist', name: 'Dermatologist', icon: specialtyIcons.dermatologist },
    { id: 'pediatrician', name: 'Pediatrician', icon: specialtyIcons.pediatrician },
    { id: 'neurologist', name: 'Neurologist', icon: specialtyIcons.neurologist },
    { id: 'cardiologist', name: 'Cardiologist', icon: specialtyIcons.cardiologist },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Book Appointment<br />With Trusted<br />Doctors
              </h1>
              <p className="text-white opacity-90 mb-6">
                Easily access through our platform and book at all times with our trusted doctors.
              </p>
              <button 
                onClick={() => navigateTo('doctors')} 
                className="bg-white text-primary font-medium py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition-colors"
              >
                Book Appointment
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-primary rounded-lg z-0"></div>
              <div className="relative z-10 flex justify-center">
                <ImageWithFallback 
                  src="/images/doctors/doctor-transparent1.png" 
                  alt="Trusted Doctors" 
                  className="h-96 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Find by Specialty</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {specialties.map((specialty) => (
              <button 
                key={specialty.id}
                onClick={() => navigateTo('doctors', specialty.id)}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl mb-2">{specialty.icon}</span>
                <span className="text-sm text-center">{specialty.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Top Doctors to Book</h2>
          <p className="text-gray-600 mb-8">Choose from our top rated doctors in your area</p>
          
          {loading || isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="ml-2 text-gray-600">Loading doctors...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <p className="font-bold">Error!</p>
              <p>{error}</p>
            </div>
          ) : topDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No doctors available at the moment.</p>
              <button 
                onClick={() => navigateTo('doctors')} 
                className="mt-4 bg-primary text-white font-medium py-2 px-4 rounded-md inline-block hover:bg-primary-dark transition-colors"
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => navigateTo('doctor-detail', doctor.id)}
                >
                  <ImageWithFallback 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm text-green-500">Available</span>
                    </div>
                    <h3 className="font-medium text-lg">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button 
              onClick={() => navigateTo('doctors')} 
              className="inline-block text-primary font-medium hover:underline"
            >
              View All
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Book Appointment<br />With 100+ Trusted<br />Doctors
              </h2>
              <button 
                onClick={() => navigateTo('doctors')} 
                className="bg-white text-primary font-medium py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition-colors"
              >
                Book Now
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-primary rounded-lg z-0"></div>
              <div className="relative z-10 flex justify-center">
                <ImageWithFallback 
                  src="/images/doctors/doctor-transparent2.png" 
                  alt="Trusted Doctors" 
                  className="h-96 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
