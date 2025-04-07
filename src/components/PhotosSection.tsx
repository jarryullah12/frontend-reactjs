import React from 'react';

interface PhotosSectionProps {
  photos: string[];
}

const PhotosSection: React.FC<PhotosSectionProps> = ({ photos }) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 mb-6 dark:border dark:border-dark-border transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Photos</h2>
        <button className="text-blue-500 dark:text-blue-400 text-sm hover:underline">See all photos</button>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {photos.slice(0, 6).map((photo, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={photo} 
              alt={`${index + 1}`} 
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosSection; 