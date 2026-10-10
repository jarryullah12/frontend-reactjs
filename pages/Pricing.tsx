import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MONTHLY_PLANS } from '../constants';
import SEO from '../components/SEO';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { ResumeData } from '../types';
import { getSupabase } from '../services/supabase';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      const userStr = localStorage.getItem('user');
      const localUser = userStr ? JSON.parse(userStr) : null;
      
      const isAdmin = (user?.email === 'jarryullah46@gmail.com') || (localUser?.email === 'jarryullah46@gmail.com');
      const isPremium = localUser?.role === 'pro' || localUser?.role === 'admin' || isAdmin;
      
      setIsPro(isPremium);

      // Check for pending resume data
      const pending = localStorage.getItem('pending_resume_data');
      if (pending) {
        setResumeData(JSON.parse(pending));
      }
      
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-download-source');
    if (!element) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin: 0,
      filename: `${resumeData?.title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleDownloadWord = () => {
    const content = document.getElementById('resume-download-source')?.innerHTML;
    if (!content) return;
    const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>' + (resumeData?.title || 'Resume') + '</title></head><body>' + content + '</body></html>';
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData?.title || 'resume'}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const displayedPlans = MONTHLY_PLANS;

  return (
    <div className="py-24 bg-white dark:bg-slate-950 min-h-screen">
      <SEO 
        title="Pricing Plans - ProResumeLab"
        description="Choose the right plan for your career. Simple monthly pricing with access to AI resume builder and premium templates."
      />
      
      {/* Hidden container for rendering the resume for PDF/Word export */}
      {resumeData && (
        <div className="fixed -left-[9999px] top-0 no-print">
          <div id="resume-download-source" style={{ width: '210mm' }}>
            <TemplateRenderer data={resumeData} templateId={resumeData.templateId} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 text-center">
        {isPro && resumeData ? (
          <div className="mb-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border-2 border-blue-100 dark:border-blue-800 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Ready to Download!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">You have full access to premium features. Click below to get your resume.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleDownloadPdf}
                className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition shadow-xl shadow-red-100 dark:shadow-none flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                Download PDF
              </button>
              <button 
                onClick={handleDownloadWord}
                className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-100 dark:shadow-none flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Word
              </button>
            </div>
            <button 
              onClick={() => navigate('/builder')}
              className="mt-6 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            >
              Back to Editor
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Choose the plan that's right for your career stage.
            </p>
          </>
        )}
        
        <div className="flex justify-center items-start gap-8 flex-wrap mt-16">
          {displayedPlans.map((plan) => (
            <div key={plan.id} className={`p-8 rounded-3xl border w-full md:w-[340px] text-left flex-shrink-0 bg-white dark:bg-slate-900 ${plan.recommended ? 'border-blue-600 dark:border-blue-500 shadow-2xl relative scale-105' : 'border-gray-200 dark:border-slate-800'}`}>
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Recommended
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h2>
              {plan.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{plan.description}</p>
              )}
              <div className="mb-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-2">{plan.duration || '/mo'}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm font-medium">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                  if (plan.name === 'Free Trial') {
                    window.dispatchEvent(new Event('hideFreeTrialBanner'));
                  }
                  navigate('/payment');
                }}
                className={`w-full py-3.5 rounded-xl font-bold transition ${plan.recommended ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg shadow-blue-100 dark:shadow-none' : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700'}`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Plan Comparison Section */}
        <div className="mt-32 max-w-5xl mx-auto text-left mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">Plan Comparison</h2>
          <div className="overflow-x-auto border border-gray-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 border-b border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 font-medium text-sm w-1/2">Features</th>
                  <th className="p-6 border-b border-gray-200 dark:border-slate-800 text-center font-bold text-blue-600 dark:text-blue-500 text-lg relative bg-blue-50/40 dark:bg-slate-800/50 w-1/4 border-l">Weekly Download</th>
                  <th className="p-6 border-b border-gray-200 dark:border-slate-800 text-center font-bold text-gray-900 dark:text-white text-lg w-1/4 border-l">Monthly Download</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                  {[
                    { feature: 'Resumes & CVs', weekly: 'Unlimited', monthly: 'Unlimited' },
                    { feature: 'Premium Templates', weekly: true, monthly: true },
                    { feature: 'Pages per Resume', weekly: 'Unlimited', monthly: 'Unlimited' },
                    { feature: 'PDF & Word Export', weekly: true, monthly: true },
                    { feature: 'Cover Letter Builder', weekly: true, monthly: true },
                    { feature: 'ATS Checker', weekly: 'Basic', monthly: 'Advanced' },
                    { feature: 'Support', weekly: 'Standard', monthly: 'Priority Email' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-slate-800/30 transition border-b border-gray-200 dark:border-slate-800 last:border-0 last:rounded-b-3xl">
                      <td className="p-6 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                      
                      <td className="p-6 text-center text-gray-600 dark:text-gray-400 border-l border-gray-200 dark:border-slate-800 bg-blue-50/40 dark:bg-slate-800/50 group-hover:bg-blue-50/60 dark:group-hover:bg-slate-800/80 transition">
                        {typeof row.weekly === 'boolean' ? (row.weekly ? <CheckIcon/> : <MinusIcon/>) : <span className="font-semibold text-gray-900 dark:text-white">{row.weekly}</span>}
                      </td>

                      <td className="p-6 text-center text-gray-600 dark:text-gray-400 border-l border-gray-200 dark:border-slate-800">
                         {typeof row.monthly === 'boolean' ? (row.monthly ? <CheckIcon/> : <MinusIcon/>) : <span className="font-semibold text-gray-900 dark:text-white">{row.monthly}</span>}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

const CheckIcon = () => <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const MinusIcon = () => <svg className="w-5 h-5 text-gray-300 dark:text-slate-600 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

export default Pricing;
