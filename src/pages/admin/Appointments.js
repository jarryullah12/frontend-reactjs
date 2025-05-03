import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useAppointments } from '../../hooks/useRedux';

const AdminAppointments = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Use our custom hook for appointments
  const { appointments, loading, error, fetchAppointments, deleteAppointment } = useAppointments();
  
  // Fetch appointments on component mount
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        await fetchAppointments();
      } catch (err) {
        console.error('Error loading appointments:', err);
      }
    };
    
    loadAppointments();
  }, [fetchAppointments]);
  
  // Handle appointment deletion
  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        setIsDeleting(true);
        await deleteAppointment(id);
        alert('Appointment deleted successfully');
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Status options for filter
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Completed', label: 'Completed' },
  ];

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter(appointment => {
    const patientName = appointment.patientName || appointment.patient || '';
    const doctorName = appointment.doctorName || appointment.doctor || '';
    const patientEmail = appointment.patientEmail || '';
    
    const matchesSearch = 
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // If the date is already formatted with spaces (like "27 Apr 2025"), return it as is
    if (dateString.includes(' ')) {
      return dateString;
    }
    
    try {
      // Parse ISO date string
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      // Format the date as "DD MMM YYYY"
      const day = date.getDate().toString().padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-appointments">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Appointments</h1>
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
                placeholder="Search by patient, doctor or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-1/4">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {loading || isDeleting ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">{isDeleting ? 'Deleting appointment...' : 'Loading appointments...'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900">{appointment.patientName || appointment.patient || 'Unknown'}</div>
                            <div className="text-gray-500 text-sm">{appointment.patientEmail || 'No email'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900">{appointment.doctorName || appointment.doctor || 'Unknown'}</div>
                            <div className="text-gray-500 text-sm">{appointment.specialty || 'Not specified'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{formatDate(appointment.date)}</div>
                          <div className="text-gray-500 text-sm">{appointment.time || 'No time specified'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            appointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button onClick={() => navigateTo('admin-appointment-detail', appointment.id)} className="text-primary hover:underline mr-3">View</button>
                          <button onClick={() => handleDeleteAppointment(appointment.id)} className="text-red-500 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'No appointments found matching your search criteria.' 
                          : 'No appointments found. Appointments booked by patients will appear here.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Appointment Count */}
        <div className="mt-4 text-sm text-gray-600">
          Total appointments: {appointments.length} | Filtered: {filteredAppointments.length}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;
