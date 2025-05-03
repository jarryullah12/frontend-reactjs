// Utility to clear specific localStorage items
export const clearPatientData = () => {
  try {
    localStorage.removeItem('patients');
    console.log('Successfully cleared patient data from localStorage');
    return true;
  } catch (error) {
    console.error('Error clearing patient data:', error);
    return false;
  }
};

// Clear all app data (use with caution)
export const clearAllAppData = () => {
  try {
    localStorage.removeItem('patients');
    localStorage.removeItem('appointments');
    localStorage.removeItem('doctors');
    console.log('Successfully cleared all app data from localStorage');
    return true;
  } catch (error) {
    console.error('Error clearing app data:', error);
    return false;
  }
};
