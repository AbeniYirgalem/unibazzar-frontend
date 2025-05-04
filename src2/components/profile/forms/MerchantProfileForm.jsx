import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Building, Phone, FileText, Save } from 'lucide-react';
import { useSelector } from 'react-redux';
import useProfiles from '../../../hooks/useProfiles';
import Layout from '../../common/Layout';
import Spinner from '../../common/Spinner';
import Alert from '../../common/Alert';

const MerchantProfileForm = ({ mode = 'create' }) => {
  const { userData } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    store_name: '',
    nearest_university: '',
    phone_number: '',
    tin_number: '',
    business_docs: null,
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
  } = useProfiles('merchant');
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
        store_name: currentProfile.store_name || '',
        nearest_university: currentProfile.nearest_university || '',
        phone_number: currentProfile.phone_number || '',
        tin_number: currentProfile.tin_number || '',
        business_docs: null, // Don't populate file input
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
    const { name, value, files } = e.target;
    
    if (name === 'business_docs' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    clearError();
    
    // Create FormData object to handle file upload
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        submitData.append(key, value);
      }
    });
    
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
              {mode === 'create' ? 'Complete Your Merchant Profile' : 'Edit Your Merchant Profile'}
            </h1>
            <p className="mt-1 text-primary-100">
              {mode === 'create' 
                ? 'Please provide your business information to complete your profile.' 
                : 'Update your business information below.'}
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
              <label htmlFor="store_name" className="label">
                Store Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Store size={18} className="text-neutral-500" />
                </div>
                <input
                  id="store_name"
                  name="store_name"
                  type="text"
                  className="input pl-10"
                  placeholder="Enter your store name"
                  value={formData.store_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="nearest_university" className="label">
                Nearest University
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building size={18} className="text-neutral-500" />
                </div>
                <select
                  id="nearest_university"
                  name="nearest_university"
                  className="input pl-10"
                  value={formData.nearest_university}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select nearest university</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.name}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone_number" className="label">
                Business Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone size={18} className="text-neutral-500" />
                </div>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  className="input pl-10"
                  placeholder="Enter business phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="tin_number" className="label">
                TIN Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FileText size={18} className="text-neutral-500" />
                </div>
                <input
                  id="tin_number"
                  name="tin_number"
                  type="text"
                  className="input pl-10"
                  placeholder="Enter your TIN number"
                  value={formData.tin_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="business_docs" className="label">
                Business Documents
              </label>
              <div className="relative">
                <input
                  id="business_docs"
                  name="business_docs"
                  type="file"
                  className="input"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  required={mode === 'create'}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Please upload documents proving your business registration. Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG.
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

export default MerchantProfileForm;