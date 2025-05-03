import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { usePatients } from '../../hooks/useRedux';
import { useAuth } from '../../hooks/useRedux';

const AdminPatients = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use our custom hooks for patients and auth
  const { patients, loading, error, fetchPatients, deletePatient } = usePatients();
  const { user } = useAuth();
  
  // Fetch patients on component mount
  useEffect(() => {
    const loadPatients = async () => {
      try {
        console.log('Fetching patients data from client side...');
        setIsLoading(true);
        await fetchPatients();
        console.log('Patients data fetched successfully:', patients);
      } catch (err) {
        console.error('Error loading patients:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPatients();
  }, [fetchPatients]);
  
  // Log patients data whenever it changes
  useEffect(() => {
    console.log('Current patients state:', patients);
  }, [patients]);
  
  // Handle patient deletion
  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        setIsDeleting(true);
        await deletePatient(id);
        alert('Patient deleted successfully');
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => {
    const nameMatch = patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = patient.phone && patient.phone.includes(searchTerm);
    
    return nameMatch || emailMatch || phoneMatch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // If the date is already formatted with spaces (like "27 Apr 2025"), return it as is
    if (dateString.includes(' ')) {
      return dateString;
    }
    
    try {
      // Parse ISO date string
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      // Format the date as "DD MMM YYYY"
      const day = date.getDate().toString().padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  console.log('Rendering Patients component with client data:', patients);

  return (
    <AdminLayout navigateTo={navigateTo} currentPage="admin-patients">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-gray-600 mt-1">View and manage user records from client side</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Error!</p>
            <p>{error}</p>
          </div>
        )}

        {/* Search Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {loading || isDeleting || isLoading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">
                {isDeleting ? 'Deleting user...' : 'Loading user data...'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-gray-600">{patient.role === 'admin' ? '👑' : '👤'}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{patient.name || 'Unknown'}</div>
                              <div className="text-gray-500 text-sm">{patient.email || 'No email'}</div>
                              {patient.username && <div className="text-gray-400 text-xs">@{patient.username}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.phone || 'Not specified'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(patient.lastLogin) || 'Never'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button onClick={() => navigateTo('admin-patient-detail', patient.id)} className="text-primary hover:underline mr-3">View</button>
                          <button onClick={() => handleDeletePatient(patient.id)} className="text-red-500 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        {searchTerm 
                          ? 'No users found matching your search criteria.' 
                          : loading || isLoading
                            ? 'Loading user data...' 
                            : 'No user data found. User data will be displayed when users register.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* User Count */}
        <div className="mt-4 text-sm text-gray-600">
          Total users: {patients.length} | Filtered: {filteredPatients.length}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPatients;
