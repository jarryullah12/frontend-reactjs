import React, { useState } from 'react';
import './ProfilePicture.css';

const ProfilePicture = ({ onImageUpload, initialImage }) => {
  const [preview, setPreview] = useState(initialImage || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-picture-container">
      {preview ? (
        <img 
          src={preview} 
          alt="Profile" 
          className="profile-preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div className="profile-placeholder">
          <i className="fas fa-user"></i>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="profile-input"
        id="profile-upload"
      />
      <label htmlFor="profile-upload" className="upload-button">
        Choose Photo
      </label>
    </div>
  );
};

export default ProfilePicture;
