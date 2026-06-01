import React, { useState } from 'react';
import { getAuthSession, getSupabase } from '../services/supabase';

const DebugAuth: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setOutput('Testing Supabase connection...');
    setLoading(true);
    try {
      getSupabase();
      console.log('✓ Supabase instance created');
      setOutput(prev => prev + '\n✓ Supabase instance created');

      // Test session
      const session = await getAuthSession();
      console.log('✓ Session check passed. Session:', !!session);
      setOutput(prev => prev + '\n✓ Session check passed. Session:', !!session);

      // Test env variables
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      console.log('URL:', url?.substring(0, 20) + '...', 'Key:', key?.substring(0, 20) + '...');
      setOutput(prev => prev + '\n✓ Env vars loaded:\nURL: ' + url?.substring(0, 30) + '\nKey: ' + key?.substring(0, 30));

    } catch (err: any) {
      console.error('Error:', err);
      setOutput(prev => prev + '\n✗ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testSignIn = async () => {
    setOutput('Testing sign in...');
    setLoading(true);
    try {
      const supabase = getSupabase();
      const email = prompt('Enter email to test:');
      const password = prompt('Enter password:');
      
      if (!email || !password) {
        setOutput('Cancelled');
        setLoading(false);
        return;
      }

      console.log('Attempting signin with:', email);
      setOutput(prev => prev + '\nAttempting signin with: ' + email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('SignIn error:', error);
        setOutput(prev => prev + '\n✗ Error: ' + error.message);
      } else {
        console.log('✓ Sign in successful:', data.user?.email);
        setOutput(prev => prev + '\n✓ Sign in successful: ' + data.user?.email);
      }
    } catch (err: any) {
      console.error('Error:', err);
      setOutput(prev => prev + '\n✗ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testListUsers = async () => {
    setOutput('Checking profiles table...');
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from('profiles').select('id, email, role').limit(5);
      
      if (error) {
        setOutput(prev => prev + '\n✗ Error: ' + error.message);
      } else {
        setOutput(prev => prev + '\n✓ Found ' + (data?.length || 0) + ' profiles:\n' + JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setOutput(prev => prev + '\n✗ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetAuth = () => {
    localStorage.clear();
    // Also clear specific supabase keys just in case
    Object.keys(localStorage).forEach(key => {
      if (key.includes('supabase') || key.includes('auth') || key.includes('proresumelab')) {
        localStorage.removeItem(key);
      }
    });
    setOutput('Local storage cleared. Please refresh the page.');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-lg border">
      <h1 className="text-3xl font-bold mb-6">🔍 Debug Auth</h1>

      <div className="space-y-4 mb-6">
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test Supabase Connection
        </button>
        
        <button
          onClick={testSignIn}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Test Sign In
        </button>

        <button
          onClick={testListUsers}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Check Profiles Table
        </button>

        <button
          onClick={resetAuth}
          className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset All Auth Data (Local Storage)
        </button>
      </div>

      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded text-sm overflow-auto max-h-96 whitespace-pre-wrap">
        {output || 'Click a button to test...'}
      </pre>
    </div>
  );
};

export default DebugAuth;
