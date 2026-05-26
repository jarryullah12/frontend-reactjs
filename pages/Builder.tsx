
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ResumeData, Experience, Education, Reference, CoverLetter, AtsResult } from '../types';
import { INITIAL_RESUME_DATA, TEMPLATE_PREVIEW_DATA, PROFILE_PRESETS, AVAILABLE_FONTS } from '../constants';
import { generateProfessionalSummary, improveExperienceBullet, generateCoverLetter, analyzeAtsScore, parseResumeFromText } from '../services/geminiService';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { TEMPLATES as TEMPLATE_OPTIONS } from '../constants/templates';
import { Loader2, Sparkles, Save, ChevronDown } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import { resumeService } from '../services/resumeService';
import { getAuthenticatedUser } from '../services/supabase';

// Set worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Builder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(TEMPLATE_PREVIEW_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'skills' | 'education' | 'template' | 'references' | 'languages'>('info');
  const [selectionMode, setSelectionMode] = useState<'selecting' | 'editor'>(id ? 'editor' : 'selecting');
  const [activeView, setActiveView] = useState<'resume' | 'cover-letter' | 'ats-check' | 'cv'>('resume');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.75);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const storedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      const authUser = await getAuthenticatedUser();
      if (isMounted) {
        setCurrentUser(authUser);
      }
    };

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);
  
  // ATS State
  const [atsResult, setAtsResult] = useState<AtsResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [atsError, setAtsError] = useState<string | null>(null);

  const ACCENT_COLORS = [
    '#2563eb', '#dc2626', '#16a34a', '#7c3aed', 
    '#000000', '#f59e0b', '#0ea5e9', '#ec4899', '#14b8a6'
  ];

  const RESUME_TEMPLATES = useMemo(
    () => TEMPLATE_OPTIONS.filter((template) => !template.id.toLowerCase().startsWith('cv-')),
    []
  );
  const CV_TEMPLATES = useMemo(
    () => TEMPLATE_OPTIONS.filter((template) => template.id.toLowerCase().startsWith('cv-')),
    []
  );
  const activeTemplateOptions = activeView === 'cv' ? CV_TEMPLATES : RESUME_TEMPLATES;
  const isAdminUser =
    currentUser?.role === 'admin' ||
    storedUser?.role === 'admin' ||
    currentUser?.email === 'jarryullah46@gmail.com' ||
    storedUser?.email === 'jarryullah46@gmail.com';
  const isPremiumUser = isAdminUser || storedUser?.role === 'pro';

  const DUMMY_MAN_IMG = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const DUMMY_WOMAN_IMG = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  // Organize presets into categories
  const groupedPresets = useMemo<Record<string, string[]>>(() => {
    const groups: Record<string, string[]> = {
      'Engineering & Tech': [],
      'Product & Design': [],
      'Business & Management': [],
      'Marketing & Sales': [],
      'Other Roles': []
    };

    Object.keys(PROFILE_PRESETS).forEach(key => {
      const title = PROFILE_PRESETS[key].title.toLowerCase();
      if (title.includes('developer') || title.includes('engineer') || title.includes('stack') || title.includes('programmer') || title.includes('data') || title.includes('machine learning') || title.includes('security') || title.includes('network') || title.includes('hacker') || title.includes('blockchain')) {
        groups['Engineering & Tech'].push(key);
      } else if (title.includes('designer') || title.includes('product') || title.includes('ux') || title.includes('ui') || title.includes('creative') || title.includes('art') || title.includes('graphic')) {
        groups['Product & Design'].push(key);
      } else if (title.includes('analyst') || title.includes('business') || title.includes('consultant') || title.includes('manager') || title.includes('executive') || title.includes('admin') || title.includes('hr')) {
        groups['Business & Management'].push(key);
      } else if (title.includes('marketing') || title.includes('sales') || title.includes('content') || title.includes('writer') || title.includes('social') || title.includes('seo')) {
        groups['Marketing & Sales'].push(key);
      } else {
        groups['Other Roles'].push(key);
      }
    });

    return Object.fromEntries(Object.entries(groups).filter(([_, keys]) => keys.length > 0));
  }, []);

  // Effect to load template ID from URL if it matches a valid template name
  useEffect(() => {
    const loadInitialData = async () => {
      if (id) {
        const matchedTemplate = TEMPLATE_OPTIONS.find((template) => template.id.toLowerCase() === id.toLowerCase());
        if (matchedTemplate) {
          setData(prev => ({
            ...(currentId ? prev : TEMPLATE_PREVIEW_DATA),
            ...prev,
            templateId: matchedTemplate.id.toLowerCase(),
          }));
          setActiveView(matchedTemplate.id.toLowerCase().startsWith('cv-') ? 'cv' : 'resume');
          setSelectionMode('editor');
        } else if (id.length > 20) { // Likely a database UUID
          setIsGenerating(true);
          const fetched = await resumeService.getResumeById(id);
          if (fetched) {
            setData(fetched);
            setCurrentId(id);
            setSelectionMode('editor');
          }
          setIsGenerating(false);
        }
      }
      
      // Check for imported data
      const importedData = localStorage.getItem('importedResumeData');
      if (importedData) {
        try {
          const parsed = JSON.parse(importedData);
          setData(prev => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              ...parsed.personalInfo
            },
            experience: (parsed.experience || []).map((e: any) => ({
              ...e,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            })),
            education: (parsed.education || []).map((e: any) => ({
              ...e,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            })),
            skills: parsed.skills || [],
            languages: parsed.languages || []
          }));
          setSelectionMode('editor');
          // Clear after loading
          localStorage.removeItem('importedResumeData');
        } catch (e) {
          console.error('Failed to load imported data', e);
        }
      }
    };

    loadInitialData();
  }, [id]);

  useEffect(() => {
    if (activeView !== 'resume' && activeView !== 'cv') return;

    const validTemplateIds = (activeView === 'cv' ? CV_TEMPLATES : RESUME_TEMPLATES).map((template) => template.id.toLowerCase());
    const fallbackTemplateId = activeView === 'cv' ? 'cv-alpha' : 'executive';
    const allowedTemplateId = isPremiumUser ? null : fallbackTemplateId;

    setData((prev) => {
      if (allowedTemplateId && prev.templateId !== allowedTemplateId) {
        return { ...prev, templateId: allowedTemplateId };
      }
      if (validTemplateIds.includes(prev.templateId)) {
        return prev;
      }

      return { ...prev, templateId: fallbackTemplateId };
    });
  }, [activeView, CV_TEMPLATES, RESUME_TEMPLATES, isPremiumUser]);

  const handleSaveToDatabase = async () => {
    if (!currentUser) {
      alert('Please log in to save your resume.');
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      const newId = await resumeService.saveResume(
        currentUser.id,
        data,
        currentId || undefined,
        currentUser.email || undefined
      );
      if (newId) {
        setCurrentId(newId);
        // Update URL without refreshing if it's a new resume
        if (!currentId) {
          window.history.replaceState(null, '', `/builder/${newId}`);
        }
        alert('Resume saved successfully!');
        navigate('/settings');
      } else {
        throw new Error('Save failed');
      }
    } catch (e: any) {
      console.error('Save Error:', e);
      alert('Failed to save resume: ' + (e.message || 'Database connection error'));
    } finally {
      setIsSaving(false);
    }
  };

  const getSafeFilenameBase = () => {
    const fallback =
      activeView === 'cover-letter' ? 'cover-letter' : activeView === 'cv' ? 'cv' : 'resume';
    const raw = (data.title || fallback).trim();
    const cleaned = raw.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim();
    return cleaned || fallback;
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-download-source');
    if (!element) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin: 0,
      filename: `${getSafeFilenameBase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleDownloadWord = () => {
    const content = document.getElementById('resume-download-source')?.innerHTML;
    if (!content) return;
    const title = getSafeFilenameBase();
    const html =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>' +
      title +
      '</title></head><body>' +
      content +
      '</body></html>';
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateCoverLetter = (field: keyof CoverLetter, value: string) => {
    setData(prev => ({
        ...prev,
        coverLetter: { ...prev.coverLetter, [field]: value }
    }));
  };

  const updatePageCount = (delta: number) => {
    setData(prev => ({
        ...prev,
        pages: Math.max(1, (prev.pages || 1) + delta)
    }));
  };

  const handleAiSummary = async () => {
    setIsGenerating(true);
    const summary = await generateProfessionalSummary(data.personalInfo.jobTitle, data.skills);
    if (summary) updatePersonalInfo('summary', summary);
    setIsGenerating(false);
  };

  const handleAiCoverLetter = async () => {
    setIsGenerating(true);
    const letter = await generateCoverLetter(
        data.personalInfo.jobTitle, 
        data.coverLetter.recipientCompany, 
        data.skills, 
        data.experience[0]?.description || ''
    );
    if (letter) updateCoverLetter('content', letter);
    setIsGenerating(false);
  };

  const loadPreset = (key: string) => {
    const preset = PROFILE_PRESETS[key];
    if (!preset) return;
    setData(prev => ({
      ...prev,
      title: preset.title,
      personalInfo: preset.personalInfo,
      // Regenerate IDs to avoid conflicts if loading multiple times or editing
      experience: preset.experience.map(e => ({...e, id: Date.now().toString() + Math.random().toString(36).substr(2, 9)})),
      education: preset.education.map(e => ({...e, id: Date.now().toString() + Math.random().toString(36).substr(2, 9)})),
      skills: preset.skills,
      projects: preset.projects,
      references: preset.references.map(r => ({...r, id: Date.now().toString() + Math.random().toString(36).substr(2, 9)})),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const addReference = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      company: '',
      email: '',
      phone: ''
    };
    setData(prev => ({ ...prev, references: [...prev.references, newRef] }));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setData(prev => ({
      ...prev,
      references: prev.references.map(ref => ref.id === id ? { ...ref, [field]: value } : ref)
    }));
  };

  const handleImproveBullet = async (expId: string, currentDesc: string) => {
    setIsGenerating(true);
    const improved = await improveExperienceBullet(currentDesc);
    updateExperience(expId, 'description', improved);
    setIsGenerating(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('profilePicture', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ATS Handler
  const handleAtsUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset input value so same file can be uploaded again if needed
    event.target.value = '';

    setIsUploading(true);
    setAtsResult(null);
    setAtsError(null);

    try {
      const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                     file.type === 'application/msword' || 
                     file.name.toLowerCase().endsWith('.docx') || 
                     file.name.toLowerCase().endsWith('.doc');
                     
      if (isDocx) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const atsResponse = await analyzeAtsScore({ text: result.value });
        if (!atsResponse) setAtsError("Failed to analyze ATS score. Please try again.");
        else setAtsResult(atsResponse);
      } else {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64String = reader.result as string;
            // Strip data:application/pdf;base64, prefix
            const base64Data = base64String.split(',')[1];
            // Use 'application/pdf' as a safe default if type is empty but extension is .pdf
            const mimeType = file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : '');
            const result = await analyzeAtsScore({ base64Data, mimeType });
            if (!result) setAtsError("Failed to analyze ATS score. Please try again.");
            else setAtsResult(result);
          } catch (e: any) {
            console.error("Error analyzing PDF", e);
            setAtsError(e.message || "An error occurred.");
          } finally {
            setIsUploading(false);
          }
        };
        reader.readAsDataURL(file);
        return; // Early return to avoid setting isUploading manually below since it's async inside reader
      }
    } catch (e: any) {
      console.error("Error parsing document for ATS", e);
      setAtsError(e.message || "An error occurred.");
    }
    
    setIsUploading(false);
  };

  // Import Handler
  const handleImportUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset input value so same file can be uploaded again if needed
    event.target.value = '';

    setIsGenerating(true);
    
    try {
      let text = '';
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                     file.type === 'application/msword' || 
                     file.name.toLowerCase().endsWith('.docx') || 
                     file.name.toLowerCase().endsWith('.doc');

      if (isPdf) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        text = fullText;
      } else if (isDocx) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      }

      if (text) {
        console.log('Extract text length:', text.length);
        try {
          const parsed = await parseResumeFromText(text);
          if (parsed) {
            setData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, ...parsed.personalInfo },
              experience: (parsed.experience || []).map((e: any) => ({
                ...e,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
              })),
              education: (parsed.education || []).map((e: any) => ({
                ...e,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
              })),
              skills: parsed.skills || [],
              languages: parsed.languages || [],
              projects: (parsed.projects || []).map((p: any) => ({
                ...p,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
              })),
              references: (parsed.references || []).map((r: any) => ({
                ...r,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
              }))
            }));
            setSelectionMode('editor');
            setActiveTab('info');
          } else {
            alert("Failed to parse resume data. Please try again or fill manually.");
          }
        } catch (parseError: any) {
          alert(`Failed to parse resume: ${parseError.message}`);
        }
      } else {
        alert("Could not extract text from the file. Please try a different document.");
      }
    } catch (e: any) {
      console.error('Failed to import resume', e);
      alert(`Import error: ${e.message || "Unknown error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const inputClass = "w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-sm";
  const labelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 ml-1";

  if (selectionMode === 'selecting') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              Let's create your <span className="text-blue-600 dark:text-blue-500">Resume</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
              Choose the perfect way to build your professional profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Option 1: Start from scratch */}
            <button 
              onClick={() => setSelectionMode('editor')}
              className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 text-left hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:scale-[1.02] shadow-xl shadow-slate-200/50 dark:shadow-none w-full"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Create New Resume/CV</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Start from scratch with our AI-powered assistant.</p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest gap-2">
                Create New <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </button>

            {/* Option 2: Upload */}
            <div className="relative">
              <label className="block h-full">
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleImportUpload}
                />
                <div className="group h-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 text-left hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:scale-[1.02] shadow-xl shadow-slate-200/50 dark:shadow-none cursor-pointer">
                  {isGenerating ? (
                    <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-[2.5rem] flex flex-col justify-center items-center z-10">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Importing Document...</p>
                    </div>
                  ) : null}
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Import Existing Resume/CV</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Upload PDF or Word doc. We'll extract the data.</p>
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-black text-sm uppercase tracking-widest gap-2">
                    Upload Document <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <Link to="/settings" className="inline-block text-slate-400 dark:text-slate-600 text-xs font-black uppercase tracking-[0.2em] hover:text-slate-600 dark:hover:text-slate-400 transition">
            Back to Settings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="fixed -left-[9999px] top-0 no-print">
        <div id="resume-download-source" style={{ width: '210mm' }}>
          <TemplateRenderer
            data={data}
            scale={1}
            view={activeView === 'ats-check' ? 'resume' : activeView}
            pages={data.pages || 1}
            fit="a4"
          />
        </div>
      </div>
      {/* Top Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-6 flex items-center justify-between shrink-0 no-print">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
             <button 
                onClick={() => setActiveView('resume')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition ${activeView === 'resume' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                Resume
             </button>
             <button 
                onClick={() => setActiveView('cover-letter')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition ${activeView === 'cover-letter' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                Cover Letter
             </button>
             <button 
                onClick={() => setActiveView('cv')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition ${activeView === 'cv' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                CV
             </button>
             <button 
                onClick={() => setActiveView('ats-check')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition flex items-center gap-2 ${activeView === 'ats-check' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ATS Checker
             </button>
          </div>
          <input 
            value={data.title}
            onChange={(e) => setData(p => ({ ...p, title: e.target.value }))}
            className="text-lg font-bold text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 w-64 p-0 placeholder:text-slate-300 dark:placeholder:text-slate-600 ml-2"
            placeholder="Document Title"
          />
        </div>
        <div className="flex items-center gap-3 relative z-50">
          <button 
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            className={`px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-sm flex items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <div className="relative group">
            <button 
              onClick={() => {
                void handleDownloadPdf();
              }}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download <ChevronDown size={16} className="opacity-70" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden text-left origin-top-right transform group-hover:scale-100 scale-95">
              <button 
                onClick={() => {
                  void handleDownloadPdf();
                }} 
                className="w-full text-left px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                Download PDF
              </button>
              <button 
                onClick={() => {
                  handleDownloadWord();
                }} 
                className="w-full text-left px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition border-t border-slate-100 dark:border-slate-700"
              >
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Word
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        {/* Left: Editor Sidebar */}
        <aside className="w-[450px] bg-white dark:bg-slate-900 border-r dark:border-slate-800 flex flex-col overflow-hidden shrink-0 no-print z-20 shadow-xl shadow-slate-200/50 dark:shadow-none">
          
          {/* Resume Tabs */}
          {(activeView === 'resume' || activeView === 'cv') && (
            <div className="flex border-b dark:border-slate-800 overflow-x-auto no-scrollbar bg-white dark:bg-slate-900 sticky top-0 z-10">
                {[
                { id: 'template', label: 'Design' },
                { id: 'info', label: 'Info' },
                { id: 'experience', label: 'Work' },
                { id: 'education', label: 'Education' },
                { id: 'skills', label: 'Skills' },
                { id: 'languages', label: 'Languages' },
                { id: 'references', label: 'References' }
                ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 px-2 text-[10px] font-black border-b-2 whitespace-nowrap transition uppercase tracking-widest ${activeTab === tab.id ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                    {tab.label}
                </button>
                ))}
            </div>
          )}

          {/* Cover Letter Header (Visual Only) */}
          {activeView === 'cover-letter' && (
             <div className="px-6 py-4 border-b dark:border-slate-800 bg-blue-50/50 dark:bg-blue-900/20">
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Cover Letter Details</h2>
             </div>
          )}

          {/* ATS Header (Visual Only) */}
          {activeView === 'ats-check' && (
             <div className="px-6 py-4 border-b dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-900/20">
                <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">ATS Optimization</h2>
             </div>
          )}

          <div className="flex-grow overflow-y-auto p-6 space-y-8 bg-white dark:bg-slate-900">
            {/* ATS CHECKER UI */}
            {activeView === 'ats-check' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800/50">
                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-2">Check Your ATS Score</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            Upload your resume (PDF or Word) to see how well it parses for Applicant Tracking Systems. We use AI to simulate a recruiter's screening process.
                        </p>
                        
                        <label className="block w-full cursor-pointer group">
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleAtsUpload}
                                disabled={isUploading}
                            />
                            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition ${isUploading ? 'bg-emerald-100 dark:bg-emerald-800/50 border-emerald-300 dark:border-emerald-600' : 'bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-700/50 group-hover:border-emerald-400 dark:group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30'}`}>
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Analyzing Resume...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        </div>
                                        <span className="font-bold text-slate-700 dark:text-slate-300">Click to Upload Resume</span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">PDF or DOCX</span>
                                    </div>
                                )}
                            </div>
                        </label>
                        {atsError && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-800">
                                {atsError}
                            </div>
                        )}
                    </div>

                    {atsResult && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-xl">
                                <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{atsResult.score}/100</div>
                                <div><h4 className="font-bold text-slate-900 dark:text-white">{atsResult.verdict}</h4><p className="text-xs text-slate-500 dark:text-slate-400">{atsResult.summary}</p></div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {atsResult.issues && atsResult.issues.length > 0 && (
                                    <div className="p-5 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800/50">
                                        <h4 className="font-bold text-rose-700 dark:text-rose-400 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            Critical Issues
                                        </h4>
                                        <ul className="space-y-2">
                                            {((atsResult.issues as string[]) || []).map((issue, i) => (
                                                <li key={i} className="text-sm text-rose-600 dark:text-rose-300 flex items-start gap-2 leading-snug">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 dark:bg-rose-500 shrink-0"></span>
                                                    {issue}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {atsResult.missingKeywords && atsResult.missingKeywords.length > 0 && (
                                    <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                        <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                                            Missing Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {((atsResult.missingKeywords as string[]) || []).map((keyword, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-md border border-amber-200/50 dark:border-amber-700/50 shadow-sm">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* RESUME EDITORS */}
            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'template' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div>
                  <label className={labelClass}>Accent Color</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Pre-defined colors */}
                    <div className="grid grid-cols-5 gap-2">
                      {ACCENT_COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => setData(prev => ({ ...prev, accentColor: color }))}
                          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${data.accentColor === color ? 'border-slate-400 dark:border-white scale-110 ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
                          style={{ background: color }}
                          title={color}
                        />
                      ))}
                      {/* Premium Gradients */}
                      <button
                        onClick={() => setData(prev => ({ ...prev, accentColor: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }))}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${data.accentColor?.includes('6366f1') ? 'border-slate-400 dark:border-white ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
                        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
                        title="Indigo Purple"
                      />
                      <button
                        onClick={() => setData(prev => ({ ...prev, accentColor: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }))}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${data.accentColor?.includes('f59e0b') ? 'border-slate-400 dark:border-white ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
                        style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}
                        title="Sunset"
                      />
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>

                    {/* Custom Color Wheel */}
                    <div className="relative group">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-600 shadow-sm transition-all group-hover:scale-110 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 cursor-pointer flex items-center justify-center p-[2px]">
                        <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                           <input
                            type="color"
                            value={data.accentColor?.startsWith('#') ? data.accentColor : '#2563eb'}
                            onChange={(e) => setData(prev => ({ ...prev, accentColor: e.target.value }))}
                            className="w-[200%] h-[200%] cursor-pointer scale-150"
                          />
                        </div>
                      </div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Custom</span>
                    </div>
                  </div>
                </div>

                {/* Font Selector */}
                <div>
                    <label className={labelClass}>Typography</label>
                    <div className="grid grid-cols-2 gap-3">
                        {AVAILABLE_FONTS.map((font) => (
                            <button
                                key={font}
                                onClick={() => setData(prev => ({ ...prev, font: font }))}
                                className={`p-3 rounded-xl border-2 text-sm transition ${
                                    (data.font === font || (!data.font && font === 'Inter')) 
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-inner' 
                                    : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                                }`}
                                style={{ fontFamily: font }}
                            >
                                {font}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                  <label className={labelClass}>Select Template</label>
                  <div className="grid grid-cols-1 gap-3">
                    {activeTemplateOptions.map((template) => {
                      const templateId = template.id.toLowerCase();
                      const isSelected = data.templateId === templateId;
                      const allowedTemplateId = activeView === 'cv' ? 'cv-alpha' : 'executive';
                      const isLocked = !isPremiumUser && templateId !== allowedTemplateId;

                      return (
                      <button
                        key={template.id}
                        onClick={() => {
                          if (isLocked) {
                            navigate('/pricing');
                            return;
                          }
                          setData(prev => ({ ...prev, templateId }));
                        }}
                        className={`p-3 rounded-2xl border-2 transition text-left ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-inner'
                            : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                        } ${isLocked ? 'opacity-60 cursor-not-allowed hover:shadow-none' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 shrink-0">
                            <div
                              style={{
                                width: '8.27in',
                                height: '11.69in',
                                transform: 'scale(0.19)',
                                transformOrigin: 'top left',
                                pointerEvents: 'none',
                              }}
                            >
                              <TemplateRenderer
                                data={{ ...data, templateId }}
                                scale={1}
                                view={activeView}
                                pages={1}
                                fit="a4"
                              />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className={`text-sm font-black truncate ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-800 dark:text-white'}`}>
                              {template.name}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                                {activeView === 'cv' ? 'CV' : template.category}
                              </span>
                              {template.isAts && (
                                <span className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                                  ATS
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isLocked ? (
                              <svg className="w-4 h-4 opacity-50 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            ) : (
                              <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                            )}
                          </div>
                        </div>
                      </button>
                    )})}
                  </div>
                </div>
              </div>
            )}

            {/* ... Other Tabs ... */}
            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'info' && (
              <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 mb-6">
                  <label className="block text-xs font-black text-blue-600 dark:text-blue-400 uppercase mb-2">🚀 Load Example Profile</label>
                  <select 
                    onChange={(e) => {
                      if(e.target.value) loadPreset(e.target.value);
                    }}
                    className="w-full p-2.5 border border-blue-200 dark:border-blue-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="dark:text-slate-500">Select a role to auto-fill...</option>
                    {Object.entries(groupedPresets).map(([category, keys]) => (
                      <optgroup key={category} label={category} className="font-bold text-slate-900 dark:text-white">
                        {(keys as string[]).map(key => (
                          <option key={key} value={key} className="text-slate-600 dark:text-slate-300">{PROFILE_PRESETS[key].title}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                   <label className={labelClass}>Profile Picture</label>
                   <div className="flex items-center gap-4 mt-2">
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600 shrink-0">
                         {data.personalInfo.profilePicture ? (
                            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-500">
                               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                         )}
                      </div>
                      <div className="flex flex-col gap-2">
                         <div className="flex gap-2">
                             <label className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-blue-700 transition">
                                Upload Photo
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                             </label>
                             {data.personalInfo.profilePicture && (
                                <button onClick={() => updatePersonalInfo('profilePicture', '')} className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition border border-red-100 dark:border-red-800/50">
                                   Remove
                                </button>
                             )}
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => updatePersonalInfo('profilePicture', DUMMY_MAN_IMG)} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-bold text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600">Man Dummy</button>
                             <button onClick={() => updatePersonalInfo('profilePicture', DUMMY_WOMAN_IMG)} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-bold text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600">Woman Dummy</button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} className={inputClass} placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input value={data.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} className={inputClass} placeholder="e.g. Software Engineer" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} className={inputClass} placeholder="john@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} className={inputClass} placeholder="+1 234 567 890" />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input value={data.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} className={inputClass} placeholder="New York, NY" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5 px-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Professional Summary</label>
                    <button 
                      onClick={handleAiSummary}
                      disabled={isGenerating}
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
                    >
                      <span className="animate-pulse">✨</span> AI Generate
                    </button>
                  </div>
                  <textarea 
                    rows={6}
                    value={data.personalInfo.summary} 
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)} 
                    className={`${inputClass} leading-relaxed resize-none`} 
                    placeholder="Briefly describe your professional background..."
                  />
                </div>
              </div>
            )}

            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'experience' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 relative group shadow-sm hover:shadow-md transition hover:border-blue-300 dark:hover:border-blue-600">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                         <label className={labelClass}>Company</label>
                         <input placeholder="Google" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                         <label className={labelClass}>Position</label>
                         <input placeholder="Senior Engineer" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                         <label className={labelClass}>Start Date</label>
                         <input type="date" placeholder="Jan 2020" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                         <label className={labelClass}>End Date</label>
                         <input type="date" placeholder="Present" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1.5 px-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Achievements</label>
                        <button 
                          onClick={() => handleImproveBullet(exp.id, exp.description)}
                          className="text-[10px] font-bold text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition"
                        >
                          ✨ Polish with AI
                        </button>
                      </div>
                      <textarea 
                        value={exp.description} 
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                        className={`${inputClass} h-32 resize-y`} 
                        placeholder="• Increased revenue by 20%..."
                      />
                    </div>
                    <button 
                      onClick={() => setData(p => ({ ...p, experience: p.experience.filter(e => e.id !== exp.id) }))}
                      className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 text-red-500 p-1.5 rounded-full border border-red-100 dark:border-red-900/50 shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addExperience}
                  className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add Work Experience
                </button>
              </div>
            )}

            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'education' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 relative group shadow-sm hover:shadow-md transition hover:border-blue-300 dark:hover:border-blue-600">
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>School / University</label>
                        <input placeholder="Harvard University" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className={labelClass}>Degree</label>
                           <input placeholder="Bachelors" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                           <label className={labelClass}>Field of Study</label>
                           <input placeholder="Computer Science" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className={labelClass}>Start Date</label>
                           <input type="date" placeholder="2016" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                           <label className={labelClass}>End Date</label>
                           <input type="date" placeholder="2020" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setData(p => ({ ...p, education: p.education.filter(e => e.id !== edu.id) }))}
                      className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 text-red-500 p-1.5 rounded-full border border-red-100 dark:border-red-900/50 shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addEducation}
                  className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add Education
                </button>
              </div>
            )}

            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'skills' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                {data.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm font-bold border border-blue-100 dark:border-blue-800/50 shadow-sm">
                      {skill}
                      <button 
                        onClick={() => setData(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))}
                        className="hover:text-red-500 dark:hover:text-red-400 transition"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                <div>
                   <label className={labelClass}>Add New Skill</label>
                   <input 
                    placeholder="Type a skill and press Enter..." 
                    className={inputClass}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        if (val && !data.skills.includes(val)) {
                          setData(p => ({ ...p, skills: [...p.skills, val] }));
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <p className="text-[10px] text-slate-400 mt-2 ml-1">Tip: Add 8-12 skills relevant to the job description.</p>
                </div>
              </div>
            )}

            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'languages' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex flex-wrap gap-3 mb-6">
                  {data.languages.map((lang, i) => (
                      <div key={i} className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full text-sm font-bold border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
                        {lang}
                        <button 
                          onClick={() => setData(p => ({ ...p, languages: p.languages.filter((_, idx) => idx !== i) }))}
                          className="hover:text-red-500 dark:hover:text-red-400 transition"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                </div>
                <div>
                   <label className={labelClass}>Add New Language</label>
                   <input 
                    placeholder="E.g. English (Native), Spanish (Fluent) and press Enter..." 
                    className={inputClass}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        if (val && !data.languages.includes(val)) {
                          setData(p => ({ ...p, languages: [...p.languages, val] }));
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <p className="text-[10px] text-slate-400 mt-2 ml-1">Tip: Include language proficiency level (e.g. Native, Fluent, Beginner).</p>
                </div>
              </div>
            )}

            {(activeView === 'resume' || activeView === 'cv') && activeTab === 'references' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                {data.references.map((ref) => (
                  <div key={ref.id} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 relative group shadow-sm hover:shadow-md transition hover:border-blue-300 dark:hover:border-blue-600">
                    <div className="space-y-4">
                      <div>
                         <label className={labelClass}>Name</label>
                         <input placeholder="Jane Doe" value={ref.name} onChange={(e) => updateReference(ref.id, 'name', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                         <label className={labelClass}>Company</label>
                         <input placeholder="Tech Corp" value={ref.company} onChange={(e) => updateReference(ref.id, 'company', e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className={labelClass}>Email</label>
                           <input placeholder="jane@example.com" value={ref.email} onChange={(e) => updateReference(ref.id, 'email', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                           <label className={labelClass}>Phone</label>
                           <input placeholder="+1 555 000 0000" value={ref.phone} onChange={(e) => updateReference(ref.id, 'phone', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setData(p => ({ ...p, references: p.references.filter(r => r.id !== ref.id) }))}
                      className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 text-red-500 p-1.5 rounded-full border border-red-100 dark:border-red-900/50 shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addReference}
                  className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add Reference
                </button>
              </div>
            )}
            {/* COVER LETTER EDITOR */}
            {activeView === 'cover-letter' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 mb-4">
                  <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">AI Assistant</p>
                  <button 
                    onClick={handleAiCoverLetter}
                    disabled={isGenerating}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2"
                  >
                    {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} fill="currentColor" />}
                    Auto-Generate with AI
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Recipient Name</label>
                    <input 
                      value={data.coverLetter.recipientName} 
                      onChange={(e) => updateCoverLetter('recipientName', e.target.value)} 
                      className={inputClass} 
                      placeholder="e.g. Hiring Manager" 
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Recipient Company</label>
                    <input 
                      value={data.coverLetter.recipientCompany} 
                      onChange={(e) => updateCoverLetter('recipientCompany', e.target.value)} 
                      className={inputClass} 
                      placeholder="e.g. Google LLC" 
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Subject Line</label>
                    <input 
                      value={data.coverLetter.subject} 
                      onChange={(e) => updateCoverLetter('subject', e.target.value)} 
                      className={inputClass} 
                      placeholder="e.g. Application for Software Engineer position" 
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Letter Content</label>
                    <textarea 
                      rows={15}
                      value={data.coverLetter.content} 
                      onChange={(e) => updateCoverLetter('content', e.target.value)} 
                      className={`${inputClass} leading-relaxed resize-none`} 
                      placeholder="Dear Hiring Manager..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right: Live Preview */}
        <main className="flex-grow bg-slate-200 dark:bg-slate-950 p-12 overflow-y-auto relative flex justify-center items-start scroll-smooth">
          <div className="sticky top-4 left-4 z-10 flex flex-col gap-2 no-print">
            <button onClick={() => setPreviewScale(s => Math.min(1.2, s + 0.1))} className="p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow border dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold">+</button>
            <button onClick={() => setPreviewScale(s => Math.max(0.4, s - 0.1))} className="p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow border dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold">-</button>
          </div>
          
          <div className="flex flex-col items-center gap-6 my-8">
            <TemplateRenderer data={data} scale={previewScale} view={activeView === 'ats-check' ? 'resume' : activeView} pages={data.pages || 1} fit="a4" />
            
            {(activeView === 'resume' || activeView === 'cv') && (
                <div className="flex gap-4 no-print">
                    <button 
                        onClick={() => updatePageCount(1)}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Add Page
                    </button>
                    {(data.pages || 1) > 1 && (
                        <button 
                            onClick={() => updatePageCount(-1)}
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Remove Page
                        </button>
                    )}
                </div>
            )}
          </div>
        </main>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center pointer-events-none no-print">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-slate-800 dark:text-slate-100">AI working its magic...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
