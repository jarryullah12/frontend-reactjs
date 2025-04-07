import React from 'react';
import { useSession } from '../contexts/SessionContext';

interface ProfileInfoProps {
  bio: string;
  birthDate: string;
  status: string;
  email: string;
  role?: string;
  location?: string;
  joinDate?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  bio, 
  birthDate, 
  status, 
  email, 
  role,
  location,
  joinDate
}) => {
  const { session } = useSession();
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden dark:border dark:border-dark-border transition-colors">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Profile Info</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Bio</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{bio}</p>
          </div>
          
          {role && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Occupation</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{role}</p>
            </div>
          )}
          
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
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {email || session.email || 'No email available'}
              {email && session.email && email !== session.email && (
                <span className="block mt-1 text-xs text-blue-500">
                  Session email: {session.email}
                </span>
              )}
            </p>
          </div>
          
          {joinDate && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Joined on</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{joinDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;