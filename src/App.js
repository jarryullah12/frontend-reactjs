import React, { useState, useEffect } from 'react';
import './App.css';

// Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Initialize sample data
import { initializeAllData } from './utils/initializeData';

// Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Appointments from './pages/Appointments';
import Payment from './pages/Payment';
import CashPayment from './pages/CashPayment';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Context Provider
import { AppProvider } from './context/AppContext';

// Common Components
import Notification from './components/common/Notification';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminDoctors from './pages/admin/Doctors';
import AdminDoctorDetail from './pages/admin/DoctorDetail';
import AdminDoctorEdit from './pages/admin/DoctorEdit';
import AdminDoctorNew from './pages/admin/DoctorNew';
import AdminAppointments from './pages/admin/Appointments';
import AdminAppointmentDetail from './pages/admin/AppointmentDetail';
import AdminAppointmentEdit from './pages/admin/AppointmentEdit';
import AdminAppointmentNew from './pages/admin/AppointmentNew';
import AdminPatients from './pages/admin/Patients';
import AdminPatientDetail from './pages/admin/PatientDetail';
import AdminPatientEdit from './pages/admin/PatientEdit';
import AdminPatientNew from './pages/admin/PatientNew';
import AdminSettings from './pages/admin/Settings';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';

// Helper function to get URL parameters
const getUrlParams = () => {
  const url = window.location.pathname;
  const parts = url.split('/').filter(part => part !== '');
  
  if (parts.length === 0) {
    return { page: 'home' };
  }
  
  if (parts[0] === 'admin') {
    if (parts.length === 1) {
      return { page: 'admin' };
    } else if (parts.length === 2) {
      return { page: `admin-${parts[1]}` };
    } else if (parts.length >= 3) {
      if (parts[2] === 'new') {
        return { page: `admin-${parts[1]}-new` };
      } else if (parts[2] === 'edit' && parts.length >= 4) {
        return { page: `admin-${parts[1]}-edit`, id: parts[3] };
      } else {
        return { page: `admin-${parts[1]}-detail`, id: parts[2] };
      }
    }
  } else if (parts[0] === 'doctor' && parts.length >= 2) {
    return { page: 'doctor-detail', id: parts[1] };
  } else if (parts[0] === 'payment' && parts.length >= 2) {
    return { page: 'payment', id: parts[1] };
  } else {
    return { page: parts[0] };
  }
  
  return { page: 'home' };
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [doctorId, setDoctorId] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Initialize sample data on first load
  useEffect(() => {
    initializeAllData();
  }, []);

  // Check URL on initial load
  useEffect(() => {
    const params = getUrlParams();
    setCurrentPage(params.page);
    if (params.id) {
      setDoctorId(params.id);
    }
    
    // Add popstate event listener to handle browser back/forward buttons
    const handlePopState = () => {
      const params = getUrlParams();
      setCurrentPage(params.page);
      if (params.id) {
        setDoctorId(params.id);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Enhanced navigation function that updates URL
  const navigateTo = (page, params = null) => {
    setCurrentPage(page);
    
    // Log navigation for debugging
    console.log('Navigating to:', page, 'with params:', params);
    
    if (params) {
      // Always store the params, whether it's an ID or an object
      setDoctorId(params);
    } else {
      // Clear params when not provided
      setDoctorId(null);
    }
    
    // Update URL based on page and params
    let url = '/';
    // Extract ID from params if it's a simple ID
    const paramId = typeof params === 'string' || typeof params === 'number' ? params : null;
    
    if (page === 'home') {
      url = '/';
    } else if (page === 'admin') {
      url = '/admin';
    } else if (page === 'admin-login') {
      url = '/admin/login';
    } else if (page === 'admin-register') {
      url = '/admin/register';
    } else if (page === 'admin-doctors') {
      url = '/admin/doctors';
    } else if (page === 'admin-patients') {
      url = '/admin/patients';
    } else if (page === 'admin-appointments') {
      url = '/admin/appointments';
    } else if (page === 'admin-settings') {
      url = '/admin/settings';
    } else if (page === 'admin-doctor-new') {
      url = '/admin/doctor/new';
    } else if (page === 'admin-patient-new') {
      url = '/admin/patient/new';
    } else if (page === 'admin-appointment-new') {
      url = '/admin/appointment/new';
    } else if (page === 'admin-doctor-detail' && paramId) {
      url = `/admin/doctor/${paramId}`;
    } else if (page === 'admin-doctor-edit' && paramId) {
      url = `/admin/doctor/edit/${paramId}`;
    } else if (page === 'admin-patient-detail' && paramId) {
      url = `/admin/patient/${paramId}`;
    } else if (page === 'admin-patient-edit' && paramId) {
      url = `/admin/patient/edit/${paramId}`;
    } else if (page === 'admin-appointment-detail' && paramId) {
      url = `/admin/appointment/${paramId}`;
    } else if (page === 'admin-appointment-edit' && paramId) {
      url = `/admin/appointment/edit/${paramId}`;
    } else if (page === 'doctor-detail' && paramId) {
      url = `/doctor/${paramId}`;
    } else if (page === 'payment' && paramId) {
      url = `/payment/${paramId}`;
    } else {
      url = `/${page}`;
    }
    
    // Update URL without page refresh
    window.history.pushState({}, '', url);
  };

  // Render current page based on state
  const renderPage = () => {
    // Authentication pages
    if (currentPage === 'login') {
      return <Login navigateTo={navigateTo} />;
    } else if (currentPage === 'register') {
      return <Register navigateTo={navigateTo} />;
    }
    
    // Admin pages
    else if (currentPage === 'admin-login') {
      return <AdminLogin navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-register') {
      return <AdminRegister navigateTo={navigateTo} />;
    } else if (currentPage === 'admin') {
      return <AdminDashboard navigateTo={navigateTo} />;
    } 
    // Admin Doctor pages
    else if (currentPage === 'admin-doctors') {
      return <AdminDoctors navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-doctor-detail') {
      return <AdminDoctorDetail id={doctorId} navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-doctor-edit') {
      return <AdminDoctorEdit id={doctorId} navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-doctor-new') {
      return <AdminDoctorNew navigateTo={navigateTo} />;
    }
    // Admin Patient pages
    else if (currentPage === 'admin-patients') {
      return <AdminPatients navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-patient-detail') {
      return <AdminPatientDetail id={doctorId} navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-patient-edit') {
      return <AdminPatientEdit id={doctorId} navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-patient-new') {
      return <AdminPatientNew navigateTo={navigateTo} />;
    }
    // Admin Appointment pages
    else if (currentPage === 'admin-appointments') {
      return <AdminAppointments navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-appointment-detail') {
      return <AdminAppointmentDetail id={doctorId} navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-appointment-edit') {
      return <AdminAppointmentEdit id={doctorId} navigateTo={navigateTo} />;
    } else if (currentPage === 'admin-appointment-new') {
      return <AdminAppointmentNew patientId={doctorId} navigateTo={navigateTo} />;
    }
    // Admin Settings
    else if (currentPage === 'admin-settings') {
      return <AdminSettings navigateTo={navigateTo} />;
    }
    
    // User pages with layout
    return (
      <div className="flex flex-col min-h-screen">
        <Header navigateTo={navigateTo} />
        <main className="flex-grow">
          {currentPage === 'home' && <Home navigateTo={navigateTo} />}
          {currentPage === 'doctors' && <Doctors navigateTo={navigateTo} />}
          {currentPage === 'doctor-detail' && <DoctorDetail id={doctorId} navigateTo={navigateTo} />}
          {currentPage === 'appointments' && <Appointments navigateTo={navigateTo} params={doctorId} />}
          {currentPage === 'payment' && <Payment id={doctorId} navigateTo={navigateTo} />}
          {currentPage === 'cashPayment' && <CashPayment navigateTo={navigateTo} params={doctorId} />}
          {currentPage === 'profile' && <Profile navigateTo={navigateTo} />}
          {currentPage === 'profile-edit' && <ProfileEdit navigateTo={navigateTo} />}
          {currentPage === 'about' && <About navigateTo={navigateTo} />}
          {currentPage === 'contact' && <Contact navigateTo={navigateTo} />}
        </main>
        <Footer navigateTo={navigateTo} />
      </div>
    );
  };

  return (
    <AppProvider>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      {renderPage()}
    </AppProvider>
  );
}

export default App;
