import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Docs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 flex gap-12">
      <SEO 
        title="Documentation - ProResumeLab"
        description="Learn how to use ProResumeLab's AI builder, templates, and ATS checker with our comprehensive documentation."
      />
      <div className="w-[250px] hidden md:block shrink-0">
        <div className="sticky top-24">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-xs">Categories</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            <li><a href="#getting-started" className="hover:text-blue-600 dark:hover:text-blue-400">Getting Started</a></li>
            <li><a href="#templates" className="hover:text-blue-600 dark:hover:text-blue-400">Using Templates</a></li>
            <li><a href="#ats-checker" className="hover:text-blue-600 dark:hover:text-blue-400">ATS Checker Guide</a></li>
            <li><a href="#export" className="hover:text-blue-600 dark:hover:text-blue-400">Exporting to PDF</a></li>
            <li><a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400">FAQ</a></li>
          </ul>
        </div>
      </div>
      
      <div className="flex-grow prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Documentation</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 border-b dark:border-slate-800 pb-8">Everything you need to know about using ProResumeLab to build your next professional resume.</p>

        <section id="getting-started" className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Getting Started</h2>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-xl leading-relaxed">
            Welcome to the future of career document creation. ProResumeLab is designed to be intuitive, yet powerful enough to help you land roles at Fortune 500 companies.
          </p>

          <div className="space-y-12">
            <div className="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-50 dark:ring-blue-900/20" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">1. Setting up your Profile</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
                Your profile is the single source of truth for all your resumes. Once you fill it out, you can generate 10+ different variations without ever re-typing your work history.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Connect your LinkedIn for auto-import (one-click)
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Add your skills using our categorized taxonomy
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Upload your profile picture (high-res recommended)
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative pl-12 border-l-2 border-slate-100 dark:border-slate-800 pb-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">2. Launching the Builder</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">
                Navigate to the <Link to="/templates" className="text-blue-600 hover:underline">Templates Library</Link> and select a base design. Don't worry—you can change layouts at any time without losing your work.
              </p>
            </div>

            <div className="relative pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3. AI Content Optimization</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Use the "Sparkle" icon next to any text field to let our Gemini-powered AI rewrite your bullet points. It doesn't just check grammar—it analyzes impact and quantifies your results.
              </p>
            </div>
          </div>
        </section>

        <section id="templates" className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Using Templates</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-800">
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">Standard Resumes</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Optimized for traditional industries like Banking, Law, and Consulting. Focuses on structured text, clear hierarchies, and high ATS readability scores.
              </p>
            </div>
            <div className="p-8 bg-purple-50 dark:bg-purple-900/10 rounded-[2.5rem] border border-purple-100 dark:border-purple-800">
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">Creative Portfolios</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Designed for Designers, Developers, and Marketers. Includes sidebar elements, skill visualizations, and project-focused layouts.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Customization Controls</h3>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 text-xs font-black">C</div>
                <p><span className="text-slate-900 dark:text-white font-black">Color Palettes:</span> Choose from our curated brand colors or set your own custom hex codes for a unique look.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 text-xs font-black">T</div>
                <p><span className="text-slate-900 dark:text-white font-black">Typography:</span> Swap fonts across headers and body text. Every font in our library is selected for maximum display and print clarity.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 text-xs font-black">S</div>
                <p><span className="text-slate-900 dark:text-white font-black">Spacing & Layout:</span> Adjust margin density to fit more content without sacrificing whitespace balance.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="ats-checker" className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">ATS Checker Guide</h2>
          </div>

          <div className="relative mb-12 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">How Scoring Works</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed">
                Our algorithm processes your document through the same engines used by Lever, Greenhouse, and Workday. We look for four critical factors:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Parsability</span>
                    <span className="text-emerald-500 font-black">Weight: 40%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold">How easily AI can extract your data without errors.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Keyword Density</span>
                    <span className="text-blue-500 font-black">Weight: 30%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-blue-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold">Matches against local job market requirements.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/30 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">ATS Mastery Checklist</h3>
             <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Use standard section headers (e.g., 'Work Experience' instead of 'My Journey')",
                  "Avoid using images or icons to convey critical contact info",
                  "Ensure your dates are formatted consistently (MM/YYYY)",
                  "Use bullet points instead of long narrative paragraphs",
                  "Include industry-standard acronyms alongside full names",
                  "Avoid complex tables or multi-layered columns unless using our Pro templates"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                    <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center shrink-0">✓</div>
                    <p className="text-[13px] font-bold text-slate-600 dark:text-slate-400">{item}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <section id="export" className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Exporting Guide</h2>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
               <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">Optimized PDF Engine</h4>
               <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
                 We don't just "print" your screen. Our backend generates a clean vector document. 
               </p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scale</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">100% Vector</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weights</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Embedded</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Selection</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Full Text</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Size</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">&lt; 500 KB</p>
                  </div>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-8 bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4">Troubleshooting Export</h4>
                  <div className="space-y-4">
                     <div className="pb-4 border-b border-slate-50 dark:border-slate-800">
                        <p className="text-sm font-black text-slate-700 dark:text-slate-300">Fonts not appearing correctly?</p>
                        <p className="text-xs text-slate-500 font-medium">Ensure you have a stable internet connection during export as fonts are fetched dynamically from our high-speed CDN.</p>
                     </div>
                     <div className="pb-4 border-b border-slate-50 dark:border-slate-800">
                        <p className="text-sm font-black text-slate-700 dark:text-slate-300">Page breaking mid-sentence?</p>
                        <p className="text-xs text-slate-500 font-medium">Use our "Gap Management" tool in the sidebar to manually push sections to the next page for a cleaner look.</p>
                     </div>
                  </div>
               </div>
               
               <div className="flex flex-col gap-8 items-center bg-blue-600 rounded-[3rem] p-10 text-white">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Filename Strategy</h4>
                  <p className="opacity-90 font-medium">Recruiters get hundreds of files. Save yours as <code className="bg-white/10 px-2 py-0.5 rounded text-xs">Name-Role-Resume.pdf</code> to stand out in their inbox.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="text-xl font-black">?</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">FAQ</h2>
          </div>

          <div className="grid gap-4">
            {[
              { q: "Is ProResumeLab free to use?", a: "Yes, our core resume builder is free to use. Premium AI features and specific designer templates require a subscription." },
              { q: "Can I import my existing resume?", a: "Absolutely! Use our 'Import Resume' feature in the Templates page to upload your PDF or Word doc, and our AI will automatically populate the builder for you." },
              { q: "Will my resume be ATS-friendly?", a: "All our templates are designed with ATS compatibility in mind. You can use our built-in ATS Checker to verify your score before applying." },
              { q: "Can I download as Word/DOCX?", a: "Currently, we focus on PDF as it's the gold standard for formatting preservation across all devices and ATS systems." },
              { q: "How many resumes can I create?", a: "Free users can create up to 3 resumes. Premium users have unlimited storage." },
              { q: "Is my data secure?", a: "Absolutely. We use 256-bit encryption and never share your personal resume data with third parties." },
              { q: "Can I cancel my subscription?", a: "Yes, you can cancel at any time via the Settings page. You'll retain access until the end of your billing cycle." },
              { q: "Does the AI support languages other than English?", a: "Yes! Our Gemini-powered engine supports 50+ languages including Spanish, French, German, and Urdu." },
              { q: "Can I add custom sections?", a: "Yes! You can add custom sections for Awards, Hobbies, or Projects in the builder sidebar." },
              { q: "How does the ATS score help me?", a: "It identifies potential 'red flags' that might cause an automated system to reject your resume before a human sees it." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3">{item.q}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Docs;
