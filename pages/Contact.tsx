import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xeedqljv");

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <SEO 
        title="Contact Us - ProResumeLab"
        description="Have questions? Get in touch with the ProResumeLab team for support, feedback, or business inquiries."
      />
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Contact Us</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We'd love to hear from you. Whether you have questions about features, pricing, or just want to say hello, our team is here to help.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 p-10 md:p-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Send a Message</h2>
          {state.succeeded ? (
            <div className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400">Thanks for reaching out. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
                  <input 
                    id="firstName"
                    type="text" 
                    name="firstName"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-blue-600/10 outline-none transition" 
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
                  <input 
                     id="lastName"
                     type="text" 
                     name="lastName"
                     className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-blue-600/10 outline-none transition" 
                     placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  name="email"
                  required
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-blue-600/10 outline-none transition" 
                  placeholder="john@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs ml-1" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={5} 
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-blue-600/10 outline-none transition"
                  placeholder="How can we help you?"
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs ml-1" />
                <p className="text-xs text-slate-500 ml-1 mt-1 font-medium">We usually respond within 1-2 business days.</p>
              </div>
              <button type="submit" disabled={state.submitting} className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100 dark:shadow-none flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                {state.submitting ? 'Sending...' : 'Send Message'}
                {!state.submitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 p-10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 rounded-2xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Our Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Bhotto Calony, Sargodha Road<br/>Faisalabad, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-2xl shrink-0">
                   <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Call Us</h4>
                  <a href="tel:+923356471303" className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 transition tracking-wide">+92 335 6471303</a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500 rounded-2xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email Us</h4>
                  <a href="mailto:support@proresumelab.com" className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 transition">support@proresumelab.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 p-2 overflow-hidden h-80">
             <iframe 
                src="https://maps.google.com/maps?q=Bhotto+Colony,+Sargodha+Road,+Faisalabad,+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '2.5rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
