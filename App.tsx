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
import { supabase, SQL_SETUP_SNIPPET } from './services/supabase';
import { setOrders, setFleet, setCustomers } from './store/slices/adminSlice';
import { Database, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated: isAdmin } = useAppSelector(state => state.auth.admin);
  const [dbError, setDbError] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string>('');

  const checkDb = async () => {
    try {
      setConnectionError(false);
      setDbError(false);
      
      const { error: tableError } = await supabase.from('profiles').select('id').limit(1);
      if (tableError) {
        if (tableError.code === 'PGRST301' || tableError.message.includes('profiles')) {
          setDbError(true);
          setErrorDetails('Missing database tables.');
          return;
        }
        // Generic Postgres Error
        setConnectionError(true);
        setErrorDetails(tableError.message);
      }
    } catch (err: any) {
      setConnectionError(true);
      setErrorDetails(err.message || 'Failed to connect to the database.');
    }
  };

  useEffect(() => {
    checkDb();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin && !dbError && !connectionError) {
        try {
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
        } catch (error) {
           console.error("Data fetch error", error);
        }
      }
    };
    fetchData();
  }, [isAdmin, dispatch, dbError, connectionError]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SQL_SETUP_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (connectionError) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-gray-100">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Connection Error</h1>
        <p className="text-gray-600 mb-6">
          {errorDetails.includes('fetch') 
            ? "We couldn't reach the database. Please check your internet connection or verify your Supabase keys."
            : errorDetails}
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            <RefreshCw className="w-4 h-4" /> Retry Connection
          </button>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">If the error persists, ensure you have initialized your Supabase database using the SQL script.</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (dbError) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-10">
        <div className="flex items-center gap-4 mb-6 border-b pb-6">
           <div className="bg-orange-100 p-3 rounded-xl">
             <Database className="w-8 h-8 text-orange-600" />
           </div>
           <div>
             <h1 className="text-2xl font-black text-slate-900">Database Setup Required</h1>
             <p className="text-gray-500">The "profiles" table was not found in your Supabase project.</p>
           </div>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
           <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
             <AlertCircle className="w-4 h-4 text-orange-500" /> 
             Action Required
           </p>
           <p className="text-sm text-slate-600 leading-relaxed">
             Copy the SQL code below, go to your <strong>Supabase Dashboard &rarr; SQL Editor &rarr; New Query</strong>, paste the code, and click <strong>Run</strong>.
           </p>
        </div>

        <pre className="bg-slate-900 text-orange-400 p-6 rounded-xl mb-6 overflow-auto h-72 text-xs font-mono border border-slate-800 shadow-inner leading-relaxed">
          {SQL_SETUP_SNIPPET}
        </pre>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={copyToClipboard} 
            className="flex-1 bg-orange-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200 active:scale-95"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="flex-1 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Page
          </button>
        </div>
      </div>
    </div>
  );

  return (
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-slate-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
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
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;