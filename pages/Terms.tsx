import React from 'react';
import { Shield, FileText, UserCheck, Lock, Scale, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: Shield,
      content: 'By accessing or using ProResumeLab, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
    },
    {
      id: 'service',
      title: '2. Description of Service',
      icon: FileText,
      content: 'ProResumeLab provides an specialized online platform for creating, editing, and downloading professional resumes, cover letters, and CVs. We also offer AI-powered ATS checking tools, font customization, and professional designer templates. We reserve the right to modify or discontinue any feature at our sole discretion.'
    },
    {
      id: 'subscription',
      title: '3. Subscriptions and Payments',
      icon: Scale,
      content: 'Certain features require a paid subscription. All fees are non-refundable unless required by law. We use third-party payment processors (like Stripe) to handle billing. By subscribing, you agree to our recurring billing terms until you cancel through your account settings.'
    },
    {
      id: 'accounts',
      title: '4. User Accounts',
      icon: UserCheck,
      content: 'To access premium features, you must create an account. You are responsible for safeguarding your password and for any activities or actions under your account. You agree not to disclose your password to any third party.'
    },
    {
      id: 'content',
      title: '5. User Content',
      icon: FileText,
      content: 'You retain all rights to the information you input into ProResumeLab. However, by using our service, you grant us a worldwide, non-exclusive license to host, store, and process your content solely for the purpose of providing the service to you.'
    },
    {
      id: 'termination',
      title: '6. Termination',
      icon: AlertCircle,
      content: 'We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.'
    },
    {
      id: 'disclaimer',
      title: '7. Limitation of Liability',
      icon: Lock,
      content: 'In no event shall ProResumeLab, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our services.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <SEO 
        title="Terms of Service - ProResumeLab"
        description="Our terms of service outline the rules and regulations for using the ProResumeLab platform."
      />
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-slate-500 font-bold">Last updated: May 17, 2026</p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <section 
            key={section.id} 
            className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                <section.icon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{section.title}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Terms;
