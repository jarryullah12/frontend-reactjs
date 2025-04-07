import React, { useState, useRef, useEffect } from 'react';
import { useSession } from '../contexts/SessionContext';

interface EditProfileModalProps {
  profile: {
    name: string;
    bio: string;
    role: string;
    location: string;
    birthDate: string;
    status: string;
    email: string;
    profileImage: string;
    coverImage: string;
    joinDate?: string;
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
  };
  onClose: () => void;
  onSave: (updatedProfile: any) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onClose, onSave }) => {
  const { session } = useSession();
  const [formData, setFormData] = useState({
    name: profile.name,
    bio: profile.bio,
    role: profile.role,
    location: profile.location,
    birthDate: profile.birthDate,
    status: profile.status,
    email: profile.email || session.email || '',
    joinDate: profile.joinDate || '',
    profileImage: profile.profileImage,
    coverImage: profile.coverImage,
    workplace: profile.workplace || [],
    education: profile.education || []
  });
  
  // Update email from session if profile email is empty
  useEffect(() => {
    if (!formData.email && session.email) {
      setFormData(prev => ({
        ...prev,
        email: session.email || ''
      }));
    }
  }, [session.email]);
  
  const [profileImagePreview, setProfileImagePreview] = useState(profile.profileImage);
  const [coverImagePreview, setCoverImagePreview] = useState(profile.coverImage);
  
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  
  const [newWorkplace, setNewWorkplace] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleWorkplaceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWorkplace(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEducationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleWorkplaceCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setNewWorkplace(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? '' : prev.endDate
    }));
  };
  
  const handleEducationCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setNewEducation(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? '' : prev.endDate
    }));
  };
  
  const addWorkplace = () => {
    if (newWorkplace.company && newWorkplace.position && newWorkplace.startDate) {
      setFormData(prev => ({
        ...prev,
        workplace: [...prev.workplace, newWorkplace]
      }));
      setNewWorkplace({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };
  
  const addEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.startDate) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };
  
  const removeWorkplace = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workplace: prev.workplace.filter((_, i) => i !== index)
    }));
  };
  
  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setProfileImagePreview(imageUrl);
          setFormData(prev => ({
            ...prev,
            profileImage: imageUrl
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setCoverImagePreview(imageUrl);
          setFormData(prev => ({
            ...prev,
            coverImage: imageUrl
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto dark:border dark:border-dark-border">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Edit Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image
                </label>
                <div className="relative h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-bg">
                  <img 
                    src={coverImagePreview} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <button 
                      type="button"
                      className="bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() => coverImageInputRef.current?.click()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={coverImageInputRef}
                  onChange={handleCoverImageChange}
                />
                <button
                  type="button"
                  className="mt-2 text-sm text-blue-500 dark:text-blue-400 font-medium"
                  onClick={() => coverImageInputRef.current?.click()}
                >
                  Change Cover Photo
                </button>
              </div>
              
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-bg">
                    <img 
                      src={profileImagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <button 
                        type="button"
                        className="bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-300 p-1.5 rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity"
                        onClick={() => profileImageInputRef.current?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={profileImageInputRef}
                      onChange={handleProfileImageChange}
                    />
                    <button
                      type="button"
                      className="text-sm text-blue-500 dark:text-blue-400 font-medium"
                      onClick={() => profileImageInputRef.current?.click()}
                    >
                      Change Profile Photo
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Recommended: Square image, at least 400x400 pixels
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      required
                    />
                    {session.email && formData.email !== session.email && (
                      <div className="mt-1 text-xs text-blue-500">
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, email: session.email || '' }))}
                          className="underline hover:text-blue-700"
                        >
                          Use session email: {session.email}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role / Occupation
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lives in
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Birth Date
                  </label>
                  <input
                    type="text"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Joined on
                  </label>
                  <input
                    type="text"
                    id="joinDate"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Relationship Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                  >
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a relationship</option>
                    <option value="Engaged">Engaged</option>
                    <option value="Married">Married</option>
                    <option value="It's complicated">It's complicated</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                  placeholder="Tell us about yourself..."
                ></textarea>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
              
              {/* Workplace Section */}
              <div className="border-t border-gray-200 dark:border-dark-border pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Work Experience</h3>
                
                {/* Existing Workplace Entries */}
                {formData.workplace.length > 0 && (
                  <div className="mb-4 space-y-4">
                    {formData.workplace.map((work, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-dark-border rounded-md bg-gray-50 dark:bg-dark-bg relative">
                        <button 
                          type="button"
                          onClick={() => removeWorkplace(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{work.company}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Position</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{work.position}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {work.startDate} - {work.current ? 'Present' : work.endDate}
                            </p>
                          </div>
                          {work.description && (
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{work.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add New Workplace Button */}
                {formData.workplace.length === 0 ? (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById('workplaceForm')?.classList.remove('hidden')}
                      className="flex items-center justify-center w-full md:w-auto px-6 py-4 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors group"
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">Add a workplace</span>
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => document.getElementById('workplaceForm')?.classList.remove('hidden')}
                      className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add another workplace
                    </button>
                  </div>
                )}
                
                {/* Add New Workplace Form */}
                <div id="workplaceForm" className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md border border-gray-200 dark:border-dark-border mt-4 hidden">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Add Work Experience</h4>
                    <button 
                      type="button"
                      onClick={() => document.getElementById('workplaceForm')?.classList.add('hidden')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={newWorkplace.company}
                        onChange={handleWorkplaceInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Position *
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={newWorkplace.position}
                        onChange={handleWorkplaceInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="text"
                        id="startDate"
                        name="startDate"
                        value={newWorkplace.startDate}
                        onChange={handleWorkplaceInputChange}
                        placeholder="e.g., Jan 2020"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        id="endDate"
                        name="endDate"
                        value={newWorkplace.endDate}
                        onChange={handleWorkplaceInputChange}
                        placeholder="e.g., Dec 2022"
                        disabled={newWorkplace.current}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white disabled:bg-gray-100 disabled:dark:bg-dark-secondary disabled:cursor-not-allowed"
                      />
                      <div className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id="current"
                          name="current"
                          checked={newWorkplace.current}
                          onChange={handleWorkplaceCheckboxChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="current" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          I currently work here
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={newWorkplace.description}
                        onChange={handleWorkplaceInputChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                        placeholder="Brief description of your role..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        addWorkplace();
                        if (newWorkplace.company && newWorkplace.position && newWorkplace.startDate) {
                          document.getElementById('workplaceForm')?.classList.add('hidden');
                        }
                      }}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Workplace
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Education Section */}
              <div className="border-t border-gray-200 dark:border-dark-border pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Education</h3>
                
                {/* Existing Education Entries */}
                {formData.education.length > 0 && (
                  <div className="mb-4 space-y-4">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-dark-border rounded-md bg-gray-50 dark:bg-dark-bg relative">
                        <button 
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Degree</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Field of Study</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{edu.field}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                            </p>
                          </div>
                          {edu.description && (
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{edu.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add New Education Button */}
                {formData.education.length === 0 ? (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById('educationForm')?.classList.remove('hidden')}
                      className="flex items-center justify-center w-full md:w-auto px-6 py-4 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors group"
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        <span className="font-medium">Add a education</span>
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => document.getElementById('educationForm')?.classList.remove('hidden')}
                      className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add another education
                    </button>
                  </div>
                )}
                
                {/* Add New Education Form */}
                <div id="educationForm" className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md border border-gray-200 dark:border-dark-border mt-4 hidden">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Add Education</h4>
                    <button 
                      type="button"
                      onClick={() => document.getElementById('educationForm')?.classList.add('hidden')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Institution *
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={newEducation.institution}
                        onChange={handleEducationInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Degree *
                      </label>
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={newEducation.degree}
                        onChange={handleEducationInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="field" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        id="field"
                        name="field"
                        value={newEducation.field}
                        onChange={handleEducationInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="eduStartDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="text"
                        id="eduStartDate"
                        name="startDate"
                        value={newEducation.startDate}
                        onChange={handleEducationInputChange}
                        placeholder="e.g., Sep 2018"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="eduEndDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        id="eduEndDate"
                        name="endDate"
                        value={newEducation.endDate}
                        onChange={handleEducationInputChange}
                        placeholder="e.g., Jun 2022"
                        disabled={newEducation.current}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white disabled:bg-gray-100 disabled:dark:bg-dark-secondary disabled:cursor-not-allowed"
                      />
                      <div className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id="eduCurrent"
                          name="current"
                          checked={newEducation.current}
                          onChange={handleEducationCheckboxChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="eduCurrent" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          I'm currently studying here
                        </label>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="eduDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id="eduDescription"
                        name="description"
                        value={newEducation.description}
                        onChange={handleEducationInputChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-white"
                        placeholder="Additional information about your education..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        addEducation();
                        if (newEducation.institution && newEducation.degree && newEducation.startDate) {
                          document.getElementById('educationForm')?.classList.add('hidden');
                        }
                      }}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Education
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
