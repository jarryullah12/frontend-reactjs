
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
    </>
  );
}
