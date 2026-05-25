
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ResumeData } from '../types';
import { INITIAL_RESUME_DATA } from '../constants';
import { Settings as SettingsIcon, User as UserIcon, Bell, Lock, Eye, Moon, Sun, Globe, Shield, FileText, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { resumeService } from '../services/resumeService';
import { getAuthenticatedUser, getSupabase } from '../services/supabase';

const Settings: React.FC<{ user: User | null }> = ({ user }) => {
  const [activeSection, setActiveSection] = useState('documents');
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Profile State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const authUser = await getAuthenticatedUser(3, 250);
      if (!authUser || authUser.id !== user.id) return;

      const supabase = getSupabase();
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setFullName(data.name || user.name || '');
        setEmail(data.email || user.email || '');
        setBio(data.bio || '');
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const authUser = await getAuthenticatedUser(3, 250);
        if (!authUser || authUser.id !== user.id) {
          setResumes([]);
          return;
        }

        const data = await resumeService.getResumes(user.id, user.email);
        setResumes(data);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeSection === 'documents') {
      fetchResumes();
    }
  }, [user, activeSection]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const supabase = getSupabase();
    
    setIsUpdating(true);
    setUpdateMessage({ text: '', type: '' });

    try {
      // 1. Update/Insert public profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          email: user.email,
          name: fullName,
          bio: bio
        });

      if (profileError) throw profileError;

      // 2. Update Auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (authError) throw authError;

      setUpdateMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err: any) {
      setUpdateMessage({ text: err.message || 'Failed to update profile', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [securityMessage, setSecurityMessage] = useState({ text: '', type: '' });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    const supabase = getSupabase();
    
    setPasswordUpdating(true);
    setSecurityMessage({ text: '', type: '' });

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setSecurityMessage({ text: 'Password updated successfully!', type: 'success' });
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (err: any) {
      setSecurityMessage({ text: err.message || 'Failed to update password', type: 'error' });
    } finally {
      setPasswordUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const supabase = getSupabase();
    
    const confirmed = window.confirm('DANGER: This will PERMANENTLY delete all your saved resumes and profile information. This action is irreversible. Are you absolutely sure?');
    if (!confirmed) return;

    const finalConfirm = window.prompt('To confirm, please type "DELETE" below:');
    if (finalConfirm !== 'DELETE') return;

    setIsLoading(true);
    try {
      // 1. Delete resumes (Explicitly to ensure they are gone)
      const { error: resumeError } = await supabase.from('resumes').delete().eq('user_id', user.id);
      if (resumeError) throw resumeError;
      
      // 2. Delete profile
      const { error: profileError } = await supabase.from('profiles').delete().eq('id', user.id);
      if (profileError) throw profileError;
      
      // 3. Log out 
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      alert('Your data has been successfully erased. Your account is now deactivated.');
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('Error during deletion: ' + (err.message || 'Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!user) return;
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const success = await resumeService.deleteResume(id, user.id, user.email);
      if (success) {
        setResumes(prev => prev.filter(r => r.id !== id));
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const sections = [
    { id: 'documents', name: 'My Documents', icon: <FileText size={20} /> },
    { id: 'profile', name: 'Profile Settings', icon: <UserIcon size={20} /> },
    { id: 'appearance', name: 'Appearance', icon: <Eye size={20} /> },
    { id: 'account', name: 'Security', icon: <Lock size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <SettingsIcon className="text-blue-600" /> Settings
          </h1>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800'
              }`}
            >
              {section.icon}
              {section.name}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-grow bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none min-h-[600px]">
          {activeSection === 'documents' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-8">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">My Resumes/CV</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your professional documents</p>
                 </div>
                 <button 
                  onClick={() => navigate('/builder')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none"
                >
                  <Plus size={20} /> New Resume/CV
                </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {isLoading ? (
                   <div className="col-span-2 py-20 text-center">
                     <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                     <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Fetching your documents...</p>
                   </div>
                 ) : resumes.length === 0 ? (
                   <div className="col-span-2 py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
                     <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                     <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No resumes found</h3>
                     <p className="text-slate-500 font-medium mb-8">Create your first professional resume today!</p>
                     <button 
                        onClick={() => navigate('/builder')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition"
                      >
                        Start Creating
                      </button>
                   </div>
                 ) : resumes.map((resume) => (
                   <div key={resume.id} className="group flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-transparent hover:border-blue-500/20 hover:bg-white dark:hover:bg-slate-700 transition-all">
                      <div className="w-24 h-32 bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden relative flex-shrink-0">
                        <img 
                          src={`https://picsum.photos/seed/${resume.id}/200/300`} 
                          alt={resume.title}
                          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow py-2">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-black text-slate-900 dark:text-white mb-1 truncate max-w-[150px]">{resume.title}</h3>
                            <button 
                              onClick={() => handleDeleteResume(resume.id)}
                              className="text-slate-300 hover:text-red-500 transition p-1"
                              title="Delete Resume"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last modified {new Date(resume.updated_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link 
                            to={`/builder/${resume.id}`} 
                            className="bg-blue-600/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition"
                          >
                            Edit
                          </Link>
                          <Link 
                            to={`/profile/${resume.id}`} 
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            <ExternalLink size={18} />
                          </Link>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Profile Settings</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your personal information and biography</p>
              </div>

              {updateMessage.text && (
                <div className={`p-4 rounded-xl text-sm font-bold border ${
                  updateMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' 
                    : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800'
                }`}>
                  {updateMessage.text}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      disabled
                      className="w-full p-4 bg-slate-100 dark:bg-slate-900 border border-transparent rounded-2xl text-sm font-bold text-slate-500 cursor-not-allowed outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Bio/Professional Summary</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-blue-500 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none h-32" 
                      placeholder="Tell us about your professional background..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center min-w-[200px]"
                  >
                    {isUpdating ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Interface Customization</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                      {theme === 'dark' ? <Moon className="text-blue-500" /> : <Sun className="text-yellow-500" />}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 dark:text-white">Dark Mode</h3>
                      <p className="text-xs text-slate-500 font-bold">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className={`w-14 h-8 rounded-full p-1 transition-all ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'account' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Security Settings</h2>
              
              {securityMessage.text && (
                <div className={`p-4 rounded-xl text-sm font-bold border ${
                  securityMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' 
                    : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800'
                }`}>
                  {securityMessage.text}
                </div>
              )}

              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <Lock className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Change Password</h3>
                    <p className="text-xs text-slate-500 font-bold tracking-wide uppercase">Keep your account secure with a strong password</p>
                  </div>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="mb-6 pb-6 border-b dark:border-slate-700">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.email}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-2">Verified via Supabase Auth</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">New Password</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full p-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full p-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={passwordUpdating}
                      className="w-full bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:opacity-90 transition shadow-lg dark:shadow-none min-h-[56px] flex items-center justify-center"
                    >
                      {passwordUpdating ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-12 p-8 border-2 border-red-100 dark:border-red-900/20 rounded-[2.5rem] bg-red-50/30 dark:bg-red-900/5">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={20} className="text-red-600" />
                  <h4 className="text-red-600 dark:text-red-400 font-black uppercase text-sm tracking-widest">Danger Zone</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-bold mb-6">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button 
                  onClick={handleDeleteAccount}
                  className="bg-white dark:bg-slate-900 text-red-600 border-2 border-red-100 dark:border-red-900/30 px-6 py-3 rounded-2xl font-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center gap-2 group shadow-sm shadow-red-100 dark:shadow-none"
                >
                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  Delete My Account Permanently
                </button>
              </div>
            </div>
          )}

          {activeSection !== 'profile' && activeSection !== 'appearance' && activeSection !== 'documents' && activeSection !== 'account' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                 {sections.find(s => s.id === activeSection)?.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                {sections.find(s => s.id === activeSection)?.name} Settings
              </h3>
              <p className="text-slate-500 font-bold max-w-xs uppercase text-[10px] tracking-widest underline decoration-blue-500 underline-offset-4">Coming Soon in Next Update</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
