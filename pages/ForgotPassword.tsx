import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../App';
import { getSupabase } from '../services/supabase';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [retrievedPassword, setRetrievedPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setRetrievedPassword(null);
    
    const supabase = getSupabase();
    
    try {
      // Look for the user in the profiles table which we've updated to store plain_password
      const { data, error } = await supabase
        .from('profiles')
        .select('plain_password')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('User with this email not found or has not logged in recently.');
        }
        if (error.message?.includes('column "plain_password" does not exist')) {
          throw new Error('Database Error: The "plain_password" column is missing. Please run the SQL migration in Supabase.');
        }
        throw error;
      }

      if (data?.plain_password) {
        setRetrievedPassword(data.plain_password);
      } else {
        throw new Error('No saved password found for this user. They must login once first.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to retrieve password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex justify-center mb-6">
          <Logo size="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-2 text-center text-slate-900 dark:text-white">Retrieve Password</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8 font-medium">
          {retrievedPassword 
            ? 'Success! Your password has been retrieved.' 
            : 'Enter your email address to see your password instantly.'}
        </p>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-800 text-center">
            {errorMsg}
          </div>
        )}
        
        {retrievedPassword ? (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-6 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
              <span className="block text-xs font-black uppercase tracking-widest mb-2 opacity-70">Your Password</span>
              <span className="text-2xl font-black tracking-wider font-mono">{retrievedPassword}</span>
            </div>
            
            <Link 
              to="/login" 
              className="block w-full bg-blue-600 text-white py-4 rounded-xl font-black text-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 dark:shadow-none"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 ml-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl p-3 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-600/20 outline-none transition" 
                placeholder="you@example.com" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-100 dark:shadow-none mt-4 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Find Password'
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Remember your password?
            <Link to="/login" className="text-blue-600 dark:text-blue-500 font-bold ml-1 hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
