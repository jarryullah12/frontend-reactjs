import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const AdminAppointmentNew = ({ patientId, navigateTo }) => {
  // Initial appointment data
  const initialAppointment = {
    patientId: patientId ? parseInt(patientId) : '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    doctorSpecialty: '',
    date: '',
    time: '',
    duration: '30',
    status: 'Pending',
    type: 'In-person',
    reason: '',
    notes: '',
  };

  // State for form fields
  const [appointment, setAppointment] = useState(initialAppointment);
  const [errors, setErrors] = useState({});

  // Mock doctors list
  const doctors = [
    { id: 1, name: 'Dr. Richard James', specialty: 'General physician' },
    { id: 2, name: 'Dr. Sarah Patel', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Michael Chen', specialty: 'Cardiologist' },
  ];

  // Mock patients list
  const patients = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Emma Johnson' },
    { id: 3, name: 'David Williams' },
  ];

  // Status options
  const statusOptions = ['Pending', 'Confirmed'];

  // Appointment types
  const appointmentTypes = ['In-person', 'Video consultation', 'Phone call'];

  // Duration options
  const durationOptions = ['15', '30', '45', '60'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      [name]: value
    }));

    // Update doctor name when doctor changes
    if (name === 'doctorId') {
      const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(value));
      if (selectedDoctor) {
        setAppointment(prev => ({
          ...prev,
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty
        }));
      }
    }

    // Update patient name when patient changes
    if (name === 'patientId') {
      const selectedPatient = patients.find(patient => patient.id === parseInt(value));
      if (selectedPatient) {
        setAppointment(prev => ({
          ...prev,
          patientName: selectedPatient.name
        }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!appointment.patientId) newErrors.patientId = 'Patient is required';
    if (!appointment.doctorId) newErrors.doctorId = 'Doctor is required';
    if (!appointment.date) newErrors.date = 'Date is required';
    if (!appointment.time) newErrors.time = 'Time is required';
    if (!appointment.duration) newErrors.duration = 'Duration is required';
    if (!appointment.type) newErrors.type = 'Appointment type is required';
    if (!appointment.status) newErrors.status = 'Status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would make an API call to create the appointment
      alert('Appointment scheduled successfully!');
      navigateTo('admin-appointments');
    }
  };

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-appointments">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigateTo('admin-appointments')} 
            className="text-primary hover:underline mr-2"
          >
            &larr; Back to Appointments
          </button>
          <h1 className="text-2xl font-bold">Schedule New Appointment</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient*</label>
                <select
                  name="patientId"
                  value={appointment.patientId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  disabled={patientId ? true : false}
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
                {errors.patientId && <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor*</label>
                <select
                  name="doctorId"
                  value={appointment.doctorId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.doctorId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
                  ))}
                </select>
                {errors.doctorId && <p className="text-red-500 text-xs mt-1">{errors.doctorId}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date*</label>
                <input
                  type="date"
                  name="date"
                  value={appointment.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time*</label>
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)*</label>
                <select
                  name="duration"
                  value={appointment.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map((duration) => (
                    <option key={duration} value={duration}>{duration} minutes</option>
                  ))}
                </select>
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type*</label>
                <select
                  name="type"
                  value={appointment.type}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select Type</option>
                  {appointmentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status*</label>
                <select
                  name="status"
                  value={appointment.status}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <input
                  type="text"
                  name="reason"
                  value={appointment.reason}
                  onChange={handleChange}
                  placeholder="Brief reason for the appointment"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={appointment.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any additional notes or instructions"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">* Required fields</p>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
            <button 
              type="button"
              onClick={() => navigateTo('admin-appointments')} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Schedule Appointment
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('admin-appointments')} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Appointments
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('admin-doctors')} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View All Doctors
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('admin-patients')} 
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              View All Patients
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('admin-dashboard')} 
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointmentNew;
