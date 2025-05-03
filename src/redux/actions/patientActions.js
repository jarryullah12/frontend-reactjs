import * as types from './actionTypes';

// Action creators for patients

// Fetch patients
export const fetchPatientsRequest = () => ({
  type: types.FETCH_PATIENTS_REQUEST
});

export const fetchPatientsSuccess = (patients) => ({
  type: types.FETCH_PATIENTS_SUCCESS,
  payload: patients
});

export const fetchPatientsFailure = (error) => ({
  type: types.FETCH_PATIENTS_FAILURE,
  payload: error
});

// Fetch all patients (now fetching registered users instead)
export const fetchPatients = () => {
  return async (dispatch, getState) => {
    dispatch(fetchPatientsRequest());
    try {
      // Get current user from state
      const { auth } = getState();
      const currentUser = auth.user;
      
      console.log('Current user:', currentUser);
      
      // Get registered users from localStorage
      const registeredUsers = localStorage.getItem('registeredUsers');
      let patients = [];
      
      if (registeredUsers) {
        try {
          // Parse registered users from localStorage
          const allRegisteredUsers = JSON.parse(registeredUsers);
          console.log('All registered users from localStorage:', allRegisteredUsers);
          
          if (Array.isArray(allRegisteredUsers)) {
            // Filter out admin users and transform registered users data to match patient structure
            patients = allRegisteredUsers
              .filter(user => user.role !== 'admin') // Filter out admin users
              .map(user => ({
                id: user.id || Date.now(),
                name: user.name || user.username || 'Unknown User',
                email: user.email || 'No email',
                phone: user.phone || 'Not specified',
                lastLogin: user.lastLogin || new Date().toISOString(),
                role: user.role || 'user',
                createdAt: user.createdAt || new Date().toISOString(),
                // Add any other fields needed for the user view
              }));
            console.log(`Successfully loaded ${patients.length} non-admin registered users`);
          } else {
            console.error('Registered users data is not an array:', allRegisteredUsers);
            patients = [];
          }
        } catch (parseError) {
          console.error('Error parsing registered users data:', parseError);
          patients = [];
        }
      } else {
        console.log('No registered users found in localStorage');
      }
      
      dispatch(fetchPatientsSuccess(patients));
    } catch (error) {
      console.error('Error fetching patients:', error);
      dispatch(fetchPatientsFailure(error.message || 'Failed to fetch patients'));
    }
  };
};

// Add a patient
export const addPatient = (patient) => {
  return async (dispatch) => {
    try {
      // Generate a unique ID for the new patient
      const newPatient = {
        ...patient,
        id: Date.now(), // Simple way to generate unique ID
        createdAt: new Date().toISOString()
      };
      
      // Get existing patients from localStorage
      const savedPatients = localStorage.getItem('patients');
      let patients = [];
      
      if (savedPatients) {
        patients = JSON.parse(savedPatients);
      }
      
      // Add new patient
      patients.push(newPatient);
      
      // Save back to localStorage
      localStorage.setItem('patients', JSON.stringify(patients));
      
      // Dispatch action
      dispatch({
        type: types.ADD_PATIENT,
        payload: newPatient
      });
      
      return newPatient;
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  };
};

// Update a patient
export const updatePatient = (patient) => {
  return async (dispatch) => {
    try {
      // Get existing patients from localStorage
      const savedPatients = localStorage.getItem('patients');
      let patients = [];
      
      if (savedPatients) {
        patients = JSON.parse(savedPatients);
        
        // Update the patient
        patients = patients.map(pat => 
          pat.id === patient.id ? {...patient, updatedAt: new Date().toISOString()} : pat
        );
        
        // Save back to localStorage
        localStorage.setItem('patients', JSON.stringify(patients));
      }
      
      // Dispatch action
      dispatch({
        type: types.UPDATE_PATIENT,
        payload: patient
      });
      
      return patient;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  };
};

// Delete a patient
export const deletePatient = (id) => {
  return async (dispatch) => {
    try {
      // Get existing patients from localStorage
      const savedPatients = localStorage.getItem('patients');
      let patients = [];
      
      if (savedPatients) {
        patients = JSON.parse(savedPatients);
        
        // Filter out the patient to delete
        patients = patients.filter(patient => patient.id !== id);
        
        // Save back to localStorage
        localStorage.setItem('patients', JSON.stringify(patients));
      }
      
      // Dispatch action
      dispatch({
        type: types.DELETE_PATIENT,
        payload: id
      });
      
      return id;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  };
};
