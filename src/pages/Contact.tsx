<<<<<<< HEAD

import { useForm, ValidationError } from '@formspree/react';
import { PageWrapper } from '../components/PageWrapper';
import { Helmet } from 'react-helmet-async';

function ContactForm() {
  const [state, handleSubmit] = useForm("mdapqeyl");

  if (state.succeeded) {
    return <p className="text-center text-lg font-semibold text-green-600">Thanks for your message! We'll get back to you soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-600 text-sm mt-1"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-600 text-sm mt-1"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
        >
          {state.submitting ? 'Submitting...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <>
        <Helmet>
            <title>Contact Us - FinovaCalc</title>
            <meta name="description" content="Get in touch with FinovaCalc. We are here to help you with any questions or feedback you may have." />
            <link rel="canonical" href="https://www.finovacalc.com/contact" />
        </Helmet>
        <PageWrapper title="Contact Us" description="We'd love to hear from you. Fill out the form below to get in touch.">
            <div className="grid md:grid-cols-2 gap-16">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <ContactForm />
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Our Email</h3>
                        <p className="text-gray-600">jarryullah46@gmail.com</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Our Phone</h3>
                        <p className="text-gray-600">+923356471303</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Our Address</h3>
                        <p className="text-gray-600">Bhutto calony Faisalabad, Pakistan</p>
                    </div>
                </div>
            </div>
        </PageWrapper>
=======
import { Helmet } from 'react-helmet-async';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Send,
} from 'lucide-react';

export function Contact() {
  useScrollReveal();

  const contactInfo = [
    { icon: Mail, title: 'Email Us', detail: 'jarryullah46@gmail.com', sub: 'We reply within 24 hours' },
    { icon: Phone, title: 'Call Us', detail: '+923497034892', sub: 'Mon-Fri, 9am to 6pm EST' },
    { icon: MapPin, title: 'Visit Us', detail: 'Bhutto calony Faisalabad, Pakistan', sub: '' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact FinovaCalc | Get in Touch for Support & Feedback</title>
        <meta name="description" content="Have questions or feedback? Contact the FinovaCalc team via email, phone, or visit our office. We're here to help you with our free financial calculators." />
        <link rel="canonical" href="https://www.finovacalc.com/contact" />
        <meta name="keywords" content="contact finovacalc, finovacalc support, contact us, financial calculator help, feedback, support" />
        <meta property="og:title" content="Contact FinovaCalc | Get in Touch for Support & Feedback" />
        <meta property="og:description" content="Have questions or feedback? Contact the FinovaCalc team via email, phone, or visit our office. We're here to help you with our free financial calculators." />
        <meta property="og:url" content="https://www.finovacalc.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.finovacalc.com/og-image-contact.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact FinovaCalc | Get in Touch for Support & Feedback" />
        <meta name="twitter:description" content="Have questions or feedback? Contact the FinovaCalc team via email, phone, or visit our office. We're here to help you with our free financial calculators." />
        <meta name="twitter:image" content="https://www.finovacalc.com/twitter-image-contact.png" />
      </Helmet>
      <div className="bg-white overflow-hidden">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-800">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-brand-accent font-medium backdrop-blur-sm mb-6">
              <MessageSquare className="h-4 w-4" />
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Contact <span className="gradient-text">FinovaCalc</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a question, feedback, or just want to say hello? We would love to hear from you. Our team is here to help you with anything related to our financial calculators and tools.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white relative -mt-1">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-20 relative z-10">
              {contactInfo.map((info, idx) => (
                <div key={info.title} className={`reveal delay-${(idx + 1) * 100} card-hover bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center`}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-primary/20">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">{info.title}</h2>
                  <p className="mt-2 text-brand-primary font-semibold text-sm">{info.detail}</p>
                  <p className="mt-1 text-xs text-gray-400">{info.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
    </>
  );
}
