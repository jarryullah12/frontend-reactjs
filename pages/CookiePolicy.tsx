
import React from 'react';
import { Shield } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
          <Shield className="text-blue-600 dark:text-blue-400" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Cookie Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Last updated: May 16, 2026</p>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work, or work more efficiently, as well as to provide information 
            to the owners of the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">2. How We Use Cookies</h2>
          <p>
            ProResumeLab AI uses cookies for several reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function, such as keeping you logged in.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
            <li><strong>Preference Cookies:</strong> Allow our website to remember choices you make (such as your username or language).</li>
            <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant and engaging ads.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                <tr>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Type</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="px-6 py-4 font-bold">Session Cookies</td>
                  <td className="px-6 py-4">Maintain your session during a visit.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Authentication</td>
                  <td className="px-6 py-4">Keep you signed in to your account.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Personalization</td>
                  <td className="px-6 py-4">Remember theme preferences (Dark/Light mode).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">4. Managing Cookies</h2>
          <p>
            Most web browsers allow some control of most cookies through the browser settings. To find out more 
            about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline">www.allaboutcookies.org</a>.
          </p>
          <p>
            Please note that if you disable cookies, some parts of our website may not function properly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at <a href="mailto:support@proresumelab.ai" className="text-blue-600 dark:text-blue-400 hover:underline">support@proresumelab.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
