import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { useDispatch, useSelector } from '../redux/mockRedux';
import { addAppointment } from '../redux/actions/appointmentActions';
import { useDoctors } from '../hooks/useRedux';

const DoctorDetail = ({ id, navigateTo }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth || { user: null });
  const { doctors, fetchDoctors } = useDoctors();
  
  // Fetch doctor data
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true);
        console.log(`Fetching doctor data for ID: ${id}`);
        
        // Ensure doctors are loaded
        if (!doctors || doctors.length === 0) {
          await fetchDoctors();
        }
        
        // Find the specific doctor by ID
        const doctorData = doctors.find(doc => doc.id.toString() === id.toString());
        
        if (doctorData) {
          console.log('Doctor found:', doctorData);
          setDoctor(doctorData);
        } else {
          console.error(`Doctor with ID ${id} not found`);
          setError(`Doctor with ID ${id} not found`);
        }
      } catch (err) {
        console.error('Error loading doctor:', err);
        setError('Failed to load doctor data');
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctor();
  }, [id, doctors, fetchDoctors]);
  
  // Available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      });
    }
    
    return dates;
  };
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];
  
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    
    if (!user) {
      alert('Please log in to book an appointment');
      navigateTo('login');
      return;
    }
    
    if (!doctor) {
      alert('Doctor information not available');
      return;
    }
    
    try {
      // Format the date for display
      const displayDate = new Date(selectedDate).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      
      // Create appointment object
      const appointmentData = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorImage: doctor.image,
        doctorSpecialty: doctor.specialty,
        address: doctor.address || 'Medical Center',
        date: displayDate,
        time: selectedTime,
        reason: reason || 'General consultation',
        status: 'upcoming',
        userId: user.id,
        userName: user.name,
        userEmail: user.email
      };
      
      // Debug logging
      console.log('Creating appointment with data:', appointmentData);
      console.log('Current user:', user);
      
      // Dispatch action to add appointment
      const result = await dispatch(addAppointment(appointmentData));
      console.log('Appointment creation result:', result);
      
      alert(`Appointment booked with ${doctor.name} on ${displayDate} at ${selectedTime}`);
      navigateTo('appointments');
    } catch (error) {
      alert(`Failed to book appointment: ${error.message}`);
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !doctor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Error!</p>
          <p>{error || 'Doctor not found'}</p>
          <button 
            onClick={() => navigateTo('doctors')} 
            className="mt-4 bg-primary text-white font-medium py-2 px-4 rounded-md inline-block hover:bg-primary-dark transition-colors"
          >
            View All Doctors
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Doctor Profile */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                  <ImageWithFallback 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="h-64 w-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <div className="flex items-center mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-green-500">Available</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-gray-600 mb-4">{doctor.specialty}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-gray-600">{doctor.about || `${doctor.name} is a specialist in ${doctor.specialty} with years of experience in the field.`}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Education</h3>
                    <p className="text-gray-600">{doctor.education || 'Medical Degree'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Experience</h3>
                    <p className="text-gray-600">{doctor.experience || '5+ years'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
            
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Select Date</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {getAvailableDates().map((date) => (
                  <button
                    key={date.value}
                    className={`p-3 rounded-md text-center border ${selectedDate === date.value ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary'}`}
                    onClick={() => setSelectedDate(date.value)}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Select Time</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`p-3 rounded-md text-center border ${selectedTime === time ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary'}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Reason for Visit */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Reason for Visit</h3>
              <textarea
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                rows="3"
                placeholder="Please describe your symptoms or reason for consultation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            
            {/* Book Button */}
            <button
              className="bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors w-full"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
