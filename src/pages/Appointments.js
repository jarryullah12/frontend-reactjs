import React, { useEffect, useState } from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { useDispatch, useSelector } from '../redux/mockRedux';
import { fetchAppointments, updateAppointment, deleteAppointment } from '../redux/actions/appointmentActions';

const Appointments = ({ navigateTo, params }) => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(state => state.appointments || { appointments: [], loading: false, error: null });
  const { user } = useSelector(state => state.auth || { user: null });
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Check if we should show completed appointments (coming from payment page)
  useEffect(() => {
    console.log('Appointments component received params:', params);
    if (params && params.showCompleted) {
      console.log('Setting status filter to completed');
      setStatusFilter('completed');
    }
  }, [params]);
  
  // Force a refresh of appointments when component mounts
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);
  
  // Debug logging
  console.log('Current user:', user);
  console.log('All appointments:', appointments);
  console.log('Current status filter:', statusFilter);
  console.log('Params received:', params);
  
  // Fetch appointments on component mount
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);
  
  // Handle appointment cancellation
  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const appointment = appointments.find(app => app.id === appointmentId);
      if (appointment) {
        const updatedAppointment = { ...appointment, status: 'cancelled' };
        dispatch(updateAppointment(updatedAppointment));
      }
    }
  };
  

  
  // Filter appointments by status
  const filterAppointmentsByStatus = (status) => {
    setStatusFilter(status);
  };
  
  // Format appointments for display
  const formattedAppointments = appointments.map(appointment => {
    // Use the doctorImage from the appointment data if available
    // Otherwise, fall back to a default image
    const doctorImage = appointment.doctorImage || `/images/doctors/doctor1.jpg`;
    
    return {
      id: appointment.id,
      patientId: appointment.patientId,
      patientEmail: appointment.patientEmail,
      doctor: {
        id: appointment.doctorId,
        name: appointment.doctorName,
        specialty: appointment.doctorSpecialty,
        image: doctorImage,
        address: appointment.address || '37th Cross, Richmond Circle, Ring Road, London',
      },
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      reason: appointment.reason
    };
  });
  
  // Filter appointments for the current user (if authenticated)
  // Only show appointments for the current logged-in user
  const filteredAppointments = user ? formattedAppointments.filter(appointment => {
    // Debug each appointment
    console.log('Checking appointment:', appointment);
    console.log('User ID:', user.id, 'User email:', user.email);
    
    // Check if this appointment belongs to the current user
    const isUserAppointment = 
      (appointment.patientId && appointment.patientId === user.id) || 
      (appointment.patientEmail && appointment.patientEmail === user.email);
    
    console.log('Is user appointment?', isUserAppointment);
    
    // Apply both user filter and status filter
    console.log(`Checking appointment ${appointment.id} status: ${appointment.status} against filter: ${statusFilter}`);
    
    // If 'all' filter is selected, show all except cancelled appointments
    if (statusFilter === 'all') {
      return isUserAppointment && appointment.status !== 'cancelled';
    }
    
    // Otherwise, show only appointments matching the selected status
    return isUserAppointment && appointment.status === statusFilter;
  }) : [];
  
  // Debug the filtered appointments
  console.log('Filtered appointments:', filteredAppointments);

  return (
    <div className="container mx-auto px-4 py-8">

      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">My appointments</h1>
        {user && (
          <div className="flex space-x-2">
            <button 
              onClick={() => filterAppointmentsByStatus('all')} 
              className={`px-3 py-1 rounded-md ${statusFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => filterAppointmentsByStatus('upcoming')} 
              className={`px-3 py-1 rounded-md ${statusFilter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => filterAppointmentsByStatus('completed')} 
              className={`px-3 py-1 rounded-md ${statusFilter === 'completed' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Completed
            </button>
            <button 
              onClick={() => filterAppointmentsByStatus('cancelled')} 
              className={`px-3 py-1 rounded-md ${statusFilter === 'cancelled' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              Cancelled
            </button>
          </div>
        )}
      </div>
      
      {/* Show loading state */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      )}
      
      {/* Show error state */}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}
      
      {/* Show login prompt if not authenticated */}
      {!user && !loading && (
        <div className="text-center py-8 bg-blue-50 rounded-lg p-6">
          <p className="text-gray-700 mb-4">Please log in to view your appointments.</p>
          <button 
            onClick={() => navigateTo('login')} 
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
          >
            Log in
          </button>
        </div>
      )}
      

      
      <div className="space-y-6">
        {user && filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row">
                {/* Doctor Info */}
                <div className="p-4 flex flex-1">
                  <div className="w-24 h-24 mr-4">
                    <ImageWithFallback 
                      src={appointment.doctor.image} 
                      alt={appointment.doctor.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{appointment.doctor.name}</h3>
                    <p className="text-gray-600">{appointment.doctor.specialty}</p>
                    <p className="text-gray-600 text-sm mt-2">Address:</p>
                    <p className="text-gray-600 text-sm">{appointment.doctor.address}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Date & Time: {appointment.date} | {appointment.time}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Reason: {appointment.reason}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Status: <span className={`font-medium ${appointment.status === 'upcoming' ? 'text-green-600' : appointment.status === 'completed' ? 'text-blue-600' : 'text-red-600'}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="bg-gray-50 p-4 flex flex-col justify-center items-center md:w-48">
                  {appointment.status === 'upcoming' && (
                    <>
                      <button 
                        onClick={() => navigateTo('payment', appointment.id)}
                        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors mb-2"
                      >
                        Pay Now
                      </button>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="w-full bg-white text-red-500 border border-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'completed' && (
                    <div className="text-center">
                      <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm mb-2">
                        Completed
                      </div>
                    </div>
                  )}
                  {appointment.status === 'cancelled' && (
                    <div className="text-center">
                      <div className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm mb-2">
                        Cancelled
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          user && !loading && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">No appointments found for the selected status.</p>
              <button 
                onClick={() => navigateTo('doctors')} 
                className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors"
              >
                Book an Appointment
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Appointments;
