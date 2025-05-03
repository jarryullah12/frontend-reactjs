import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import { useDoctors } from '../../hooks/useRedux';

const AdminDoctorEdit = ({ id, navigateTo }) => {
  const { doctors, loading, error, fetchDoctors, updateDoctor } = useDoctors();
  const [doctor, setDoctor] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Specialties for dropdown
  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Cardiologist',
  ];

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
      const doctorId = parseInt(id, 10);
      
      // Find the doctor with the matching id
      const foundDoctor = doctors.find(doc => doc.id === doctorId);
      
      if (foundDoctor) {
        console.log('Found doctor for editing:', foundDoctor);
        setDoctor(foundDoctor);
      } else {
        console.error(`Doctor with id ${doctorId} not found`);
      }
      
      setLoadingDoctor(false);
    }
  }, [doctors, id, loading]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!doctor.name) newErrors.name = 'Name is required';
    if (!doctor.email) newErrors.email = 'Email is required';
    if (!doctor.phone) newErrors.phone = 'Phone is required';
    if (!doctor.specialty) newErrors.specialty = 'Specialty is required';
    if (!doctor.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        
        // Make sure id is a number
        const updatedDoctor = {
          ...doctor,
          id: parseInt(doctor.id, 10)
        };
        
        // Update doctor using Redux action
        await updateDoctor(updatedDoctor);
        
        setSuccessMessage('Doctor information updated successfully!');
        setTimeout(() => {
          navigateTo('admin-doctor-detail', doctor.id);
        }, 1500);
      } catch (error) {
        console.error('Error updating doctor:', error);
        alert('Failed to update doctor: ' + (error.message || 'Unknown error'));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
            onClick={() => navigateTo('admin-doctor-detail', doctor.id)} 
            className="text-primary hover:underline mr-2"
          >
            &larr; Back to Doctor Details
          </button>
          <h1 className="text-2xl font-bold">Edit Doctor</h1>
        </div>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{successMessage}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                  <ImageWithFallback 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="h-64 w-full object-cover"
                    fallbackSrc="/images/doctors/default-doctor.jpg"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={doctor.status || 'Active'}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={doctor.image || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/doctor-image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={doctor.name || ''}
                      onChange={handleChange}
                      placeholder="Dr. John Doe"
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty*</label>
                    <select
                      name="specialty"
                      value={doctor.specialty || ''}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.specialty ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    >
                      <option value="">Select Specialty</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                    {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={doctor.email || ''}
                      onChange={handleChange}
                      placeholder="doctor@example.com"
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
                    <input
                      type="text"
                      name="phone"
                      value={doctor.phone || ''}
                      onChange={handleChange}
                      placeholder="+44 123 456 7890"
                      className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={doctor.address || ''}
                      onChange={handleChange}
                      placeholder="123 Medical Street, London"
                      className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      name="education"
                      value={doctor.education || ''}
                      onChange={handleChange}
                      placeholder="MD from Imperial College London"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={doctor.experience || ''}
                      onChange={handleChange}
                      placeholder="5+ years"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                    <input
                      type="text"
                      name="workingHours"
                      value={doctor.workingHours || ''}
                      onChange={handleChange}
                      placeholder="9:00 AM - 5:00 PM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                    <input
                      type="text"
                      name="workingDays"
                      value={doctor.workingDays || ''}
                      onChange={handleChange}
                      placeholder="Monday - Friday"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                  <textarea
                    name="about"
                    value={doctor.about || ''}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Brief description about the doctor's experience and specialization..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">* Required fields</p>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
            <button 
              type="button"
              onClick={() => navigateTo('admin-doctor-detail', doctor.id)} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctorEdit;
