import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/mockRedux';
import { updateAppointment, fetchAppointments } from '../redux/actions/appointmentActions';
import ImageWithFallback from '../components/common/ImageWithFallback';

const Payment = ({ navigateTo, id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [error, setError] = useState(null);
  
  const { appointments } = useSelector(state => state.appointments || { appointments: [] });
  
  // Fetch the appointment data
  useEffect(() => {
    const loadAppointment = async () => {
      try {
        setLoading(true);
        
        // Ensure appointments are loaded
        if (!appointments || appointments.length === 0) {
          await dispatch(fetchAppointments());
        }
        
        // Find the specific appointment by ID
        const appointmentData = appointments.find(app => app.id.toString() === id.toString());
        
        if (appointmentData) {
          console.log('Appointment found:', appointmentData);
          setAppointment(appointmentData);
        } else {
          console.error(`Appointment with ID ${id} not found`);
          setError(`Appointment with ID ${id} not found`);
        }
      } catch (err) {
        console.error('Error loading appointment:', err);
        setError('Failed to load appointment data');
      } finally {
        setLoading(false);
      }
    };
    
    loadAppointment();
  }, [id, appointments, dispatch]);
  
  const handlePayment = () => {
    if (!appointment) return;
    
    setPaymentLoading(true);
    
    // Update the appointment with payment information and mark as completed
    const updatedAppointment = {
      ...appointment,
      paymentMethod: paymentMethod,
      paymentStatus: 'completed',
      status: 'completed'
    };
    
    // Simulate network delay
    setTimeout(() => {
      dispatch(updateAppointment(updatedAppointment));
      setPaymentLoading(false);
      setCompleted(true);
      
      // Redirect back to appointments page after 2 seconds and show completed appointments
      setTimeout(() => {
        console.log('Redirecting to appointments with showCompleted flag');
        navigateTo('appointments', { showCompleted: true });
      }, 2000);
    }, 1000);
  };
  
  // Handle cash on delivery option
  const handleCashOnDelivery = () => {
    navigateTo('cashPayment', { appointment });
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !appointment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Error!</p>
          <p>{error || 'Appointment not found'}</p>
          <button 
            onClick={() => navigateTo('appointments')} 
            className="mt-4 bg-primary text-white font-medium py-2 px-4 rounded-md inline-block hover:bg-primary-dark transition-colors"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigateTo('appointments')}
            className="mr-4 text-primary hover:text-primary-dark"
          >
            &larr; Back to Appointments
          </button>
          <h1 className="text-2xl font-medium">Payment Options</h1>
        </div>
        
        {completed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-medium text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-green-700 mb-4">
              Your appointment has been confirmed and marked as completed.
            </p>
            <p className="text-sm text-green-600">Redirecting back to appointments...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium mb-4">Appointment Details</h2>
                <div className="flex items-start">
                  <div className="w-24 h-24 mr-4 flex-shrink-0">
                    <ImageWithFallback 
                      src={appointment.doctorImage || `/images/doctors/doctor1.jpg`} 
                      alt={appointment.doctorName} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{appointment.doctorName}</h3>
                    <p className="text-gray-600">{appointment.doctorSpecialty}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Date & Time: {appointment.date} | {appointment.time}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Reason: {appointment.reason}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Status: <span className="font-medium text-green-600">
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-lg mb-4">Payment Method</h3>
                
                {/* Cash on Delivery Option */}
                <div 
                  className="border rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleCashOnDelivery}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600 text-xl">💵</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-gray-600 text-sm">Pay directly to the doctor during your appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigateTo('appointments')}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
