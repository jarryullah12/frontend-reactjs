import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import { useDoctors } from '../../hooks/useRedux';

const AdminDoctorDetail = ({ id, navigateTo }) => {
  const { doctors, loading, error, fetchDoctors } = useDoctors();
  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);

  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoadingDoctor(true);
        await fetchDoctors();
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    
    loadDoctor();
  }, [fetchDoctors]);

  // Find the specific doctor once doctors are loaded
  useEffect(() => {
    if (!loading && doctors.length > 0) {
      // Convert id to number if it's a string
      const doctorId = typeof id === 'string' ? parseInt(id, 10) : id;
      
      // Find the doctor with the matching id
      const foundDoctor = doctors.find(doc => doc.id === doctorId);
      
      if (foundDoctor) {
        console.log('Found doctor:', foundDoctor);
        setDoctor(foundDoctor);
      } else {
        console.error(`Doctor with id ${doctorId} not found`);
      }
      
      setLoadingDoctor(false);
    }
  }, [doctors, id, loading]);

  if (loadingDoctor) {
    return (
      <AdminLayout navigateTo={navigateTo} currentPage="admin-doctors">
        <div className="p-6 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout navigateTo={navigateTo} currentPage="admin-doctors">
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Error!</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => navigateTo('admin-doctors')} 
            className="text-primary hover:underline"
          >
            &larr; Back to Doctors
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!doctor) {
    return (
      <AdminLayout navigateTo={navigateTo} currentPage="admin-doctors">
        <div className="p-6">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Doctor Not Found</p>
            <p>The doctor with ID {id} could not be found.</p>
          </div>
          <button 
            onClick={() => navigateTo('admin-doctors')} 
            className="text-primary hover:underline"
          >
            &larr; Back to Doctors
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-doctors">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigateTo('admin-doctors')} 
            className="text-primary hover:underline mr-2"
          >
            &larr; Back to Doctors
          </button>
          <h1 className="text-2xl font-bold">Doctor Details</h1>
        </div>
        
        {/* Doctor Profile */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                  <ImageWithFallback 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="h-full w-full object-cover"
                    fallbackSrc="/images/doctors/default-doctor.jpg"
                  />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{doctor.name}</h2>
                    <p className="text-gray-600">{doctor.specialtyName || doctor.specialty}</p>
                  </div>
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                    doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {doctor.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Email</h3>
                    <p>{doctor.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Phone</h3>
                    <p>{doctor.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Address</h3>
                    <p>{doctor.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Working Hours</h3>
                    <p>{doctor.workingHours}</p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4">
                  <button 
                    onClick={() => navigateTo('admin-doctor-edit', doctor.id)} 
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Edit Doctor
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this doctor?')) {
                        // In a real app, you would make an API call to delete the doctor
                        alert('Doctor deleted successfully!');
                        navigateTo('admin-doctors');
                      }
                    }} 
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold">Doctor Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-600">{doctor.about || 'No information available'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Education & Experience</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500">Education:</span>
                    <span className="ml-2">{doctor.education || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Experience:</span>
                    <span className="ml-2">{doctor.experience || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Working Days:</span>
                    <span className="ml-2">{doctor.workingDays || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Appointments (if available) */}
        {doctor.appointments && doctor.appointments.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold">Recent Appointments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {doctor.appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.patient}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => navigateTo('admin-appointment-detail', appointment.id)} 
                          className="text-primary hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDoctorDetail;
