import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_RESUME_DATA } from '../constants';
import { TemplateRenderer } from '../components/TemplateRenderer';
import { resumeService } from '../services/resumeService';
import { ResumeData } from '../types';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      if (id && id.length > 20) {
        setLoading(true);
        const fetched = await resumeService.getResumeById(id);
        if (fetched) {
          setData(fetched);
        }
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 mb-8 flex justify-between items-center no-print">
        <Link to="/settings" className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Settings
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <TemplateRenderer data={data} scale={1} />
      </div>
    </div>
  );
};

export default Profile;