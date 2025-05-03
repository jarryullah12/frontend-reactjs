import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const AdminPatientEdit = ({ id, navigateTo }) => {
  // Mock patient data
  const patientData = {
    id: parseInt(id),
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+44 123 456 7890',
    gender: 'Male',
    age: 35,
    dob: '1990-04-15',
    address: '123 Patient Street, London',
    bloodGroup: 'O+',
    allergies: 'None',
    medicalHistory: 'Hypertension, Diabetes',
  };

  // State for form fields
  const [patient, setPatient] = useState(patientData);
  const [errors, setErrors] = useState({});

  // Blood group options
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!patient.name) newErrors.name = 'Name is required';
    if (!patient.email) newErrors.email = 'Email is required';
    if (!patient.phone) newErrors.phone = 'Phone is required';
    if (!patient.gender) newErrors.gender = 'Gender is required';
    if (!patient.dob) newErrors.dob = 'Date of birth is required';
    if (!patient.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would make an API call to update the patient
      alert('Patient information updated successfully!');
      navigateTo('admin-patient-detail', patient.id);
    }
  };

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-patients">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigateTo('admin-patient-detail', patient.id)} 
            className="text-primary hover:underline mr-2"
          >
            &larr; Back to Patient Details
          </button>
          <h1 className="text-2xl font-bold">Edit Patient</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={patient.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
                <input
                  type="text"
                  name="phone"
                  value={patient.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
                <select
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth*</label>
                <input
                  type="date"
                  name="dob"
                  value={patient.dob}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={patient.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={patient.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={patient.allergies}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={patient.medicalHistory}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">* Required fields</p>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
            <button 
              type="button"
              onClick={() => navigateTo('admin-patient-detail', patient.id)} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Save Changes
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('admin-patients')} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Patients
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('admin-appointment-new', patient.id)} 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminPatientEdit;
