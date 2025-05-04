import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, List, FileText, Plus, X, Save } from 'lucide-react';
import { useSelector } from 'react-redux';
import useProfiles from '../../../hooks/useProfiles';
import Layout from '../../common/Layout';
import Spinner from '../../common/Spinner';
import Alert from '../../common/Alert';

const TutorProfileForm = ({ mode = 'create' }) => {
  const { userData } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    teaching_levels: [],
    subjects_scores: {},
    edu_docs: null,
  });
  const [subjectInput, setSubjectInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [error, setError] = useState(null);
  
  const { 
    currentProfile,
    createProfile,
    updateProfile,
    getProfile,
    isLoading,
    error: profileError,
    clearError
  } = useProfiles('tutor');
  const navigate = useNavigate();

  useEffect(() => {
    // If in edit mode, fetch current profile
    if (mode === 'edit' && userData?.profile_id) {
      getProfile(userData.profile_id);
    }
  }, [mode, userData, getProfile]);

  useEffect(() => {
    // Populate form with existing data in edit mode
    if (mode === 'edit' && currentProfile) {
      setFormData({
        department: currentProfile.department || '',
        year: currentProfile.year || '',
        teaching_levels: currentProfile.teaching_levels || [],
        subjects_scores: currentProfile.subjects_scores || {},
        edu_docs: null, // Don't populate file input
      });
    }
  }, [mode, currentProfile]);

  useEffect(() => {
    // Handle API errors
    if (profileError) {
      if (profileError.detail) {
        setError(profileError.detail);
      } else if (typeof profileError === 'object') {
        // Format field errors
        const fieldErrors = Object.entries(profileError)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        setError(fieldErrors);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  }, [profileError]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    
    if (name === 'edu_docs' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      // Handle teaching levels checkboxes
      const levelsCopy = [...formData.teaching_levels];
      if (checked) {
        levelsCopy.push(value);
      } else {
        const index = levelsCopy.indexOf(value);
        if (index !== -1) {
          levelsCopy.splice(index, 1);
        }
      }
      setFormData({ ...formData, teaching_levels: levelsCopy });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSubject = () => {
    if (subjectInput && scoreInput) {
      setFormData({
        ...formData,
        subjects_scores: {
          ...formData.subjects_scores,
          [subjectInput]: scoreInput
        }
      });
      
      // Clear inputs
      setSubjectInput('');
      setScoreInput('');
    }
  };

  const handleRemoveSubject = (subject) => {
    const { [subject]: removed, ...rest } = formData.subjects_scores;
    setFormData({
      ...formData,
      subjects_scores: rest
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    clearError();
    
    // Create FormData object to handle file upload
    const submitData = new FormData();
    
    // Append simple fields
    submitData.append('department', formData.department);
    submitData.append('year', formData.year);
    
    // Append arrays and objects as JSON strings
    submitData.append('teaching_levels', JSON.stringify(formData.teaching_levels));
    submitData.append('subjects_scores', JSON.stringify(formData.subjects_scores));
    
    // Append file if present
    if (formData.edu_docs) {
      submitData.append('edu_docs', formData.edu_docs);
    }
    
    try {
      if (mode === 'create') {
        await createProfile(submitData);
        navigate('/profile');
      } else if (mode === 'edit' && userData?.profile_id) {
        await updateProfile(userData.profile_id, submitData);
        navigate('/profile');
      }
    } catch (err) {
      // Error is handled via the useEffect above
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-600 p-6 text-white">
            <h1 className="text-2xl font-bold">
              {mode === 'create' ? 'Complete Your Tutor Profile' : 'Edit Your Tutor Profile'}
            </h1>
            <p className="mt-1 text-primary-100">
              {mode === 'create' 
                ? 'Please provide your teaching information to complete your profile.' 
                : 'Update your teaching information below.'}
            </p>
          </div>
          
          {error && (
            <div className="px-6 pt-6">
              <Alert 
                type="error" 
                message={error}
                onClose={() => {
                  setError(null);
                  clearError();
                }}
              />
            </div>
          )}
          
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="department" className="label">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Book size={18} className="text-neutral-500" />
                </div>
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="input pl-10"
                  placeholder="e.g. Computer Science, Mathematics"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="year" className="label">
                Year
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar size={18} className="text-neutral-500" />
                </div>
                <select
                  id="year"
                  name="year"
                  className="input pl-10"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="label flex items-center">
                <List size={18} className="mr-2 text-neutral-500" />
                Teaching Levels
              </label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex items-center">
                  <input
                    id="level_elementary"
                    name="teaching_levels"
                    type="checkbox"
                    value="Elementary"
                    checked={formData.teaching_levels.includes('Elementary')}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="level_elementary" className="ml-2 block text-sm text-neutral-700">
                    Elementary
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="level_middle_school"
                    name="teaching_levels"
                    type="checkbox"
                    value="Middle School"
                    checked={formData.teaching_levels.includes('Middle School')}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="level_middle_school" className="ml-2 block text-sm text-neutral-700">
                    Middle School
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="level_high_school"
                    name="teaching_levels"
                    type="checkbox"
                    value="High School"
                    checked={formData.teaching_levels.includes('High School')}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="level_high_school" className="ml-2 block text-sm text-neutral-700">
                    High School
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="level_college"
                    name="teaching_levels"
                    type="checkbox"
                    value="College"
                    checked={formData.teaching_levels.includes('College')}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="level_college" className="ml-2 block text-sm text-neutral-700">
                    College
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="label">
                Subjects and Scores
              </label>
              <div className="flex space-x-2 mb-3">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Subject name"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="input"
                  />
                </div>
                <div className="w-20">
                  <input
                    type="text"
                    placeholder="Score"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    className="input"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="btn-primary flex items-center justify-center p-2 w-10"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                {Object.entries(formData.subjects_scores).map(([subject, score]) => (
                  <div key={subject} className="flex justify-between items-center bg-neutral-100 p-3 rounded-md">
                    <div className="flex-grow">
                      <span className="font-medium">{subject}</span>
                      <span className="ml-2 text-sm">({score})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(subject)}
                      className="text-error-600 hover:text-error-800 p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                
                {Object.keys(formData.subjects_scores).length === 0 && (
                  <p className="text-sm text-neutral-500 italic">
                    No subjects added yet. Add at least one subject with its score.
                  </p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="edu_docs" className="label">
                Educational Documents
              </label>
              <div className="relative">
                <input
                  id="edu_docs"
                  name="edu_docs"
                  type="file"
                  className="input"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  required={mode === 'create'}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Please upload documents proving your educational background. Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG.
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    {mode === 'create' ? 'Create Profile' : 'Save Changes'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TutorProfileForm;