import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { useDispatch, useSelector } from '../redux/mockRedux';
import { fetchDoctors } from '../redux/actions/doctorActions';

const Doctors = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector(state => state.doctors || { doctors: [], loading: false, error: null });
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  
  // Fetch doctors on component mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'general', name: 'General physician' },
    { id: 'gynecologist', name: 'Gynecologist' },
    { id: 'dermatologist', name: 'Dermatologist' },
    { id: 'pediatrician', name: 'Pediatrician' },
    { id: 'neurologist', name: 'Neurologist' },
    { id: 'cardiologist', name: 'Cardiologist' },
  ];



  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse through the doctors specialist</h1>
      
      {/* Show loading state */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      )}
      
      {/* Show error state */}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}
      
      {/* Specialty Filter */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {specialties.map((specialty) => (
          <button
            key={specialty.id}
            className={`py-3 px-4 rounded-md text-center ${selectedSpecialty === specialty.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedSpecialty(specialty.id)}
          >
            {specialty.name}
          </button>
        ))}
      </div>
      
      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-blue-50 flex items-center justify-center overflow-hidden">
              <ImageWithFallback 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-green-500">Available</span>
              </div>
              <h3 className="font-medium text-lg">{doctor.name}</h3>
              <p className="text-gray-600 text-sm">{doctor.specialtyName}</p>
              <button 
                onClick={() => navigateTo('doctor-detail', doctor.id)}
                className="mt-4 block text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors w-full"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
