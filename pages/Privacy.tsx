import React from 'react';
import { Database, Eye, Lock, Globe, UserCheck, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  const sections = [
    {
      id: 'collection',
      title: '1. Information We Collect',
      icon: Database,
      content: 'We collect information you explicitly provide to us when creating an account or building a resume, including your name, email address, phone number, employment history, and education details. We also collect usage data (IP address, browser type) to improve user experience.'
    },
    {
      id: 'usage',
      title: '2. How We Use Your Information',
      icon: Eye,
      content: 'We use the information we collect to provide and maintain our services, to properly format and generate your resume documents, and to communicate with you regarding your account. We may also use this data for internal analytics to optimize our AI models.'
    },
    {
      id: 'ai-processing',
      title: '3. AI Data Processing',
      icon: ShieldCheck,
      content: 'ProResumeLab uses Google Gemini AI to analyze and generate content. When you use AI features, your data is processed through our secure API. We do not sell your personal resume data to third-party advertisers.'
    },
    {
      id: 'security',
      title: '4. Data Storage and Security',
      icon: Lock,
      content: 'Your resume data is stored securely. We implement industry-standard encryption and security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      id: 'retention',
      title: '5. Data Retention',
      icon: Globe,
      content: 'We retain your information as long as your account is active. You can request account deletion at any time, which will remove all your personal data, resumes, and cover letters from our servers within 30 days.'
    },
    {
      id: 'rights',
      title: '6. Your Rights',
      icon: UserCheck,
      content: 'You have the right to access, update, or delete your personal information. If you are in the EU, you have additional rights under GDPR, including the right to data portability and the right to object to certain processing.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <SEO 
        title="Privacy Policy - ProResumeLab"
        description="Read our privacy policy to understand how we protect your personal resume data and maintain your privacy."
      />
      <div className="mb-16 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shrink-0">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 font-bold">Last updated: May 17, 2026</p>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section 
            key={section.id} 
            className="group relative p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-blue-100 dark:hover:border-blue-900"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-500 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <section.icon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{section.title}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
              {section.content}
            </p>
          </section>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-white shadow-xl">
        <h3 className="text-2xl font-black mb-4">Questions about your data?</h3>
        <p className="opacity-90 leading-relaxed mb-8 text-lg">If you have any questions about this Privacy Policy, your data rights, or how we protect your information, please reach out to our team.</p>
        <button className="bg-white text-blue-600 px-10 py-4 rounded-[1.5rem] font-black hover:bg-slate-50 transition shadow-lg">
          Contact Privacy Team
        </button>
      </div>
    </div>
  );
};

export default Privacy;
