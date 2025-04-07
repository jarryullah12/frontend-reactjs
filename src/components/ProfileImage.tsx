import React from 'react';
import DefaultProfileImage from './DefaultProfileImage';

interface ProfileImageProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  src, 
  alt = 'Profile Image', 
  size = 40, 
  className = '' 
}) => {
  const [hasError, setHasError] = React.useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  if (!src || hasError) {
    return <DefaultProfileImage size={size} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      onError={handleImageError}
    />
  );
};

export default ProfileImage;
