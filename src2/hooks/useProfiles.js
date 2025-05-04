import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  // Universities
  fetchUniversities,
  
  // Student profiles
  fetchStudentProfiles,
  fetchStudentProfile,
  createStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
  
  // Merchant profiles
  fetchMerchantProfiles,
  fetchMerchantProfile,
  createMerchantProfile,
  updateMerchantProfile,
  deleteMerchantProfile,
  
  // Tutor profiles
  fetchTutorProfiles,
  fetchTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
  
  // Campus admin profiles
  fetchCampusAdminProfiles,
  fetchCampusAdminProfile,
  createCampusAdminProfile,
  updateCampusAdminProfile,
  deleteCampusAdminProfile,
  
  // Other actions
  clearProfilesError,
  clearProfilesSuccessMessage,
  setCurrentProfile,
} from '../store/profilesSlice';

/**
 * Custom hook for profile-related operations
 * @param {string} role - User role to determine which profile functions to return
 * @returns {Object} Profile methods and state
 */
const useProfiles = (role = null) => {
  const dispatch = useDispatch();
  const { 
    universities, 
    studentProfiles, 
    merchantProfiles, 
    tutorProfiles, 
    campusAdminProfiles,
    currentProfile,
    isLoading, 
    error, 
    successMessage 
  } = useSelector(state => state.profiles);

  // Common actions
  const getUniversities = useCallback(() => {
    return dispatch(fetchUniversities());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearProfilesError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearProfilesSuccessMessage());
  }, [dispatch]);

  const setCurrent = useCallback((profile) => {
    dispatch(setCurrentProfile(profile));
  }, [dispatch]);

  // Role-specific actions
  const getProfiles = useCallback(() => {
    switch (role) {
      case 'student':
        return dispatch(fetchStudentProfiles());
      case 'merchant':
        return dispatch(fetchMerchantProfiles());
      case 'tutor':
        return dispatch(fetchTutorProfiles());
      case 'campus_admin':
        return dispatch(fetchCampusAdminProfiles());
      default:
        return Promise.resolve();
    }
  }, [dispatch, role]);

  const getProfile = useCallback((id) => {
    switch (role) {
      case 'student':
        return dispatch(fetchStudentProfile(id));
      case 'merchant':
        return dispatch(fetchMerchantProfile(id));
      case 'tutor':
        return dispatch(fetchTutorProfile(id));
      case 'campus_admin':
        return dispatch(fetchCampusAdminProfile(id));
      default:
        return Promise.resolve();
    }
  }, [dispatch, role]);

  const createProfile = useCallback((data) => {
    switch (role) {
      case 'student':
        return dispatch(createStudentProfile(data));
      case 'merchant':
        return dispatch(createMerchantProfile(data));
      case 'tutor':
        return dispatch(createTutorProfile(data));
      case 'campus_admin':
        return dispatch(createCampusAdminProfile(data));
      default:
        return Promise.resolve();
    }
  }, [dispatch, role]);

  const updateProfile = useCallback((id, data) => {
    switch (role) {
      case 'student':
        return dispatch(updateStudentProfile({ id, data }));
      case 'merchant':
        return dispatch(updateMerchantProfile({ id, data }));
      case 'tutor':
        return dispatch(updateTutorProfile({ id, data }));
      case 'campus_admin':
        return dispatch(updateCampusAdminProfile({ id, data }));
      default:
        return Promise.resolve();
    }
  }, [dispatch, role]);

  const deleteProfile = useCallback((id) => {
    switch (role) {
      case 'student':
        return dispatch(deleteStudentProfile(id));
      case 'merchant':
        return dispatch(deleteMerchantProfile(id));
      case 'tutor':
        return dispatch(deleteTutorProfile(id));
      case 'campus_admin':
        return dispatch(deleteCampusAdminProfile(id));
      default:
        return Promise.resolve();
    }
  }, [dispatch, role]);

  // Return specific actions based on the role
  return {
    // Common properties
    universities,
    currentProfile,
    isLoading,
    error,
    successMessage,
    
    // Role-specific profile lists
    profiles: role === 'student' ? studentProfiles :
              role === 'merchant' ? merchantProfiles :
              role === 'tutor' ? tutorProfiles :
              role === 'campus_admin' ? campusAdminProfiles :
              [],
              
    // Common actions
    getUniversities,
    clearError,
    clearSuccess,
    setCurrent,
    
    // Role-specific actions
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    
    // All profile lists for admin use
    studentProfiles,
    merchantProfiles,
    tutorProfiles,
    campusAdminProfiles,
  };
};

export default useProfiles;