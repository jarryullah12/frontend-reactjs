import { ResumeData } from '../types';
import { getAuthenticatedUser, getSupabase } from './supabase';
import { normalizeEmail } from '../utils/email';

const isMissingColumnError = (error: any) => {
  const code = error?.code;
  return code === '42703' || code === 'PGRST204';
};

export const resumeService = {
  getResumes: async (userId: string, userEmail?: string): Promise<any[]> => {
    const supabase = getSupabase();
    try {
      await getAuthenticatedUser(3, 250);

      const { data: byUserId, error: byUserIdError } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (byUserIdError) throw byUserIdError;
      let combined = byUserId || [];

      const normalizedEmail = userEmail ? normalizeEmail(userEmail) : '';
      if (normalizedEmail) {
        const byNormalized = await supabase
          .from('resumes')
          .select('*')
          .eq('owner_email_normalized', normalizedEmail)
          .order('updated_at', { ascending: false });

        if (byNormalized.error && !isMissingColumnError(byNormalized.error)) {
          throw byNormalized.error;
        }

        if (byNormalized.data?.length) {
          const seen = new Set(combined.map(r => r.id));
          const merged = [...combined];
          byNormalized.data.forEach(row => {
            if (!seen.has(row.id)) {
              merged.push(row);
              seen.add(row.id);
            }
          });
          combined = merged.sort((a, b) => {
            const aTs = new Date(a.updated_at || 0).getTime();
            const bTs = new Date(b.updated_at || 0).getTime();
            return bTs - aTs;
          });
        }
      }
      
      return combined;
    } catch (e) {
      console.error('Error fetching resumes:', e);
      return [];
    }
  },

  getResumeById: async (id: string): Promise<ResumeData | null> => {
    const supabase = getSupabase();
    try {
      await getAuthenticatedUser(3, 250);

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        // If content is present, use it. Otherwise fallback to individual columns for backward compatibility.
        if (data.content) {
          return {
            ...data.content,
            title: data.title,
            templateId: data.template_id
          } as ResumeData;
        }

        return {
          title: data.title,
          templateId: data.template_id,
          accentColor: data.accent_color,
          font: data.font,
          pages: data.pages,
          personalInfo: data.personal_info,
          experience: data.experience,
          education: data.education,
          skills: data.skills,
          languages: data.languages,
          projects: data.projects,
          references: data.references_list,
          coverLetter: data.cover_letter
        } as ResumeData;
      }
      return null;
    } catch (e) {
      console.error('Error fetching resume by id:', e);
      return null;
    }
  },

  saveResume: async (userId: string, data: ResumeData, resumeId?: string, userEmail?: string): Promise<string | null> => {
    const supabase = getSupabase();
    try {
      await getAuthenticatedUser(3, 250);
      console.log('Attempting to save resume for user:', userId, 'with resumeId:', resumeId);
      
      const resumePayload: any = {
        user_id: userId,
        title: data.title || 'Untitled Resume',
        template_id: data.templateId,
        content: data, // Store the entire object in JSONB for flexibility
        updated_at: new Date().toISOString()
      };

      if (userEmail) {
        resumePayload.owner_email = userEmail.trim().toLowerCase();
        resumePayload.owner_email_normalized = normalizeEmail(userEmail);
      }

      // Also update individual columns for safety and searching
      resumePayload.accent_color = data.accentColor;
      resumePayload.font = data.font;
      resumePayload.pages = data.pages;
      resumePayload.personal_info = data.personalInfo;
      resumePayload.experience = data.experience;
      resumePayload.education = data.education;
      resumePayload.skills = data.skills;
      resumePayload.languages = data.languages;
      resumePayload.projects = data.projects;
      resumePayload.references_list = data.references;
      resumePayload.cover_letter = data.coverLetter;

      if (resumeId) {
        const { error } = await supabase
          .from('resumes')
          .update(resumePayload)
          .eq('id', resumeId)
          .eq('user_id', userId);
        
        if (error) {
          console.error('Supabase Update Error:', error);
          throw error;
        }
        return resumeId;
      } else {
        const { data: savedData, error } = await supabase
          .from('resumes')
          .insert(resumePayload)
          .select()
          .single();
        
        if (error) {
          console.error('Supabase Insert Error:', error);
          throw error;
        }
        
        if (!savedData) {
          console.error('Resume saved but no data returned');
          throw new Error('No data returned from insert');
        }
        
        console.log('Resume saved successfully with ID:', savedData.id);
        return savedData.id;
      }
    } catch (e: any) {
      console.error('Final Save Error Catch:', e);
      throw e;
    }
  },

  deleteResume: async (id: string, userId: string, userEmail?: string): Promise<boolean> => {
    const supabase = getSupabase();
    try {
      await getAuthenticatedUser(3, 250);
      let error: any = null;
      const normalized = userEmail ? normalizeEmail(userEmail) : '';

      if (normalized) {
        const combinedDelete = await supabase
          .from('resumes')
          .delete()
          .eq('id', id)
          .or(`user_id.eq.${userId},owner_email_normalized.eq.${normalized}`);
        error = combinedDelete.error;
      } else {
        const byUser = await supabase
          .from('resumes')
          .delete()
          .eq('id', id)
          .eq('user_id', userId);
        error = byUser.error;
      }

      if (error && isMissingColumnError(error)) {
        const fallback = await supabase
          .from('resumes')
          .delete()
          .eq('id', id)
          .eq('user_id', userId);
        error = fallback.error;
      }

      if (error && !isMissingColumnError(error)) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting resume:', e);
      return false;
    }
  }
};
