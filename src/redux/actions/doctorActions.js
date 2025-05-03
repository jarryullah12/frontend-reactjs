import * as types from './actionTypes';

// Action creators for doctors

// Fetch doctors
export const fetchDoctorsRequest = () => ({
  type: types.FETCH_DOCTORS_REQUEST
});

export const fetchDoctorsSuccess = (doctors) => ({
  type: types.FETCH_DOCTORS_SUCCESS,
  payload: doctors
});

export const fetchDoctorsFailure = (error) => ({
  type: types.FETCH_DOCTORS_FAILURE,
  payload: error
});

// Fetch all doctors
export const fetchDoctors = () => {
  return async (dispatch) => {
    dispatch(fetchDoctorsRequest());
    try {
      // Get doctors from localStorage
      const savedDoctors = localStorage.getItem('doctors');
      let doctors = [];
      
      if (savedDoctors) {
        doctors = JSON.parse(savedDoctors);
        console.log('Loaded doctors from localStorage:', doctors);
      } else {
        // Initialize with empty array if no doctors exist
        console.log('No doctors found in localStorage, initializing with empty array');
        localStorage.setItem('doctors', JSON.stringify(doctors));
      }
      
      dispatch(fetchDoctorsSuccess(doctors));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      dispatch(fetchDoctorsFailure(error.message || 'Failed to fetch doctors'));
    }
  };
};

// Add a doctor
export const addDoctor = (doctor) => {
  return async (dispatch) => {
    try {
      // Generate a unique ID for the new doctor
      const newDoctor = {
        ...doctor,
        id: Date.now(), // Simple way to generate unique ID
        createdAt: new Date().toISOString()
      };
      
      // Get existing doctors from localStorage
      const savedDoctors = localStorage.getItem('doctors');
      let doctors = [];
      
      if (savedDoctors) {
        doctors = JSON.parse(savedDoctors);
      }
      
      // Add new doctor
      doctors.push(newDoctor);
      
      // Save back to localStorage
      localStorage.setItem('doctors', JSON.stringify(doctors));
      
      // Dispatch action
      dispatch({
        type: types.ADD_DOCTOR,
        payload: newDoctor
      });
      
      return newDoctor;
    } catch (error) {
      console.error('Error adding doctor:', error);
      throw error;
    }
  };
};

// Update a doctor
export const updateDoctor = (doctor) => {
  return async (dispatch) => {
    try {
      // Get existing doctors from localStorage
      const savedDoctors = localStorage.getItem('doctors');
      let doctors = [];
      
      if (savedDoctors) {
        doctors = JSON.parse(savedDoctors);
        
        // Update the doctor
        doctors = doctors.map(doc => 
          doc.id === doctor.id ? {...doctor, updatedAt: new Date().toISOString()} : doc
        );
        
        // Save back to localStorage
        localStorage.setItem('doctors', JSON.stringify(doctors));
      }
      
      // Dispatch action
      dispatch({
        type: types.UPDATE_DOCTOR,
        payload: doctor
      });
      
      return doctor;
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw error;
    }
  };
};

// Delete a doctor
export const deleteDoctor = (id) => {
  return async (dispatch) => {
    try {
      // Get existing doctors from localStorage
      const savedDoctors = localStorage.getItem('doctors');
      let doctors = [];
      
      if (savedDoctors) {
        doctors = JSON.parse(savedDoctors);
        
        // Filter out the deleted doctor
        doctors = doctors.filter(doc => doc.id !== id);
        
        // Save back to localStorage
        localStorage.setItem('doctors', JSON.stringify(doctors));
      }
      
      // Dispatch action
      dispatch({
        type: types.DELETE_DOCTOR,
        payload: id
      });
      
      return id;
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  };
};
