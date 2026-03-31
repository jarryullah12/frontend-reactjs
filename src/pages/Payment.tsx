import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, CheckCircle2, ArrowLeft, Loader2, X } from 'lucide-react';
import { useAuthStore } from '@/store';
import { supabase } from '@/lib/supabase';
import { SEO } from '../components/SEO';

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get plan details from navigation state or default to Pro
  const plan = location.state?.plan || {
    name: 'Pro',
    price: 8,
    period: 'monthly'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    try {
      setIsSubmitting(true);

      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('screenshot')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('screenshot')
        .getPublicUrl(fileName);

      // Insert into payments table
      const { error: insertError } = await supabase
        .from('payments')
        .insert([{
          user_id: user.id,
          user_email: user.email,
          screenshot: publicUrl,
          status: 'pending',
          date: new Date().toISOString(),
          plan: plan.name
        }]);

      if (insertError) throw insertError;

      // Also update user record with payment proof for backward compatibility
      const { error: updateError } = await supabase
        .from('users')
        .update({ payment_proof: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/tools');
      }, 3000);

    } catch (error: any) {
      console.error('Payment submission error:', error);
      let errorMessage = 'Failed to submit payment proof. ';
      
      if (error.message?.includes('bucket')) {
        errorMessage += 'Storage bucket "screenshot" not found. Please contact support.';
      } else if (error.message?.includes('permission') || error.status === 403) {
        errorMessage += 'Permission denied. Please make sure you are logged in.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="Payment - OptiSEO" description="Complete your payment via Easypaisa." noindex />
      
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/pricing')}
          className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-2">Complete Your Payment</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
              We need a secure payment You need to verify your identity by Downloading Binance App from Play Store/App Store
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                How to Pay Using QR Code (Binance)
              </h3>
              <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300">
                
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 1: Download the App</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Go to Google Play Store or Apple App Store</li>
                    <li>Search for Binance</li>
                    <li>Install and open the app</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 2: Create an Account</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Sign up using your email or phone number</li>
                    <li>Verify your account with OTP</li>
                    <li>Complete basic identity verification</li>
                  </ul>
                  <img 
                    src="https://i.postimg.cc/fykpSnzB/1_(5).jpg" 
                    alt="Binance Verification" 
                    className="rounded-lg max-w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("https://i.postimg.cc/fykpSnzB/1_(5).jpg")}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 3: Add Funds</h4>
                  <p className="mb-3">Deposit crypto into your Binance account</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <img 
                      src="https://i.postimg.cc/LXs2DW4N/1_(8).jpg" 
                      alt="Add Funds 1" 
                      className="rounded-lg w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://i.postimg.cc/LXs2DW4N/1_(8).jpg")}
                    />
                    <img 
                      src="https://i.postimg.cc/pTdRCSVs/1_(7).jpg" 
                      alt="Add Funds 2" 
                      className="rounded-lg w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://i.postimg.cc/pTdRCSVs/1_(7).jpg")}
                    />
                    <img 
                      src="https://i.postimg.cc/LXs2DW4V/1_(6).jpg" 
                      alt="Add Funds 3" 
                      className="rounded-lg w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://i.postimg.cc/LXs2DW4V/1_(6).jpg")}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 4: Open Binance Pay</h4>
                  <p className="mb-3">Tap on “Pay” option on the home screen</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <img 
                      src="https://i.postimg.cc/cHFPJ4SP/1_(1).jpg" 
                      alt="Binance Pay 1" 
                      className="rounded-lg w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://i.postimg.cc/cHFPJ4SP/1_(1).jpg")}
                    />
                    <img 
                      src="https://i.postimg.cc/JnpSh4L9/1_(2).jpg" 
                      alt="Binance Pay 2" 
                      className="rounded-lg w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://i.postimg.cc/JnpSh4L9/1_(2).jpg")}
                    />
                  </div>
                  <p className="mb-3">This will open the QR scanner</p>
                  <img 
                    src="https://i.postimg.cc/85ZxCPG8/1_(3).jpg" 
                    alt="QR Scanner" 
                    className="rounded-lg max-w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("https://i.postimg.cc/85ZxCPG8/1_(3).jpg")}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 5: Scan the QR Code</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Click on “Scan”</li>
                    <li>Scan the QR code displayed on our website</li>
                  </ul>
                  <img 
                    src="https://i.postimg.cc/L6xhMjwk/binancepay.jpg" 
                    alt="Binance QR Code" 
                    className="rounded-lg max-w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("https://i.postimg.cc/L6xhMjwk/binancepay.jpg")}
                  />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 6: Enter Amount</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Enter the payment amount: <span className="font-bold text-[#4f39f6]">${plan.price}</span></li>
                    <li>Check details carefully</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Step 7: Confirm Payment</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Tap “Send”</li>
                    <li>Payment will be completed instantly</li>
                  </ul>
                  <p className="font-bold text-green-600 dark:text-green-400 mb-3">✅ Done!</p>
                  <p className="mb-3">You will see a confirmation message after successful payment.</p>
                  <img 
                    src="https://i.postimg.cc/02Vrq7FD/1_(4).jpg" 
                    alt="Payment Confirmation" 
                    className="rounded-lg max-w-full h-auto shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage("https://i.postimg.cc/02Vrq7FD/1_(4).jpg")}
                  />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-6 border border-yellow-200 dark:border-yellow-800/30">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-500 mb-2">Important Notes</h4>
                  <ul className="list-disc pl-5 space-y-1 text-yellow-700 dark:text-yellow-400/80">
                    <li>Make sure you have enough balance in your wallet</li>
                    <li>Double-check the recipient before sending</li>
                    <li>Payments are usually instant and non-refundable</li>
                  </ul>
                </div>

              </div>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Payment Submitted!</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Admin will Approve your Payment proof within 1-2 Days. Redirecting to tools...
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Payment Proof (Screenshot)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:border-[#4f39f6] dark:hover:border-[#4f39f6] transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                        <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-[#4f39f6] hover:text-[#4f39f6]/80 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        {file ? file.name : 'PNG, JPG up to 5MB'}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!file || isSubmitting}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#4f39f6] hover:bg-[#4f39f6]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f39f6] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Payment Proof'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
