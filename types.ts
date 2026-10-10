
export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin' | 'pro';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface CoverLetter {
  recipientName: string;
  recipientTitle: string;
  recipientCompany: string;
  recipientAddress: string;
  date: string;
  content: string;
}

export interface ResumeData {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  accentColor?: string;
  font?: string;
  pages?: number;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    jobTitle: string;
    profilePicture?: string; 
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  projects: Project[];
  references: Reference[];
  coverLetter: CoverLetter;
  updatedAt: string;
}

export type TemplateType = 'modern' | 'classic' | 'minimalist' | 'sidebar-left' | 'sidebar-right' | 'banner';

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: string;
  duration?: string;
  features: string[];
  recommended?: boolean;
}

export interface AtsResult {
  score: number;
  summary: string;
  issues?: string[];
  missingKeywords?: string[];
  verdict?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  status: 'published' | 'draft';
}
