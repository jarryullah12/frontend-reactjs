import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useSelector, useDispatch } from '../../redux/mockRedux';
import { fetchAppointments } from '../../redux/actions/appointmentActions';

const Dashboard = ({ navigateTo }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth || {});
  const appointmentsState = useSelector(state => state.appointments || {});
  
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.user || {};
  const isAdmin = isAuthenticated && user.role === 'admin';
  const allAppointments = appointmentsState.appointments || [];
  const appointmentsLoading = appointmentsState.loading;
  
  const [loading, setLoading] = useState(true);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [statsData, setStatsData] = useState([]);

  // Fetch appointments when component mounts or when auth state changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching appointments for user:', user);
        await dispatch(fetchAppointments());
        console.log('Appointments fetched successfully');
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && isAdmin) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, isAuthenticated, isAdmin, user]);

  // Process appointments data when it changes
  useEffect(() => {
    console.log('Processing appointments data, loading:', appointmentsLoading);
    console.log('Current appointments:', allAppointments);
    
    if (!appointmentsLoading) {
      if (allAppointments && allAppointments.length > 0) {
        // Sort appointments by date (most recent first)
        const sortedAppointments = [...allAppointments].sort((a, b) => {
          // Convert date strings to Date objects for comparison
          try {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA; // Most recent first
          } catch (error) {
            console.error('Error sorting appointments:', error);
            return 0;
          }
        });
        
        console.log('Sorted appointments:', sortedAppointments);
        
        // Take only the 5 most recent appointments
        const recent = sortedAppointments.slice(0, 5);
        console.log('Recent appointments:', recent);
        
        setRecentAppointments(recent);
      } else {
        console.log('No appointments found or appointments array is empty');
        setRecentAppointments([]);
      }
      
      // Calculate statistics regardless of appointments
      calculateStats();
    }
  }, [allAppointments, appointmentsLoading]);

  // Format appointment status for display
  const formatStatus = (status) => {
    switch(status) {
      case 'upcoming':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    // If date is already in a readable format, return it
    if (dateStr && dateStr.includes(' ')) {
      return dateStr;
    }
    
    // Otherwise, format it
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr || 'N/A';
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    try {
      // Get doctors from localStorage
      let totalDoctors = 0;
      const doctorsData = localStorage.getItem('doctors');
      if (doctorsData) {
        const doctors = JSON.parse(doctorsData);
        totalDoctors = Array.isArray(doctors) ? doctors.length : 0;
      }
      
      // Get registered users (patients) from localStorage
      let totalPatients = 0;
      const registeredUsers = localStorage.getItem('registeredUsers');
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        // Filter out admin users
        totalPatients = Array.isArray(users) ? users.filter(user => user.role !== 'admin').length : 0;
      }
      
      const stats = [
        { id: 1, title: 'Total Doctors', value: totalDoctors, icon: '👨‍⚕️', color: 'bg-blue-100 text-blue-600' },
        { id: 2, title: 'Total Patients', value: totalPatients, icon: '👨‍👩‍👧‍👦', color: 'bg-green-100 text-green-600' },
        { id: 3, title: 'Total Appointments', value: allAppointments.length, icon: '📅', color: 'bg-purple-100 text-purple-600' },
      ];
      
      console.log('Dashboard statistics:', stats);
      setStatsData(stats);
    } catch (error) {
      console.error('Error calculating stats:', error);
      setStatsData([
        { id: 1, title: 'Total Doctors', value: 0, icon: '👨‍⚕️', color: 'bg-blue-100 text-blue-600' },
        { id: 2, title: 'Total Patients', value: 0, icon: '👨‍👩‍👧‍👦', color: 'bg-green-100 text-green-600' },
        { id: 3, title: 'Total Appointments', value: 0, icon: '📅', color: 'bg-purple-100 text-purple-600' },
      ]);
    }
  };

  const renderAuthenticatedContent = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsData.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Recent Appointments</h2>
        </div>
        
        {appointmentsLoading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading appointments...</p>
          </div>
        ) : recentAppointments.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600">No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorName || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorSpecialty || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.reason || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(appointment.date)} at {appointment.time || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {formatStatus(appointment.status || 'unknown')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => navigateTo('admin-appointment-detail', appointment.id)} className="text-primary hover:underline mr-3">View</button>
                      <button 
                        className={`${appointment.status === 'cancelled' ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:underline'}`}
                        onClick={() => {
                          if (appointment.status !== 'cancelled') {
                            // Here we would add the logic to cancel the appointment
                            // For now, just show an alert
                            alert(`Appointment with ${appointment.doctorName} would be cancelled`);
                          }
                        }}
                        disabled={appointment.status === 'cancelled'}
                      >
                        {appointment.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-100 text-center">
          <button onClick={() => navigateTo('admin-appointments')} className="text-primary hover:underline">View All Appointments</button>
        </div>
      </div>
    </div>
  );

  const renderUnauthenticatedContent = () => (
    <div className="p-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-gray-600 mb-6">Please log in with your admin credentials to access the dashboard.</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigateTo('admin-login')} 
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Admin Login
          </button>
          <button 
            onClick={() => navigateTo('admin-register')} 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Register as Admin
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        isAuthenticated && isAdmin ? renderAuthenticatedContent() : renderUnauthenticatedContent()
      )}
    </AdminLayout>
  );
};

export default Dashboard;
