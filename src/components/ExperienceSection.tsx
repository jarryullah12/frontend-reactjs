import React from 'react';

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  duration: string;
  logo: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6 dark:border dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Experience</h2>
        <button className="text-blue-500 dark:text-blue-400 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex">
            <div className="mr-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-bg flex items-center justify-center overflow-hidden">
                <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold dark:text-white">{exp.company}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{exp.position}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{exp.period}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Duration: {exp.duration}</p>
              
              <div className="mt-2">
                <button className="text-gray-500 dark:text-gray-400 text-xs border border-gray-200 dark:border-dark-border px-2 py-0.5 rounded hover:bg-gray-50 dark:hover:bg-dark-bg">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection; 