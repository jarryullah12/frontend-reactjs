import React from 'react';
import { SEO } from '../components/SEO';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4">
      <SEO 
        title="Terms of Service - OptiSEO" 
        description="Read the terms and conditions for using OptiSEO's services."
      />
      <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">By accessing or using OptiSEO, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
          
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on OptiSEO's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on OptiSEO's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p className="mb-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by OptiSEO at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
          
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p className="mb-4">The materials on OptiSEO's website are provided on an 'as is' basis. OptiSEO makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <p className="mb-4">Further, OptiSEO does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
          
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p className="mb-4">In no event shall OptiSEO or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on OptiSEO's website, even if OptiSEO or a OptiSEO authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
          
          <h2 className="text-2xl font-semibold mb-4">5. Accuracy of materials</h2>
          <p className="mb-4">The materials appearing on OptiSEO's website could include technical, typographical, or photographic errors. OptiSEO does not warrant that any of the materials on its website are accurate, complete or current. OptiSEO may make changes to the materials contained on its website at any time without notice. However OptiSEO does not make any commitment to update the materials.</p>
          
          <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
          <p className="mb-4">OptiSEO has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by OptiSEO of the site. Use of any such linked website is at the user's own risk.</p>
          
          <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
          <p className="mb-4">OptiSEO may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
          
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="mb-4">These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at jarryullah46@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}
