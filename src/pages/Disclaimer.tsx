import { SEO } from '../components/SEO';

export function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <SEO 
        title="Disclaimer - OptiSEO" 
        description="Disclaimer and limitation of liability for OptiSEO services."
      />
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Disclaimer</h1>
      
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. General Information</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The information provided by OptiSEO ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Professional Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The site cannot and does not contain professional SEO or marketing advice. The SEO and marketing information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional SEO or marketing advice. The use or reliance of any information contained on this site is solely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. External Links Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Affiliates Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include, but are not limited to, various advertising networks. We are a participant in various affiliate advertising programs designed to provide a means for us to earn advertising fees by linking to affiliated websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Testimonials Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. Errors and Omissions Disclaimer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, OptiSEO is not responsible for any errors or omissions or for the results obtained from the use of this information. All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability, and fitness for a particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at support@getoptiseo.com.
          </p>
        </section>
      </div>
    </div>
  );
}
