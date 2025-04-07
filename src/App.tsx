import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import ConnectionsPage from './pages/ConnectionsPage';
import ActivityPage from './pages/ActivityPage';
import MessagingSettingsPage from './pages/MessagingSettingsPage';
import UserAccountPage from './pages/UserAccountPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import PrivacySettingsPage from './pages/PrivacySettingsPage';
import CommunicationsPage from './pages/CommunicationsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CreatePage from './pages/CreatePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import CloseAccountPage from './pages/CloseAccountPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import SessionTestPage from './pages/SessionTestPage';
import Home from './pages/index';
import Chat from './pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import { SessionProvider } from './contexts/SessionContext';
import SessionAuthConnector from './components/SessionAuthConnector';
import { useTheme } from './redux/hooks';
import './styles/globals.css';

function App() {
  const { mode } = useTheme();
  
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <SessionProvider>
      <SessionAuthConnector>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/session-test" element={<SessionTestPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/messaging" element={<MessagingSettingsPage />} />
              <Route path="/account" element={<UserAccountPage />} />
              <Route path="/notification" element={<NotificationSettingsPage />} />
              <Route path="/privacy-and-safety" element={<PrivacySettingsPage />} />
              <Route path="/communications" element={<CommunicationsPage />} />
              <Route path="/create-page" element={<CreatePage />} />
              <Route path="/account-settings" element={<AccountSettingsPage />} />
              <Route path="/close-account" element={<CloseAccountPage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications-page" element={<NotificationsPage />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </SessionAuthConnector>
    </SessionProvider>
  );
}

export default App;