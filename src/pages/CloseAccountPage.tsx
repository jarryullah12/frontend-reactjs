import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const CloseAccountPage: React.FC = () => {
  const [reason, setReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  // New state variables for modals
  const [showDeactivateModal, setShowDeactivateModal] = useState<boolean>(false);
  const [showDownloadDataModal, setShowDownloadDataModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [deactivationPeriod, setDeactivationPeriod] = useState<string>('30days');
  const [downloadOptions, setDownloadOptions] = useState<string[]>(['posts', 'profile']);
  const [supportMessage, setSupportMessage] = useState<string>('');

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value);
  };

  const handleCustomReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomReason(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmed(e.target.checked);
  };

  // New handler functions
  const handleDeactivationPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeactivationPeriod(e.target.value);
  };

  const handleDownloadOptionChange = (option: string) => {
    if (downloadOptions.includes(option)) {
      setDownloadOptions(downloadOptions.filter(item => item !== option));
    } else {
      setDownloadOptions([...downloadOptions, option]);
    }
  };

  const handleSupportMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSupportMessage(e.target.value);
  };

  const handleDeactivateAccount = () => {
    // In a real app, this would call an API to deactivate the account
    alert(`Your account has been deactivated for ${deactivationPeriod === '30days' ? '30 days' : '90 days'}`);
    setShowDeactivateModal(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleDownloadData = () => {
    // In a real app, this would trigger data download
    alert(`Your data (${downloadOptions.join(', ')}) will be prepared and emailed to you within 48 hours.`);
    setShowDownloadDataModal(false);
  };

  const handleSendSupportRequest = () => {
    // In a real app, this would send the support request
    alert('Your support request has been submitted. We will contact you shortly.');
    setSupportMessage('');
    setShowSupportModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (!confirmed) {
      alert("Please confirm that you understand this action is permanent");
      return;
    }
    
    setShowConfirmation(true);
  };

  const handleFinalConfirmation = () => {
    // Here would be the actual account deletion logic
    alert("Your account has been scheduled for deletion. You will receive a confirmation email shortly.");
    // Redirect to login page or confirmation page
    window.location.href = '/login';
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden dark:border dark:border-dark-border transition-colors">
              <div className="space-y-1 p-2">
                <Link 
                  to="/account" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Account</span>
                </Link>
                
                <Link 
                  to="/notification" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Notification</span>
                </Link>
                
                <Link 
                  to="/privacy-and-safety" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Privacy and safety</span>
                </Link>
                
                <Link 
                  to="/communications" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Communications</span>
                </Link>
                
                <Link 
                  to="/messaging" 
                  className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md transition-colors"
                >
                  <div className="mr-3 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium dark:text-white">Messaging</span>
                </Link>
                
                <Link 
                  to="/close-account" 
                  className="flex items-center p-3 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-md transition-colors"
                >
                  <div className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <span className="font-medium">Close account</span>
                </Link>
              </div>
              
              <div className="border-t dark:border-dark-border p-4 text-center">
                <Link to="/profile" className="text-blue-500 dark:text-blue-400 hover:underline text-sm">
                  View Profile
                </Link>
              </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex justify-center space-x-2">
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/settings" className="hover:underline">Settings</Link>
                <Link to="/support" className="hover:underline">Support</Link>
              </div>
              <div className="flex justify-center space-x-2">
                <Link to="/docs" className="hover:underline">Docs</Link>
                <Link to="/help" className="hover:underline">Help</Link>
                <Link to="/privacy" className="hover:underline">Privacy & terms</Link>
              </div>
              <div className="mt-1">
                &copy;2024 Wesbestica
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-6">
            {/* Close Account section */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h1 className="text-xl font-bold text-red-500 dark:text-red-400">Close Your Account</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  We're sorry to see you go. Before you close your account, please consider the following information:
                </p>
                <ul className="list-disc ml-5 mt-3 text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Closing your account will permanently delete all your data, including posts, connections, and messages.</li>
                  <li>Your profile will no longer be visible to other users.</li>
                  <li>You won't be able to reactivate your account once it's deleted.</li>
                  <li>If you'd like to take a break instead, consider temporarily deactivating your account.</li>
                </ul>
              </div>
              
              {!showConfirmation ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Please tell us why you're leaving
                    </label>
                    <select 
                      className="w-full border border-gray-300 dark:border-dark-border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors" 
                      value={reason}
                      onChange={handleReasonChange}
                      required
                    >
                      <option value="">Select a reason</option>
                      <option value="usability">I find the platform difficult to use</option>
                      <option value="no-value">I don't get value from the platform</option>
                      <option value="spam">I receive too many unwanted messages</option>
                      <option value="privacy">I have privacy concerns</option>
                      <option value="temp">I'm taking a temporary break</option>
                      <option value="alternative">I found an alternative platform</option>
                      <option value="other">Other (please specify)</option>
                    </select>
                  </div>
                  
                  {reason === 'other' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Please specify your reason
                      </label>
                      <textarea 
                        className="w-full border border-gray-300 dark:border-dark-border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors" 
                        rows={3}
                        value={customReason}
                        onChange={handleCustomReasonChange}
                        required
                      ></textarea>
                    </div>
                  )}
                  
                  <div className="border-t dark:border-dark-border pt-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Confirm with your password
                    </label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 dark:border-dark-border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors" 
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Re-enter your password
                    </label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 dark:border-dark-border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors" 
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="confirm"
                        name="confirm"
                        type="checkbox"
                        checked={confirmed}
                        onChange={handleConfirmedChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded dark:bg-dark-bg transition-colors"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="confirm" className="font-medium text-gray-700 dark:text-gray-200">
                        I understand that this action is permanent and cannot be undone
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-5">
                    <Link to="/account" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Close Account
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900 rounded-md p-4 transition-colors">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="ml-3 text-lg font-medium text-red-800 dark:text-red-300">Final Confirmation</h3>
                  </div>
                  <p className="text-red-700 dark:text-red-300 mb-4">
                    Are you absolutely sure you want to close your account? This action cannot be undone and all your data will be permanently deleted.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Go Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalConfirmation}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Yes, Close My Account
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Additional resources */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h2 className="text-lg font-medium mb-4 dark:text-white">Other options to consider</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-blue-100 dark:border-blue-900/50 rounded-lg bg-blue-50 dark:bg-blue-900/20 transition-colors">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Temporarily deactivate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Take a break without losing your data. Your profile will be hidden until you log in again.
                  </p>
                  <button 
                    onClick={() => setShowDeactivateModal(true)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                  >
                    Deactivate instead →
                  </button>
                </div>
                
                <div className="p-4 border border-purple-100 dark:border-purple-900/50 rounded-lg bg-purple-50 dark:bg-purple-900/20 transition-colors">
                  <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Download your data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Get a copy of your data before deleting your account.
                  </p>
                  <button 
                    onClick={() => setShowDownloadDataModal(true)}
                    className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
                  >
                    Download your data →
                  </button>
                </div>
              </div>
            </div>
            
            {/* Help & Support */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h2 className="text-lg font-medium mb-2 dark:text-white">Need help?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you're experiencing issues with your account, our support team is here to help.
              </p>
              <button 
                onClick={() => setShowSupportModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Contact Support
              </button>
            </div>
            
            {/* Action buttons */}
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
              <h2 className="text-lg font-medium mb-4 dark:text-white">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setShowDeactivateModal(true)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                  Deactivate Account
                </button>
                <button 
                  onClick={() => setShowDownloadDataModal(true)}
                  className="px-4 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-md hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors"
                >
                  Download Your Data
                </button>
                <button 
                  onClick={() => setShowSupportModal(true)}
                  className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                >
                  Get Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Temporarily Deactivate Account</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your account will be hidden from other users, but you can reactivate it at any time by logging back in.
            </p>
            
            <div className="space-y-4 mb-6">
              <p className="font-medium dark:text-white">How long do you want to deactivate your account?</p>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="30days" 
                  name="deactivationPeriod" 
                  value="30days"
                  checked={deactivationPeriod === '30days'}
                  onChange={handleDeactivationPeriodChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="30days" className="ml-2 block text-sm dark:text-white">
                  30 days
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="90days" 
                  name="deactivationPeriod" 
                  value="90days"
                  checked={deactivationPeriod === '90days'}
                  onChange={handleDeactivationPeriodChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="90days" className="ml-2 block text-sm dark:text-white">
                  90 days
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeactivateModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeactivateAccount}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Download Data Modal */}
      {showDownloadDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Download Your Data</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Select what data you'd like to download. We'll prepare your data and email you when it's ready.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="posts" 
                  checked={downloadOptions.includes('posts')}
                  onChange={() => handleDownloadOptionChange('posts')}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="posts" className="ml-2 block text-sm">
                  <span className="font-medium dark:text-white">Posts and activity</span>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    All your posts, comments, reactions, and other activity
                  </p>
                </label>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="profile" 
                  checked={downloadOptions.includes('profile')}
                  onChange={() => handleDownloadOptionChange('profile')}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="profile" className="ml-2 block text-sm">
                  <span className="font-medium dark:text-white">Profile information</span>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Your profile details, settings, and preferences
                  </p>
                </label>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="connections" 
                  checked={downloadOptions.includes('connections')}
                  onChange={() => handleDownloadOptionChange('connections')}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="connections" className="ml-2 block text-sm">
                  <span className="font-medium dark:text-white">Connections</span>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Your connections and network information
                  </p>
                </label>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="messages" 
                  checked={downloadOptions.includes('messages')}
                  onChange={() => handleDownloadOptionChange('messages')}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="messages" className="ml-2 block text-sm">
                  <span className="font-medium dark:text-white">Messages</span>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Your private messages and conversations
                  </p>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDownloadDataModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleDownloadData}
                className="px-4 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-md hover:bg-purple-600 dark:hover:bg-purple-700"
              >
                Request Download
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Contact Support</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Describe the issue you're experiencing, and our support team will get back to you as soon as possible.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  How can we help you?
                </label>
                <textarea 
                  className="w-full border border-gray-300 dark:border-dark-border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors" 
                  rows={4}
                  value={supportMessage}
                  onChange={handleSupportMessageChange}
                  placeholder="Describe your issue in detail..."
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowSupportModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendSupportRequest}
                className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-700"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseAccountPage;