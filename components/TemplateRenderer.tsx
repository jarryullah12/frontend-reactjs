import React from 'react';
import { Education, Experience, ResumeData } from '../types';

interface Props {
  data: ResumeData;
  templateId?: string;
  scale?: number;
  view?: 'resume' | 'cover-letter';
  pages?: number;
  fit?: 'template' | 'a4' | 'none';
}

interface TemplateFitConfig {
  summaryMaxChars: number;
  experienceMaxItems: number;
  experienceDescriptionMaxChars: number;
  experienceDescriptionMaxLines: number;
  educationMaxItems: number;
  educationDescriptionMaxChars: number;
  skillsMaxItems: number;
  languagesMaxItems: number;
}

const A4_TEMPLATE_OVERRIDES: Record<string, TemplateFitConfig> = {
  standard: {
    summaryMaxChars: 190,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 120,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 5,
    languagesMaxItems: 1,
  },
  essential: {
    summaryMaxChars: 215,
    experienceMaxItems: 3,
    experienceDescriptionMaxChars: 145,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 70,
    skillsMaxItems: 9,
    languagesMaxItems: 2,
  },
  compact: {
    summaryMaxChars: 225,
    experienceMaxItems: 3,
    experienceDescriptionMaxChars: 155,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 70,
    skillsMaxItems: 10,
    languagesMaxItems: 3,
  },
  spacious: {
    summaryMaxChars: 195,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 120,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 5,
    languagesMaxItems: 2,
  },
  elevate: {
    summaryMaxChars: 210,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 130,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 65,
    skillsMaxItems: 6,
    languagesMaxItems: 2,
  },
  vision: {
    summaryMaxChars: 180,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 110,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 5,
    languagesMaxItems: 1,
  },
  clarity: {
    summaryMaxChars: 230,
    experienceMaxItems: 3,
    experienceDescriptionMaxChars: 145,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 3,
    educationDescriptionMaxChars: 75,
    skillsMaxItems: 10,
    languagesMaxItems: 3,
  },
  apex: {
    summaryMaxChars: 175,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 105,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 55,
    skillsMaxItems: 5,
    languagesMaxItems: 1,
  },
  origin: {
    summaryMaxChars: 180,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 115,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 5,
    languagesMaxItems: 1,
  },
  nimbus: {
    summaryMaxChars: 215,
    experienceMaxItems: 3,
    experienceDescriptionMaxChars: 145,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 70,
    skillsMaxItems: 9,
    languagesMaxItems: 2,
  },
  zenith: {
    summaryMaxChars: 185,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 115,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 5,
    languagesMaxItems: 1,
  },
  pulse: {
    summaryMaxChars: 195,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 125,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 65,
    skillsMaxItems: 7,
    languagesMaxItems: 2,
  },
  spectrum: {
    summaryMaxChars: 180,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 110,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 5,
    languagesMaxItems: 1,
  },
  momentum: {
    summaryMaxChars: 185,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 120,
    experienceDescriptionMaxLines: 2,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 60,
    skillsMaxItems: 6,
    languagesMaxItems: 1,
  },
  vertex: {
    summaryMaxChars: 200,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 135,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 70,
    skillsMaxItems: 8,
    languagesMaxItems: 2,
  },
  dynamic: {
    summaryMaxChars: 200,
    experienceMaxItems: 2,
    experienceDescriptionMaxChars: 130,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 65,
    skillsMaxItems: 7,
    languagesMaxItems: 2,
  },
  luna: {
    summaryMaxChars: 205,
    experienceMaxItems: 3,
    experienceDescriptionMaxChars: 135,
    experienceDescriptionMaxLines: 3,
    educationMaxItems: 2,
    educationDescriptionMaxChars: 65,
    skillsMaxItems: 8,
    languagesMaxItems: 3,
  },
};

const COMPACT_TEMPLATE_IDS = new Set([
  'compact',
  'essential',
  'nimbus',
  'minimalist',
  'simple',
  'clarity',
  'luna',
  'oasis',
  'classic',
  'standard',
  'origin',
  'elegant',
  'premium',
  'elite',
  'aurora',
]);

const BALANCED_TEMPLATE_IDS = new Set([
  'executive',
  'advanced',
  'vertex',
  'pioneer',
  'modern',
  'nova',
  'zenith',
  'developer',
  'professional',
  'spacious',
  'corporate',
  'manager',
  'summit',
  'horizon',
  'designer',
  'vision',
  'spectrum',
  'bold',
  'apex',
  'momentum',
  'dynamic',
  'elevate',
  'pulse',
  'tech',
  'static',
  'echo',
  'nexus',
  'creative',
  'cv-alpha',
  'cv-beta',
  'cv-gamma',
  'cv-delta',
  'cv-epsilon',
  'cv-zeta',
  'cv-eta',
  'cv-theta',
  'cv-iota',
  'cv-kappa',
  'cv-lambda',
  'cv-mu',
  'cv-nu',
  'cv-xi',
  'cv-omicron',
  'cv-pi',
  'cv-rho',
  'cv-sigma',
  'cv-tau',
  'cv-upsilon',
]);

const AIRY_TEMPLATE_IDS = new Set([
  'spacious',
  'oasis',
  'horizon',
  'vision',
  'spectrum',
  'nova',
  'zenith',
  'vertex',
  'premium',
  'aurora',
]);

const clampTextAtWordBoundary = (text: string, maxChars: number) => {
  const normalized = text.trim().replace(/\s+/g, ' ');
  if (!normalized || normalized.length <= maxChars) return text.trim();

  const shortened = normalized.slice(0, maxChars);
  const lastSpace = shortened.lastIndexOf(' ');
  const safeCut = lastSpace > Math.floor(maxChars * 0.6) ? shortened.slice(0, lastSpace) : shortened;
  return `${safeCut.trim()}...`;
};

const clampMultilineText = (text: string, maxChars: number, maxLines: number) => {
  const normalized = text.trim();
  if (!normalized) return '';

  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return clampTextAtWordBoundary(normalized, maxChars);
  }

  const perLineLimit = Math.max(40, Math.floor(maxChars / Math.max(1, maxLines)));
  const limitedLines = lines.slice(0, maxLines).map((line) => clampTextAtWordBoundary(line, perLineLimit));
  const joined = limitedLines.join('\n');

  if (lines.length > maxLines || joined.length > maxChars) {
    return clampTextAtWordBoundary(joined, maxChars);
  }

  return joined;
};

const getTemplateFitConfig = (
  tid: string,
  detailTextLength: number,
  detailItemScore: number,
  fit: 'template' | 'a4' | 'none'
): TemplateFitConfig | null => {
  if (fit === 'none') return null;

  const needsStrongTrim = detailTextLength > 2800 || detailItemScore > 28;
  const needsTrim = detailTextLength > 1900 || detailItemScore > 20;

  if (fit === 'a4') {
    const override = A4_TEMPLATE_OVERRIDES[tid];
    if (override) return override;

    if (AIRY_TEMPLATE_IDS.has(tid) && !needsStrongTrim) {
      return {
        summaryMaxChars: 380,
        experienceMaxItems: 4,
        experienceDescriptionMaxChars: 300,
        experienceDescriptionMaxLines: 5,
        educationMaxItems: 4,
        educationDescriptionMaxChars: 150,
        skillsMaxItems: 16,
        languagesMaxItems: 6,
      };
    }

    if (COMPACT_TEMPLATE_IDS.has(tid)) {
      return needsStrongTrim
        ? {
            summaryMaxChars: 220,
            experienceMaxItems: 3,
            experienceDescriptionMaxChars: 170,
            experienceDescriptionMaxLines: 3,
            educationMaxItems: 3,
            educationDescriptionMaxChars: 95,
            skillsMaxItems: 10,
            languagesMaxItems: 4,
          }
        : {
            summaryMaxChars: 280,
            experienceMaxItems: 4,
            experienceDescriptionMaxChars: 220,
            experienceDescriptionMaxLines: 4,
            educationMaxItems: 3,
            educationDescriptionMaxChars: 120,
            skillsMaxItems: 12,
            languagesMaxItems: 5,
          };
    }

    if (needsStrongTrim) {
      return {
        summaryMaxChars: 260,
        experienceMaxItems: 4,
        experienceDescriptionMaxChars: 210,
        experienceDescriptionMaxLines: 4,
        educationMaxItems: 3,
        educationDescriptionMaxChars: 110,
        skillsMaxItems: 12,
        languagesMaxItems: 5,
      };
    }

    return {
      summaryMaxChars: 320,
      experienceMaxItems: 4,
      experienceDescriptionMaxChars: 260,
      experienceDescriptionMaxLines: 4,
      educationMaxItems: 4,
      educationDescriptionMaxChars: 130,
      skillsMaxItems: 14,
      languagesMaxItems: 6,
    };
  }

  if (COMPACT_TEMPLATE_IDS.has(tid) && needsTrim) {
    return needsStrongTrim
      ? {
          summaryMaxChars: 180,
          experienceMaxItems: 3,
          experienceDescriptionMaxChars: 150,
          experienceDescriptionMaxLines: 3,
          educationMaxItems: 3,
          educationDescriptionMaxChars: 90,
          skillsMaxItems: 10,
          languagesMaxItems: 4,
        }
      : {
          summaryMaxChars: 240,
          experienceMaxItems: 4,
          experienceDescriptionMaxChars: 210,
          experienceDescriptionMaxLines: 4,
          educationMaxItems: 3,
          educationDescriptionMaxChars: 110,
          skillsMaxItems: 12,
          languagesMaxItems: 5,
        };
  }

  if (BALANCED_TEMPLATE_IDS.has(tid) && needsStrongTrim) {
    return {
      summaryMaxChars: 300,
      experienceMaxItems: 4,
      experienceDescriptionMaxChars: 240,
      experienceDescriptionMaxLines: 4,
      educationMaxItems: 4,
      educationDescriptionMaxChars: 120,
      skillsMaxItems: 14,
      languagesMaxItems: 6,
    };
  }

  return null;
};

const getDisplayDataForTemplate = (
  rawData: ResumeData,
  tid: string,
  view: 'resume' | 'cover-letter',
  detailTextLength: number,
  detailItemScore: number,
  fit: 'template' | 'a4' | 'none'
): ResumeData => {
  if (view !== 'resume') return rawData;

  const fitConfig = getTemplateFitConfig(tid, detailTextLength, detailItemScore, fit);
  if (!fitConfig) return rawData;

  const experience: Experience[] = rawData.experience.slice(0, fitConfig.experienceMaxItems).map((exp) => ({
    ...exp,
    description: clampMultilineText(
      exp.description || '',
      fitConfig.experienceDescriptionMaxChars,
      fitConfig.experienceDescriptionMaxLines
    ),
  }));

  const education: Education[] = rawData.education.slice(0, fitConfig.educationMaxItems).map((edu) => ({
    ...edu,
    description: clampTextAtWordBoundary(edu.description || '', fitConfig.educationDescriptionMaxChars),
  }));

  return {
    ...rawData,
    personalInfo: {
      ...rawData.personalInfo,
      summary: clampTextAtWordBoundary(rawData.personalInfo.summary || '', fitConfig.summaryMaxChars),
    },
    experience,
    education,
    skills: rawData.skills.slice(0, fitConfig.skillsMaxItems),
    languages: (rawData.languages || []).slice(0, fitConfig.languagesMaxItems),
  };
};

// --- Icons ---
const Icons = {
  Email: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Phone: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  Location: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  User: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Briefcase: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  GraduationCap: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
  Link: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
};

