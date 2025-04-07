import React from 'react';

interface Interest {
  id: number;
  name: string;
  logo: string;
  followers: string;
  followed?: boolean;
}

interface InterestsSectionProps {
  interests: Interest[];
  onFollowInterest?: (interestId: number) => void;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests, onFollowInterest }) => {
  console.log('InterestsSection rendered with interests:', interests);
  
  const handleFollowClick = (interestId: number) => {
    console.log('Follow button clicked for interest ID:', interestId);
    if (onFollowInterest) {
      onFollowInterest(interestId);
    }
  };
  
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6 dark:border dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Interests</h2>
        <button className="text-blue-500 dark:text-blue-400 text-sm hover:underline">See all</button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {interests.map(interest => (
          <div key={interest.id} className="flex flex-col items-center bg-gray-50 dark:bg-dark-bg rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors">
            <div className="w-full h-28 rounded-lg overflow-hidden mb-2">
              <img 
                src={interest.logo} 
                alt={interest.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-center dark:text-white">{interest.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{interest.followers} followers</p>
            <button 
              onClick={() => handleFollowClick(interest.id)}
              className={`mt-2 px-4 py-1 ${interest.followed 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                : 'bg-blue-500 dark:bg-blue-600 text-white'} 
                text-sm rounded-md hover:opacity-90 transition-colors`}
            >
              {interest.followed ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestsSection;