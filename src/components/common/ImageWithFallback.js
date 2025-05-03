import React, { useState } from 'react';

/**
 * A component that renders an image with a fallback when the image fails to load
 * @param {string} src - The source URL of the image
 * @param {string} alt - The alt text for the image
 * @param {string} className - CSS classes to apply to the image
 * @param {Object} props - Additional props to pass to the img element
 */
const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  
  // We're now using local images directly instead of mapping to external URLs
  
  // Just return the src directly - we're using local images
  const getDoctorImage = (src) => {
    return src;
  };
  
  // Default fallback colors based on the first letter of alt text
  const getColorFromText = (text) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const firstChar = (text || '').charAt(0).toUpperCase();
    const index = firstChar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get initials from alt text
  const getInitials = (text) => {
    if (!text) return '?';
    const words = text.split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  if (error) {
    // Render a colored div with initials as fallback
    return (
      <div 
        className={`${className} ${getColorFromText(alt)} flex items-center justify-center text-white`}
        {...props}
      >
        <span className="text-3xl font-bold">{getInitials(alt)}</span>
      </div>
    );
  }

  return (
    <img
      src={getDoctorImage(src)}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
