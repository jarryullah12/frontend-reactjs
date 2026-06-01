
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Zap, Layout, FileText, Loader2, Plus, Minus, ArrowUp, ChevronRight, Shield, Globe, Award, Star } from 'lucide-react';
import { generateSlug } from '../utils/slugify';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { TEMPLATE_PREVIEW_DATA } from '../constants';
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-colors group"
          id="scroll-to-top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
import { blogService } from '../services/blogService';
import { TEMPLATES } from '../constants/templates';
import { BlogPost } from '../types';
import SEO from '../components/SEO';

const A4_WIDTH_PX = 8.27 * 96;
const A4_HEIGHT_PX = 11.69 * 96;
const HOME_TEMPLATE_PREVIEW_SCALE = 0.34;

const TAILWIND_COLOR_MAP: Record<string, string> = {
  'bg-blue-600': '#2563eb',
  'bg-blue-500': '#3b82f6',
  'bg-blue-700': '#1d4ed8',
  'bg-blue-800': '#1e40af',
  'bg-blue-900': '#1e3a8a',
  'bg-blue-300': '#93c5fd',
  'bg-blue-400': '#60a5fa',
  'bg-purple-600': '#9333ea',
  'bg-purple-500': '#a855f7',
  'bg-purple-700': '#7e22ce',
  'bg-slate-900': '#0f172a',
  'bg-slate-800': '#1e293b',
  'bg-slate-700': '#334155',
  'bg-slate-600': '#475569',
  'bg-slate-500': '#64748b',
  'bg-slate-400': '#94a3b8',
  'bg-indigo-900': '#312e81',
  'bg-indigo-700': '#4338ca',
  'bg-indigo-600': '#4f46e5',
  'bg-indigo-500': '#6366f1',
  'bg-amber-600': '#d97706',
  'bg-amber-500': '#f59e0b',
  'bg-pink-600': '#db2777',
  'bg-pink-500': '#ec4899',
  'bg-emerald-600': '#059669',
  'bg-emerald-500': '#10b981',
  'bg-cyan-600': '#0891b2',
  'bg-teal-600': '#0d9488',
  'bg-teal-500': '#14b8a6',
  'bg-red-600': '#dc2626',
  'bg-orange-600': '#ea580c',
  'bg-orange-500': '#f97316',
};

const getAccentColor = (themeColor?: string): string => {
  if (!themeColor) return '#2563eb';
  return TAILWIND_COLOR_MAP[themeColor] || '#2563eb';
};

const ResumeCard = ({ index, activeIndex, color }: { index: number; activeIndex: number; color: string }) => {
  const data = [
    { name: 'Alex Rivera', role: 'Product Designer', loc: 'San Francisco, CA', exp: 'Senior Designer @ TechFlow', skill: 'User Experience' },
    { name: 'Sarah Chen', role: 'Software Engineer', loc: 'Seattle, WA', exp: 'Backend Lead @ CloudScale', skill: 'Cloud Architecture' },
    { name: 'James Wilson', role: 'Marketing Manager', loc: 'New York, NY', exp: 'Growth Lead @ Marketify', skill: 'Digital Strategy' },
    { name: 'Elena Petrova', role: 'Data Scientist', loc: 'Austin, TX', exp: 'AI Researcher @ DataMind', skill: 'Machine Learning' },
    { name: 'Marcus Thorne', role: 'Project Manager', loc: 'Chicago, IL', exp: 'Operations Mgr @ BuildBetter', skill: 'Agile Delivery' },
  ];

  const images = [
    'https://i.pravatar.cc/150?u=12',
    'https://i.pravatar.cc/150?u=23',
    'https://i.pravatar.cc/150?u=34',
    'https://i.pravatar.cc/150?u=45',
    'https://i.pravatar.cc/150?u=56',
  ];

  const person = data[index];
  
  // Calculate relative position based on active index
  const relativeIndex = (index - activeIndex + 5) % 5;

  return (
    <motion.div
      initial={false}
      animate={{ 
        opacity: 1 - (relativeIndex * 0.15), 
        scale: 1 - (relativeIndex * 0.05),
        y: relativeIndex * 25,
        x: -relativeIndex * 40,
        rotate: index % 2 === 0 ? relativeIndex * 2 : -relativeIndex * 2
      }}
      transition={{
        duration: 0.8, 
        type: "spring", 
        bounce: 0.3
      }}
      className={`absolute top-0 right-0 w-72 h-[28rem] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-3 overflow-hidden backface-hidden`}
      style={{ 
        zIndex: 10 - relativeIndex,
        transformOrigin: "top right"
      }}
    >
      {/* Dynamic Layouts based on index */}
      {index === 0 && (
        <>
          {/* Layout 0: Classic Sidebar Right */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-14 h-14 rounded-2xl border-2 border-slate-50 dark:border-slate-800 shadow-md shrink-0 overflow-hidden relative group">
              <img src={images[index]} className="w-full h-full object-cover" alt={`Professional profile of ${person.name}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-black leading-tight text-slate-900 dark:text-white">{person.name}</h4>
              <p className="text-[10px] font-bold text-blue-600 truncate">{person.role}</p>
            </div>
          </div>
          <div className="flex gap-4 flex-1 mt-1 overflow-hidden">
            <div className="w-[65%] space-y-3">
              <div className="space-y-1">
                <h5 className={`text-[8px] font-black uppercase tracking-widest ${color.replace('bg-', 'text-')} opacity-70`}>Summary</h5>
                <p className="text-[7px] text-slate-500 leading-tight">Creative professional with 8+ years experience in high-growth tech firms. Specialized in user-centric design and building scalable systems that drive 50% higher engagement. Proven leader of cross-functional teams delivering award-winning products.</p>
              </div>
              <div className="space-y-2">
                <h5 className={`text-[8px] font-black uppercase tracking-widest ${color.replace('bg-', 'text-')} opacity-70`}>Experience</h5>
                <div className="space-y-1 relative pl-3 border-l-2 border-slate-50 dark:border-slate-800">
                  <div className="flex justify-between items-center text-[8px] font-black text-slate-800 dark:text-slate-100">
                    <span>{person.exp.split('@')[1].trim()}</span>
                  </div>
                  <p className="text-[7px] font-bold text-slate-400">2021 - Present</p>
                  <p className="text-[6px] text-slate-500 leading-tight mt-1">Lead design initiatives across 3 squads, improving user metrics by 40%. Directing creative vision for multi-million dollar product launches and international expansions.</p>
                </div>
                <div className="space-y-1 relative pl-3 border-l-2 border-slate-50 dark:border-slate-800">
                   <p className="text-[7px] font-bold text-slate-800 dark:text-slate-100 uppercase">Lead Product Architect</p>
                   <p className="text-[6px] text-slate-400 font-medium">2018 - 2021</p>
                   <p className="text-[6px] text-slate-500 leading-tight mt-0.5">Designed core UI components for mobile commerce apps reaching 1M+ users monthly. Reduced technical debt by 30% through modular refactoring and team training.</p>
                </div>
              </div>
            </div>
            <div className="w-[35%] space-y-3">
               <h5 className={`text-[8px] font-black uppercase tracking-widest ${color.replace('bg-', 'text-')} opacity-70`}>Skills</h5>
               <div className="flex flex-wrap gap-1">
                 {['UX Design', 'Figma', 'UI Design', 'React', 'Motion', 'Prototyping', 'User Testing', 'Adobe CC', 'Node.js', 'Typescript'].map(s => <span key={s} className="text-[6px] font-bold px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 rounded">{s}</span>)}
               </div>
               <div className="space-y-1.5">
                 <h5 className={`text-[8px] font-black uppercase tracking-widest ${color.replace('bg-', 'text-')} opacity-70`}>Awards</h5>
                 <p className="text-[6px] font-medium text-slate-400 tracking-tighter uppercase">Design Star 2023</p>
                 <p className="text-[6px] font-medium text-slate-400 tracking-tighter uppercase">Innovator of Year</p>
               </div>
               <div className="space-y-1.5 pt-1">
                 <h5 className={`text-[8px] font-black uppercase tracking-widest ${color.replace('bg-', 'text-')} opacity-70`}>Education</h5>
                 <p className="text-[6px] font-black text-slate-600 dark:text-slate-300 uppercase leading-none">BFA • NY Arts<br/><span className="text-[5px] text-slate-400 font-medium italic">Honors Graduate</span></p>
                 <p className="text-[5px] text-slate-400 font-medium mt-1">Focus on Interactive Media</p>
               </div>
            </div>
          </div>
        </>
      )}

      {index === 1 && (
        <>
          {/* Layout 1: Centered Minimalist */}
          <div className="text-center space-y-2 mb-4">
            <div className="w-16 h-16 rounded-full mx-auto border-2 border-blue-500/20 p-1">
              <img src={images[index]} className="w-full h-full object-cover rounded-full" alt={`Professional profile of ${person.name}`} />
            </div>
            <div>
              <h4 className="text-[16px] font-black text-slate-900 dark:text-white">{person.name}</h4>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-600">{person.role}</p>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
              <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Technical Summary</h5>
              <p className="text-[8px] leading-relaxed text-slate-500">Expert in distributed systems and high-scale cloud infrastructure development for modern SaaS. Passionate about system performance, security, and reliability at global scale. Successfully migrated legacy stacks to cloud-native architectures with 99.99% uptime.</p>
            </div>
            <div className="space-y-3 px-2">
              <h5 className="text-[8px] font-black uppercase tracking-widest text-blue-500 text-center">Core Expertise</h5>
              <div className="grid grid-cols-2 gap-3">
                {['GoLang', 'AWS Cloud', 'K8s', 'Rust', 'Docker', 'GCP', 'Redis', 'PostgreSQL', 'Terraform', 'Kafka'].map(s => (
                  <div key={s} className="flex items-center gap-1.5 grayscale opacity-80">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[7px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
               <div>
                  <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Academic Info</h5>
                  <p className="text-[7px] font-bold text-slate-600 dark:text-slate-300">BS in CS • Stanford</p>
                  <p className="text-[6px] text-slate-400">Summa Cum Laude Graduate</p>
               </div>
               <div>
                  <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Languages</h5>
                  <p className="text-[7px] font-bold text-slate-600 dark:text-slate-300">English, Mandarin</p>
                  <p className="text-[6px] text-slate-400">Professional Proficiency</p>
               </div>
            </div>
          </div>
        </>
      )}

      {index === 2 && (
        <>
          {/* Layout 2: Modern Split Dark Sidebar */}
          <div className="flex flex-col h-full -m-6 relative overflow-hidden">
             <div className="flex-1 flex">
                <div className="w-20 bg-slate-900 p-4 pt-10 space-y-6">
                   <div className="w-10 h-10 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                      <img src={images[index]} className="w-full h-full object-cover" alt="Profile" />
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-1.5">
                        <div className="h-0.5 w-6 bg-blue-500" />
                        <p className="text-[5px] text-slate-300 font-bold uppercase tracking-widest">LinkedIn</p>
                        <p className="text-[4px] text-slate-500 font-medium overflow-hidden">/in/username</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-0.5 w-4 bg-slate-500" />
                        <p className="text-[5px] text-slate-300 font-bold uppercase tracking-widest">GitHub</p>
                        <p className="text-[4px] text-slate-500 font-medium">@username</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-0.5 w-8 bg-slate-500" />
                        <p className="text-[5px] text-slate-300 font-bold uppercase tracking-widest">Portfolio</p>
                        <p className="text-[4px] text-slate-500 font-medium">www.site.com</p>
                      </div>
                      <div className="space-y-1.5 pt-4">
                        <div className="h-0.5 w-full bg-slate-700" />
                        <p className="text-[5px] text-slate-300 font-bold uppercase tracking-widest">Address</p>
                        <p className="text-[4px] text-slate-500 font-medium">San Francisco, CA</p>
                      </div>
                   </div>
                </div>
                <div className="flex-1 p-6 space-y-4 bg-white dark:bg-slate-950">
                   <div className="border-b-2 border-slate-100 dark:border-slate-800 pb-3">
                      <h4 className="text-[16px] font-black text-slate-900 dark:text-white uppercase leading-none">{person.name.split(' ')[0]}<br/><span className="text-blue-600">{person.name.split(' ')[1]}</span></h4>
                      <p className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest">{person.role.toUpperCase()}</p>
                   </div>
                   <div className="space-y-3">
                      <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-300">Experience History</h5>
                      <div className="space-y-3">
                         <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                             <p className="text-[7px] font-black text-slate-900 dark:text-white">{person.exp.split('@')[1].trim()}</p>
                             <p className="text-[6px] text-blue-600 font-bold mt-0.5">2021 — PRESENT</p>
                             <p className="text-[6px] text-slate-500 mt-1 leading-tight">Optimized growth metrics by 25% through advanced A/B testing and algorithmic SEO strategies across multiple sectors.</p>
                         </div>
                         <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 opacity-80">
                             <p className="text-[7px] font-black text-slate-900 dark:text-white uppercase">Senior Brand Strategist</p>
                             <p className="text-[6px] text-slate-500 font-bold mt-0.5">2019 — 2021</p>
                             <p className="text-[6px] text-slate-500 mt-1 leading-tight">Developed multi-channel marketing campaigns for global retail brands, increasing social following by 150k+ followers.</p>
                         </div>
                         <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 opacity-60">
                             <p className="text-[7px] font-black text-slate-900 dark:text-white uppercase">Junior Consultant</p>
                             <p className="text-[6px] text-slate-500 mt-0.5 font-bold">2017 — 2019</p>
                             <p className="text-[6px] text-slate-500 mt-1 leading-tight">Analyzed market trends and assisted in delivering 20+ corporate training workshops on digital literacy.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </>
      )}

      {index === 3 && (
        <>
          {/* Layout 3: Corporate Bold Header */}
          <div className="bg-blue-600 -mx-6 -mt-6 p-6 pb-12 rounded-b-[3rem] mb-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
             <div className="flex justify-between items-start relative z-10">
                <div className="text-white">
                   <h4 className="text-[16px] font-black leading-tight tracking-tight">{person.name}</h4>
                   <p className="text-[9px] font-medium opacity-80 uppercase tracking-widest">{person.role}</p>
                </div>
                <img src={images[index]} className="w-10 h-10 rounded-xl border-2 border-white/20 shadow-lg" alt="Profile" />
             </div>
          </div>
          <div className="space-y-5 flex-1 p-2">
             <div className="space-y-2">
                <h5 className="text-[8px] font-black uppercase tracking-widest text-blue-600">Strategic Objectives</h5>
                <p className="text-[8px] italic text-slate-500 leading-relaxed font-medium">"Achieving predictive excellence through high-performance machine learning models for market insights. Dedicated to pushing the boundaries of AI application in finance and healthcare sectors."</p>
             </div>
             <div className="space-y-3 pt-2">
                <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-300">Key Projects & Impact</h5>
                <div className="flex gap-2">
                    <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-2 border border-blue-100 dark:border-blue-800">
                        <div className="w-4 h-4 bg-blue-200 dark:bg-blue-800 rounded-lg mb-2 flex items-center justify-center"><Zap size={10} className="text-blue-600" /></div>
                        <p className="text-[6px] font-black text-blue-700 dark:text-blue-300 uppercase leading-none">TensorFlow<br/>Integration</p>
                        <p className="text-[5px] text-blue-400 mt-1 uppercase font-bold">99% Accuracy Rate</p>
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
                         <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2 flex items-center justify-center"><Sparkles size={10} className="text-slate-500" /></div>
                         <p className="text-[6px] font-black text-slate-700 dark:text-slate-300 uppercase leading-none">Natural Language<br/>API Systems</p>
                         <p className="text-[5px] text-slate-400 mt-1 uppercase font-bold">Low Latency Core</p>
                    </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                   <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-300">Academic Background</h5>
                   <p className="text-[7px] font-bold text-slate-600 dark:text-slate-300 uppercase leading-tight">PhD in Artificial Intelligence<br/><span className="text-[6px] text-slate-400 font-medium">MIT Graduate School</span></p>
                </div>
                <div className="space-y-1">
                   <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-300">Skills Core</h5>
                   <p className="text-[6px] font-bold text-slate-600 dark:text-slate-300 leading-tight uppercase">Python • PyTorch • Scikit<br/>Big Data • AWS Sage</p>
                   <p className="text-[5px] text-slate-400 font-medium">Advanced Certification</p>
                </div>
             </div>
          </div>
        </>
      )}

      {index === 4 && (
        <>
          {/* Layout 4: Creative Minimalist Grid */}
          <div className="flex-1 grid grid-cols-12 gap-3">
             <div className="col-span-4 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-3 flex flex-col items-center gap-4">
                <img src={images[index]} className="w-full aspect-square object-cover rounded-2xl shadow-sm grayscale" alt="Profile" />
                <div className="flex flex-col gap-4 w-full px-1">
                  <div className="space-y-1">
                     <p className="text-[5px] font-black text-slate-400">DESIGN TOOLS</p>
                     <div className="h-0.5 w-full bg-blue-400 opacity-60 rounded-full" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[5px] font-black text-slate-400">AGILE / SCRUM</p>
                     <div className="h-0.5 w-[85%] bg-blue-400 opacity-40 rounded-full" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[5px] font-black text-slate-400">LEADERSHIP</p>
                     <div className="h-0.5 w-[92%] bg-blue-400 opacity-40 rounded-full" />
                  </div>
                  <div className="space-y-1 pt-4">
                     <p className="text-[5px] font-black text-slate-400 uppercase tracking-widest">Education</p>
                     <p className="text-[6px] font-black text-slate-700 dark:text-slate-300 leading-tight">MBA • Chicago<br/><span className="text-[5px] text-slate-400 font-medium uppercase italic">Strategic Mgmt</span></p>
                  </div>
                </div>
             </div>
             <div className="col-span-8 flex flex-col gap-4 py-2">
                <div>
                   <h4 className="text-[12px] font-black text-slate-900 dark:text-white leading-tight mb-1 uppercase tracking-tighter">{person.name}</h4>
                   <div className="h-1 w-12 bg-blue-500 rounded-full" />
                </div>
                <div className="space-y-3">
                   <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-400">Profile Overview</h5>
                   <div className="space-y-2">
                      <p className="text-[7px] text-slate-500 leading-relaxed font-medium">Streamlining complex operations for enterprises with 500+ employees. Expert in reducing overhead by 30% through automation and efficient resource allocation. Certified PMP with specialization in Agile delivery and Scrum methodology. Led 50+ successful product cycles with zero overruns.</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-300 uppercase">Core Industry Expertise</h5>
                   <div className="flex flex-wrap gap-2">
                      {['Strategic Planning', 'Risk Mgmt', 'Budgets', 'Agile Delivery', 'KPI Analysis', 'Lean Six Sigma'].map(s => <span key={s} className="text-[6px] font-black uppercase tracking-tighter text-slate-400 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-1.5 py-0.5 rounded-md"># {s}</span>)}
                   </div>
                </div>
                <div className="mt-auto">
                   <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                      <div className="flex flex-col">
                        <span className="text-[5px] font-bold opacity-70 uppercase tracking-widest">Designated Title</span>
                        <span className="text-[7px] font-black uppercase tracking-tighter">{person.role}</span>
                      </div>
                      <Zap size={10} fill="currentColor" />
                   </div>
                </div>
             </div>
          </div>
        </>
      )}

      {/* Footer Branding - Unified */}
      <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className={`h-4 w-4 ${color} opacity-20 rounded-md flex items-center justify-center`}>
            <Sparkles size={8} className={color.replace('bg-', 'text-')} />
          </div>
          <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400">ProResumeLab AI</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1 w-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
          ))}
        </div>
      </div>
      
      {/* Abstract Design Elements */}
      <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full ${color} opacity-[0.05] blur-3xl`} />
    </motion.div>
  );
};

const BlogGrid = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log('Home: starting blog fetch');
        const allPosts = await blogService.getPosts(false);
        console.log('Home: fetched posts:', allPosts.length);
        
        const published = allPosts.filter(p => p.status === 'published');
        console.log('Home: published posts:', published.length);
        
        setBlogs(published);
      } catch (err) {
        console.error('Home: error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handlePreFetch = (id: string) => {
    blogService.getPostById(id);
  };

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="animate-pulse bg-slate-50 dark:bg-slate-900 rounded-[2rem] h-[500px]" />
      ))}
    </div>
  );
  
  if (blogs.length === 0) return (
    <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
      <p className="text-slate-500 dark:text-slate-400 font-medium">No published articles yet. Stay tuned!</p>
    </div>
  );

  const currentBlogs = blogs.slice(0, 5); // Just show top 5 for home

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        <AnimatePresence mode="wait">
          {currentBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              onMouseEnter={() => handlePreFetch(blog.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl shadow-sm transition-all duration-500"
            >
              <Link to={`/blog/${generateSlug(blog.title)}-${blog.id}`} className="block h-full cursor-pointer">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 text-left">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[8px] font-black text-blue-600">
                      {blog.author[0]}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{blog.author} • {blog.date}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors mb-4">
                    {blog.title}
                  </h4>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                    Read Article <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

        
const TemplateCarousel = () => {
  const featuredTemplates = TEMPLATES.filter(t => t.recommended).slice(0, 8);

  return (
    <div className="relative overflow-hidden py-12 group">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div className="flex overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -2500] }}
          transition={{ 
            duration: 50, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex gap-8 pr-8">
              {featuredTemplates.map((tpl, i) => (
                <div 
                  key={`${set}-${i}`}
                  className="w-72 md:w-80 aspect-[3/4] relative rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl group/card shrink-0 inline-block"
                >
                  <div className="absolute inset-0 bg-[#eeeff1] dark:bg-slate-900 p-4">
                    <div
                      className="mx-auto rounded-2xl overflow-hidden shadow-xl bg-white transition-transform duration-700 group-hover/card:scale-[1.03]"
                      style={{
                        width: `${A4_WIDTH_PX * HOME_TEMPLATE_PREVIEW_SCALE}px`,
                        height: `${A4_HEIGHT_PX * HOME_TEMPLATE_PREVIEW_SCALE}px`,
                      }}
                    >
                      <div
                        style={{
                          width: `${A4_WIDTH_PX}px`,
                          height: `${A4_HEIGHT_PX}px`,
                          transform: `scale(${HOME_TEMPLATE_PREVIEW_SCALE})`,
                          transformOrigin: 'top left',
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                      >
                        <TemplateRenderer
                          data={{
                            ...TEMPLATE_PREVIEW_DATA,
                            templateId: tpl.id.toLowerCase(),
                            accentColor: getAccentColor(tpl.themeColor),
                          }}
                          scale={1}
                          view="resume"
                          pages={1}
                          fit="a4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8 right-8 text-white whitespace-normal">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block ${tpl.themeColor || 'bg-blue-600'}`}>
                      {tpl.category}
                    </span>
                    <h4 className="text-xl font-black">{tpl.name}</h4>
                    <Link 
                      to={!localStorage.getItem('user') ? '/login' : 
                         (tpl.id.toLowerCase() === 'simple' || 
                         ['admin', 'pro', 'pro+'].includes(JSON.parse(localStorage.getItem('user') || '{}')?.role || 'user') || 
                         JSON.parse(localStorage.getItem('user') || '{}')?.email === 'jarryullah46@gmail.com' ? 
                         `/builder/${tpl.id}` : '/pricing')} 
                      className="mt-4 flex items-center gap-2 text-xs font-bold opacity-0 group-hover/card:opacity-100 transition-all translate-y-4 group-hover/card:translate-y-0 duration-300">
                      {!localStorage.getItem('user') ? 'Login to Use' : 'Use this template'} <Zap size={12} className="fill-current text-yellow-400" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Total spin time per resume is ~2000ms
    const intervalTime = 2000;
    const updateRate = 30; // ms
    const increment = (100 / (intervalTime / updateRate));

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActiveIndex((prev) => (prev + 1) % 5);
          return 0; // reset progress
        }
        return p + increment; 
      });
    }, updateRate);

    return () => clearInterval(timer);
  }, []);

  const loadingTexts = ["Scanning Profile...", "Generating Summary...", "Formatting Layout...", "Finalizing Resume..."];
  const currentText = loadingTexts[Math.min(Math.floor((progress / 100) * loadingTexts.length), loadingTexts.length - 1)];

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      <SEO 
        title="AI Resume Builder - ProResumeLab"
        description="Build high-impact, ATS-friendly resumes and cover letters in seconds with Google Gemini AI. Choose from professional templates and land your dream job faster."
      />
      {/* Hero Section */}
      <section className="relative pt-6 pb-8 lg:pt-12 lg:pb-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-16 lg:gap-24">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8">
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">AI-Powered Career Success</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
                Build your <br className="hidden sm:block" />
                <span className="text-blue-600 dark:text-blue-500">professional resume</span> <br />
                with AI intelligence.
              </h1>
              
              <p className="max-w-xl text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                Create a job-winning resume in minutes. ProResumeLab uses advanced AI to help you write content that recruiters love.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link 
                  to="/signup" 
                  className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-lg hover:bg-blue-700 transition-all duration-300 shadow-2xl shadow-blue-200 dark:shadow-none hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Create My Resume
                  <Zap size={20} fill="currentColor" />
                </Link>
                <Link 
                  to="/templates" 
                  className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-black text-lg hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 shadow-sm"
                >
                  View Templates
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Animated Resumes */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Loader section */}
              <div className="absolute -top-12 right-4 w-64 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest flex items-center gap-1.5">
                     <Loader2 size={12} className="animate-spin text-blue-600" /> 
                     {currentText}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{activeIndex + 1}/5</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <AnimatePresence>
                <ResumeCard key={0} index={0} activeIndex={activeIndex} color="bg-blue-500" />
                <ResumeCard key={1} index={1} activeIndex={activeIndex} color="bg-indigo-500" />
                <ResumeCard key={2} index={2} activeIndex={activeIndex} color="bg-slate-900" />
                <ResumeCard key={3} index={3} activeIndex={activeIndex} color="bg-sky-500" />
                <ResumeCard key={4} index={4} activeIndex={activeIndex} color="bg-violet-500" />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Seamless SVG Logo Marquee */}
      <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
           <h3 className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">Our customers have been hired at</h3>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
        
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex items-center gap-24 whitespace-nowrap"
            animate={{ x: [0, -1500] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex items-center gap-24 pr-24">
                {/* Google */}
                <div className="flex items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                  <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.36-7.84 5.36-5.04 0-9.12-4.16-9.12-9.28s4.08-9.28 9.12-9.28c2.88 0 4.8 1.2 5.88 2.24l2.6-2.52C19.24 1.48 16.12 0 12.48 0 5.6 0 0 5.6 0 12.48s5.6 12.48 12.48 12.48c7.2 0 11.96-5.04 11.96-12.16 0-.84-.08-1.48-.2-2.12h-11.76z"/>
                  </svg>
                  <span className="ml-2 text-lg font-bold tracking-tight">Google</span>
                </div>

                {/* Amazon */}
                <div className="flex flex-col items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 pt-1">
                  <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
                    <path d="M15.908 15.347c-2.316 1.705-5.918 2.502-8.568 2.502-3.804 0-7.34-1.704-7.34-1.704s-.425.32-.236.703c.52 1.023 2.15 2.157 5.053 2.76 3.16.657 7.027.362 9.77-1.727.567-.442.235-.978-.68-1.034zm1.944-2.025s-.168-1.737-.324-3.327c-.035-.355-.386-.484-.668-.22-.397.37-.89.83-1.284 1.196-.282.264-.2.628-.008.91l.83 1.258c.192.285.558.261.762.008l.692-.825zm6.148-3.048c-.68 0-1.28.324-1.64.84V9.658c0-.68-.56-1.24-1.24-1.24s-1.24.56-1.24 1.24v9.6c0 .68.56 1.24 1.24 1.24s1.24-.56 1.24-1.24v-6.912c0-1.024.784-1.808 1.808-1.808s1.808.784 1.808 1.808v6.912c0 .68.56 1.24 1.24 1.24s1.24-.56 1.24-1.24V14.45c0-2.34-1.868-4.2-4.14-4.2z"/>
                  </svg>
                  <div className="w-8 h-0.5 bg-orange-400 mt-0.5 rounded-full" />
                </div>

                {/* Disney */}
                <div className="flex items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-2xl font-serif italic font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Disney</span>
                </div>

                {/* Nvidia */}
                <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <svg className="h-6 w-auto text-green-500 fill-current" viewBox="0 0 24 24">
                    <path d="M10.82 23.32c5.85 0 8.08-4.43 8.08-4.43s-.54 1.22-4.63 1.22c-3.15 0-4.68-1.95-4.68-1.95s1.22 1.46 3.42 1.46c2.2 0 3.17-.98 3.17-.98l-.73.49c-.49.24-.98.24-1.22.24s-3.9-.73-3.9-6.34c0-5.61 5.37-7.32 5.37-7.32s-.73.49-1.22.49c-.49 0-1.46-.24-1.46-.24s.49-.49 1.46-.49c.98 0 1.95.49 1.95.49s-.98-.98-2.68-.98c-1.7 0-3.66.98-3.66.98s1.22-.73 2.93-.73c1.7 0 2.93.98 2.93.98s-.73-1.22-3.17-1.22c-2.44 0-4.39 1.22-4.39 1.22s1.46-.73 3.17-.73c1.7 0 3.17 1.22 3.17 1.22s-2.2-2.93-9.51-2.93c-7.31 0-8.29 5.85-8.29 5.85s.49-1.46 3.41-1.46c2.93 0 4.15 1.71 4.15 1.71s-1.22-1.22-3.17-1.22c-1.95 0-3.17 1.22-3.17 1.22s1.22 3.41 1.22 6.83c0 3.42-3.17 6.1-3.17 6.1s.49-.24.73-.24c.24 0 1.22.49 1.22.49.24.49.73-.49.98-.73l-1.21 1.22c-.49.49-1.46.24-1.46.24s.98.73 1.95.73c.98 0 1.95-.73 1.95-.73s2.93 3.17 7.07 3.17"/>
                  </svg>
                  <span className="text-lg font-black tracking-tight uppercase">nvidia</span>
                </div>

                {/* Salesforce */}
                <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <svg className="h-7 w-auto text-sky-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12.3 2C1.5 2 .1 7.2.1 7.2L0 7.3s.1 4.5.1 4.7c0 4.1 3.5 10 11.9 10 8.4 0 11.9-5.9 11.9-10 0-.2.1-4.7.1-4.7L24 7.2S22.5 2 12.3 2zM12 18.5c-4.1 0-5.5-2.9-5.5-5 0-2.1 1.4-5 5.5-5s5.5 2.9 5.5 5c0 2.1-1.4 5-5.5 5z"/>
                  </svg>
                  <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-200">salesforce</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="text-center mb-20">
          <div className="text-blue-600 font-black uppercase text-xs tracking-widest mb-4">Powerful Features</div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">Everything you need to <br /> get hired faster.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: 'AI Content Generation', 
              desc: 'Auto-generate summaries and achievements tailored to your job title.', 
              icon: <Zap className="text-blue-600" />,
              color: 'bg-blue-50'
            },
            { 
              title: 'Live Real-time Preview', 
              desc: 'See your changes instantly as you type. No more guessing the layout.', 
              icon: <Layout className="text-indigo-600" />,
              color: 'bg-indigo-50'
            },
            { 
              title: 'ATS-Friendly Templates', 
              desc: 'Our templates are optimized to pass through Applicant Tracking Systems.', 
              icon: <CheckCircle2 className="text-emerald-600" />,
              color: 'bg-emerald-50'
            },
            { 
              title: 'Secure Data Privacy', 
              desc: 'Your data is encrypted and stored securely. You own your information.', 
              icon: <Shield className="text-amber-600" />,
              color: 'bg-amber-50'
            },
            { 
              title: 'Multi-Format Export', 
              desc: 'Download your resume in PDF, Word, or plain text formats easily.', 
              icon: <FileText className="text-pink-600" />,
              color: 'bg-pink-50'
            },
            { 
              title: 'Professional Awards', 
              desc: 'Special sections to highlight certifications and career achievements.', 
              icon: <Award className="text-purple-600" />,
              color: 'bg-purple-50'
            }
          ].map((f, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 group"
            >
              <div className={`w-16 h-16 ${f.color} dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trustpilot Review Section */}
        <div className="mt-32">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[#00b67a] font-bold text-xl mr-2">Trustpilot</span>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-[#00b67a] p-1 rounded-sm">
                  <Star className="text-white fill-white" size={16} />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Rated <span className="text-slate-900 dark:text-white">4.9 / 5</span> based on 2,500+ reviews
            </p>
          </div>

          <div className="relative overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-6 w-max"
            >
              {[...Array(12)].map((_, i) => {
                const reviews = [
                  { name: "Sarah J.", text: "This tool helped me land my dream job at Google! The AI suggestions are brilliant.", role: "Software Engineer" },
                  { name: "Michael R.", text: "Best resume builder I've ever used. The templates are clean and modern.", role: "Marketing Manager" },
                  { name: "David K.", text: "I was struggling with ATS, but this builder fixed everything. Highly recommend!", role: "Product Designer" },
                  { name: "Emily W.", text: "The real-time preview is a game changer. I could see exactly how it looked.", role: "Data Analyst" },
                  { name: "James L.", text: "Professional and easy to use. I finished my resume in under 15 minutes.", role: "Sales Director" },
                  { name: "Anna S.", text: "The layout options are amazing. It really makes my profile stand out.", role: "UX Researcher" }
                ];
                const review = reviews[i % reviews.length];
                
                return (
                  <div key={i} className="w-[350px] p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="bg-[#00b67a] p-0.5 rounded-sm">
                          <Star className="text-white fill-white" size={12} />
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-medium mb-6 italic">"{review.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</div>
                        <div className="text-slate-400 text-xs font-medium">{review.role}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-12">
            <div className="text-purple-600 font-black uppercase text-xs tracking-widest mb-4">Premium Layouts</div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white">Professional Templates</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-4">Selected by experts to pass ATS and catch recruiters' eyes.</p>
          </div>
          <TemplateCarousel />
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-blue-600 font-black uppercase text-xs tracking-widest mb-4">Insights & Updates</div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">Career Blog</h2>
          </div>
          <Link to="/blog" className="text-blue-600 font-black hover:underline flex items-center gap-2">
            View All Articles <Zap size={16} />
          </Link>
        </div>

        <BlogGrid />
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="text-blue-600 font-black uppercase text-xs tracking-widest mb-4">Common Questions</div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">FAQ</h2>
        </div>
        
        <div className="grid gap-6">
          {[
            {
              q: "Is ProResumeLab really AI-powered?",
              a: "Yes! We use advanced Google Gemini models to analyze your career history and generate high-impact bullet points, summaries, and cover letters tailored specifically to your target roles."
            },
            {
              q: "Are the templates ATS-friendly?",
              a: "Absolutely. Every template in our library is engineered to be easily parsed by Applicant Tracking Systems (ATS) like Workday, Greenhouse, and Lever, ensuring your resume actually reaches human recruiters."
            },
            {
              q: "Can I download my resume as a PDF?",
              a: "Yes, you can download your documents as high-quality, vector-based PDFs that preserve your formatting perfectly across all devices and print sizes."
            },
            {
              q: "How many resumes can I create for free?",
              a: "Our free tier allows you to create up to 3 resumes and 1 cover letter. For unlimited documents and advanced AI insights, check out our Pro plans."
            },
            {
              q: "Is my personal data secure?",
              a: "We take security seriously. Your data is encrypted using 256-bit protocols and we never share your personal information or resume content with third-party advertisers."
            },
            {
              q: "Can I import my existing LinkedIn profile?",
              a: "Yes! You can connect your LinkedIn account to auto-populate your work history and education, saving you hours of manual typing."
            },
            {
              q: "Do you support different languages?",
              a: "Our AI engine supports over 50 languages, including English, Spanish, French, German, Urdu, and many more, allowing you to build a global career."
            },
            {
              q: "Can I customize the fonts and colors?",
              a: "Yes, our builder gives you granular control over typography, color schemes, and document margins while ensuring the design remains professional and readable."
            },
            {
              q: "Is there a mobile version available?",
              a: "ProResumeLab is fully responsive. You can edit and download your resumes directly from your smartphone or tablet browser without losing any functionality."
            },
            {
              q: "How does the ATS Checker work?",
              a: "Our ATS Checker scans your resume against common industry keywords and formatting rules, giving you a real-time score and actionable advice to improve your chances."
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <h4 className="text-xl font-black text-slate-900 dark:text-white">{faq.q}</h4>
                <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8">
                       <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {faq.a}
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 dark:bg-slate-950 p-16 lg:p-32 rounded-[4rem] text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-colors duration-700" />
          
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 relative z-10 leading-tight">
            Ready to take the next step <br /> in your career?
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
            Join professionals from around the world who have upgraded their careers with ProResumeLab AI.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/signup" className="px-12 py-6 bg-blue-600 text-white font-black rounded-2xl text-xl hover:bg-blue-700 transition shadow-2xl shadow-blue-600/20">
              Get Started for Free
            </Link>
            <Link to="/docs" className="px-12 py-6 bg-white/5 backdrop-blur-sm text-white border border-white/10 font-black rounded-2xl text-xl hover:bg-white/10 transition">
              Learn How it Works
            </Link>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
};

export default Home;
