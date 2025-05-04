import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Camera, Trash2, Mail, Phone, School, Store, Book, Building } from 'lucide-react';
import { useSelector } from 'react-redux';
import useUser from '../../hooks/useUser';
import useProfiles from '../../hooks/useProfiles';
import Layout from '../common/Layout';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';

const ProfileSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-neutral-800 mb-4">{title}</h2>
    <div className="bg-white rounded-lg shadow-md p-6">
      {children}
    </div>
  </div>
);

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-start mb-4 last:mb-0">
    <div className="p-2 rounded-full bg-primary-50 mr-3">
      {icon}
    </div>
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-neutral-800 font-medium">{value || 'Not provided'}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { userData } = useSelector(state => state.user);
  const [profileData, setProfileData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const { getProfile, uploadUserAvatar, deleteUserAvatar, isLoading: userLoading } = useUser();
  const { getProfile: getProfileData, isLoading: profileLoading } = useProfiles(userData?.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await getProfile();
      } catch (err) {
        setError('Failed to load user data');
      }
    };
    
    fetchUserData();
  }, [getProfile]);

  useEffect(() => {
    if (userData?.role) {
      const fetchProfileData = async () => {
        try {
          // Assume user has a profile ID stored in their data
          if (userData.profile_id) {
            const result = await getProfileData(userData.profile_id);
            setProfileData(result.payload);
          } else if (userData.role !== 'admin') {
            // If no profile exists, redirect to profile creation
            navigate(`/create-profile/${userData.role}`);
          }
        } catch (err) {
          setError('Failed to load profile data');
        }
      };
      
      fetchProfileData();
    }
  }, [userData, getProfileData, navigate]);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      handleAvatarUpload(e.target.files[0]);
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      await uploadUserAvatar(formData);
      setSuccess('Profile picture updated successfully');
    } catch (err) {
      setError('Failed to upload profile picture');
    }
  };

  const handleAvatarDelete = async () => {
    try {
      await deleteUserAvatar();
      setSuccess('Profile picture removed successfully');
    } catch (err) {
      setError('Failed to remove profile picture');
    }
  };

  const handleEditProfile = () => {
    if (userData?.role) {
      navigate(`/edit-profile/${userData.role}`);
    }
  };

  if (userLoading || profileLoading) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!userData) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-neutral-700">Could not load user data. Please try again later.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => setError(null)} 
          className="mb-6"
        />
      )}
      
      {success && (
        <Alert 
          type="success" 
          message={success} 
          onClose={() => setSuccess(null)} 
          className="mb-6"
          autoClose={true}
        />
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <ProfileSection title="Profile">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-neutral-200 overflow-hidden">
                  {userData.profile_picture ? (
                    <img 
                      src={userData.profile_picture} 
                      alt={userData.full_name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <User size={64} />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 flex gap-2">
                  <label className="p-2 rounded-full bg-primary-600 text-white cursor-pointer hover:bg-primary-700 transition-colors">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  {userData.profile_picture && (
                    <button 
                      className="p-2 rounded-full bg-error-600 text-white hover:bg-error-700 transition-colors"
                      onClick={handleAvatarDelete}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold">{userData.full_name}</h3>
              <p className="text-neutral-500 capitalize mb-4">{userData.role?.replace('_', ' ')}</p>
              <button 
                className="btn-primary inline-flex items-center"
                onClick={handleEditProfile}
              >
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </button>
            </div>
          </ProfileSection>
          
          <ProfileSection title="Account Information">
            <ProfileField 
              icon={<Mail size={20} className="text-primary-600" />}
              label="Email Address"
              value={userData.email}
            />
            <div className="flex items-center mb-4">
              <div className="ml-12 text-xs">
                {userData.is_email_verified ? (
                  <span className="text-green-600">Verified</span>
                ) : (
                  <span className="text-amber-600">Not verified</span>
                )}
              </div>
            </div>
            <ProfileField 
              icon={<Phone size={20} className="text-primary-600" />}
              label="Phone Number"
              value={userData.phone_number}
            />
            <p className="text-xs text-neutral-500 mt-4">
              Member since {new Date(userData.date_joined).toLocaleDateString()}
            </p>
          </ProfileSection>
        </div>
        
        <div className="lg:w-2/3">
          {userData.role === 'student' && profileData && (
            <ProfileSection title="Student Information">
              <ProfileField 
                icon={<School size={20} className="text-primary-600" />}
                label="University"
                value={profileData.university_name}
              />
              {/* Add more student-specific fields */}
            </ProfileSection>
          )}
          
          {userData.role === 'merchant' && profileData && (
            <ProfileSection title="Merchant Information">
              <ProfileField 
                icon={<Store size={20} className="text-primary-600" />}
                label="Store Name"
                value={profileData.store_name}
              />
              <ProfileField 
                icon={<Building size={20} className="text-primary-600" />}
                label="Nearest University"
                value={profileData.nearest_university}
              />
              <ProfileField 
                icon={<Phone size={20} className="text-primary-600" />}
                label="Business Phone"
                value={profileData.phone_number}
              />
              <ProfileField 
                icon={<File size={20} className="text-primary-600" />}
                label="TIN Number"
                value={profileData.tin_number}
              />
              {/* Add more merchant-specific fields */}
            </ProfileSection>
          )}
          
          {userData.role === 'tutor' && profileData && (
            <ProfileSection title="Tutor Information">
              <ProfileField 
                icon={<Book size={20} className="text-primary-600" />}
                label="Department"
                value={profileData.department}
              />
              <ProfileField 
                icon={<Calendar size={20} className="text-primary-600" />}
                label="Year"
                value={profileData.year}
              />
              <ProfileField 
                icon={<List size={20} className="text-primary-600" />}
                label="Teaching Levels"
                value={profileData.teaching_levels?.join(', ')}
              />
              {/* Add more tutor-specific fields */}
            </ProfileSection>
          )}
          
          {userData.role === 'campus_admin' && profileData && (
            <ProfileSection title="Campus Admin Information">
              <ProfileField 
                icon={<Building size={20} className="text-primary-600" />}
                label="University"
                value={profileData.university}
              />
              <ProfileField 
                icon={<Users size={20} className="text-primary-600" />}
                label="Admin Role"
                value={profileData.admin_role}
              />
              {/* Add more campus admin-specific fields */}
            </ProfileSection>
          )}
          
          {!profileData && userData.role !== 'admin' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center py-8">
                <UserPlus size={64} className="mx-auto text-neutral-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
                <p className="text-neutral-600 mb-6">
                  Please complete your profile information to get the most out of UniBazzar.
                </p>
                <button 
                  className="btn-primary"
                  onClick={() => navigate(`/create-profile/${userData.role}`)}
                >
                  Complete Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;