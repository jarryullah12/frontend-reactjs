import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const AdminAppointmentDetail = ({ id, navigateTo }) => {
  // Mock appointment data
  const initialAppointment = {
    id: parseInt(id),
    patientName: 'John Smith',
    patientEmail: 'john.smith@example.com',
    patientPhone: '+44 123 456 7890',
    doctorName: 'Dr. Sarah Patel',
    doctorSpecialty: 'Dermatologist',
    doctorEmail: 'sarah.patel@example.com',
    doctorPhone: '+44 987 654 3210',
    date: '15 Apr 2025',
    time: '10:00 AM',
    duration: '30 minutes',
    status: 'Confirmed',
    type: 'In-person',
    reason: 'Annual skin checkup',
    notes: 'Patient has a history of eczema',
    createdAt: '10 Mar 2025',
    updatedAt: '12 Mar 2025',
    doctorImage: '/images/doctors/doctor2.jpg',
  };

  const [appointment, setAppointment] = useState(initialAppointment);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Status options for dropdown
  const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show'];

  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setAppointment(prev => ({
      ...prev,
      status: newStatus
    }));

    // In a real app, you would make an API call to update the status
    alert(`Appointment status updated to ${newStatus}`);
  };

  // Handle cancel appointment
  const handleCancelAppointment = () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    // In a real app, you would make an API call to cancel the appointment
    setAppointment(prev => ({
      ...prev,
      status: 'Cancelled',
      notes: prev.notes + '\n\nCancellation reason: ' + cancelReason
    }));

    setShowCancelModal(false);
    alert('Appointment cancelled successfully');
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'No-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-2xl font-bold">Appointment Details</h1>
        </div>
        
        {/* Appointment Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Appointment #{appointment.id}</h2>
              <div className="flex items-center">
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusBadgeColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <span className="text-gray-500 text-sm ml-4">
                  Created on {appointment.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Doctor Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold">Doctor Information</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4 border-2 border-white shadow">
                  <img 
                    src={appointment.doctorImage} 
                    alt={appointment.doctorName} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                  <p className="text-gray-600">{appointment.doctorSpecialty}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-500">Email:</span>
                  <span className="ml-2">{appointment.doctorEmail}</span>
                </div>
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <span className="ml-2">{appointment.doctorPhone}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Appointment Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold">Appointment Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500">Date:</span>
                  <span className="ml-2">{appointment.date}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <span className="ml-2">{appointment.time}</span>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="ml-2">{appointment.duration}</span>
                </div>
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2">{appointment.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Reason:</span>
                  <span className="ml-2">{appointment.reason}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold">Appointment Details</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-500 text-sm">Date</h3>
                <p>{appointment.date}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Time</h3>
                <p>{appointment.time}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Duration</h3>
                <p>{appointment.duration}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Type</h3>
                <p>{appointment.type}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Status</h3>
                <div className="mt-1">
                  <select
                    value={appointment.status}
                    onChange={handleStatusChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={appointment.status === 'Cancelled'}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-gray-500 text-sm">Reason for Visit</h3>
                <p>{appointment.reason}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-gray-500 text-sm">Notes</h3>
                <p className="whitespace-pre-line">{appointment.notes}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {appointment.status === 'Completed' && (
            <button 
              onClick={() => alert('Generating medical report...')} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Report
            </button>
          )}
        </div>
        
        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
              <p className="mb-4">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Please provide a reason for cancellation"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowCancelModal(false)} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  No, Keep It
                </button>
                <button 
                  onClick={handleCancelAppointment} 
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAppointmentDetail;
