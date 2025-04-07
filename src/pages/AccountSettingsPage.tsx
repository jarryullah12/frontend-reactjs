import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const AccountSettingsPage: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: 'Sam',
    lastName: 'Lanson',
    additionalName: '',
    userName: '@samlanson',
    birthday: '12/12/1990',
    allowTeamAdd: true,
    phoneNumber: '(678) 324-1251',
    email: 'sam@webestica.com',
    overview: 'Interested has all Devonshire difficulty gay assistance joy. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed. Moderate do subjects to distance.'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/72.jpg');
  const [activeSection, setActiveSection] = useState('account');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  
  // Define initial sections
  const initialSections = [
    'export', 
    'verify', 
    'link', 
    'security'
  ];
  const [visibleSections, setVisibleSections] = useState<string[]>(initialSections);
  
  // For removal confirmation
  const [sectionToRemove, setSectionToRemove] = useState<string | null>(null);
  
  // Debug effect to monitor section changes
  useEffect(() => {
    console.log('Visible sections updated:', visibleSections);
  }, [visibleSections]);

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving user data:', userData);
    alert('Profile information saved successfully!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating password:', passwords);
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    
    alert('Password updated successfully!');
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = (type: string) => {
    setActionType(type);
    setShowActionModal(true);
  };

  const closeActionModal = () => {
    setShowActionModal(false);
    setActionType('');
    setSectionToRemove(null);
  };

  // Direct removal without confirmation
  const removeSection = (sectionId: string) => {
    console.log(`Removing section: ${sectionId}`);
    setVisibleSections(prev => prev.filter(id => id !== sectionId));
    // Show feedback
    alert(`Section "${sectionId}" has been removed`);
  };

  // Show confirmation modal for removal
  const confirmRemoveSection = (sectionId: string) => {
    setSectionToRemove(sectionId);
    setShowActionModal(true);
  };

  // Handle action execution
  const executeAction = () => {
    if (sectionToRemove) {
      removeSection(sectionToRemove);
      setSectionToRemove(null);
    } else if (actionType) {
      switch(actionType) {
        case 'export':
          alert('Your data is being exported. You will receive an email when it is ready.');
          break;
        case 'verify':
          alert('Verification code sent to your email. Please check your inbox.');
          break;
        case 'link':
          alert('Redirecting to account linking page...');
          break;
        case 'security':
          alert('Security check initiated. Please follow the instructions sent to your email.');
          break;
        default:
          break;
      }
    }
    closeActionModal();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="bg-white dark:bg-dark-primary rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Account Settings</h1>
            
            <div className="flex flex-col lg:flex-row">
              <div className="w-full">
                {activeSection === 'account' && (
                  <>
                    {/* Change password section */}
                    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6 dark:border dark:border-dark-border transition-colors">
                      <h2 className="text-xl font-bold mb-4 dark:text-white">Change your password</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">Ensure your account is using a long, random password to stay secure.</p>
                      
                      <form onSubmit={handleUpdatePassword} className="mb-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-200 mb-1">Current password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors"
                            value={passwords.currentPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-200 mb-1">New password</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"}
                              name="newPassword"
                              placeholder="Enter new password"
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors"
                              value={passwords.newPassword}
                              onChange={handlePasswordChange}
                            />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 2.944a9.953 9.953 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-gray-700 dark:text-gray-200 mb-1">Confirm new password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white transition-colors"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <button 
                            type="submit" 
                            className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                          >
                            Update password
                          </button>
                        </div>
                      </form>
                    </div>
                    
                    {/* Empty space filler to ensure full page height */}
                    <div className="flex-grow min-h-[400px]"></div>
                    
                    {/* Action Modal */}
                    {showActionModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold dark:text-white">
                              {sectionToRemove ? 'Remove Section' : (
                                actionType === 'export' ? 'Export Your Data' :
                                actionType === 'verify' ? 'Verify Account' :
                                actionType === 'link' ? 'Linked Accounts' :
                                actionType === 'security' ? 'Security Check' : ''
                              )}
                            </h3>
                            <button 
                              onClick={closeActionModal}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="mb-6">
                            {sectionToRemove && (
                              <p className="text-gray-600 dark:text-gray-300">
                                Are you sure you want to remove this section? You can add it back later from the settings menu.
                              </p>
                            )}
                            {!sectionToRemove && actionType === 'export' && (
                              <p className="text-gray-600 dark:text-gray-300">
                                We will prepare a download with all your account data. This may take some time depending on the amount of data. You'll receive an email when your export is ready.
                              </p>
                            )}
                            {!sectionToRemove && actionType === 'verify' && (
                              <p className="text-gray-600 dark:text-gray-300">
                                To verify your account, we'll send a verification code to your email address. Enter the code to complete verification.
                              </p>
                            )}
                            {!sectionToRemove && actionType === 'link' && (
                              <p className="text-gray-600 dark:text-gray-300">
                                Connect your account with other services for easier sign-in and enhanced features.
                              </p>
                            )}
                            {!sectionToRemove && actionType === 'security' && (
                              <p className="text-gray-600 dark:text-gray-300">
                                We'll perform a security check on your account to ensure it's protected. This includes reviewing recent activity and security settings.
                              </p>
                            )}
                          </div>
                          
                          <div className="flex justify-end space-x-3">
                            <button 
                              onClick={closeActionModal}
                              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={executeAction}
                              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                            >
                              {sectionToRemove ? 'Remove' : 'Continue'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSettingsPage;