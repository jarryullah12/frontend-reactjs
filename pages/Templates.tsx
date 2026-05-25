
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Upload, FileText, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import { parseResumeFromText } from '../services/geminiService';
import SEO from '../components/SEO';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { TEMPLATE_PREVIEW_DATA } from '../constants';

// Set worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import { TEMPLATES, Template } from '../constants/templates';

// A4 dimensions: 8.27in x 11.69in
// We display it scaled down to fit in card. Card preview area is ~280px wide.
// Scale = 280 / (8.27 * 96) ≈ 0.353
const PREVIEW_SCALE = 0.353;
const A4_WIDTH_PX = 8.27 * 96;   // ~794px
const A4_HEIGHT_PX = 11.69 * 96; // ~1122px

// Map Tailwind bg color classes to hex for TemplateRenderer accent colors
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


const Templates: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'professional' | 'modern' | 'ats' | 'two columns'>('all');
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    
    try {
      console.log('Starting file parsing for:', file.name, file.type);
      let text = '';
      
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        console.log('PDF ArrayBuffer loaded, size:', arrayBuffer.byteLength);
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        console.log('PDF document loaded, pages:', pdf.numPages);
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        text = fullText;
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        throw new Error('Unsupported file type. Please upload a PDF or Word document.');
      }

      console.log('Extracted text length:', text.length);

      if (!text.trim()) {
        throw new Error('Could not extract any text from the document. Please ensure it is not an image-only PDF.');
      }

      const parsedData = await parseResumeFromText(text);
      if (parsedData) {
        console.log('Parsed data received from Gemini');
        localStorage.setItem('importedResumeData', JSON.stringify(parsedData));
        setUploadStatus('success');
        setTimeout(() => {
          navigate('/builder');
        }, 1000);
      } else {
        throw new Error('The AI failed to understand your resume structure. Please try again.');
      }
    } catch (error: any) {
      console.error('File parsing error:', error);
      alert(error.message || 'An error occurred during upload');
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const filtered = TEMPLATES.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'professional') return t.category === 'professional';
    if (filter === 'modern') return t.category === 'modern';
    if (filter === 'ats') return t.isAts === true;
    if (filter === 'two columns') return t.isTwoColumn === true;
    return true;
  });

  const swatches: { color: string; border?: boolean }[] = [
    { color: '#00bfa5' },
    { color: '#ff7043' },
    { color: '#f48fb1' }
  ];

  const TABS = [
    { id: 'all', label: 'All Templates' },
    { id: 'professional', label: 'Professional' },
    { id: 'modern', label: 'Modern' },
    { id: 'ats', label: 'ATS Optimized' },
    { id: 'two columns', label: 'Two Columns' }
  ] as const;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16 bg-[#f8f9fb] dark:bg-slate-950 min-h-screen font-['Inter']">
      <SEO 
        title="Professional Resume Templates - ProResumeLab"
        description="Browse our library of high-impact, ATS-friendly resume templates. Designed by career experts to help you land more interviews."
        keywords="resume templates, CV templates, professional resume, modern resume, ATS friendly resume"
      />
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">Job-winning Templates</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl font-medium">
          The ultimate professional layout for your career.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
        <Link 
          to="/builder"
          className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-dashed border-blue-200 dark:border-blue-900/30 rounded-[3rem] p-10 flex items-center gap-8 transition-all duration-500 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-200 dark:shadow-none group-hover:scale-110 transition-transform duration-500">
            <Plus size={40} strokeWidth={3} />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Create New Resume/CV</h3>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
              Start from scratch with our <br/>
              <span className="text-blue-600 font-black">AI-powered assistant</span>
            </p>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 text-blue-50/50 dark:text-blue-900/10 w-32 h-32 group-hover:text-blue-500/10 transition-colors duration-500" />
        </Link>

        <button 
          onClick={handleUploadClick}
          disabled={uploadStatus === 'uploading'}
          className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 flex items-center gap-8 transition-all duration-500 hover:border-slate-400 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf,.doc,.docx" 
            className="hidden" 
          />
          
          <div className={`w-20 h-20 ${uploadStatus === 'success' ? 'bg-emerald-500' : uploadStatus === 'error' ? 'bg-red-500' : 'bg-slate-900 dark:bg-slate-800'} rounded-[2rem] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all duration-500`}>
            {uploadStatus === 'idle' && <Upload size={40} strokeWidth={3} />}
            {uploadStatus === 'uploading' && (
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {uploadStatus === 'success' && <CheckCircle2 size={40} strokeWidth={3} />}
            {uploadStatus === 'error' && <AlertCircle size={40} strokeWidth={3} />}
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {uploadStatus === 'uploading' ? 'Analyzing Resume...' : 
               uploadStatus === 'success' ? 'Ready to Edit!' : 
               'Import Existing Resume/CV'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
              Upload PDF or Word doc <br/>
              <span className="text-slate-900 dark:text-white font-black">We'll extract the data</span>
            </p>
          </div>
          <FileText className="absolute -right-4 -bottom-4 text-slate-50/50 dark:text-slate-900/10 w-32 h-32 group-hover:text-slate-500/10 transition-colors duration-500" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all duration-300 transform active:scale-95 ${
              filter === tab.id 
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl shadow-slate-200 dark:shadow-none' 
              : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {filtered.map(t => {
          let badgeText = 'RECOMMENDED';
          if (filter === 'all') {
            if (t.recommended) badgeText = 'RECOMMENDED';
            else if (t.category === 'professional') badgeText = 'PROFESSIONAL';
            else if (t.category === 'modern') badgeText = 'MODERN';
            else if (t.isAts) badgeText = 'ATS OPTIMIZED';
            else if (t.isTwoColumn) badgeText = 'TWO COLUMNS';
          } else {
            const currentTab = TABS.find(tab => tab.id === filter);
            if (currentTab) badgeText = currentTab.label.toUpperCase();
          }

          const userStr = localStorage.getItem('user');
          const userObj = userStr ? JSON.parse(userStr) : null;
          const isLoggedIn = !!userObj;
          const userRole = userObj?.role || 'user';
          const isAdmin = userRole === 'admin' || userObj?.email === 'jarryullah46@gmail.com';
          const isTemplateUnlocked = userRole === 'pro' || isAdmin || t.id.toLowerCase() === 'executive';
          
          return (
          <div key={t.id} className="group relative">
            <div className="bg-[#eeeff1] dark:bg-slate-900 rounded-[2.5rem] p-7 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50">
              
              <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm relative transition duration-700 group-hover:shadow-2xl"
                   style={{ height: `${A4_HEIGHT_PX * PREVIEW_SCALE}px` }}>
                {badgeText && (
                  <div className="absolute top-3 right-3 bg-[#2d2d2d] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest z-10 flex items-center gap-1.5 shadow-2xl scale-90 group-hover:scale-100 transition duration-500">
                    {badgeText === 'RECOMMENDED' && <span className="text-white text-sm leading-none">★</span>}
                    {badgeText}
                  </div>
                )}
                
                {/* Actual A4 Template Preview scaled to fit card */}
                <div
                  style={{
                    width: `${A4_WIDTH_PX}px`,
                    height: `${A4_HEIGHT_PX}px`,
                    transform: `scale(${PREVIEW_SCALE})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  <TemplateRenderer
                    data={{ ...TEMPLATE_PREVIEW_DATA, templateId: t.id.toLowerCase(), accentColor: getAccentColor(t.themeColor) }}
                    scale={1}
                    view="resume"
                    pages={1}
                    fit="a4"
                  />
                </div>

                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 dark:group-hover:bg-slate-200/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px] rounded-[1.5rem]">
                   <Link 
                    to={!isLoggedIn ? '/login' : (isTemplateUnlocked ? `/builder/${t.id}` : '/pricing')}
                    className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-4 rounded-2xl font-black shadow-2xl transition-all duration-300 hover:bg-black dark:hover:bg-white hover:scale-105"
                  >
                    {!isLoggedIn ? 'Login to Use' : (isTemplateUnlocked ? 'Use Template' : 'Unlock Template')}
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between px-2">
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-4xl leading-none mb-4 tracking-tighter">{t.name}</h3>
                  <div className="flex gap-2.5">
                    {swatches.map((swatch, i) => (
                      <div 
                        key={i} 
                        className={`w-7 h-7 rounded-full relative flex items-center justify-center cursor-pointer shadow-sm transition-all duration-300 hover:scale-125 hover:z-10 ${swatch.border ? 'border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800' : ''}`}
                        style={{ background: !swatch.border ? swatch.color : undefined }}
                      >
                        {swatch.color === '#ffffff' && (
                           <div className="w-2 h-2 bg-slate-900 rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end">
                  <span className="flex items-center gap-2 bg-[#dbdee3] dark:bg-slate-800 px-4 py-2 rounded-xl text-[11px] font-black text-[#565e6d] dark:text-slate-300 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {t.category}
                  </span>
                  {t.isAts && (
                    <span className="flex items-center gap-2 bg-[#d8eadf] dark:bg-emerald-900/30 px-4 py-2 rounded-xl text-[11px] font-black text-[#437d57] dark:text-emerald-400 uppercase tracking-wider border border-[#bddbbd] dark:border-emerald-800/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      ATS
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )
        })}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-2xl font-black">No templates found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
