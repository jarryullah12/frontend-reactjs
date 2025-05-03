// Initialize data for the application
// This file is used to ensure data structures are properly set up

// Initialize registered users data structure if not present
export const initializeRegisteredUsers = () => {
  const existingRegisteredUsers = localStorage.getItem('registeredUsers');
  if (!existingRegisteredUsers) {
    console.log('Initializing empty registeredUsers array...');
    localStorage.setItem('registeredUsers', JSON.stringify([]));
    return true;
  }
  return false;
};

// Keep these functions for backward compatibility
export const initializeUsers = () => {
  return false; // No longer initializing sample users data
};

export const initializePatients = () => {
  return false; // No longer initializing patients data
};

// Function to initialize all data structures
export const initializeAllData = () => {
  const registeredUsersInitialized = initializeRegisteredUsers();
  
  // Keep these for backward compatibility
  const usersInitialized = initializeUsers();
  const patientsInitialized = initializePatients();
  
  if (registeredUsersInitialized) {
    console.log('Registered users data structure initialized successfully!');
  } else {
    console.log('Registered users data structure already exists.');
  }
};
