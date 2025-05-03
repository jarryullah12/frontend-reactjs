import React, { useState } from 'react';
import { useDispatch } from '../redux/mockRedux';
import { updateAppointment } from '../redux/actions/appointmentActions';
import ImageWithFallback from '../components/common/ImageWithFallback';

const CashPayment = ({ navigateTo, params }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Handle different parameter structures
  // It could be { appointment: {...} } or the appointment object directly
  const appointment = params?.appointment || params;

  // If no valid appointment data was passed, redirect back to appointments
  if (!appointment || typeof appointment !== 'object') {
    console.error('No valid appointment data found in params:', params);
    setTimeout(() => navigateTo('appointments'), 0);
    return null;
  }

  // Handle both appointment data structures (with doctor object or flattened properties)
  const doctorId = appointment.doctor ? parseInt(appointment.doctor.id) : parseInt(appointment.doctorId) || 1;
  const doctorImageIndex = (doctorId % 3) === 0 ? 3 : (doctorId % 3);
  const doctorImage = appointment.doctorImage || `/images/doctors/doctor${doctorImageIndex}.jpg`;

  const handleConfirmPayment = () => {
    setLoading(true);
    
    // Update the appointment with payment information and mark as completed
    // Need to ensure we're updating the original appointment format, not the formatted version
    const updatedAppointment = {
      // Preserve all original fields
      ...appointment,
      // Ensure required fields are present
      id: appointment.id,
      patientId: appointment.patientId || appointment.userId || '',
      patientName: appointment.patientName || (appointment.doctor ? appointment.doctor.name : appointment.doctorName) || '',
      patientEmail: appointment.patientEmail || '',
      doctorId: appointment.doctorId || (appointment.doctor ? appointment.doctor.id : '') || '',
      doctorName: appointment.doctorName || (appointment.doctor ? appointment.doctor.name : '') || '',
      doctorSpecialty: appointment.doctorSpecialty || (appointment.doctor ? appointment.doctor.specialty : '') || '',
      doctorImage: appointment.doctorImage || (appointment.doctor ? appointment.doctor.image : doctorImage) || '',
      date: appointment.date || '',
      time: appointment.time || '',
      reason: appointment.reason || '',
      address: appointment.address || (appointment.doctor ? appointment.doctor.address : '') || '',
      // Set payment information
      paymentMethod: 'cash',
      paymentStatus: 'completed',
      status: 'completed'
    };
    
    // Simulate network delay
    setTimeout(() => {
      dispatch(updateAppointment(updatedAppointment));
      setLoading(false);
      setCompleted(true);
      
      // Redirect back to appointments page after 2 seconds and show completed appointments
      setTimeout(() => {
        // Log what we're doing for debugging
        console.log('Redirecting to appointments with showCompleted flag');
        // Make sure to use a simple object with a clear property name
        navigateTo('appointments', { showCompleted: true });
      }, 2000);
    }, 1000);
  };

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
          <h1 className="text-2xl font-medium">Cash on Delivery Payment</h1>
        </div>
        
        {completed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-medium text-green-800 mb-2">Payment Option Confirmed!</h2>
            <p className="text-green-700 mb-4">
              You have selected Cash on Delivery as your payment method.
              You will pay directly to the doctor during your appointment.
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
                      src={appointment.doctor ? appointment.doctor.image : doctorImage} 
                      alt={appointment.doctor ? appointment.doctor.name : appointment.doctorName} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{appointment.doctor ? appointment.doctor.name : appointment.doctorName}</h3>
                    <p className="text-gray-600">{appointment.doctor ? appointment.doctor.specialty : appointment.doctorSpecialty}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Date & Time: {appointment.date} | {appointment.time}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Reason: {appointment.reason}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Status: <span className={`font-medium ${
                        appointment.status === 'upcoming' ? 'text-green-600' : 
                        appointment.status === 'completed' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-yellow-50">
                <h3 className="font-medium text-lg mb-2">Cash on Delivery Information</h3>
                <ul className="list-disc pl-5 space-y-2 text-yellow-800">
                  <li>You will pay the doctor directly during your appointment.</li>
                  <li>Please carry the exact amount in cash.</li>
                  <li>A receipt will be provided after payment.</li>
                  <li>If you need to cancel, please do so at least 24 hours before the appointment.</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-50">
                <h3 className="font-medium text-lg mb-4">Payment Address</h3>
                <p className="text-gray-700">
                  Please visit the doctor at the following address for your appointment:
                </p>
                <p className="font-medium mt-2">{appointment.doctor ? appointment.doctor.address : appointment.address}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigateTo('appointments')}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmPayment}
                disabled={loading}
                className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Confirm Cash on Delivery'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CashPayment;
