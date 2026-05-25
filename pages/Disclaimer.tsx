import React from 'react';
import { Info, Briefcase, AlertTriangle, Scale } from 'lucide-react';

const Disclaimer: React.FC = () => {
  const sections = [
    {
      id: 'general',
      title: 'General Information',
      icon: Info,
      content: 'The information provided by ProResumeLab ("we," "us," or "our") on our website and through our resume-building tools is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind regarding the accuracy, reliability, or completeness of any information.'
    },
    {
      id: 'professional',
      title: 'Professional Advice Disclaimer',
      icon: Briefcase,
      content: 'The site cannot and does not contain professional career or legal advice. Our templates and AI tips are provided for general educational purposes only and are not a substitute for professional advice. Before taking any actions, we encourage you to consult with the appropriate career professionals.'
    },
    {
      id: 'risk',
      title: 'Use at Your Own Risk',
      icon: AlertTriangle,
      content: 'Your use of the site, its templates, ATS checker, and your reliance on any information on the site is solely at your own risk. We will not be liable for any errors or omissions in this information nor for the availability of this information.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-16 flex items-center gap-6">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-[1.5rem] flex items-center justify-center shadow-xl">
          <Scale className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Disclaimer</h1>
          <p className="text-slate-500 font-bold">Important notice for all users</p>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section 
            key={section.id} 
            className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center">
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

      <div className="mt-20 p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center">
        <p className="text-slate-500 font-medium italic">
          ProResumeLab is an AI-powered tool designed to assist in document creation. Users are responsible for the final accuracy of their generated resumes.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
