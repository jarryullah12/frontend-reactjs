import React from 'react';

interface AboutSectionProps {
  bio: string;
  birthDate: string;
  status: string;
  email: string;
  location?: string;
  workplace?: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  bio, 
  birthDate, 
  status, 
  email, 
  location, 
  workplace = [], 
  education = [] 
}) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden dark:border dark:border-dark-border transition-colors">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4 dark:text-white">About</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Bio</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{bio}</p>
          </div>
          
          {location && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Lives in</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{location}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Birth Date</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{birthDate}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Relationship Status</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{status}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Email</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{email}</p>
          </div>
          
          {/* Workplace Section */}
          {workplace && workplace.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Work Experience</h3>
              <div className="space-y-3">
                {workplace.map((work, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{work.position}</span>
                      <span className="mx-1 text-gray-500">at</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{work.company}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      {work.startDate} - {work.current ? 'Present' : work.endDate}
                    </p>
                    {work.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{work.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {education && education.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Education</h3>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{edu.degree}</span>
                      {edu.field && (
                        <>
                          <span className="mx-1 text-gray-500">in</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{edu.field}</span>
                        </>
                      )}
                    </div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">{edu.institution}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;