import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useAppointments } from '../../hooks/useRedux';

const AdminPatientDetail = ({ id, navigateTo }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const { appointments } = useAppointments();
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
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
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = () => {
      setLoading(true);
      try {
        // Get registered users from localStorage
        const registeredUsers = localStorage.getItem('registeredUsers');
        if (registeredUsers) {
          const users = JSON.parse(registeredUsers);
          const user = users.find(user => user.id.toString() === id.toString());
          
          if (user) {
            // Transform user data to match patient structure
            setPatient({
              id: user.id,
              name: user.name || 'Unknown User',
              email: user.email || 'No email',
              phone: user.phone || 'Not specified',
              role: user.role || 'user',
              lastLogin: user.lastLogin || 'Never',
              createdAt: user.createdAt || 'Unknown',
              // Filter appointments for this user
              appointments: appointments.filter(app => app.patientId === user.id || app.patientEmail === user.email)
            });
          } else {
            setError(`User with ID ${id} not found`);
          }
        } else {
          setError('No registered users found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [id, appointments]);

  // Loading state
  if (loading) {
    return (
      <AdminLayout navigateTo={navigateTo} currentPage="admin-patients">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigateTo('admin-patients')} 
              className="text-primary hover:underline mr-2"
            >
              &larr; Back to Users
            </button>
            <h1 className="text-2xl font-bold">User Details</h1>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="ml-3 text-gray-600">Loading user data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  // Error state
  if (error || !patient) {
    return (
      <AdminLayout navigateTo={navigateTo} currentPage="admin-patients">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigateTo('admin-patients')} 
              className="text-primary hover:underline mr-2"
            >
              &larr; Back to Users
            </button>
            <h1 className="text-2xl font-bold">User Details</h1>
          </div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Error!</p>
            <p>{error || 'User not found'}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-patients">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigateTo('admin-patients')} 
            className="text-primary hover:underline mr-2"
          >
            &larr; Back to Users
          </button>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
        
        {/* Patient Profile */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🧑</span>
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-center">{patient.name}</h2>
                  <p className="text-gray-600 text-center">{patient.email}</p>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">{patient.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">{patient.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Role</h3>
                    <p className="text-gray-600">{patient.role}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Last Login</h3>
                    <p className="text-gray-600">{formatDate(patient.lastLogin)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-1">Registered Date</h3>
                    <p className="text-gray-600">{formatDate(patient.createdAt)}</p>
                  </div>
                </div>
                
                {/* Action buttons removed as requested */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Appointment History</h2>
          </div>
          <div className="overflow-x-auto">
            {patient.appointments && patient.appointments.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patient.appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorSpecialty}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.date} at {appointment.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button onClick={() => navigateTo('admin-appointment-detail', appointment.id)} className="text-primary hover:underline mr-3">View</button>
                        {appointment.status !== 'completed' && (
                          <button className="text-red-500 hover:underline">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No appointments found for this user.
              </div>
            )}
          </div>
          {/* Schedule New Appointment button removed as requested */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPatientDetail;
