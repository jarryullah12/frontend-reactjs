import React from 'react';

interface DefaultProfileImageProps {
  size?: number;
  className?: string;
}

const DefaultProfileImage: React.FC<DefaultProfileImageProps> = ({ size = 40, className = '' }) => {
  return (
    <img
      src="/default-profile.svg"
      alt="Default Profile"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default DefaultProfileImage;
