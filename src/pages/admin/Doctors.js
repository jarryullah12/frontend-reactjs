import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import { useDoctors } from '../../hooks/useRedux';

const AdminDoctors = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Use our custom hook for doctors
  const { doctors, loading, error, fetchDoctors, deleteDoctor } = useDoctors();
  
  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        await fetchDoctors();
      } catch (err) {
        console.error('Error loading doctors:', err);
      }
    };
    
    loadDoctors();
  }, [fetchDoctors]);
  
  // Handle doctor deletion
  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        setIsDeleting(true);
        await deleteDoctor(id);
        alert('Doctor deleted successfully');
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Failed to delete doctor');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Get unique specialties from doctors data
  const getUniqueSpecialties = () => {
    const specialtiesSet = new Set(doctors.map(doctor => doctor.specialty));
    return Array.from(specialtiesSet);
  };

  // Specialties for filter
  const specialties = [
    { id: 'all', name: 'All Specialties' },
    ...getUniqueSpecialties().map(specialty => ({
      id: specialty.toLowerCase().replace(/\s+/g, '-'),
      name: specialty
    }))
  ];

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      (doctor.name && doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doctor.email && doctor.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = 
      selectedSpecialty === 'all' || 
      (doctor.specialty && doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-doctors">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Doctors</h1>
          <button 
            onClick={() => navigateTo('admin-doctor-new')} 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Add New Doctor
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Error!</p>
            <p>{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search doctors by name or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-1/4">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {loading || isDeleting ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">{isDeleting ? 'Deleting doctor...' : 'Loading doctors...'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3 border-2 border-white shadow">
                            <ImageWithFallback 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="h-full w-full object-cover"
                              fallbackSrc="/images/doctors/default-doctor.jpg"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{doctor.name || 'Unknown'}</div>
                            <div className="text-gray-500 text-sm">{doctor.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{doctor.specialty || 'Not specified'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{doctor.phone || 'Not specified'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button onClick={() => navigateTo('admin-doctor-detail', doctor.id)} className="text-primary hover:underline mr-3">View</button>
                        <button onClick={() => navigateTo('admin-doctor-edit', doctor.id)} className="text-blue-500 hover:underline mr-3">Edit</button>
                        <button onClick={() => handleDeleteDoctor(doctor.id)} className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No doctors found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          )}
        </div>
        
        {/* Doctor Count */}
        <div className="mt-4 text-sm text-gray-600">
          Total doctors: {doctors.length} | Filtered: {filteredDoctors.length}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;
