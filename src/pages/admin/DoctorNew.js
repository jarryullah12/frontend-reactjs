import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useDoctors } from '../../hooks/useRedux';

const AdminDoctorNew = ({ navigateTo }) => {
  // Use our custom hook for doctors
  const { addDoctor } = useDoctors();

  // Initial doctor data
  const initialDoctorData = {
    name: '',
    specialty: 'general',
    specialtyName: '',
    email: '',
    phone: '',
    address: '',
    image: '/images/doctors/doctor1.jpg', // Default image
    status: 'Active',
    about: '',
    education: '',
    experience: '',
    workingHours: '9:00 AM - 5:00 PM',
    workingDays: 'Monday - Friday',
    available: true
  };

  // State for form fields
  const [doctor, setDoctor] = useState(initialDoctorData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Specialties for dropdown
  const specialties = [
    { id: 'general', name: 'General physician' },
    { id: 'gynecologist', name: 'Gynecologist' },
    { id: 'dermatologist', name: 'Dermatologist' },
    { id: 'pediatrician', name: 'Pediatrician' },
    { id: 'neurologist', name: 'Neurologist' },
    { id: 'cardiologist', name: 'Cardiologist' },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If specialty is changing, also update the specialtyName
    if (name === 'specialty') {
      const selectedSpecialty = specialties.find(s => s.id === value);
      setDoctor(prev => ({
        ...prev,
        specialty: value,
        specialtyName: selectedSpecialty ? selectedSpecialty.name : ''
      }));
    } else {
      setDoctor(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
        
        // Make sure specialtyName is set
        if (!doctor.specialtyName) {
          const selectedSpecialty = specialties.find(s => s.id === doctor.specialty);
          doctor.specialtyName = selectedSpecialty ? selectedSpecialty.name : '';
        }
        
        // Add doctor using Redux action
        const result = await addDoctor(doctor);
        console.log('Doctor added successfully:', result);
        
        alert('Doctor added successfully!');
        navigateTo('admin-doctors');
      } catch (error) {
        console.error('Error adding doctor:', error);
        alert('Failed to add doctor: ' + (error.message || 'Unknown error'));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
          <h1 className="text-2xl font-bold">Add New Doctor</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
                <input
                  type="text"
                  name="name"
                  value={doctor.name}
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
                  value={doctor.specialty}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.specialty ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                  ))}
                </select>
                {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
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
                  value={doctor.phone}
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
                  value={doctor.address}
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
                  value={doctor.education}
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
                  value={doctor.experience}
                  onChange={handleChange}
                  placeholder="5+ years"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={doctor.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  value={doctor.workingHours}
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
                  value={doctor.workingDays}
                  onChange={handleChange}
                  placeholder="Monday - Friday"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                <textarea
                  name="about"
                  value={doctor.about}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Brief description about the doctor's experience and specialization..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">* Required fields</p>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
            <button 
              type="button"
              onClick={() => navigateTo('admin-doctors')} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctorNew;
