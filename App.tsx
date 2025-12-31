import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import SupportChat from './pages/SupportChat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import EditProfile from './pages/EditProfile';
import IndustrySolutions from './pages/IndustrySolutions';
import Automotive from './pages/industries/Automotive';
import Construction from './pages/industries/Construction';
import FairsEvents from './pages/industries/FairsEvents';
import Packaging from './pages/industries/Packaging';
import PrintingTrade from './pages/industries/PrintingTrade';
import Rail from './pages/industries/Rail';
import Shipping from './pages/industries/Shipping';
import Shopfitting from './pages/industries/Shopfitting';
import WindPower from './pages/industries/WindPower';
import Assembly from './pages/industries/Assembly';
import SpecialTrips from './pages/industries/SpecialTrips';
import LegalNotice from './pages/LegalNotice';
import Disclaimer from './pages/Disclaimer';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import Dashboard from './pages/admin/Dashboard';
import FleetManager from './pages/admin/FleetManager';
import AdminOrders from './pages/admin/Orders';
import DocReview from './pages/admin/DocReview';
import Customers from './pages/admin/Customers';
import Settings from './pages/admin/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { supabase } from './services/supabase';
import { setOrders, setFleet, setCustomers } from './store/slices/adminSlice';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated: isAdmin } = useAppSelector(state => state.auth.admin);

  useEffect(() => {
    const checkAndFetch = async () => {
      try {
        // Just check if we can reach the DB, don't block the UI
        const { error: tableError } = await supabase.from('profiles').select('id').limit(1);
        if (tableError) {
          console.warn("Supabase check warning:", tableError.message);
        }

        if (isAdmin) {
          const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
          if (ordersData) dispatch(setOrders(ordersData));

          const { data: fleetData } = await supabase.from('fleet').select('*');
          if (fleetData) dispatch(setFleet(fleetData));

          const { data: profilesData } = await supabase.from('profiles').select('*').eq('role', 'client');
          if (profilesData) {
            const mappedCustomers = profilesData.map((p: any) => ({
              id: p.id,
              name: p.full_name,
              contact: p.full_name,
              email: p.email,
              phone: p.phone || '-',
              orders: 0,
              spent: '€0.00',
              status: 'Active'
            }));
            dispatch(setCustomers(mappedCustomers));
          }
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    checkAndFetch();
  }, [isAdmin, dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industry-solutions" element={<IndustrySolutions />} />
            <Route path="/industry/automotive" element={<Automotive />} />
            <Route path="/industry/construction" element={<Construction />} />
            <Route path="/industry/fairs-events" element={<FairsEvents />} />
            <Route path="/industry/packaging" element={<Packaging />} />
            <Route path="/industry/printing-trade" element={<PrintingTrade />} />
              <Route path="/industry/printing" element={<PrintingTrade />} />
            <Route path="/industry/rail" element={<Rail />} />
            <Route path="/industry/shipping" element={<Shipping />} />
            <Route path="/industry/shopfitting" element={<Shopfitting />} />
            <Route path="/industry/wind-power" element={<WindPower />} />
            <Route path="/industry/assembly" element={<Assembly />} />
              <Route path="/industry/special-trips" element={<SpecialTrips />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/booking" element={<ProtectedRoute role="client"><Booking /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute role="client"><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute role="client"><Orders /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute role="client"><EditProfile /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/fleet" element={<ProtectedRoute role="admin"><FleetManager /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute role="admin"><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/docs" element={<ProtectedRoute role="admin"><DocReview /></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute role="admin"><Customers /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute role="admin"><Settings /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const App: React.FC = () => (
  <AppContent />
);

export default App;