export const TemplateRenderer: React.FC<Props> = ({
  data: rawData,
  templateId,
  scale = 1,
  view = 'resume',
  pages = 1,
  fit = 'template',
}) => {
  const tid = (templateId || rawData.templateId).toLowerCase();
  const fontFamily = rawData.font || 'Inter';
  const experienceTextLength = rawData.experience.reduce(
    (total, exp) => total + (exp.position?.length || 0) + (exp.company?.length || 0) + (exp.description?.length || 0),
    0
  );
  const educationTextLength = rawData.education.reduce(
    (total, edu) => total + (edu.degree?.length || 0) + (edu.school?.length || 0) + (edu.description?.length || 0),
    0
  );
  const detailTextLength =
    (rawData.personalInfo.summary?.length || 0) +
    experienceTextLength +
    educationTextLength +
    rawData.skills.join('').length +
    (rawData.languages || []).join('').length +
    (rawData.references || []).reduce(
      (total, ref) => total + (ref.name?.length || 0) + (ref.company?.length || 0) + (ref.email?.length || 0) + (ref.phone?.length || 0),
      0
    );
  const detailItemScore =
    rawData.experience.length * 5 +
    rawData.education.length * 3 +
    rawData.skills.length +
    (rawData.languages || []).length +
    (rawData.references || []).length * 2;

  let resumeContentScale = 1;
  if (detailTextLength > 3200 || detailItemScore > 36) {
    resumeContentScale = 0.88;
  } else if (detailTextLength > 2600 || detailItemScore > 30) {
    resumeContentScale = 0.91;
  } else if (detailTextLength > 2000 || detailItemScore > 24) {
    resumeContentScale = 0.94;
  } else if (detailTextLength > 1500 || detailItemScore > 18) {
    resumeContentScale = 0.97;
  } else if (detailTextLength < 700 && detailItemScore < 10) {
    resumeContentScale = 1.16;
  } else if (detailTextLength < 1000 && detailItemScore < 13) {
    resumeContentScale = 1.12;
  } else if (detailTextLength < 1400 && detailItemScore < 17) {
    resumeContentScale = 1.08;
  }

  const data = getDisplayDataForTemplate(rawData, tid, view, detailTextLength, detailItemScore, fit);
  const isGradient = data.accentColor?.includes('gradient') || false;
  const accentStyle = isGradient ? { background: data.accentColor } : { backgroundColor: data.accentColor || '#333' };
  const textAccentStyle = isGradient 
    ? { backgroundImage: data.accentColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' } 
    : { color: data.accentColor || '#333' };
  const borderAccentStyle = isGradient
    ? { borderImageSource: data.accentColor, borderImageSlice: 1, borderWidth: '2px', borderStyle: 'solid' }
    : { borderColor: data.accentColor || '#333' };

  const ProfileImage = ({ className = "", style = {} }) => {
    if (!data.personalInfo.profilePicture) return null;
    return (
      <img 
        src={data.personalInfo.profilePicture} 
        alt="Profile"
        className={`object-cover shrink-0 ${className}`}
        style={{ ...style }}
      />
    );
  };

  // --- Layout Engines ---

  const renderExecutive = () => {
    const isAdvanced = tid === 'advanced';
    const isVertex = tid === 'vertex';
    const isPioneer = tid === 'pioneer';

    if (isPioneer) {
      return (
        <div className="h-full bg-white relative overflow-hidden text-slate-800 grid grid-cols-[30%_70%]">
          <aside className="bg-slate-900 text-white p-[16mm] flex flex-col gap-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400 mb-6">Pioneer Profile</div>
              <ProfileImage className="w-28 h-28 rounded-3xl border-4 mb-6 object-cover" style={{ borderColor: isGradient ? 'transparent' : data.accentColor }} />
              <h1 className="text-3xl font-black uppercase leading-tight mb-2">{data.personalInfo.fullName}</h1>
              <h2 className="text-sm uppercase tracking-[0.3em] text-slate-300 mb-6">{data.personalInfo.jobTitle}</h2>
              <div className="space-y-3 text-xs font-semibold text-slate-300">
                {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                {data.personalInfo.email && <div className="break-all">{data.personalInfo.email}</div>}
                {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
                {data.personalInfo.website && <div className="break-all">{data.personalInfo.website}</div>}
              </div>
            </div>

            <div className="space-y-8">
              {data.skills.length > 0 && (
                <section>
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-slate-700 bg-slate-800 text-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {(data.languages || []).length > 0 && (
                <section>
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white mb-4">Languages</h3>
                  <div className="space-y-2 text-xs font-semibold text-slate-300">
                    {(data.languages || []).map(lang => (
                      <div key={lang}>{lang}</div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </aside>

          <div className="p-[16mm] bg-[#f8fafc] flex flex-col gap-8">
            {data.personalInfo.summary && (
              <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-3" style={textAccentStyle}>Profile</h3>
                <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-5" style={textAccentStyle}>Experience</h3>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="relative pl-6 border-l-2" style={borderAccentStyle}>
                      <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full" style={accentStyle}></div>
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                          <h5 className="text-sm font-semibold text-slate-500">{exp.company}</h5>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full text-white shrink-0" style={accentStyle}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-5" style={textAccentStyle}>Education</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                      <h5 className="text-xs font-semibold text-slate-500 mb-1">{edu.school}</h5>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{edu.startDate} - {edu.endDate}</span>
                      {edu.description && <p className="text-xs text-slate-600 leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      );
    }

    if (isVertex) {
      return (
        <div className="h-full relative overflow-hidden text-slate-800 bg-white">
          <div className="absolute top-0 left-0 right-0 h-24" style={accentStyle}></div>
          <div className="relative z-10 p-[18mm]">
            <header className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-8 mb-8 flex items-center gap-8">
              <ProfileImage className="w-28 h-28 rounded-full border-4 shadow-md object-cover" style={{ borderColor: isGradient ? 'transparent' : data.accentColor }} />
              <div className="flex-grow">
                <h1 className="text-[30pt] font-black uppercase leading-none mb-2" style={textAccentStyle}>{data.personalInfo.fullName}</h1>
                <h2 className="text-[12pt] uppercase tracking-[5px] font-semibold text-slate-500 mb-4">{data.personalInfo.jobTitle}</h2>
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                  {data.personalInfo.phone && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.phone}</span>}
                  {data.personalInfo.email && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.email}</span>}
                  {data.personalInfo.location && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.location}</span>}
                  {data.personalInfo.website && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.website}</span>}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-[1.35fr_0.85fr] gap-8">
              <div className="space-y-8">
                {data.personalInfo.summary && (
                  <section className="bg-slate-50 rounded-[1.75rem] p-6 border border-slate-100">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-3" style={textAccentStyle}>Profile</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
                  </section>
                )}

                {data.experience.length > 0 && (
                  <section className="bg-slate-50 rounded-[1.75rem] p-6 border border-slate-100">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-5" style={textAccentStyle}>Experience</h3>
                    <div className="space-y-5">
                      {data.experience.map(exp => (
                        <div key={exp.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                          <div className="flex justify-between items-start gap-4 mb-1">
                            <div>
                              <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                              <h5 className="text-sm font-semibold text-slate-500">{exp.company}</h5>
                            </div>
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white shrink-0" style={accentStyle}>
                              {exp.startDate} - {exp.endDate}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="space-y-8">
                {data.education.length > 0 && (
                  <section className="bg-slate-50 rounded-[1.75rem] p-6 border border-slate-100">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-5" style={textAccentStyle}>Education</h3>
                    <div className="space-y-4">
                      {data.education.map(edu => (
                        <div key={edu.id} className="bg-white rounded-2xl p-4 border border-slate-100">
                          <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                          <h5 className="text-xs text-slate-500 font-semibold mb-1">{edu.school}</h5>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{edu.startDate} - {edu.endDate}</span>
                          {edu.description && <p className="text-xs text-slate-600 leading-relaxed">{edu.description}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {data.skills.length > 0 && (
                  <section className="bg-slate-50 rounded-[1.75rem] p-6 border border-slate-100">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-4" style={textAccentStyle}>Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white border border-slate-200 text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {(data.languages || []).length > 0 && (
                  <section className="bg-slate-50 rounded-[1.75rem] p-6 border border-slate-100">
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-4" style={textAccentStyle}>Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {(data.languages || []).map(lang => (
                        <span key={lang} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white border border-slate-200 text-slate-700">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`h-full relative overflow-hidden text-slate-800 p-[20mm] ${isAdvanced ? 'bg-white' : 'bg-slate-50'}`}>
        <header className={`flex items-center gap-8 mb-10 pb-6 ${isAdvanced ? 'border-b-4' : 'border-b-2'}`} style={borderAccentStyle}>
           <ProfileImage className={`w-32 h-32 shadow-sm rounded-full ${isAdvanced ? 'border-[6px]' : 'border-4'}`} style={{ borderColor: isGradient ? 'transparent' : data.accentColor }} />
           <div className="flex-grow">
              <h1 className={`text-[32pt] font-black uppercase leading-none mb-2 ${isAdvanced ? 'tracking-normal' : 'tracking-tight'}`} style={textAccentStyle}>
                 {data.personalInfo.fullName}
              </h1>
              <h2 className="text-[14pt] uppercase tracking-[4px] font-medium text-slate-500 mb-4">
                 {data.personalInfo.jobTitle}
              </h2>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                 {data.personalInfo.phone && <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5" style={textAccentStyle}>{Icons.Phone}</span> {data.personalInfo.phone}</div>}
                 {data.personalInfo.email && <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5" style={textAccentStyle}>{Icons.Email}</span> {data.personalInfo.email}</div>}
                 {data.personalInfo.location && <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5" style={textAccentStyle}>{Icons.Location}</span> {data.personalInfo.location}</div>}
                 {data.personalInfo.website && <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5" style={textAccentStyle}>{Icons.Link}</span> {data.personalInfo.website}</div>}
              </div>
           </div>
        </header>
        
        <div className="flex gap-10">
           <div className="w-[65%] flex flex-col gap-8">
              {data.personalInfo.summary && (
                 <section className={isAdvanced ? 'bg-slate-50 rounded-3xl border border-slate-200 p-6' : ''}>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                       <span className="w-5 h-5" style={textAccentStyle}>{Icons.User}</span> Profile
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
                 </section>
              )}

              {data.experience.length > 0 && (
                 <section className={isAdvanced ? 'bg-slate-50 rounded-3xl border border-slate-200 p-6' : ''}>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
                       <span className="w-5 h-5" style={textAccentStyle}>{Icons.Briefcase}</span> Experience
                    </h3>
                    <div className="space-y-6">
                       {data.experience.map(exp => (
                          <div key={exp.id} className={isAdvanced ? 'border-b border-slate-200 pb-4 last:border-b-0' : ''}>
                             <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-[1.05rem] font-bold text-slate-900">{exp.position}</h4>
                                <span className={`text-xs font-bold px-2 py-0.5 ${isAdvanced ? 'rounded-full' : 'rounded-sm'} text-white`} style={accentStyle}>{exp.startDate} - {exp.endDate}</span>
                             </div>
                             <h5 className="text-sm text-slate-500 font-semibold mb-2">{exp.company}</h5>
                             <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                          </div>
                       ))}
                    </div>
                 </section>
              )}
           </div>

           <div className="w-[35%] flex flex-col gap-8">
              {data.education.length > 0 && (
                 <section className={isAdvanced ? 'bg-slate-50 rounded-3xl border border-slate-200 p-6' : ''}>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
                       <span className="w-5 h-5" style={textAccentStyle}>{Icons.GraduationCap}</span> Education
                    </h3>
                    <div className="space-y-4">
                       {data.education.map(edu => (
                          <div key={edu.id}>
                             <h4 className="text-[0.95rem] font-bold text-slate-900">{edu.degree}</h4>
                             <h5 className="text-xs text-slate-500 font-semibold mb-1">{edu.school}</h5>
                             <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{edu.startDate} - {edu.endDate}</span>
                             <p className="text-xs text-slate-600 leading-relaxed">{edu.description}</p>
                          </div>
                       ))}
                    </div>
                 </section>
              )}

              {data.skills.length > 0 && (
                 <section className={isAdvanced ? 'bg-slate-50 rounded-3xl border border-slate-200 p-6' : ''}>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="w-5 h-5" style={textAccentStyle}>{Icons.User}</span> Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {data.skills.map(skill => (
                          <span key={skill} className={`px-2.5 py-1 text-xs font-semibold border shadow-sm text-slate-700 ${isAdvanced ? 'rounded-full bg-white border-slate-200' : 'rounded-md bg-white border-slate-100'}`}>
                             {skill}
                          </span>
                       ))}
                    </div>
                 </section>
              )}

              {(data.languages || []).length > 0 && (
                 <section className={isAdvanced ? 'bg-slate-50 rounded-3xl border border-slate-200 p-6' : ''}>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="w-5 h-5" style={textAccentStyle}>{Icons.User}</span> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {(data.languages || []).map(lang => (
                          <span key={lang} className={`px-2.5 py-1 text-xs font-semibold border shadow-sm text-slate-700 ${isAdvanced ? 'rounded-full bg-white border-slate-200' : 'rounded-md bg-white border-slate-100'}`}>
                             {lang}
                          </span>
                       ))}
                    </div>
                 </section>
              )}
           </div>
        </div>
      </div>
    );
  };

  const renderModern = () => {
    const isNova = tid === 'nova';
    const isZenith = tid === 'zenith';
    const isDeveloper = tid === 'developer';

    if (isDeveloper) {
      return (
        <div className="h-full bg-[#0f172a] text-slate-100 grid grid-cols-[33%_67%] overflow-hidden">
          <aside className="bg-slate-950 p-[14mm] border-r border-slate-800">
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-400 mb-6">Developer Mode</div>
            <ProfileImage className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-700 mb-6" />
            <h1 className="text-3xl font-black leading-tight mb-2">{data.personalInfo.fullName}</h1>
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-6">{data.personalInfo.jobTitle}</h2>
            <div className="space-y-3 text-xs text-slate-300 mb-8">
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.email && <div className="break-all">{data.personalInfo.email}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            </div>
            {data.skills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400 mb-4">Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 text-[10px] rounded-full border border-slate-700 bg-slate-900 text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
            {(data.languages || []).length > 0 && (
              <section>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400 mb-4">Languages</h3>
                <div className="space-y-2 text-xs text-slate-300">
                  {(data.languages || []).map(lang => (
                    <div key={lang}>{lang}</div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <div className="p-[14mm] bg-slate-900">
            {data.personalInfo.summary && (
              <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] text-cyan-400 mb-3">Profile</h3>
                <p className="text-sm leading-relaxed text-slate-300">{data.personalInfo.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] text-cyan-400 mb-5">Work Experience</h3>
                <div className="space-y-5">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="text-base font-bold text-white">{exp.position}</h4>
                          <span className="text-sm font-semibold text-cyan-300">{exp.company}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-300 rounded-full px-2 py-1 bg-slate-800 shrink-0">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-400 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] text-cyan-400 mb-5">Education</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                      <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                      <h5 className="text-xs font-semibold text-cyan-300 mb-1">{edu.school}</h5>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      );
    }

    if (isZenith) {
      return (
        <div className="h-full bg-slate-50 text-slate-800 overflow-hidden">
          <header className="p-[11mm] text-white" style={accentStyle}>
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <ProfileImage className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl" />
                <div>
                  <h1 className="text-4xl font-black leading-tight mb-2">{data.personalInfo.fullName}</h1>
                  <h2 className="text-base uppercase tracking-[0.35em] opacity-90">{data.personalInfo.jobTitle}</h2>
                </div>
              </div>
              <div className="text-sm font-medium space-y-2 text-right">
                {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              </div>
            </div>
          </header>

          <div className="p-[11mm] grid grid-cols-[1.15fr_0.85fr] gap-6">
            <div className="space-y-4">
              {data.personalInfo.summary && (
                <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 mb-3 border-b pb-2">Profile</h3>
                  <p className="text-sm leading-relaxed text-slate-600 font-medium">{data.personalInfo.summary}</p>
                </section>
              )}

              {data.experience.length > 0 && (
                <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 mb-3 border-b pb-2">Work Experience</h3>
                  <div className="space-y-3">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                        <div className="flex justify-between items-center gap-4 mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                            <span className="text-sm font-bold" style={textAccentStyle}>{exp.company}</span>
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-4">
              {data.skills.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 mb-3 border-b pb-2">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.map(skill => (
                      <span key={skill} className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">{skill}</span>
                    ))}
                  </div>
                </section>
              )}

              {(data.languages || []).length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 mb-3 border-b pb-2">Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    {(data.languages || []).map(lang => (
                      <span key={lang} className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">{lang}</span>
                    ))}
                  </div>
                </section>
              )}

              {data.education.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 mb-3 border-b pb-2">Education</h3>
                  <div className="space-y-3">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <h4 className="text-base font-bold text-slate-900">{edu.degree}</h4>
                        <div className="flex justify-between items-center gap-4 mb-1">
                          <span className="text-sm font-bold" style={textAccentStyle}>{edu.school}</span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (isNova) {
      return (
        <div className="h-full bg-white relative flex overflow-hidden">
          <div className="w-[38%] text-white p-10 relative overflow-hidden" style={accentStyle}>
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10"></div>
            <div className="absolute -left-20 bottom-0 w-56 h-56 rounded-full bg-black/10"></div>
            <ProfileImage className="w-36 h-36 rounded-[2rem] rotate-[-6deg] shadow-2xl object-cover border-4 border-white mb-8 relative z-10" />
            <h1 className="text-4xl font-black leading-tight mb-2 relative z-10">{data.personalInfo.fullName}</h1>
            <h2 className="text-base font-semibold uppercase tracking-[0.3em] opacity-90 mb-8 relative z-10">{data.personalInfo.jobTitle}</h2>
            <div className="space-y-4 text-sm font-medium opacity-90 relative z-10">
              {data.personalInfo.phone && <div className="flex items-center gap-3"><span className="w-5 h-5">{Icons.Phone}</span> {data.personalInfo.phone}</div>}
              {data.personalInfo.email && <div className="flex items-center gap-3"><span className="w-5 h-5">{Icons.Email}</span> <span className="break-all">{data.personalInfo.email}</span></div>}
            </div>

            {data.skills.length > 0 && (
              <div className="mt-10 relative z-10">
                <h3 className="text-lg font-black uppercase tracking-[0.25em] mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(skill => (
                    <span key={skill} className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 border border-white/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-[62%] p-10 bg-slate-50 text-slate-800">
            {data.personalInfo.summary && (
              <section className="mb-10">
                <h3 className="text-xl font-black uppercase tracking-widest mb-4 inline-block pb-1" style={borderAccentStyle && !isGradient ? { borderBottomWidth: '3px', borderBottomColor: data.accentColor } : { borderBottom: '3px solid #e2e8f0' }}>Profile</h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">{data.personalInfo.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section className="mb-10">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 inline-block pb-1" style={borderAccentStyle && !isGradient ? { borderBottomWidth: '3px', borderBottomColor: data.accentColor } : { borderBottom: '3px solid #e2e8f0' }}>Work Experience</h3>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                      <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                      <div className="flex justify-between items-center mb-2 gap-4">
                        <span className="text-sm font-bold" style={textAccentStyle}>{exp.company}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 inline-block pb-1" style={borderAccentStyle && !isGradient ? { borderBottomWidth: '3px', borderBottomColor: data.accentColor } : { borderBottom: '3px solid #e2e8f0' }}>Education</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                      <h4 className="text-base font-bold text-slate-900">{edu.degree}</h4>
                      <div className="flex justify-between items-center mb-1 gap-4">
                        <span className="text-sm font-bold" style={textAccentStyle}>{edu.school}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-white relative flex flex-row overflow-hidden">
         {/* Left/Top Banner */}
         <div className="w-[35%] p-10 flex flex-col text-white" style={accentStyle}>
            <div>
              <ProfileImage className="rounded-2xl w-40 h-40 mb-8 shadow-xl object-cover" />
              <div>
                <h1 className="text-4xl font-black leading-tight mb-2 tracking-tight">{data.personalInfo.fullName}</h1>
                <h2 className="text-lg font-medium opacity-80 mb-4 tracking-widest uppercase">{data.personalInfo.jobTitle}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-12 text-sm font-medium opacity-90">
               {data.personalInfo.phone && <div className="flex items-center gap-3"><span className="w-5 h-5">{Icons.Phone}</span> {data.personalInfo.phone}</div>}
               {data.personalInfo.email && <div className="flex items-center gap-3"><span className="w-5 h-5">{Icons.Email}</span> <span className="break-all">{data.personalInfo.email}</span></div>}
            </div>

            {data.skills.length > 0 && (
               <div className="mb-10">
                  <h3 className="text-xl font-bold uppercase tracking-widest mb-5 border-b border-white/20 pb-2">Skills</h3>
                  <div className="flex flex-col gap-2">
                     {data.skills.map(skill => (
                        <div key={skill} className="text-sm font-semibold opacity-90">{skill}</div>
                     ))}
                  </div>
               </div>
            )}

            {(data.languages || []).length > 0 && (
               <div className="mb-10">
                  <h3 className="text-xl font-bold uppercase tracking-widest mb-5 border-b border-white/20 pb-2">Languages</h3>
                  <div className="flex flex-col gap-2">
                     {(data.languages || []).map(lang => (
                        <div key={lang} className="text-sm font-semibold opacity-90">{lang}</div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         {/* Right/Bottom Content */}
         <div className="w-[65%] p-10 bg-white text-slate-800">

            {data.personalInfo.summary && (
               <section className="mb-10">
                  <h3 className="text-xl font-black uppercase tracking-widest mb-4 inline-block pb-1" style={borderAccentStyle && !isGradient ? { borderBottomWidth: '3px', borderBottomColor: data.accentColor } : { borderBottom: '3px solid #e2e8f0' }}>Profile</h3>
                  <p className="text-sm leading-relaxed text-slate-600 font-medium">{data.personalInfo.summary}</p>
               </section>
            )}

            {data.experience.length > 0 && (
               <section className="mb-10">
                  <h3 className="text-xl font-black uppercase tracking-widest mb-6 inline-block pb-1" style={borderAccentStyle && !isGradient ? { borderBottomWidth: '3px', borderBottomColor: data.accentColor } : { borderBottom: '3px solid #e2e8f0' }}>Work Experience</h3>
                  <div className="space-y-6">
                     {data.experience.map(exp => (
                        <div key={exp.id} className={`relative pl-6 ${isDeveloper ? 'border-2 p-4 rounded-xl border-slate-50' : 'border-l-2'}`} style={!isDeveloper ? borderAccentStyle : {}}>
                           {!isDeveloper && <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={accentStyle} />}
                           <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-bold" style={textAccentStyle}>{exp.company}</span>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                           </div>
                           <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {data.education.length > 0 && (
               <section>
                  <h3 className="text-xl font-black uppercase tracking-widest mb-6 inline-block pb-1" style={borderAccentStyle && !isGradient ? { borderBottomWidth: '3px', borderBottomColor: data.accentColor } : { borderBottom: '3px solid #e2e8f0' }}>Education</h3>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id} className="relative pl-6 border-l-2" style={borderAccentStyle}>
                           <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={accentStyle} />
                           <h4 className="text-base font-bold text-slate-900">{edu.degree}</h4>
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-bold" style={textAccentStyle}>{edu.school}</span>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{edu.startDate} - {edu.endDate}</span>
                           </div>
                           <p className="text-xs leading-relaxed text-slate-600">{edu.description}</p>
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>
      </div>
    );
  };

  const renderClassic = () => {
    const isStandard = tid === 'standard';
    const isOrigin = tid === 'origin';

    return (
      <div className={`h-full relative p-[14mm] text-slate-900 mx-auto max-w-4xl overflow-hidden ${isOrigin ? 'bg-[#fffdf8]' : 'bg-white'}`}>
         {isOrigin && <div className="absolute left-0 top-0 bottom-0 w-3" style={accentStyle}></div>}
         <header className={`mb-5 pb-5 ${isStandard ? 'text-left border-l-8 pl-6' : 'text-center border-b-2'} ${isOrigin ? 'border-b border-slate-300 text-left pl-0' : 'border-slate-900'}`} style={isStandard ? borderAccentStyle : undefined}>
            {data.personalInfo.profilePicture && (
                <ProfileImage className={`w-28 h-28 border-2 shadow-sm mb-6 ${isStandard ? 'rounded-2xl' : 'rounded-full'} ${isStandard ? '' : 'mx-auto'}`} style={isStandard ? borderAccentStyle : { borderColor: '#0f172a' }} />
            )}
            <h1 className={`text-4xl font-serif font-black uppercase tracking-widest mb-3 ${isOrigin ? 'text-slate-800' : ''}`}>{data.personalInfo.fullName}</h1>
            <h2 className={`text-lg font-serif italic ${isOrigin ? 'text-slate-500' : 'text-slate-600'}`} style={isStandard ? textAccentStyle : undefined}>{data.personalInfo.jobTitle}</h2>
            
            <div className={`flex flex-wrap gap-4 text-xs font-semibold mt-4 text-slate-800 ${isStandard || isOrigin ? 'justify-start' : 'justify-center'}`}>
               {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
               {data.personalInfo.phone && data.personalInfo.email && <span>{isStandard ? '•' : '|'}</span>}
               {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
               {data.personalInfo.email && data.personalInfo.location && <span>{isStandard ? '•' : '|'}</span>}
               {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
               {data.personalInfo.location && data.personalInfo.website && <span>{isStandard ? '•' : '|'}</span>}
               {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            </div>
         </header>

         <div className="space-y-5">
            {data.personalInfo.summary && (
               <section className={isStandard ? 'bg-slate-50 border border-slate-200 rounded-2xl p-5' : ''}>
                  <h3 className={`text-base font-bold uppercase tracking-widest mb-3 py-1 ${isStandard || isOrigin ? 'text-left' : 'text-center'}`} style={isStandard || isOrigin ? textAccentStyle : accentStyle}>
                     <span className={isStandard || isOrigin ? '' : 'text-white'}>Professional Summary</span>
                  </h3>
                  <p className={`text-sm leading-relaxed text-slate-700 ${isOrigin ? 'font-serif' : 'text-justify'}`}>{data.personalInfo.summary}</p>
               </section>
            )}

            {data.experience.length > 0 && (
               <section>
                  <h3 className={`text-base font-bold uppercase tracking-widest mb-4 py-1 ${isStandard || isOrigin ? 'text-left' : 'text-center'}`} style={isStandard || isOrigin ? textAccentStyle : accentStyle}>
                     <span className={isStandard || isOrigin ? '' : 'text-white'}>Experience</span>
                  </h3>
                  <div className={`space-y-5 ${isOrigin ? 'border-l pl-5 border-slate-200' : ''}`}>
                     {data.experience.map(exp => (
                        <div key={exp.id} className={isStandard ? 'border-b border-slate-200 pb-4 last:border-b-0' : ''}>
                           <div className="flex justify-between items-end mb-1 gap-4">
                              <h4 className={`font-bold ${isStandard ? 'text-lg' : 'text-[1.05rem]'}`}>{exp.position}</h4>
                              <span className={`text-xs font-bold ${isStandard ? 'px-2 py-1 rounded-full bg-slate-100 text-slate-600' : 'text-slate-500'}`}>{exp.startDate} - {exp.endDate}</span>
                           </div>
                           <h5 className={`text-sm mb-2 ${isOrigin ? 'uppercase tracking-[0.2em] text-slate-500 font-semibold' : 'font-bold italic text-slate-700'}`}>{exp.company}</h5>
                           <p className="text-[0.8rem] leading-relaxed text-slate-700 whitespace-pre-line">{exp.description}</p>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            <div className={`gap-8 ${isOrigin ? 'grid grid-cols-[1.2fr_0.8fr]' : 'flex'}`}>
               <div className={isOrigin ? '' : 'w-1/2'}>
                  {data.education.length > 0 && (
                     <section className={isStandard ? 'bg-slate-50 border border-slate-200 rounded-2xl p-5 h-full' : ''}>
                        <h3 className={`text-base font-bold uppercase tracking-widest mb-4 py-1 ${isStandard || isOrigin ? 'text-left' : 'text-center'}`} style={isStandard || isOrigin ? textAccentStyle : accentStyle}>
                           <span className={isStandard || isOrigin ? '' : 'text-white'}>Education</span>
                        </h3>
                        <div className="space-y-4">
                           {data.education.map(edu => (
                              <div key={edu.id}>
                                 <h4 className="text-sm font-bold">{edu.degree}</h4>
                                 <h5 className={`text-xs ${isOrigin ? 'uppercase tracking-widest text-slate-500 font-semibold' : 'italic text-slate-700'}`}>{edu.school}</h5>
                                 <span className="text-xs font-semibold text-slate-500 block mb-1">{edu.startDate} - {edu.endDate}</span>
                              </div>
                           ))}
                        </div>
                     </section>
                  )}
               </div>

               <div className={isOrigin ? '' : 'w-1/2'}>
                  {data.skills.length > 0 && (
                     <section className={isStandard ? 'bg-slate-50 border border-slate-200 rounded-2xl p-5' : ''}>
                        <h3 className={`text-base font-bold uppercase tracking-widest mb-4 py-1 ${isStandard || isOrigin ? 'text-left' : 'text-center'}`} style={isStandard || isOrigin ? textAccentStyle : accentStyle}>
                           <span className={isStandard || isOrigin ? '' : 'text-white'}>Skills</span>
                        </h3>
                        <div className={`flex flex-wrap gap-x-4 gap-y-2 ${isOrigin ? 'bg-slate-50 rounded-xl p-4 border border-slate-200' : ''}`}>
                           {data.skills.map((skill, index) => (
                              <div key={index} className={`flex items-center gap-2 text-sm font-semibold ${isStandard ? 'px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700' : 'text-slate-800'}`}>
                                 {!isStandard && <span className="w-1.5 h-1.5 rounded-full" style={accentStyle}></span>}
                                 {skill}
                              </div>
                           ))}
                        </div>
                     </section>
                  )}

                  {(data.languages || []).length > 0 && (
                     <section className={`${isStandard ? 'bg-slate-50 border border-slate-200 rounded-2xl p-5' : ''} ${data.skills.length > 0 ? 'mt-6' : ''}`}>
                        <h3 className={`text-base font-bold uppercase tracking-widest mb-4 py-1 ${isStandard || isOrigin ? 'text-left' : 'text-center'}`} style={isStandard || isOrigin ? textAccentStyle : accentStyle}>
                           <span className={isStandard || isOrigin ? '' : 'text-white'}>Languages</span>
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                           {(data.languages || []).map((lang, index) => (
                              <div key={index} className={`flex items-center gap-2 text-sm font-semibold ${isStandard ? 'text-slate-700' : 'text-slate-800'}`}>
                                 {!isStandard && <span className="w-1.5 h-1.5 rounded-full" style={accentStyle}></span>}
                                 {lang}
                              </div>
                           ))}
                        </div>
                     </section>
                  )}
               </div>
            </div>
         </div>
      </div>
    );
  };

  const renderCreative = () => (
     <div className="h-full bg-[#fcfcfc] relative p-12 text-slate-800 overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" style={accentStyle}></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" style={accentStyle}></div>

        <div className="relative z-10 flex gap-12">
            {/* Left Column */}
            <div className="w-1/3 flex flex-col gap-8">
                {data.personalInfo.profilePicture && (
                    <ProfileImage className="w-full aspect-square rounded-3xl object-cover shadow-2xl shadow-black/10" style={{ border: `4px solid ${isGradient ? 'transparent' : data.accentColor}` }} />
                )}
                
                <div>
                   <h1 className="text-4xl font-black leading-none mb-2" style={textAccentStyle}>{data.personalInfo.fullName.split(' ')[0]}</h1>
                   <h1 className="text-4xl font-black leading-none text-slate-900 mb-4">{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</h1>
                   <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-white shadow-md uppercase tracking-wider" style={accentStyle}>
                      {data.personalInfo.jobTitle}
                   </div>
                </div>

                <div className="space-y-4 text-xs font-semibold text-slate-600 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                   {data.personalInfo.phone && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Phone}</span> {data.personalInfo.phone}</div>}
                   {data.personalInfo.email && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Email}</span> <span className="break-all">{data.personalInfo.email}</span></div>}
                   {data.personalInfo.location && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Location}</span> {data.personalInfo.location}</div>}
                   {data.personalInfo.website && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Link}</span> {data.personalInfo.website}</div>}
                </div>

                {data.skills.length > 0 && (
                   <div>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                           <span className="w-5 h-5" style={textAccentStyle}>{Icons.Briefcase}</span> Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill} className="px-3 py-1.5 text-xs font-bold rounded-xl text-white shadow-sm" style={accentStyle}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {(data.languages || []).length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                           <span className="w-5 h-5" style={textAccentStyle}>{Icons.User}</span> Languages
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {(data.languages || []).map(lang => (
                                <span key={lang} className="px-3 py-1.5 text-xs font-bold rounded-xl text-slate-700 bg-slate-100 shadow-sm border border-slate-200">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                 )}
            </div>

            {/* Right Column */}
            <div className="w-2/3 flex flex-col gap-10">
                {data.personalInfo.summary && (
                    <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative">
                        <div className="absolute -left-3 -top-3 text-5xl opacity-20" style={textAccentStyle}>"</div>
                        <p className="text-[0.9rem] leading-relaxed text-slate-600 font-medium relative z-10">{data.personalInfo.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                       <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                          <span className="w-6 h-6" style={textAccentStyle}>{Icons.Briefcase}</span> Work Experience
                       </h3>
                       <div className="space-y-6">
                           {data.experience.map((exp, i) => (
                               <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:rounded-full before:bg-slate-100">
                                  <div className="absolute left-[-5px] top-2 w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm" style={accentStyle} />
                                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-50 transition-shadow hover:shadow-md">
                                     <div className="flex justify-between items-start mb-2">
                                        <div>
                                           <h4 className="text-lg font-black text-slate-900">{exp.position}</h4>
                                           <h5 className="text-sm font-bold" style={textAccentStyle}>{exp.company}</h5>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                                           {exp.startDate} - {exp.endDate}
                                        </span>
                                     </div>
                                     <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line mt-2">{exp.description}</p>
                                  </div>
                               </div>
                           ))}
                       </div>
                    </section>
                )}

                {data.education.length > 0 && (
                    <section>
                       <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                          <span className="w-6 h-6" style={textAccentStyle}>{Icons.GraduationCap}</span> Education Profile
                       </h3>
                       <div className="grid grid-cols-2 gap-4">
                           {data.education.map(edu => (
                               <div key={edu.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 border-l-4" style={{ borderLeftColor: isGradient ? 'transparent' : data.accentColor, borderImage: isGradient ? `${data.accentColor} 1` : 'none' }}>
                                  <h4 className="text-[0.95rem] font-black text-slate-900 mb-1">{edu.degree}</h4>
                                  <h5 className="text-xs font-bold" style={textAccentStyle}>{edu.school}</h5>
                                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mt-2">{edu.startDate} - {edu.endDate}</span>
                               </div>
                           ))}
                       </div>
                    </section>
                )}
            </div>
        </div>
     </div>
  );

  const renderMinimalist = () => {
    const isClean = tid === 'clean';
    const isSimple = tid === 'simple';
    const isClarity = tid === 'clarity';
    const isLuna = tid === 'luna';
    const isOasis = tid === 'oasis';

    if (isSimple) {
      return (
        <div className="h-full bg-white relative p-[20mm] text-black mx-auto overflow-hidden">
          <header className="mb-10 border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-semibold tracking-[0.35em] uppercase mb-2">{data.personalInfo.fullName}</h1>
            <h2 className="text-xs tracking-[0.35em] uppercase text-slate-400 mb-4 font-semibold">{data.personalInfo.jobTitle}</h2>
            <div className="flex flex-wrap gap-6 text-xs text-slate-500 font-medium">
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
          </header>

          <div className="space-y-8">
            {data.personalInfo.summary && (
              <section>
                <p className="text-sm leading-relaxed text-slate-700 font-sans">{data.personalInfo.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section>
                <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-6">Experience</h3>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1 gap-4">
                        <h4 className="text-sm font-bold uppercase tracking-wide">{exp.position}</h4>
                        <span className="text-[10px] uppercase text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <h5 className="text-xs font-medium text-slate-600 mb-2" style={textAccentStyle}>{exp.company}</h5>
                      <p className="text-xs leading-relaxed text-slate-500 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-2 gap-10">
              {data.education.length > 0 && (
                <section>
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-6">Education</h3>
                  <div className="space-y-5">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <h4 className="text-sm font-bold uppercase tracking-wide">{edu.degree}</h4>
                        <h5 className="text-xs font-medium text-slate-600 mb-1" style={textAccentStyle}>{edu.school}</h5>
                        {edu.description && <p className="text-xs leading-relaxed text-slate-500">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="space-y-8">
                {data.skills.length > 0 && (
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, index) => (
                        <span key={index} className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </section>
                )}

                {(data.languages || []).length > 0 && (
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-4">Languages</h3>
                    <div className="space-y-2">
                      {(data.languages || []).map((lang, index) => (
                        <div key={index} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{lang}</div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isOasis) {
      return (
        <div className="h-full bg-slate-50 relative p-[18mm] text-black mx-auto overflow-hidden">
          <header className="mb-8 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h1 className="text-4xl font-light tracking-[0.3em] uppercase mb-1">{data.personalInfo.fullName}</h1>
            <h2 className="text-sm tracking-[0.3em] uppercase text-slate-400 mb-6 font-semibold" style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500 font-medium">
              {data.personalInfo.phone && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.phone}</span>}
              {data.personalInfo.email && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.email}</span>}
              {data.personalInfo.location && <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100">{data.personalInfo.location}</span>}
            </div>
          </header>

          <div className="grid grid-cols-[0.9fr_1.1fr] gap-8">
            <div className="space-y-6">
              {data.personalInfo.profilePicture && (
                <ProfileImage className="w-full aspect-[4/5] rounded-[2rem] object-cover shadow-sm border border-slate-200" />
              )}
              {data.skills.length > 0 && (
                <section className="bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span key={index} className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                </section>
              )}
              {(data.languages || []).length > 0 && (
                <section className="bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-4">Languages</h3>
                  <div className="space-y-2">
                    {(data.languages || []).map((lang, index) => (
                      <div key={index} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{lang}</div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
              {data.personalInfo.summary && (
                <section className="bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm">
                  <p className="text-sm leading-relaxed text-slate-700 italic font-serif">"{data.personalInfo.summary}"</p>
                </section>
              )}

              {data.experience.length > 0 && (
                <section className="bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-6">Experience</h3>
                  <div className="space-y-6">
                    {data.experience.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1 gap-4">
                          <h4 className="text-sm font-bold uppercase tracking-wide">{exp.position}</h4>
                          <span className="text-[10px] uppercase text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <h5 className="text-xs font-medium text-slate-600 mb-2" style={textAccentStyle}>{exp.company}</h5>
                        <p className="text-xs leading-relaxed text-slate-500 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {data.education.length > 0 && (
                <section className="bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold border-b border-black pb-2 mb-6">Education</h3>
                  <div className="space-y-5">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline mb-1 gap-4">
                          <h4 className="text-sm font-bold uppercase tracking-wide">{edu.degree}</h4>
                          <span className="text-[10px] uppercase text-slate-500 font-semibold">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <h5 className="text-xs font-medium text-slate-600 mb-1" style={textAccentStyle}>{edu.school}</h5>
                        {edu.description && <p className="text-xs leading-relaxed text-slate-500">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (isClean) {
      return (
        <div className="h-full bg-[#f8fafc] relative p-[18mm] text-slate-900 overflow-hidden">
          <header className="mb-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-8">
              <div className="max-w-[70%]">
                <h1 className="text-4xl font-semibold tracking-[0.2em] uppercase mb-2">{data.personalInfo.fullName}</h1>
                <h2 className="text-sm font-bold uppercase tracking-[0.35em] text-slate-400 mb-5" style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
                <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                  {data.personalInfo.phone && <span className="rounded-full bg-slate-50 px-3 py-1 border border-slate-100">{data.personalInfo.phone}</span>}
                  {data.personalInfo.email && <span className="rounded-full bg-slate-50 px-3 py-1 border border-slate-100">{data.personalInfo.email}</span>}
                  {data.personalInfo.location && <span className="rounded-full bg-slate-50 px-3 py-1 border border-slate-100">{data.personalInfo.location}</span>}
                </div>
              </div>
              {data.personalInfo.profilePicture && (
                <ProfileImage className="w-28 h-28 rounded-[1.5rem] object-cover border border-slate-200 shadow-sm" />
              )}
            </div>
          </header>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-8">
            <div className="space-y-6">
              {data.personalInfo.summary && (
                <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Profile</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{data.personalInfo.summary}</p>
                </section>
              )}

              {data.experience.length > 0 && (
                <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-5">Experience</h3>
                  <div className="space-y-5">
                    {data.experience.map(exp => (
                      <div key={exp.id} className="border-l-2 pl-4" style={borderAccentStyle}>
                        <div className="flex justify-between items-baseline mb-1 gap-4">
                          <h4 className="text-sm font-bold uppercase tracking-wide">{exp.position}</h4>
                          <span className="text-[10px] uppercase text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <h5 className="text-xs font-semibold mb-2" style={textAccentStyle}>{exp.company}</h5>
                        <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
              {data.education.length > 0 && (
                <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-5">Education</h3>
                  <div className="space-y-4">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <h4 className="text-sm font-bold uppercase tracking-wide">{edu.degree}</h4>
                        <h5 className="text-xs font-semibold mb-1" style={textAccentStyle}>{edu.school}</h5>
                        {edu.description && <p className="text-xs leading-relaxed text-slate-500">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {data.skills.length > 0 && (
                <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span key={index} className="text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">{skill}</span>
                    ))}
                  </div>
                </section>
              )}

              {(data.languages || []).length > 0 && (
                <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Languages</h3>
                  <div className="space-y-2">
                    {(data.languages || []).map((lang, index) => (
                      <div key={index} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{lang}</div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-white relative p-[14mm] text-black mx-auto overflow-hidden">
        <header className={`mb-5 ${isClarity ? 'text-center border-b-2 pb-4' : 'animate-fade-in'}`}>
           <h1 className={`${isLuna ? 'text-5xl font-serif' : 'text-3xl font-light'} tracking-widest uppercase mb-1`}>{data.personalInfo.fullName}</h1>
           <h2 className="text-sm tracking-widest uppercase text-slate-400 mb-6 font-semibold" style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
           
           <div className={`flex ${isClarity ? 'justify-center gap-8' : 'flex-col gap-1'} text-xs text-slate-500 font-medium`}>
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
           </div>
        </header>

        <div className={`grid ${isClarity ? 'grid-cols-1' : 'grid-cols-[1fr_2fr]'} gap-7`}>
            {!isClarity && (
              <div className="space-y-6">
                {data.personalInfo.profilePicture && (
                    <ProfileImage className={`w-full aspect-square grayscale object-cover mb-6 ${isLuna ? 'rounded-full' : ''}`} />
                )}

                {data.skills.length > 0 && (
                    <section>
                       <h3 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-black pb-2 mb-4">Skills</h3>
                       <ul className="space-y-2">
                          {data.skills.map((skill, index) => (
                             <li key={index} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{skill}</li>
                          ))}
                       </ul>
                    </section>
                )}

                {(data.languages || []).length > 0 && (
                    <section>
                       <h3 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-black pb-2 mb-4">Languages</h3>
                       <ul className="space-y-2">
                          {(data.languages || []).map((lang, index) => (
                             <li key={index} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{lang}</li>
                          ))}
                       </ul>
                    </section>
                )}
              </div>
            )}

            <div className="space-y-10">
               {data.personalInfo.summary && (
                  <section>
                     <p className={`text-sm leading-relaxed text-slate-700 ${isSimple ? 'font-sans' : 'italic font-serif'}`}>"{data.personalInfo.summary}"</p>
                  </section>
               )}

               {data.experience.length > 0 && (
                  <section>
                     <h3 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-black pb-2 mb-4">Experience</h3>
                     <div className="space-y-5">
                        {data.experience.map(exp => (
                           <div key={exp.id}>
                              <div className="flex justify-between items-baseline mb-1">
                                 <h4 className="text-sm font-bold uppercase tracking-wide">{exp.position}</h4>
                                 <span className="text-[10px] uppercase text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <h5 className="text-xs font-medium text-slate-600 mb-2" style={textAccentStyle}>{exp.company}</h5>
                              <p className="text-xs leading-relaxed text-slate-500 whitespace-pre-line">{exp.description}</p>
                           </div>
                        ))}
                     </div>
                  </section>
               )}

               {data.education.length > 0 && (
                  <section>
                     <h3 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-black pb-2 mb-4">Education</h3>
                     <div className="space-y-4">
                        {data.education.map(edu => (
                           <div key={edu.id}>
                              <div className="flex justify-between items-baseline mb-1">
                                 <h4 className="text-sm font-bold uppercase tracking-wide">{edu.degree}</h4>
                                 <span className="text-[10px] uppercase text-slate-500 font-semibold">{edu.startDate} - {edu.endDate}</span>
                              </div>
                              <h5 className="text-xs font-medium text-slate-600 mb-1" style={textAccentStyle}>{edu.school}</h5>
                              {edu.description && <p className="text-xs leading-relaxed text-slate-500">{edu.description}</p>}
                           </div>
                        ))}
                     </div>
                  </section>
               )}
            </div>
        </div>
      </div>
    );
  };

  const renderTech = () => {
    const isStatic = tid === 'static';
    const isEcho = tid === 'echo';
    const isNexus = tid === 'nexus';

    return (
      <div className={`h-full relative p-[15mm] font-mono text-sm leading-relaxed overflow-hidden ${isEcho ? 'bg-[#0b1120] text-slate-200' : 'bg-slate-900 text-slate-300'} ${isNexus ? 'border-t-[10px]' : 'border-l-[8px]'}`} style={{ borderColor: isGradient ? 'transparent' : data.accentColor, borderImage: isGradient ? `${data.accentColor} 1` : 'none' }}>
         {isEcho && <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] pointer-events-none"></div>}
         <header className={`mb-10 ${isStatic ? 'grid grid-cols-[auto_1fr] gap-6 items-start' : 'flex gap-6 items-center'} ${isNexus ? 'bg-slate-950/80 rounded-2xl p-6 border border-slate-800' : ''}`}>
             {data.personalInfo.profilePicture && (
                 <ProfileImage className={`w-24 h-24 object-cover ${isNexus ? 'rounded-2xl shadow-lg' : 'rounded-lg grayscale opacity-80'}`} />
             )}
             <div>
                <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-1`}>{isStatic ? '# engineer.profile' : 'const developer = {'}</div>
                <div className="ml-4">
                   <span className="text-orange-400">{isStatic ? 'full_name:' : 'name:'}</span> <span className="text-green-400">"{data.personalInfo.fullName}"</span>{!isStatic && ','}
                </div>
                <div className="ml-4">
                   <span className="text-orange-400">{isStatic ? 'specialty:' : 'role:'}</span> <span className="text-green-400" style={textAccentStyle}>"{data.personalInfo.jobTitle}"</span>
                </div>
                <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'}`}>{isStatic ? '# end' : '};'}</div>
             </div>
         </header>

         <div className={`gap-8 ${isNexus ? 'grid grid-cols-[1.7fr_1fr]' : isStatic ? 'grid grid-cols-[1.4fr_1fr]' : 'grid grid-cols-[2fr_1fr]'}`}>
             <div className="space-y-8">
                {data.personalInfo.summary && (
                   <section className={isNexus ? 'rounded-2xl border border-slate-800 bg-slate-950/80 p-5' : ''}>
                      <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-2`}>{isStatic ? '// Profile digest' : '/* Profile overview */'}</div>
                      <p className={`${isEcho ? 'text-slate-300' : 'text-slate-400'}`}>&gt; {data.personalInfo.summary}</p>
                   </section>
                )}

                {data.experience.length > 0 && (
                   <section className={isNexus ? 'rounded-2xl border border-slate-800 bg-slate-950/80 p-5' : ''}>
                      <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-4`}>{isStatic ? '// Deployments' : '/* Employment history */'}</div>
                      <div className={`space-y-6 ${isStatic ? 'border-t border-slate-800 pt-4' : 'border-l border-slate-700 pl-4'}`}>
                         {data.experience.map(exp => (
                            <div key={exp.id} className={`relative ${isStatic ? 'bg-slate-800/40 rounded-xl p-4 border border-slate-800' : ''}`}>
                               {!isStatic && <span className={`absolute -left-[21px] top-1 text-xs ${isEcho ? 'text-cyan-400' : 'text-slate-500'}`}>◆</span>}
                               <div className={`${isNexus ? 'text-cyan-400' : 'text-blue-400'} font-bold`}>{exp.position}</div>
                               <div className="text-slate-400 text-xs mb-2">@ {exp.company} | [{exp.startDate} - {exp.endDate}]</div>
                               <p className="text-slate-500 text-xs whitespace-pre-line">{exp.description}</p>
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>

             <div className="space-y-8">
                <section className={isEcho ? 'rounded-2xl border border-cyan-950 bg-slate-950/70 p-5' : ''}>
                   <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-2`}>{isStatic ? '// Contact channel' : '/* Contact info */'}</div>
                   <ul className="text-xs space-y-2 text-slate-400 break-all">
                      {data.personalInfo.phone && <li><span className="text-slate-600">tel:</span> {data.personalInfo.phone}</li>}
                      {data.personalInfo.email && <li><span className="text-slate-600">email:</span> {data.personalInfo.email}</li>}
                      {data.personalInfo.location && <li><span className="text-slate-600">loc:</span> {data.personalInfo.location}</li>}
                      {data.personalInfo.website && <li><span className="text-slate-600">web:</span> {data.personalInfo.website}</li>}
                   </ul>
                </section>

                {data.skills.length > 0 && (
                   <section className={isNexus ? 'rounded-2xl border border-slate-800 bg-slate-950/80 p-5' : ''}>
                      <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-2`}>{isStatic ? '// Stack' : '/* Core skills */'}</div>
                      <div className="flex flex-wrap gap-2 text-xs">
                         {data.skills.map(skill => (
                            <span key={skill} className={`px-2 py-1 rounded border ${isEcho ? 'bg-cyan-950/30 text-cyan-200 border-cyan-900' : isNexus ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                               {skill}
                            </span>
                         ))}
                      </div>
                   </section>
                )}

                {(data.languages || []).length > 0 && (
                   <section className={isStatic ? 'rounded-xl border border-slate-800 p-4' : ''}>
                      <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-2`}>/* Languages */</div>
                      <div className="flex flex-wrap gap-2 text-xs">
                         {(data.languages || []).map(lang => (
                            <span key={lang} className={`px-2 py-1 rounded border ${isEcho ? 'bg-slate-950 text-cyan-200 border-cyan-950' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                               {lang}
                            </span>
                         ))}
                      </div>
                   </section>
                )}

                {data.education.length > 0 && (
                   <section className={isEcho ? 'rounded-2xl border border-cyan-950 bg-slate-950/70 p-5' : ''}>
                      <div className={`${isEcho ? 'text-cyan-500' : 'text-slate-500'} mb-4`}>{isStatic ? '// Education node' : '/* Education */'}</div>
                      <div className={`space-y-4 text-xs ${isStatic ? '' : 'pl-4 border-l border-slate-700'}`}>
                         {data.education.map(edu => (
                            <div key={edu.id} className="relative">
                               {!isStatic && <span className={`absolute -left-[21px] top-1 text-[10px] ${isEcho ? 'text-cyan-400' : 'text-slate-500'}`}>◆</span>}
                               <div className={`${isNexus ? 'text-cyan-300' : 'text-purple-400'} font-bold`}>{edu.degree}</div>
                               <div className="text-slate-400">{edu.school}</div>
                               <div className="text-slate-500 text-[10px] mt-1">[{edu.startDate} - {edu.endDate}]</div>
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>
         </div>
      </div>
    );
  };

  const renderProfessional = () => {
    const isSpacious = tid === 'spacious';

    return (
      <div className={`h-full relative overflow-hidden flex flex-col ${isSpacious ? 'bg-[#f8fafc]' : 'bg-white'}`}>
         <header className={`${isSpacious ? 'bg-white border-b border-slate-200 px-[15mm] py-[8mm] flex items-center justify-between' : 'bg-slate-100 p-[12mm] text-center'}`}>
             {isSpacious ? (
               <>
                 <div className="max-w-[70%]">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-1">{data.personalInfo.fullName}</h1>
                    <h2 className="text-base font-bold uppercase tracking-[0.2em]" style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-500 mt-4">
                       {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                       {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
                       {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
                    </div>
                 </div>
                 {data.personalInfo.profilePicture && (
                     <ProfileImage className="w-28 h-28 rounded-3xl shadow-md object-cover border-4 border-white" />
                 )}
               </>
             ) : (
               <>
                 {data.personalInfo.profilePicture && (
                     <ProfileImage className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover" />
                 )}
                 <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-1">{data.personalInfo.fullName}</h1>
                 <h2 className="text-lg font-bold mb-4" style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
                 
                 <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                    {data.personalInfo.phone && <div className="flex items-center gap-2"><span className="w-4 h-4">{Icons.Phone}</span>{data.personalInfo.phone}</div>}
                    {data.personalInfo.email && <div className="flex items-center gap-2"><span className="w-4 h-4">{Icons.Email}</span>{data.personalInfo.email}</div>}
                    {data.personalInfo.location && <div className="flex items-center gap-2"><span className="w-4 h-4">{Icons.Location}</span>{data.personalInfo.location}</div>}
                 </div>
               </>
             )}
         </header>

         <div className={`flex flex-grow ${isSpacious ? 'gap-6 p-[7mm]' : ''}`}>
             <div className={`${isSpacious ? 'w-[32%] bg-white rounded-3xl border border-slate-200 p-[10mm] text-slate-700' : 'w-[30%] bg-slate-800 p-[10mm] text-slate-300'}`}>
                 {data.skills.length > 0 && (
                    <section className="mb-10">
                       <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 pb-2 ${isSpacious ? 'text-slate-800 border-b border-slate-200' : 'text-slate-400 border-b border-slate-700'}`}>Expertise</h3>
                       <div className="space-y-3">
                          {data.skills.map((skill, index) => (
                             <div key={index} className={`text-sm font-medium flex items-center justify-between ${isSpacious ? 'bg-slate-50 px-3 py-2 rounded-xl border border-slate-100' : ''}`}>
                                {skill}
                                <div className={`flex gap-1 ${isSpacious ? 'opacity-70' : 'opacity-50'}`}>
                                   <div className={`w-1.5 h-1.5 rounded-full ${isSpacious ? '' : 'bg-white'}`} style={isSpacious ? accentStyle : undefined}></div>
                                   <div className={`w-1.5 h-1.5 rounded-full ${isSpacious ? '' : 'bg-white'}`} style={isSpacious ? accentStyle : undefined}></div>
                                   <div className={`w-1.5 h-1.5 rounded-full ${isSpacious ? '' : 'bg-white'}`} style={isSpacious ? accentStyle : undefined}></div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </section>
                 )}

                 {data.education.length > 0 && (
                    <section className="mb-10">
                       <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 pb-2 ${isSpacious ? 'text-slate-800 border-b border-slate-200' : 'text-slate-400 border-b border-slate-700'}`}>Education</h3>
                       <div className="space-y-6">
                          {data.education.map(edu => (
                             <div key={edu.id}>
                                <h4 className={`text-sm font-bold ${isSpacious ? 'text-slate-900' : 'text-white'} mb-1`}>{edu.degree}</h4>
                                <h5 className={`text-xs mb-1 ${isSpacious ? 'text-slate-500 uppercase tracking-wider font-semibold' : 'text-slate-400'}`}>{edu.school}</h5>
                                <span className="text-[10px] uppercase tracking-widest font-bold" style={textAccentStyle}>{edu.startDate} - {edu.endDate}</span>
                             </div>
                          ))}
                       </div>
                    </section>
                 )}

                 {(data.languages || []).length > 0 && (
                    <section>
                       <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 pb-2 ${isSpacious ? 'text-slate-800 border-b border-slate-200' : 'text-slate-400 border-b border-slate-700'}`}>Languages</h3>
                       <div className="space-y-3">
                          {(data.languages || []).map((lang, index) => (
                             <div key={index} className={`text-sm font-medium ${isSpacious ? 'text-slate-700' : 'text-white'}`}>{lang}</div>
                          ))}
                       </div>
                    </section>
                 )}
             </div>

             <div className={`${isSpacious ? 'w-[68%] bg-white rounded-3xl border border-slate-200 p-[10mm]' : 'w-[70%] p-[12mm]'}`}>
                {data.personalInfo.summary && (
                   <section className="mb-6">
                      <h3 className="text-base font-black uppercase tracking-widest text-slate-800 mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full" style={accentStyle}></span> Profile
                      </h3>
                      <p className={`text-sm leading-relaxed ${isSpacious ? 'text-slate-700' : 'text-slate-600 font-medium'}`}>{data.personalInfo.summary}</p>
                   </section>
                )}

                {data.experience.length > 0 && (
                   <section>
                      <h3 className="text-base font-black uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full" style={accentStyle}></span> Experience
                      </h3>
                      <div className={`space-y-5 ${isSpacious ? 'border-l-2 pl-5' : ''}`} style={isSpacious ? borderAccentStyle : undefined}>
                         {data.experience.map(exp => (
                            <div key={exp.id} className={isSpacious ? 'relative' : ''}>
                               {isSpacious && <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full ring-4 ring-white" style={accentStyle}></div>}
                               <div className="flex justify-between items-end mb-1 gap-4">
                                  <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                                  <span className={`text-xs font-bold uppercase tracking-wide ${isSpacious ? 'text-slate-400 bg-slate-100 px-2 py-1 rounded-full' : 'text-slate-500'}`}>{exp.startDate} - {exp.endDate}</span>
                               </div>
                               <h5 className="text-sm font-bold mb-3" style={textAccentStyle}>{exp.company}</h5>
                               <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>
         </div>
      </div>
    );
  };

  // --- New Additional Templates ---

  const renderCorporate = () => {
    const isManager = tid === 'manager';
    const isSummit = tid === 'summit';
    const isHorizon = tid === 'horizon';

    return (
      <div className={`h-full relative flex text-slate-800 overflow-hidden ${isHorizon ? 'flex-col' : 'flex-row'}`}>
         <div className={`${isHorizon ? 'w-full flex flex-row items-center gap-8' : 'w-[30%] flex flex-col gap-10'} ${isSummit ? 'bg-slate-900 text-white' : 'bg-slate-100'} p-8 ${!isHorizon ? 'border-r-4' : 'border-b-4'}`} style={borderAccentStyle}>
            <div>
               <div className={isHorizon ? 'flex items-center gap-6' : ''}>
                  {data.personalInfo.profilePicture && (
                      <ProfileImage className={`${isManager ? 'rounded-xl' : 'rounded-full'} ${isHorizon ? 'w-24 h-24' : 'w-32 h-32 mb-6'} mx-auto border-4 border-white shadow-md object-cover`} />
                  )}
                  <div className={isHorizon ? 'text-left' : 'text-center'}>
                     <h1 className={`text-2xl font-bold ${isSummit ? 'text-white' : 'text-slate-900'} mb-2`}>{data.personalInfo.fullName}</h1>
                     <h2 className={`text-sm font-semibold uppercase tracking-widest ${isSummit ? 'text-slate-400' : 'text-slate-500'}`}>{data.personalInfo.jobTitle}</h2>
                  </div>
               </div>
               
               <div className={`${isHorizon ? 'flex flex-row gap-6' : 'space-y-4 mb-10'} text-xs font-medium ${isSummit ? 'text-slate-300' : 'text-slate-600'} mt-4`}>
                  {data.personalInfo.phone && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Phone}</span> {data.personalInfo.phone}</div>}
                  {data.personalInfo.email && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Email}</span> {data.personalInfo.email}</div>}
               </div>
            </div>

            {!isHorizon && (
               <div className="space-y-8 mt-10">
                  {data.skills.length > 0 && (
                     <section>
                        <h3 className={`text-sm font-bold uppercase tracking-widest ${isSummit ? 'text-white' : 'text-slate-900'} mb-4 border-b-2 pb-2`} style={borderAccentStyle}>Skills</h3>
                        <div className="flex flex-col gap-2">
                           {data.skills.map((skill, index) => (
                              <div key={index} className={`text-xs font-semibold px-3 py-2 rounded shadow-sm border border-slate-200 ${isSummit ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-700'}`}>
                                 {skill}
                              </div>
                           ))}
                        </div>
                     </section>
                  )}

                  {(data.languages || []).length > 0 && (
                     <section>
                        <h3 className={`text-sm font-bold uppercase tracking-widest ${isSummit ? 'text-white' : 'text-slate-900'} mb-4 border-b-2 pb-2`} style={borderAccentStyle}>Languages</h3>
                        <div className="flex flex-col gap-2">
                           {(data.languages || []).map((lang, index) => (
                              <div key={index} className={`text-xs font-semibold px-3 py-2 rounded shadow-sm border border-slate-200 ${isSummit ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-700'}`}>
                                 {lang}
                              </div>
                           ))}
                        </div>
                     </section>
                  )}
               </div>
            )}
         </div>
         <div className={`${isHorizon ? 'w-full' : 'w-[70%]'} p-10 bg-white`}>
            <div>
               {data.personalInfo.summary && (
                  <section className="mb-10">
                     <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-5 h-5" style={textAccentStyle}>{Icons.User}</span> Executive Summary
                     </h3>
                     <p className="text-sm leading-relaxed text-slate-700 text-justify">{data.personalInfo.summary}</p>
                  </section>
               )}
               {data.experience.length > 0 && (
                  <section className="mb-10">
                     <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-5 h-5" style={textAccentStyle}>{Icons.Briefcase}</span> Professional Experience
                     </h3>
                     <div className="space-y-8">
                        {data.experience.map(exp => (
                           <div key={exp.id} className={isManager ? 'bg-slate-50 p-6 rounded-xl border border-slate-100' : ''}>
                              <div className="flex justify-between items-baseline mb-1">
                                 <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                                 <span className="text-xs font-bold text-white px-2 py-1 rounded" style={accentStyle}>{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <h5 className="text-sm font-semibold mb-3 text-slate-700">{exp.company}</h5>
                              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                           </div>
                        ))}
                     </div>
                  </section>
               )}
            </div>

            {data.education.length > 0 && (
               <section className={!isHorizon ? 'mt-8' : ''}>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                     <span className="w-5 h-5" style={textAccentStyle}>{Icons.GraduationCap}</span> Education
                  </h3>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id} className={isManager ? 'bg-slate-50 p-6 rounded-xl border border-slate-100' : ''}>
                           <div className="flex justify-between items-baseline mb-1">
                              <h4 className="text-base font-bold text-slate-900">{edu.degree}</h4>
                              <span className="text-xs font-bold text-slate-500">{edu.startDate} - {edu.endDate}</span>
                           </div>
                           <h5 className="text-sm font-semibold mb-2" style={textAccentStyle}>{edu.school}</h5>
                           {edu.description && <p className="text-sm leading-relaxed text-slate-600">{edu.description}</p>}
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>
      </div>
    );
  };

  const renderElegant = () => {
    const isPremium = tid === 'premium';
    const isElite = tid === 'elite';
    const isAurora = tid === 'aurora';

    return (
      <div className={`h-full bg-[#faf9f6] relative p-[20mm] text-slate-800 overflow-hidden ${isElite ? 'border-[12px]' : 'border-8'}`} style={{ borderColor: isGradient ? 'transparent' : data.accentColor, borderImage: isGradient ? `${data.accentColor} 1` : 'none' }}>
        <header className={`text-center mb-10 pb-8 ${isPremium ? 'border-none' : 'border-b-[1px] border-slate-300'}`}>
           <h1 className={`${isElite ? 'text-5xl' : 'text-4xl'} font-serif text-slate-900 mb-2 tracking-wide`}>{data.personalInfo.fullName}</h1>
           <h2 className="text-lg font-serif italic text-slate-600 mb-6" style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
           
           <div className={`flex justify-center items-center gap-6 text-xs text-slate-500 uppercase tracking-widest ${isPremium ? 'bg-white py-4 shadow-sm italic' : ''}`}>
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
           </div>
        </header>

        <div className="max-w-3xl mx-auto space-y-10">
           {data.personalInfo.summary && (
              <section className="text-center">
                 <p className="text-sm leading-relaxed text-slate-700 italic font-serif px-8">{data.personalInfo.summary}</p>
              </section>
           )}

           {data.experience.length > 0 && (
              <section>
                 <h3 className={`text-sm uppercase tracking-[0.3em] text-center font-bold text-slate-900 mb-8 flex items-center justify-center gap-4 ${isAurora ? 'text-xl drop-shadow-sm' : ''}`}>
                    <span className="w-8 h-[1px] bg-slate-300"></span>
                    Experience
                    <span className="w-8 h-[1px] bg-slate-300"></span>
                 </h3>
                 <div className="space-y-8">
                    {data.experience.map(exp => (
                       <div key={exp.id} className="text-center">
                          <h4 className="text-lg font-serif text-slate-900">{exp.position}</h4>
                          <div className="text-sm font-semibold uppercase tracking-widest my-2" style={textAccentStyle}>{exp.company}</div>
                          <div className="text-xs text-slate-400 italic mb-3">{exp.startDate} — {exp.endDate}</div>
                          <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line text-justify">{exp.description}</p>
                       </div>
                    ))}
                 </div>
              </section>
           )}

           {data.education.length > 0 && (
               <section>
                  <h3 className={`text-sm uppercase tracking-[0.3em] text-center font-bold text-slate-900 mb-8 flex items-center justify-center gap-4 ${isAurora ? 'text-xl drop-shadow-sm' : ''}`}>
                     <span className="w-8 h-[1px] bg-slate-300"></span>
                     Education
                     <span className="w-8 h-[1px] bg-slate-300"></span>
                  </h3>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id} className="text-center">
                           <h4 className="text-base font-serif text-slate-900">{edu.degree}</h4>
                           <div className="text-xs font-semibold uppercase tracking-widest my-1" style={textAccentStyle}>{edu.school}</div>
                           <div className="text-[10px] text-slate-400 italic">{edu.startDate} — {edu.endDate}</div>
                           {edu.description && <p className="text-xs leading-relaxed text-slate-500 mt-2 font-serif px-8">{edu.description}</p>}
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {data.skills.length > 0 && (
               <section>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-center font-bold text-slate-900 mb-6 flex items-center justify-center gap-4">
                     <span className="w-8 h-[1px] bg-slate-300"></span>
                     Skills
                     <span className="w-8 h-[1px] bg-slate-300"></span>
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 px-8">
                     {data.skills.map((skill, index) => (
                        <span key={index} className="text-xs font-serif text-slate-700 italic">
                           {skill}{index < data.skills.length - 1 ? ' •' : ''}
                        </span>
                     ))}
                  </div>
               </section>
            )}

            {(data.languages || []).length > 0 && (
               <section>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-center font-bold text-slate-900 mb-6 flex items-center justify-center gap-4">
                     <span className="w-8 h-[1px] bg-slate-300"></span>
                     Languages
                     <span className="w-8 h-[1px] bg-slate-300"></span>
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 px-8">
                     {(data.languages || []).map((lang, index) => (
                        <span key={index} className="text-xs font-serif text-slate-700 italic">
                           {lang}{index < (data.languages || []).length - 1 ? ' •' : ''}
                        </span>
                     ))}
                  </div>
               </section>
            )}
        </div>
      </div>
    );
  };

  const renderDesigner = () => {
    const isVision = tid === 'vision';
    const isSpectrum = tid === 'spectrum';

    return (
      <div className={`h-full relative p-[15mm] text-black overflow-hidden ${isVision ? 'bg-[#f8fafc]' : 'bg-white border-4 border-black'}`}>
         {isSpectrum && (
            <>
               <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={accentStyle}></div>
               <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 bg-purple-300"></div>
            </>
         )}
         <header className={`relative z-10 mb-10 ${isVision ? 'grid grid-cols-[1fr_auto] gap-8 items-start bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm' : 'flex gap-8 items-end pb-6'} ${isSpectrum ? 'bg-white/80 backdrop-blur-md rounded-[2rem] p-8 border border-white/70 shadow-xl' : ''}`} style={!isVision && !isSpectrum ? borderAccentStyle : undefined}>
            {data.personalInfo.profilePicture ? (
                <ProfileImage className={`object-cover shadow-xl bg-white shrink-0 ${isVision ? 'w-36 h-36 rounded-full border-4' : isSpectrum ? 'w-40 h-40 rounded-[2rem] border-4 rotate-[-4deg]' : 'w-48 h-48 rounded-2xl grayscale border-4 -mb-16'}`} style={isVision || isSpectrum ? { borderColor: isGradient ? 'transparent' : data.accentColor } : borderAccentStyle} />
            ) : null}
            <div className="flex-grow pt-4">
               <h1 className={`leading-none mb-2 ${isVision ? 'text-4xl font-serif' : 'text-5xl font-black uppercase tracking-tighter'}`} style={textAccentStyle}>{data.personalInfo.fullName}</h1>
               <h2 className={`text-xl font-bold uppercase tracking-widest inline-block px-4 py-1 ${isVision ? 'bg-slate-100 text-slate-800 rounded-full' : isSpectrum ? 'text-white rounded-full shadow-md' : 'bg-black text-white'}`} style={isSpectrum ? accentStyle : undefined}>{data.personalInfo.jobTitle}</h2>
            </div>
         </header>

         <div className={`relative z-10 gap-10 mt-16 ${isVision ? 'grid grid-cols-[0.9fr_1.1fr] mt-10' : 'flex'} ${isSpectrum ? 'grid grid-cols-[0.95fr_1.05fr] mt-10' : ''}`}>
            <div className={`${isVision || isSpectrum ? 'flex flex-col gap-8' : 'w-[35%] flex flex-col gap-10'}`}>
               <section className={isVision ? 'bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm' : isSpectrum ? 'bg-white/85 backdrop-blur rounded-[1.75rem] p-6 border border-white/70 shadow-lg' : ''}>
                  <h3 className={`text-2xl font-black uppercase tracking-tighter mb-4 ${isVision ? 'border-b pb-3 border-slate-200' : 'border-l-8 pl-4'}`} style={!isVision ? borderAccentStyle : textAccentStyle}>Contact</h3>
                  <ul className="text-sm space-y-3 font-bold">
                     {data.personalInfo.phone && <li className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase tracking-widest">Phone</span> {data.personalInfo.phone}</li>}
                     {data.personalInfo.email && <li className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase tracking-widest">Email</span> <span className="break-all">{data.personalInfo.email}</span></li>}
                     {data.personalInfo.location && <li className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase tracking-widest">Location</span> {data.personalInfo.location}</li>}
                     {data.personalInfo.website && <li className="flex flex-col"><span className="text-[10px] text-slate-400 uppercase tracking-widest">Website</span> <span className="break-all">{data.personalInfo.website}</span></li>}
                  </ul>
               </section>

               {data.skills.length > 0 && (
                  <section className={isVision ? 'bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm' : isSpectrum ? 'bg-white/85 backdrop-blur rounded-[1.75rem] p-6 border border-white/70 shadow-lg' : ''}>
                     <h3 className={`text-2xl font-black uppercase tracking-tighter mb-4 ${isVision ? 'border-b pb-3 border-slate-200' : 'border-l-8 pl-4'}`} style={!isVision ? borderAccentStyle : textAccentStyle}>Skills</h3>
                     <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                           <span key={index} className={`px-3 py-1 text-xs uppercase ${isVision ? 'rounded-full bg-slate-100 text-slate-800 font-semibold border border-slate-200' : isSpectrum ? 'rounded-2xl text-white font-bold shadow-md' : 'bg-slate-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`} style={isSpectrum ? accentStyle : undefined}>
                              {skill}
                           </span>
                        ))}
                     </div>
                  </section>
               )}
            </div>

            <div className={`${isVision || isSpectrum ? 'space-y-8' : 'w-[65%] space-y-10'}`}>
               {data.personalInfo.summary && (
                  <section className={isVision ? 'bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm' : isSpectrum ? 'bg-white/85 backdrop-blur rounded-[1.75rem] p-6 border border-white/70 shadow-lg' : ''}>
                     <p className={`text-base font-medium ${isVision ? 'leading-relaxed text-slate-700' : 'leading-tight'} ${isSpectrum ? 'border-l-4 pl-6 italic text-slate-700' : ''}`} style={!isVision ? borderAccentStyle : undefined}>{data.personalInfo.summary}</p>
                  </section>
               )}

               {data.experience.length > 0 && (
                  <section className={isVision ? 'bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm' : isSpectrum ? 'bg-white/85 backdrop-blur rounded-[1.75rem] p-6 border border-white/70 shadow-lg' : ''}>
                     <h3 className={`text-2xl font-black uppercase tracking-tighter pb-2 mb-6 ${isVision ? 'border-b border-slate-200' : 'border-b-4 border-black'}`}>Experience</h3>
                     <div className="space-y-8">
                        {data.experience.map(exp => (
                           <div key={exp.id} className="relative">
                              <div className="flex justify-between items-end mb-1 gap-4">
                                 <h4 className="text-xl font-bold uppercase tracking-tight">{exp.position}</h4>
                                 <span className={`text-xs font-black uppercase px-2 py-1 ${isVision ? 'rounded-full bg-slate-100 text-slate-600' : isSpectrum ? 'rounded-full text-white' : 'bg-black text-white'}`} style={isSpectrum ? accentStyle : undefined}>{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <h5 className="text-sm font-black uppercase tracking-widest mb-3" style={textAccentStyle}>{exp.company}</h5>
                              <p className="text-sm leading-relaxed font-medium">{exp.description}</p>
                           </div>
                        ))}
                     </div>
                  </section>
               )}

               {data.education.length > 0 && (
                  <section className={isVision ? 'bg-white rounded-[1.75rem] p-6 border border-slate-200 shadow-sm' : isSpectrum ? 'bg-white/85 backdrop-blur rounded-[1.75rem] p-6 border border-white/70 shadow-lg' : ''}>
                     <h3 className={`text-2xl font-black uppercase tracking-tighter pb-2 mb-6 ${isVision ? 'border-b border-slate-200' : 'border-b-4 border-black'}`}>Education</h3>
                     <div className="space-y-6">
                        {data.education.map(edu => (
                           <div key={edu.id}>
                              <h4 className="text-lg font-bold uppercase tracking-tight">{edu.degree}</h4>
                              <div className="flex justify-between items-center my-1 gap-4">
                                 <h5 className="text-sm font-black uppercase tracking-widest" style={textAccentStyle}>{edu.school}</h5>
                                 <span className="text-[10px] font-bold text-slate-500 uppercase">{edu.startDate} - {edu.endDate}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </section>
               )}
            </div>
         </div>
      </div>
    );
  };

  const renderBold = () => {
    const isApex = tid === 'apex';
    const isMomentum = tid === 'momentum';

    return (
      <div className={`h-full relative p-[14mm] text-white overflow-hidden ${isMomentum ? 'bg-black' : 'bg-slate-900'}`}>
         {isApex && <div className="absolute top-0 bottom-0 left-0 w-5" style={accentStyle}></div>}
         <header className={`mb-7 pb-5 ${isMomentum ? 'grid grid-cols-[1.2fr_auto] gap-6 items-center bg-slate-950 rounded-[2rem] p-6 border border-slate-800' : 'flex items-center justify-between border-b-2 border-slate-700'} ${isApex ? 'pl-6' : ''}`}>
            <div>
               <h1 className={`uppercase mb-2 ${isMomentum ? 'text-4xl font-black leading-none' : 'text-3xl font-black tracking-tight text-white'}`}>{data.personalInfo.fullName}</h1>
               <h2 className={`font-bold uppercase ${isMomentum ? 'text-sm tracking-[0.5em] text-slate-300' : 'text-xl tracking-widest'}`} style={!isMomentum ? textAccentStyle : undefined}>{data.personalInfo.jobTitle}</h2>
            </div>
            {data.personalInfo.profilePicture && (
                <ProfileImage className={`object-cover border-2 ${isMomentum ? 'w-28 h-28 rounded-full' : 'w-32 h-32 rounded-lg grayscale brightness-110'}`} style={borderAccentStyle} />
            )}
         </header>

         <div className={`gap-8 ${isMomentum ? 'grid grid-cols-[1.1fr_1.9fr]' : 'grid grid-cols-[1fr_2fr]'} ${isApex ? 'pl-6' : ''}`}>
             <div className="space-y-7">
                <section className={isMomentum ? 'bg-slate-950 rounded-2xl p-5 border border-slate-800' : ''}>
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Contact</h3>
                   <div className="space-y-4 text-sm font-medium">
                      {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                      {data.personalInfo.email && <div className="break-all">{data.personalInfo.email}</div>}
                      {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
                      {data.personalInfo.website && <div className="break-all">{data.personalInfo.website}</div>}
                   </div>
                </section>

                {data.skills.length > 0 && (
                   <section className={isMomentum ? 'bg-slate-950 rounded-2xl p-5 border border-slate-800' : ''}>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Skills</h3>
                      <div className={`${isMomentum ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}`}>
                         {data.skills.map((skill, index) => (
                            <div key={index} className={`text-sm font-bold uppercase ${isMomentum ? 'px-3 py-1 rounded-full text-slate-100 border border-slate-700' : ''}`}>
                               {!isMomentum && <span className="inline-block w-2 h-2 mr-2" style={accentStyle}></span>}
                               {skill}
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>

             <div className="space-y-7">
                {data.personalInfo.summary && (
                   <section className={isApex ? 'border-l-4 pl-5' : isMomentum ? 'bg-slate-950 rounded-2xl p-6 border border-slate-800' : ''} style={isApex ? borderAccentStyle : undefined}>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Profile</h3>
                      <p className="text-base leading-relaxed font-medium">{data.personalInfo.summary}</p>
                   </section>
                )}

                {data.experience.length > 0 && (
                   <section>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Experience</h3>
                      <div className={`space-y-5 ${isApex ? 'border-l border-slate-700 pl-6' : ''}`}>
                         {data.experience.map(exp => (
                            <div key={exp.id} className={isMomentum ? 'bg-slate-950 rounded-2xl p-6 border border-slate-800' : 'relative'}>
                               {isApex && <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full" style={accentStyle}></div>}
                               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{exp.startDate} - {exp.endDate}</div>
                               <h4 className="text-xl font-black uppercase text-white mb-1">{exp.position}</h4>
                               <h5 className="text-base font-bold uppercase mb-4" style={textAccentStyle}>{exp.company}</h5>
                               <p className="text-sm leading-relaxed text-slate-300 font-medium whitespace-pre-line">{exp.description}</p>
                            </div>
                         ))}
                      </div>
                   </section>
                )}

                {data.education.length > 0 && (
                   <section>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Education</h3>
                      <div className="space-y-4">
                         {data.education.map(edu => (
                            <div key={edu.id} className={isMomentum ? 'bg-slate-950 rounded-2xl p-5 border border-slate-800' : ''}>
                               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{edu.startDate} - {edu.endDate}</div>
                               <h4 className="text-lg font-black uppercase text-white mb-1">{edu.degree}</h4>
                               <h5 className="text-sm font-bold uppercase" style={textAccentStyle}>{edu.school}</h5>
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>
         </div>
      </div>
    );
  };

  const renderCompact = () => {
    const isEssential = tid === 'essential';
    const isNimbus = tid === 'nimbus';

    return (
      <div className={`h-full relative p-[15mm] text-slate-800 text-[11px] leading-snug overflow-hidden ${isEssential ? 'bg-white' : 'bg-slate-50'} ${isNimbus ? 'bg-gradient-to-br from-slate-50 to-blue-50' : ''}`}>
         <header className={`flex gap-6 items-center mb-6 p-6 ${isEssential ? 'border-b border-slate-300 rounded-none shadow-none bg-transparent' : 'bg-white rounded-xl shadow-sm border border-slate-200'} ${isNimbus ? 'rounded-[1.75rem] border-blue-100' : ''}`}>
            {data.personalInfo.profilePicture && (
                <ProfileImage className={`w-20 h-20 object-cover shrink-0 ${isEssential ? 'rounded-xl' : 'rounded-full'}`} />
            )}
            <div className="flex-grow flex justify-between items-center gap-4">
                <div>
                   <h1 className={`text-2xl text-slate-900 mb-1 ${isEssential ? 'font-semibold uppercase tracking-[0.25em]' : 'font-black uppercase tracking-tight'}`}>{data.personalInfo.fullName}</h1>
                   <h2 className={`text-sm uppercase ${isEssential ? 'font-semibold tracking-[0.25em] text-slate-500' : 'font-bold tracking-widest'}`} style={!isEssential ? textAccentStyle : undefined}>{data.personalInfo.jobTitle}</h2>
                </div>
                <div className={`space-y-1 text-[10px] font-semibold ${isEssential ? 'text-left' : 'text-right'} text-slate-500`}>
                   {data.personalInfo.phone && <div>{data.personalInfo.phone} {!isEssential && <span className="w-3 h-3 inline-block align-middle ml-1" style={textAccentStyle}>{Icons.Phone}</span>}</div>}
                   {data.personalInfo.email && <div>{data.personalInfo.email} {!isEssential && <span className="w-3 h-3 inline-block align-middle ml-1" style={textAccentStyle}>{Icons.Email}</span>}</div>}
                   {data.personalInfo.location && <div>{data.personalInfo.location} {!isEssential && <span className="w-3 h-3 inline-block align-middle ml-1" style={textAccentStyle}>{Icons.Location}</span>}</div>}
                </div>
            </div>
         </header>

         {data.personalInfo.summary && (
            <section className={`mb-6 p-5 ${isEssential ? 'border border-slate-200 rounded-lg' : 'bg-white rounded-xl shadow-sm border border-slate-200'} ${isNimbus ? 'rounded-[1.5rem] border-blue-100' : ''}`}>
               <p className="text-[11px] leading-relaxed text-slate-600 font-medium">{data.personalInfo.summary}</p>
            </section>
         )}

         <div className={`gap-6 ${isEssential ? 'grid grid-cols-[1.35fr_1fr]' : 'grid grid-cols-2'}`}>
             <div className="space-y-6">
                {data.experience.length > 0 && (
                   <section className={`p-5 ${isEssential ? 'border border-slate-200 rounded-lg' : 'bg-white rounded-xl shadow-sm border border-slate-200'} ${isNimbus ? 'rounded-[1.5rem] border-blue-100' : ''}`}>
                      <h3 className={`text-sm font-black uppercase tracking-widest text-slate-900 mb-4 pb-1 ${isEssential ? 'border-b border-slate-300' : 'border-b-2'}`} style={!isEssential ? borderAccentStyle : undefined}>Experience</h3>
                      <div className="space-y-5">
                         {data.experience.map(exp => (
                            <div key={exp.id} className={isNimbus ? 'bg-white/70 rounded-xl p-3 border border-blue-50' : ''}>
                               <div className="flex justify-between items-baseline gap-3">
                                  <h4 className="text-[12px] font-bold text-slate-900">{exp.position}</h4>
                                  <span className={`text-[9px] font-bold ${isEssential ? 'text-slate-500' : 'text-slate-400'}`}>{exp.startDate} - {exp.endDate}</span>
                               </div>
                               <h5 className="text-[10px] font-bold uppercase mb-1" style={textAccentStyle}>{exp.company}</h5>
                               <p className="text-[10px] leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>

             <div className="space-y-6">
                {data.education.length > 0 && (
                   <section className={`p-5 ${isEssential ? 'border border-slate-200 rounded-lg' : 'bg-white rounded-xl shadow-sm border border-slate-200'} ${isNimbus ? 'rounded-[1.5rem] border-blue-100' : ''}`}>
                      <h3 className={`text-sm font-black uppercase tracking-widest text-slate-900 mb-4 pb-1 ${isEssential ? 'border-b border-slate-300' : 'border-b-2'}`} style={!isEssential ? borderAccentStyle : undefined}>Education</h3>
                      <div className="space-y-4">
                         {data.education.map(edu => (
                            <div key={edu.id}>
                               <h4 className="text-[12px] font-bold text-slate-900">{edu.degree}</h4>
                               <div className="flex justify-between items-baseline mt-0.5 gap-3">
                                  <h5 className="text-[10px] font-bold uppercase" style={textAccentStyle}>{edu.school}</h5>
                                  <span className="text-[9px] font-bold text-slate-400">{edu.startDate} - {edu.endDate}</span>
                               </div>
                            </div>
                         ))}
                      </div>
                   </section>
                )}

                {data.skills.length > 0 && (
                   <section className={`p-5 ${isEssential ? 'border border-slate-200 rounded-lg' : 'bg-white rounded-xl shadow-sm border border-slate-200'} ${isNimbus ? 'rounded-[1.5rem] border-blue-100' : ''}`}>
                      <h3 className={`text-sm font-black uppercase tracking-widest text-slate-900 mb-4 pb-1 ${isEssential ? 'border-b border-slate-300' : 'border-b-2'}`} style={!isEssential ? borderAccentStyle : undefined}>Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                         {data.skills.map(skill => (
                            <span key={skill} className={`px-2 py-0.5 text-[10px] font-bold ${isEssential ? 'rounded border border-slate-300 text-slate-700 bg-white' : 'rounded bg-slate-100 text-slate-700'} ${isNimbus ? 'rounded-full bg-blue-100 text-blue-900' : ''}`}>
                               {skill}
                            </span>
                         ))}
                      </div>
                   </section>
                )}
             </div>
         </div>
      </div>
    );
  };

  const renderDynamic = () => {
    const isElevate = tid === 'elevate';
    const isPulse = tid === 'pulse';

    return (
      <div className={`h-full relative text-slate-800 overflow-hidden ${isPulse ? 'bg-[#fff7fb]' : 'bg-white'}`}>
         <div className={`absolute shadow-md z-0 ${isElevate ? 'top-0 bottom-0 left-0 w-56 skew-x-[-10deg] origin-top-left' : 'top-0 left-0 right-0 h-64 -skew-y-3 origin-top-left'} ${isPulse ? 'top-0 left-0 right-0 h-72 rounded-b-[3rem]' : ''}`} style={accentStyle}></div>
         
         <div className={`relative z-10 ${isElevate ? 'px-[15mm] pt-7 pb-4 grid grid-cols-[auto_1fr] gap-8 items-center' : 'px-[15mm] pt-10 pb-6 flex gap-8 items-end text-white'}`}>
            {data.personalInfo.profilePicture && (
                <ProfileImage className={`object-cover border-4 border-white shadow-lg shrink-0 ${isPulse ? 'w-32 h-32 rounded-[2rem]' : 'w-36 h-36 rounded-full'}`} />
            )}
            <div className="mb-4">
               <h1 className={`font-black tracking-tight drop-shadow-md mb-1 ${isPulse ? 'text-5xl' : 'text-4xl'} ${isElevate ? 'text-slate-900' : ''}`}>{data.personalInfo.fullName}</h1>
               <h2 className={`font-bold uppercase tracking-widest opacity-90 drop-shadow ${isPulse ? 'text-sm bg-white/20 inline-block px-4 py-1 rounded-full' : 'text-lg'} ${isElevate ? 'text-slate-600' : ''}`}>{data.personalInfo.jobTitle}</h2>
            </div>
         </div>

         <div className={`relative z-10 px-[15mm] gap-8 mt-4 ${isElevate ? 'grid grid-cols-[0.9fr_1.1fr]' : 'flex'} ${isPulse ? 'grid grid-cols-[0.95fr_1.05fr]' : ''}`}>
            <div className={`${isElevate || isPulse ? 'space-y-5' : 'w-[35%] space-y-8'}`}>
               <section className={`p-4 shadow-sm border ${isPulse ? 'bg-white/85 backdrop-blur rounded-[1.75rem] border-pink-100' : 'bg-slate-50 rounded-2xl border-slate-100'} ${isElevate ? 'bg-white rounded-[1.75rem] border-slate-200' : ''}`}>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                     <span className="w-4 h-4" style={textAccentStyle}>{Icons.User}</span> Contact
                  </h3>
                  <div className="space-y-3 text-xs font-semibold text-slate-600">
                     {data.personalInfo.phone && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Phone}</span> {data.personalInfo.phone}</div>}
                     {data.personalInfo.email && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Email}</span> <span className="break-all">{data.personalInfo.email}</span></div>}
                     {data.personalInfo.location && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Location}</span> {data.personalInfo.location}</div>}
                     {data.personalInfo.website && <div className="flex items-center gap-3"><span className="w-4 h-4" style={textAccentStyle}>{Icons.Link}</span> <span className="break-all">{data.personalInfo.website}</span></div>}
                  </div>
               </section>

               {data.skills.length > 0 && (
                  <section className={`p-4 shadow-sm border ${isPulse ? 'bg-white/85 backdrop-blur rounded-[1.75rem] border-pink-100' : 'bg-slate-50 rounded-2xl border-slate-100'} ${isElevate ? 'bg-white rounded-[1.75rem] border-slate-200' : ''}`}>
                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-4 h-4" style={textAccentStyle}>{Icons.Briefcase}</span> Skills
                     </h3>
                     <div className={`${isPulse ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}`}>
                        {data.skills.map((skill, index) => (
                           <div key={index} className={`text-xs font-bold text-slate-700 ${isPulse ? 'px-3 py-1 rounded-full bg-pink-50 border border-pink-100' : 'flex items-center gap-2'}`}>
                              {!isPulse && <div className="w-2 h-2 rounded-full" style={accentStyle}></div>}
                              {skill}
                           </div>
                        ))}
                     </div>
                  </section>
               )}
            </div>

            <div className={`${isElevate || isPulse ? 'space-y-5' : 'w-[65%] space-y-8'}`}>
               {data.personalInfo.summary && (
                  <section className={isElevate || isPulse ? 'bg-white rounded-[1.75rem] border border-slate-200 p-4 shadow-sm' : ''}>
                     <h3 className="text-xl font-black text-slate-900 mb-3" style={textAccentStyle}>Profile.</h3>
                     <p className="text-sm leading-relaxed text-slate-600 font-medium">{data.personalInfo.summary}</p>
                  </section>
               )}

               {data.experience.length > 0 && (
                  <section className={isElevate || isPulse ? 'bg-white rounded-[1.75rem] border border-slate-200 p-4 shadow-sm' : ''}>
                     <h3 className="text-xl font-black text-slate-900 mb-3" style={textAccentStyle}>Experience.</h3>
                     <div className="space-y-4">
                        {data.experience.map(exp => (
                           <div key={exp.id} className={`relative pl-6 ${isPulse ? 'bg-pink-50/50 rounded-2xl p-5 pl-8 border border-pink-100' : ''}`}>
                              <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full ring-4 ring-slate-100" style={accentStyle}></div>
                              <div className="flex justify-between items-baseline gap-4 mb-1">
                                 <h4 className="text-base font-bold text-slate-900">{exp.position}</h4>
                                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${isElevate || isPulse ? 'text-slate-500 bg-slate-100' : 'text-slate-400 bg-slate-100'}`}>{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <h5 className="text-sm font-bold text-slate-500 mb-2">{exp.company}</h5>
                              <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                           </div>
                        ))}
                     </div>
                  </section>
               )}

               {data.education.length > 0 && (
                  <section className={isElevate || isPulse ? 'bg-white rounded-[1.75rem] border border-slate-200 p-4 shadow-sm' : ''}>
                     <h3 className="text-xl font-black text-slate-900 mb-3" style={textAccentStyle}>Education.</h3>
                     <div className={`space-y-4 ${isElevate ? 'grid grid-cols-2 gap-3 space-y-0' : ''}`}>
                        {data.education.map(edu => (
                           <div key={edu.id} className={`relative pl-6 ${isPulse ? 'bg-pink-50/50 rounded-2xl p-5 pl-8 border border-pink-100' : ''}`}>
                              <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full ring-4 ring-slate-100" style={accentStyle}></div>
                              <h4 className="text-base font-bold text-slate-900">{edu.degree}</h4>
                              <div className="flex justify-between items-baseline mt-1 gap-4">
                                 <h5 className="text-sm font-bold text-slate-500">{edu.school}</h5>
                                 <span className="text-[10px] font-black uppercase text-slate-400">{edu.startDate} - {edu.endDate}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </section>
               )}
            </div>
         </div>
      </div>
    );
  };

  // --- CV Renderer ---
  const renderCV = () => {
    const configs: Record<string, any> = {
      'cv-alpha': { layout: 'sidebar-left', theme: 'classic', headerStyle: 'solid' },
      'cv-beta': { layout: 'sidebar-right', theme: 'modern', headerStyle: 'minimal' },
      'cv-gamma': { layout: 'stack', theme: 'bold', headerStyle: 'solid' },
      'cv-delta': { layout: 'split-top', theme: 'elegant', headerStyle: 'minimal' },
      'cv-epsilon': { layout: 'sidebar-left', theme: 'modern', headerStyle: 'minimal' },
      'cv-zeta': { layout: 'sidebar-right', theme: 'bold', headerStyle: 'solid' },
      'cv-eta': { layout: 'stack', theme: 'elegant', headerStyle: 'minimal' },
      'cv-theta': { layout: 'split-top', theme: 'classic', headerStyle: 'solid' },
      'cv-iota': { layout: 'sidebar-left', theme: 'bold', headerStyle: 'line' },
      'cv-kappa': { layout: 'sidebar-right', theme: 'elegant', headerStyle: 'solid' },
      'cv-lambda': { layout: 'stack', theme: 'classic', headerStyle: 'minimal' },
      'cv-mu': { layout: 'split-top', theme: 'modern', headerStyle: 'line' },
      'cv-nu': { layout: 'sidebar-left', theme: 'elegant', headerStyle: 'solid' },
      'cv-xi': { layout: 'sidebar-right', theme: 'classic', headerStyle: 'line' },
      'cv-omicron': { layout: 'stack', theme: 'modern', headerStyle: 'solid' },
      'cv-pi': { layout: 'split-top', theme: 'bold', headerStyle: 'minimal' },
      'cv-rho': { layout: 'sidebar-left', theme: 'modern', headerStyle: 'solid' },
      'cv-sigma': { layout: 'sidebar-right', theme: 'bold', headerStyle: 'line' },
      'cv-tau': { layout: 'stack', theme: 'elegant', headerStyle: 'line' },
      'cv-upsilon': { layout: 'split-top', theme: 'classic', headerStyle: 'minimal' }
    };
    const config = configs[tid] || configs['cv-alpha'];
    let bgMain = 'bg-white', bgSide = 'bg-slate-50', textMain = 'text-slate-800', textSide = 'text-slate-600', headingClass = 'font-bold uppercase tracking-wider', borderClass = 'border-slate-200';
    if (config.theme === 'modern') {
       headingClass = 'font-black tracking-tight text-slate-900 capitalize'; bgSide = 'bg-slate-100'; borderClass='border-slate-300';
    } else if (config.theme === 'bold') {
       bgMain = 'bg-slate-900'; textMain = 'text-white'; bgSide = 'bg-slate-800'; textSide = 'text-slate-300'; headingClass = 'font-black uppercase tracking-widest text-white'; borderClass='border-slate-700';
    } else if (config.theme === 'elegant') {
       bgMain = 'bg-[#faf9f6]'; bgSide = 'bg-white'; headingClass = 'font-serif italic text-slate-700'; textMain = 'text-slate-800 font-serif';
    }

    const headerBoxClass =
      config.headerStyle === 'solid'
        ? (config.theme === 'bold' ? 'bg-slate-800 p-8 rounded-2xl' : 'bg-slate-100 p-8 rounded-2xl')
        : config.headerStyle === 'line'
          ? `border-b-4 ${config.theme === 'bold' ? 'border-white' : 'border-slate-900'} pb-6 mb-6`
          : 'mb-8';

    const renderHeaderContent = (compact = false) => (
       <div className={headerBoxClass}>
          <div className={`flex ${compact ? 'items-start gap-4' : 'items-center gap-6'} min-w-0`}>
             {data.personalInfo.profilePicture && !compact && (
                <ProfileImage className={`${compact ? 'w-24 h-24' : 'w-28 h-28'} object-cover shrink-0 ${config.theme === 'classic' ? 'rounded-full' : config.theme === 'modern' ? 'rounded-xl' : 'rounded-none shadow-md'}`} />
             )}
             <div className="min-w-0 flex-1">
                <h1 className={`${compact ? 'text-3xl' : 'text-4xl'} ${config.theme === 'bold' ? 'font-black text-white' : config.theme === 'elegant' ? 'font-serif text-slate-900' : 'font-bold text-slate-900'} mb-2 leading-tight break-words`}>{data.personalInfo.fullName}</h1>
                <h2 className={`${compact ? 'text-base' : 'text-xl'} font-semibold opacity-80 break-words`} style={textAccentStyle}>{data.personalInfo.jobTitle}</h2>
                <div className={`flex ${compact ? 'flex-col gap-2' : 'flex-wrap gap-x-4 gap-y-2'} mt-3 text-sm font-medium opacity-70 break-all`}>
                   {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                   {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                   {!compact && data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                </div>
             </div>
          </div>
       </div>
    );

    const renderMainContent = () => (
       <div className="space-y-6 min-w-0">
          {data.personalInfo.summary && (
             <section>
                <h3 className={`${headingClass} mb-4 flex items-center gap-2`}><span className="w-5 h-5" style={textAccentStyle}>{Icons.User}</span> Profile</h3>
                <p className="text-sm leading-relaxed opacity-90 break-words">{data.personalInfo.summary}</p>
             </section>
          )}
          {data.experience.length > 0 && (
             <section>
                <h3 className={`${headingClass} mb-4 flex items-center gap-2`}><span className="w-5 h-5" style={textAccentStyle}>{Icons.Briefcase}</span> Experience</h3>
                <div className="space-y-6 border-l-2 pl-4" style={{ borderColor: isGradient ? 'transparent' : data.accentColor, borderImage: isGradient ? `${data.accentColor} 1` : 'none' }}>
                   {data.experience.map(exp => (
                      <div key={exp.id} className="relative">
                         <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full" style={accentStyle}></div>
                         <div className="flex justify-between items-baseline gap-4 mb-1">
                            <h4 className="text-base font-bold break-words">{exp.position}</h4>
                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-right shrink-0">{exp.startDate} - {exp.endDate}</span>
                         </div>
                         <h5 className="text-sm font-semibold mb-2 break-words" style={textAccentStyle}>{exp.company}</h5>
                         <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line break-words">{exp.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          )}
       </div>
    );

    const renderSideContent = () => (
       <div className="space-y-6 min-w-0">
          <section>
             <h3 className={`${headingClass} mb-3 flex items-center gap-2`}><span className="w-4 h-4" style={textAccentStyle}>{Icons.Location}</span> Details</h3>
             <ul className="text-xs space-y-2 opacity-80 font-medium break-words">
                {data.personalInfo.location && <li>{data.personalInfo.location}</li>}
                {data.personalInfo.website && <li className="break-all">{data.personalInfo.website}</li>}
             </ul>
          </section>
          {data.skills.length > 0 && (
             <section>
                <h3 className={`${headingClass} mb-3 flex items-center gap-2`}><span className="w-4 h-4" style={textAccentStyle}>{Icons.User}</span> Skills</h3>
                <div className="flex flex-wrap gap-2">
                   {data.skills.map(skill => (
                      <span key={skill} className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${config.theme === 'bold' ? 'bg-slate-700 text-white' : `bg-white text-slate-700 shadow-sm border ${borderClass}`}`}>
                         {skill}
                      </span>
                   ))}
                </div>
             </section>
          )}
          {(data.languages || []).length > 0 && (
             <section>
                <h3 className={`${headingClass} mb-3 flex items-center gap-2`}><span className="w-4 h-4" style={textAccentStyle}>{Icons.User}</span> Languages</h3>
                <div className="flex flex-wrap gap-2">
                   {(data.languages || []).map(lang => (
                      <span key={lang} className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded ${config.theme === 'bold' ? 'bg-slate-700 text-white' : `bg-white text-slate-700 shadow-sm border ${borderClass}`}`}>
                         {lang}
                      </span>
                   ))}
                </div>
             </section>
          )}
          {data.education.length > 0 && (
             <section>
                <h3 className={`${headingClass} mb-3 flex items-center gap-2`}><span className="w-4 h-4" style={textAccentStyle}>{Icons.GraduationCap}</span> Education</h3>
                <div className="space-y-4">
                   {data.education.map(edu => (
                      <div key={edu.id}>
                         <h4 className="text-sm font-bold">{edu.degree}</h4>
                         <h5 className="text-[11px] font-semibold my-1" style={textAccentStyle}>{edu.school}</h5>
                         <span className="text-[10px] uppercase font-bold opacity-60">{edu.startDate} - {edu.endDate}</span>
                      </div>
                   ))}
                </div>
             </section>
          )}
       </div>
    );

    return (
       <div className={`h-full relative overflow-hidden ${bgMain} ${textMain}`}>
          {config.layout === 'stack' && (
             <div className="flex flex-col h-full p-[12mm]">
                {renderHeaderContent()}
                <div className="flex gap-8 mt-6 flex-grow min-h-0">
                   <div className="w-[62%] min-w-0">{renderMainContent()}</div>
                   <div className="w-[38%] min-w-0">{renderSideContent()}</div>
                </div>
             </div>
          )}
          {config.layout === 'split-top' && (
             <div className="flex flex-col h-full p-[12mm]">
                {renderHeaderContent()}
                <div className="grid grid-cols-[1.6fr_1fr] gap-8 mt-6 flex-grow min-h-0 items-start">
                   <div className="min-w-0">
                      {renderMainContent()}
                   </div>
                   <div className={`min-w-0 border-l pl-6 ${borderClass}`}>
                      {renderSideContent()}
                   </div>
                </div>
             </div>
          )}
          {config.layout === 'sidebar-left' && (
             <div className="grid grid-cols-[29%_71%] h-full">
                <aside className={`${bgSide} ${textSide} p-[10mm]`}>
                   {data.personalInfo.profilePicture && (
                      <div className="mb-8 flex justify-center">
                         <ProfileImage className={`w-28 h-28 object-cover ${config.theme === 'classic' ? 'rounded-2xl' : 'rounded-xl'} shadow-md`} />
                      </div>
                   )}
                   <div className="space-y-8">
                      {renderSideContent()}
                   </div>
                </aside>
                <div className="p-[12mm] min-w-0">
                   {renderHeaderContent(true)}
                   <div className="mt-8">{renderMainContent()}</div>
                </div>
             </div>
          )}
          {config.layout === 'sidebar-right' && (
             <div className="grid grid-cols-[71%_29%] h-full">
                <div className="p-[12mm] min-w-0">
                   {renderHeaderContent(true)}
                   <div className="mt-8">{renderMainContent()}</div>
                </div>
                <aside className={`${bgSide} ${textSide} p-[10mm]`}>
                   {data.personalInfo.profilePicture && (
                      <div className="mb-8 flex justify-center">
                         <ProfileImage className={`${config.theme === 'classic' ? 'rounded-2xl' : 'rounded-xl'} w-28 h-28 object-cover shadow-md`} />
                      </div>
                   )}
                   <div className="space-y-8">{renderSideContent()}</div>
                </aside>
             </div>
          )}
       </div>
    );
  };

  // --- Main Switch ---

  if (view === 'cv') return (
     <div className="resume-page shadow-2xl origin-top relative overflow-hidden" style={{ transform: `scale(${scale})`, width: '8.27in', height: '11.69in', fontFamily }}>
        {renderCV()}
     </div>
  );

  if (view === 'cover-letter') return (
     <div className="resume-page shadow-2xl origin-top relative overflow-hidden text-slate-800" style={{ transform: `scale(${scale})`, width: '8.27in', height: '11.69in', fontFamily }}>
        <div className="p-[20mm] h-full flex flex-col bg-white">
           <header className="mb-12 border-b-2 pb-6" style={borderAccentStyle}>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-[28pt] font-black uppercase mb-1" style={textAccentStyle}>{data.personalInfo.fullName}</h1>
                  <h2 className="text-[12pt] font-semibold text-slate-500 uppercase tracking-widest">{data.personalInfo.jobTitle}</h2>
                </div>
                {data.personalInfo.profilePicture && (
                    <img src={data.personalInfo.profilePicture} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 shadow-sm" style={{ borderColor: isGradient ? 'transparent' : data.accentColor }} />
                )}
              </div>
              <div className="flex gap-4 text-xs font-medium text-slate-500 mt-4">
                 {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                 {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                 {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              </div>
           </header>

           <main className="flex-grow flex flex-col text-sm leading-relaxed text-slate-700 font-medium">
              <div className="mb-8">{data.coverLetter.date}</div>
              <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="font-bold text-slate-900">{data.coverLetter.recipientName}</div>
                 <div className="italic">{data.coverLetter.recipientTitle}</div>
                 <div className="font-semibold text-slate-800">{data.coverLetter.recipientCompany}</div>
                 <div className="text-slate-500">{data.coverLetter.recipientAddress}</div>
              </div>
              <div className="mb-6 font-bold text-slate-900">{data.coverLetter.recipientName ? `Dear ${data.coverLetter.recipientName},` : ''}</div>
              <div className="whitespace-pre-line flex-grow">{data.coverLetter.content}</div>
              
              <div className="mt-12 pt-8 border-t border-slate-100 inline-block w-64">
                 <div className="font-script text-3xl mb-2" style={textAccentStyle}>{data.personalInfo.fullName}</div>
                 <div className="font-bold text-slate-900 uppercase tracking-widest text-xs">{data.personalInfo.fullName}</div>
              </div>
           </main>
        </div>
     </div>
  );

  // Helper to get a unique variation of a base layout
  const wrapWithVariation = (id: string, layout: JSX.Element) => {
    return (
      <div key={id} className={`template-variation-${id} h-full w-full`}>
        {layout}
      </div>
    );
  };

  const resumeWrapperStyle =
    view === 'resume'
      ? resumeContentScale !== 1
        ? {
            transform: `scale(${resumeContentScale})`,
            transformOrigin: 'top left',
            width: `calc(100% / ${resumeContentScale})`,
            height: `calc(100% / ${resumeContentScale})`,
          }
        : {
            height: '100%',
          }
      : undefined;

  return (
    <div 
        id="resume-preview"
        className="resume-page shadow-2xl origin-top relative bg-white overflow-hidden" 
        style={{ 
            transform: `scale(${scale})`, 
            width: '8.27in', 
            height: `${pages * 11.69}in`,
            fontFamily: fontFamily 
        }}
    >
        {/* Page breaks for print preview */}
        {Array.from({ length: pages - 1 }).map((_, i) => (
        <div 
            key={i} 
            className="absolute left-0 right-0 border-b-2 border-dashed border-slate-300 z-50 pointer-events-none print:hidden flex items-end justify-end px-2 text-xs font-bold text-slate-400 bg-white/50"
            style={{ top: `${(i + 1) * 11.69}in`, height: '2px' }}
        >
            Page {i + 2} Start
        </div>
        ))}
        
        <div style={resumeWrapperStyle} className="overflow-hidden">
            {(() => {
                switch(tid) {
                    // Variations of Corporate
                    case 'corporate': return renderCorporate();
                    case 'manager': return wrapWithVariation('manager', renderCorporate()); 
                    case 'summit': return wrapWithVariation('summit', renderCorporate());
                    case 'horizon': return wrapWithVariation('horizon', renderCorporate());
                    
                    // Variations of Elegant
                    case 'elegant': return renderElegant();
                    case 'premium': return wrapWithVariation('premium', renderElegant());
                    case 'elite': return wrapWithVariation('elite', renderElegant());
                    case 'aurora': return wrapWithVariation('aurora', renderElegant());
                    
                    // Variations of Designer
                    case 'designer': return renderDesigner();
                    case 'vision': return wrapWithVariation('vision', renderDesigner());
                    case 'spectrum': return wrapWithVariation('spectrum', renderDesigner());
                    
                    // Variations of Bold
                    case 'bold': return renderBold();
                    case 'apex': return wrapWithVariation('apex', renderBold());
                    case 'momentum': return wrapWithVariation('momentum', renderBold());
                    
                    // Variations of Compact
                    case 'compact': return renderCompact();
                    case 'essential': return wrapWithVariation('essential', renderCompact());
                    case 'nimbus': return wrapWithVariation('nimbus', renderCompact());
                    
                    // Variations of Dynamic
                    case 'dynamic': return renderDynamic();
                    case 'elevate': return wrapWithVariation('elevate', renderDynamic());
                    case 'pulse': return wrapWithVariation('pulse', renderDynamic());
                    
                    // Variations of Executive
                    case 'executive': return renderExecutive();
                    case 'advanced': return wrapWithVariation('advanced', renderExecutive());
                    case 'vertex': return wrapWithVariation('vertex', renderExecutive());
                    case 'pioneer': return wrapWithVariation('pioneer', renderExecutive());
                    
                    // Variations of Modern
                    case 'modern': return renderModern();
                    case 'nova': return wrapWithVariation('nova', renderModern());
                    case 'zenith': return wrapWithVariation('zenith', renderModern());
                    case 'developer': return wrapWithVariation('developer', renderModern());
                    
                    // Variations of Classic
                    case 'classic': return renderClassic();
                    case 'standard': return wrapWithVariation('standard', renderClassic());
                    case 'origin': return wrapWithVariation('origin', renderClassic());
                    
                    case 'creative': return renderCreative();
                    
                    // Variations of Minimalist
                    case 'minimalist': return renderMinimalist();
                    case 'clean': return wrapWithVariation('clean', renderMinimalist());
                    case 'simple': return wrapWithVariation('simple', renderMinimalist());
                    case 'clarity': return wrapWithVariation('clarity', renderMinimalist());
                    case 'luna': return wrapWithVariation('luna', renderMinimalist());
                    case 'oasis': return wrapWithVariation('oasis', renderMinimalist());
                    
                    // Variations of Professional
                    case 'professional': return renderProfessional();
                    case 'spacious': return wrapWithVariation('spacious', renderProfessional());
                    
                    // Variations of Tech
                    case 'tech': return renderTech();
                    case 'static': return wrapWithVariation('static', renderTech());
                    case 'echo': return wrapWithVariation('echo', renderTech());
                    case 'nexus': return wrapWithVariation('nexus', renderTech());
                    
                    default: return renderExecutive();
                }
            })()}
        </div>
    </div>
  );
};
