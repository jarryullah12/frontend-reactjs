import React from 'react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4">
      <SEO 
        title="Privacy Policy - OptiSEO" 
        description="Learn about how we collect, use, and protect your data at OptiSEO."
      />
      <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">Welcome to OptiSEO. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
          
          <h2 className="text-2xl font-semibold mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4">Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">3. How Is Your Personal Data Collected?</h2>
          <p className="mb-4">We use different methods to collect data from and about you including through:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Direct interactions:</strong> You may give us your Identity and Contact Data by filling in forms or by corresponding with us.</li>
            <li><strong>Automated technologies or interactions:</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. Cookies and Web Beacons</h2>
          <p className="mb-4">Like any other website, OptiSEO uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

          <h2 className="text-2xl font-semibold mb-4">5. Google DoubleClick DART Cookie</h2>
          <p className="mb-4">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-[#4f39f6] hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.</p>

          <h2 className="text-2xl font-semibold mb-4">6. Advertising Partners Privacy Policies</h2>
          <p className="mb-4">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on OptiSEO, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
          <p className="mb-4">Note that OptiSEO has no access to or control over these cookies that are used by third-party advertisers.</p>

          <h2 className="text-2xl font-semibold mb-4">7. Third Party Privacy Policies</h2>
          <p className="mb-4">OptiSEO's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
          <p className="mb-4">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

          <h2 className="text-2xl font-semibold mb-4">8. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p className="mb-4">Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p className="mb-4">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

          <h2 className="text-2xl font-semibold mb-4">9. GDPR Data Protection Rights</h2>
          <p className="mb-4">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">10. Children's Information</h2>
          <p className="mb-4">Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
          <p className="mb-4">OptiSEO does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at jarryullah46@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}
