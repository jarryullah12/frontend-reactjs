import React from 'react';
import { Target, Cpu, Users, Award } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <SEO 
        title="About Us - ProResumeLab"
        description="Learn about our mission to democratize career success through AI-powered professional resume building tools."
      />
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">About ProResumeLab</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
          We are on a mission to democratize career success by providing everyone with access to professional, ATS-optimized, and beautifully designed career documents.
        </p>
      </div>
      
      <div className="relative mb-20">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Team collaboration" 
          className="rounded-[3rem] shadow-2xl w-full object-cover h-[400px]" 
        />
        <div className="absolute -bottom-10 -right-10 hidden lg:block w-64 h-64 bg-blue-600 rounded-[3rem] p-8 text-white shadow-xl">
          <Award className="w-12 h-12 mb-4" />
          <p className="font-bold text-lg">Trusted by over 50,000+ job seekers globally.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <section className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Our Vision</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe that a great candidate shouldn't be held back by formatting challenges or lack of design skills. Our platform uses advanced templates and automated tools to help you put your best foot forward in front of hiring managers and automated tracking systems (ATS).
          </p>
        </section>

        <section className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Our Technology</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Built with modern web technologies, ProResumeLab offers a seamless, fast, and secure editing experience right in your browser. We focus on privacy, performance, and pixel-perfect PDF rendering to ensure your documents look great everywhere.
          </p>
        </section>
      </div>

      <div className="bg-slate-900 dark:bg-blue-900/10 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4">Meet The Team</h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            We are a dedicated group of designers, engineers, and career experts working together to build the ultimate career toolkit. Join thousands of successful professionals who have landed their dream jobs using ProResumeLab.
          </p>
          <div className="flex justify-center gap-4">
            <img src="https://i.pravatar.cc/150?u=1" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Career expert advisor" />
            <img src="https://i.pravatar.cc/150?u=2" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Resume design specialist" />
            <img src="https://i.pravatar.cc/150?u=3" className="w-12 h-12 rounded-full border-2 border-white/20" alt="AI engineering lead" />
            <img src="https://i.pravatar.cc/150?u=4" className="w-12 h-12 rounded-full border-2 border-white/20" alt="HR strategist" />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default About;
