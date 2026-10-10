import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuthSession, getSupabase } from '../services/supabase';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getAuthSession();
        if (session?.user) setUser(session.user);
      } catch (err) {
        console.warn('Payment auth check failed:', err);
      }
    };
    fetchUser();
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to purchase a plan.");
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    try {
      const supabase = getSupabase();
      await supabase.from('profiles').update({ role: 'pro' }).eq('id', user.id);
      
      // Update local storage user if it exists
      const localUserStr = localStorage.getItem('user');
      if (localUserStr) {
        const localUser = JSON.parse(localUserStr);
        localUser.role = 'pro';
        localStorage.setItem('user', JSON.stringify(localUser));
      }

      // We trigger a global auth event so the app UI updates if needed
      window.dispatchEvent(new Event('authStatusChanged'));
    } catch (err) {
      console.error(err);
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/builder');
    }, 1500);
  };

  const features = [
    'Unlimited Resumes',
    'All Premium Templates',
    'Unlimited Cover Letters',
    'Unlimited ATS Checker',
    'AI Writing Assistant',
    'Priority Support',
    '12 Professional Fonts',
    '7 Color Themes',
    'Multiple Page Resumes',
    'Icons for Interests & Causes',
    'Custom Layouts',
    'PDF Download'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button onClick={() => navigate('/pricing')} className="flex items-center text-slate-500 hover:text-slate-900 transition font-bold text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Pricing
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Order Summary */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Order Summary</h2>
              
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
                    👑
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Premium Access</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Unlock all premium features</p>
                </div>
                <div className="ml-auto font-black text-slate-900 dark:text-white text-lg">
                  $7.99
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {features.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-300 font-medium">
                    <svg className="w-4 h-4 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="text-slate-500 dark:text-slate-400 font-bold">Total due today</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-500">$7.99</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure 256-bit SSL Encrypted
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Payment Details</h2>
                <div className="flex gap-2">
                    {/* Visa Logo */}
                    <div className="h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 flex items-center justify-center">
                       <svg className="h-4 w-auto" viewBox="0 0 36 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2353 0.690918L9.04944 10.457H5.97827L3.65991 2.25708C3.52441 1.73779 3.41162 1.57983 2.98291 1.35376C2.26074 0.970215 1.06421 0.699219 0.160889 0.518555L0.251221 0.29248H4.69116C5.27783 0.29248 5.82007 0.676514 5.95557 1.37646L7.08398 7.42773L10.0967 0.29248H13.2353V0.690918Z" fill="#1434CB"/>
                        <path d="M18.7297 7.63098C18.7297 4.70898 14.6565 4.55054 14.6791 3.2644C14.7017 2.81299 15.1304 2.33875 16.0781 2.22595C16.552 2.15784 17.8271 2.11267 19.0457 2.6543L19.6099 1.30908C18.8425 1.03809 17.8496 0.789551 16.5967 0.789551C13.3926 0.789551 11.1357 2.45166 11.1357 4.93481C11.1357 6.81836 12.8735 7.85669 14.1826 8.48853C15.5369 9.14307 15.9883 9.54932 15.9883 10.1587C15.9883 11.0837 14.9048 11.4902 13.8894 11.4902C12.1064 11.4902 11.0454 11.016 10.2332 10.6547L9.64624 12.0538C10.4136 12.4152 11.8357 12.7535 13.438 12.7535C16.8232 12.7535 18.7297 11.1287 18.7297 7.63098Z" fill="#1434CB"/>
                        <path d="M24.7778 0.690918L22.6108 10.457H19.5645L21.7314 0.690918H24.7778Z" fill="#1434CB"/>
                        <path d="M31.2981 0.690918L28.5222 7.51831L27.1453 0.690918H24.0325L27.0549 12.7538H30.1472L34.3445 0.690918H31.2981Z" fill="#1434CB"/>
                       </svg>
                    </div>
                    {/* Mastercard Logo */}
                    <div className="h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 flex items-center justify-center">
                        <svg className="h-5 w-auto" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="35" height="26.3158" fill="white"/>
                            <path d="M12.9868 13.1579C12.9868 18.5714 15.5878 23.3616 19.554 26.3158H2.43421C1.08985 26.3158 0 25.2105 0 23.8471V2.46869C0 1.10531 1.08985 0 2.43421 0H19.554C15.5878 2.95422 12.9868 7.74441 12.9868 13.1579Z" fill="#FF5F00"/>
                            <path d="M22.0132 13.1579C22.0132 7.74441 19.4122 2.95422 15.446 0H32.5658C33.9102 0 35 1.10531 35 2.46869V23.8471C35 25.2105 33.9102 26.3158 32.5658 26.3158H15.446C19.4122 23.3616 22.0132 18.5714 22.0132 13.1579Z" fill="#EB001B"/>
                            <path d="M22.0132 13.1579C22.0132 18.5714 19.4122 23.3616 15.446 26.3158C11.4798 23.3616 8.87878 18.5714 8.87878 13.1579C8.87878 7.74441 11.4798 2.95422 15.446 0C19.4122 2.95422 22.0132 7.74441 22.0132 13.1579Z" fill="#F79E1B"/>
                        </svg>
                    </div>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Cardholder Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 outline-none transition font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Card Number</label>
                  <div className="relative">
                    <input 
                        type="text" 
                        required 
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 outline-none transition font-medium pl-12 text-slate-900 dark:text-white"
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Expiry Date</label>
                    <input 
                        type="text" 
                        required 
                        placeholder="MM / YY"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 outline-none transition font-medium text-center text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">CVC</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            required 
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 outline-none transition font-medium text-center text-slate-900 dark:text-white"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                        </>
                    ) : (
                        <>Pay Now</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
