import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Users, Save } from 'lucide-react';
import { useSelector } from 'react-redux';
import useProfiles from '../../../hooks/useProfiles';
import Layout from '../../common/Layout';
import Spinner from '../../common/Spinner';
import Alert from '../../common/Alert';

const CampusAdminProfileForm = ({ mode = 'create' }) => {
  const { userData } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    university: '',
    admin_role: '',
  });
  const [error, setError] = useState(null);
  
  const { 
    universities,
    currentProfile,
    createProfile,
    updateProfile,
    getUniversities,
    getProfile,
    isLoading,
    error: profileError,
    clearError
  } = useProfiles('campus_admin');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch universities list
    getUniversities();
    
    // If in edit mode, fetch current profile
    if (mode === 'edit' && userData?.profile_id) {
      getProfile(userData.profile_id);
    }
  }, [mode, userData, getUniversities, getProfile]);

  useEffect(() => {
    // Populate form with existing data in edit mode
    if (mode === 'edit' && currentProfile) {
      setFormData({
        university: currentProfile.university || '',
        admin_role: currentProfile.admin_role || '',
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    clearError();
    
    try {
      if (mode === 'create') {
        await createProfile(formData);
        navigate('/profile');
      } else if (mode === 'edit' && userData?.profile_id) {
        await updateProfile(userData.profile_id, formData);
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
              {mode === 'create' ? 'Complete Your Campus Admin Profile' : 'Edit Your Campus Admin Profile'}
            </h1>
            <p className="mt-1 text-primary-100">
              {mode === 'create' 
                ? 'Please provide your university administration information to complete your profile.' 
                : 'Update your university administration information below.'}
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
              <label htmlFor="university" className="label">
                University
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building size={18} className="text-neutral-500" />
                </div>
                <select
                  id="university"
                  name="university"
                  className="input pl-10"
                  value={formData.university}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your university</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.name}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="admin_role" className="label">
                Administrative Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Users size={18} className="text-neutral-500" />
                </div>
                <select
                  id="admin_role"
                  name="admin_role"
                  className="input pl-10"
                  value={formData.admin_role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Department Head">Department Head</option>
                  <option value="Dean">Dean</option>
                  <option value="Registrar">Registrar</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Administrative Staff">Administrative Staff</option>
                  <option value="IT Administrator">IT Administrator</option>
                  <option value="Other">Other</option>
                </select>
              </div>
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

export default CampusAdminProfileForm;