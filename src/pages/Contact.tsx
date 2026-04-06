import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { useForm, ValidationError } from '@formspree/react';

export function Contact() {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xgongpje");

  if (state.succeeded) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Thanks for joining!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <SEO 
        title="Contact Us" 
        description="Get in touch with the OptiSEO team. We're here to help you with any questions about our SEO tools and services."
        keywords="contact OptiSEO, SEO support, customer service"
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{t('contact.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t('contact.info_title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('contact.info_desc')}
          </p>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-[#4f39f6]/10 text-[#4f39f6] rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400">jarryullah46@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-[#4f39f6]/10 text-[#4f39f6] rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400">+92 335 6471303</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-12 h-12 bg-[#4f39f6]/10 text-[#4f39f6] rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Bhutto colony Sargodha Road Faisalabad
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t('contact.form.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email" 
              name="email"
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent"
              required
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
            
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent h-32"
              required
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="text-red-500 text-sm"
            />
            
            <button 
              type="submit" 
              disabled={state.submitting}
              className="w-full p-3 rounded-xl bg-[#4f39f6] text-white font-semibold hover:bg-[#4f39f6]/90 disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
