import * as types from './actionTypes';

// Action creators for appointments

// Fetch appointments
export const fetchAppointmentsRequest = () => ({
  type: types.FETCH_APPOINTMENTS_REQUEST
});

export const fetchAppointmentsSuccess = (appointments) => ({
  type: types.FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments
});

export const fetchAppointmentsFailure = (error) => ({
  type: types.FETCH_APPOINTMENTS_FAILURE,
  payload: error
});

// Fetch all appointments
export const fetchAppointments = () => {
  return async (dispatch, getState) => {
    dispatch(fetchAppointmentsRequest());
    try {
      // Get the current user from state
      const state = getState();
      const currentUser = state.auth?.user;
      
      console.log('Current user in fetchAppointments:', currentUser);
      
      // Get appointments from localStorage
      const savedAppointments = localStorage.getItem('appointments');
      let appointments = [];
      
      if (savedAppointments) {
        try {
          appointments = JSON.parse(savedAppointments);
          console.log('All appointments from localStorage:', appointments);
          
          // For admin users, show all appointments
          // For regular users, filter to show only their appointments
          if (currentUser && currentUser.role !== 'admin') {
            appointments = appointments.filter(app => 
              app.patientId === currentUser.id || 
              app.patientEmail === currentUser.email
            );
            console.log('Filtered appointments for current user:', appointments);
          }
        } catch (error) {
          console.error('Error parsing appointments from localStorage:', error);
        }
      } else {
        // Initialize with sample data if no appointments exist
        console.log('No appointments found in localStorage, initializing with sample data');
        
        // Get doctors from localStorage to use in sample data
        const savedDoctors = localStorage.getItem('doctors');
        let doctors = [];
        if (savedDoctors) {
          try {
            doctors = JSON.parse(savedDoctors);
          } catch (error) {
            console.error('Error parsing doctors from localStorage:', error);
          }
        }
        
        // Create sample appointments
        appointments = [
          { 
            id: 1, 
            patientName: 'John Smith', 
            patientEmail: 'john.smith@example.com',
            patientId: 1,
            doctorName: doctors.length > 0 ? doctors[0].name : 'Dr. Sarah Patel', 
            doctorId: doctors.length > 0 ? doctors[0].id : 1,
            specialty: doctors.length > 0 ? doctors[0].specialty : 'Dermatologist',
            date: '27 Apr 2025', 
            time: '10:00 AM', 
            status: 'Confirmed',
            createdAt: new Date().toISOString()
          },
          { 
            id: 2, 
            patientName: 'Emily Johnson', 
            patientEmail: 'emily.johnson@example.com',
            patientId: 2,
            doctorName: doctors.length > 1 ? doctors[1].name : 'Dr. Richard James', 
            doctorId: doctors.length > 1 ? doctors[1].id : 2,
            specialty: doctors.length > 1 ? doctors[1].specialty : 'General physician',
            date: '28 Apr 2025', 
            time: '11:30 AM', 
            status: 'Pending',
            createdAt: new Date().toISOString()
          },
          { 
            id: 3, 
            patientName: 'Michael Brown', 
            patientEmail: 'michael.brown@example.com',
            patientId: 3,
            doctorName: doctors.length > 2 ? doctors[2].name : 'Dr. Jennifer Garcia', 
            doctorId: doctors.length > 2 ? doctors[2].id : 3,
            specialty: doctors.length > 2 ? doctors[2].specialty : 'Neurologist',
            date: '29 Apr 2025', 
            time: '02:00 PM', 
            status: 'Confirmed',
            createdAt: new Date().toISOString()
          }
        ];
        
        // Save sample appointments to localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));
        console.log('Saved sample appointments to localStorage:', appointments);
      }
      
      dispatch(fetchAppointmentsSuccess(appointments));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      dispatch(fetchAppointmentsFailure(error.message || 'Failed to fetch appointments'));
    }
  };
};

// Add an appointment
export const addAppointment = (appointment) => {
  return async (dispatch, getState) => {
    try {
      // Get the current user
      const state = getState();
      const currentUser = state.auth?.user;
      
      // Generate a unique ID for the new appointment
      const newAppointment = {
        ...appointment,
        id: Date.now(),
        patientId: currentUser?.id,
        patientName: currentUser?.name,
        patientEmail: currentUser?.email,
        createdAt: new Date().toISOString()
      };
      
      // Get existing appointments from localStorage
      const savedAppointments = localStorage.getItem('appointments');
      let appointments = [];
      
      if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
      }
      
      // Add new appointment
      appointments.push(newAppointment);
      
      // Save back to localStorage
      localStorage.setItem('appointments', JSON.stringify(appointments));
      
      // Dispatch action
      dispatch({
        type: types.ADD_APPOINTMENT,
        payload: newAppointment
      });
      
      return newAppointment;
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  };
};

// Update an appointment
export const updateAppointment = (appointment) => {
  return async (dispatch) => {
    try {
      // Get existing appointments from localStorage
      const savedAppointments = localStorage.getItem('appointments');
      let appointments = [];
      
      if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
        
        // Update the appointment
        appointments = appointments.map(app => 
          app.id === appointment.id ? {...appointment, updatedAt: new Date().toISOString()} : app
        );
        
        // Save back to localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }
      
      // Dispatch action
      dispatch({
        type: types.UPDATE_APPOINTMENT,
        payload: appointment
      });
      
      return appointment;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  };
};

// Delete an appointment
export const deleteAppointment = (id) => {
  return async (dispatch) => {
    try {
      // Get existing appointments from localStorage
      const savedAppointments = localStorage.getItem('appointments');
      let appointments = [];
      
      if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
        
        // Filter out the appointment to delete
        appointments = appointments.filter(appointment => appointment.id !== id);
        
        // Save back to localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }
      
      // Dispatch action
      dispatch({
        type: types.DELETE_APPOINTMENT,
        payload: id
      });
      
      return id;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  };
};
