import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  deleteAvatar,
  updateEmail,
  updatePassword,
  updatePhone,
  clearUserError,
  clearSuccessMessage
} from '../store/userSlice';

/**
 * Custom hook for user-related operations
 * @returns {Object} User methods and state
 */
const useUser = () => {
  const dispatch = useDispatch();
  const { userData, isLoading, error, successMessage } = useSelector(state => state.user);

  const getProfile = useCallback(() => {
    return dispatch(getUserProfile());
  }, [dispatch]);

  const updateProfile = useCallback((data) => {
    return dispatch(updateUserProfile(data));
  }, [dispatch]);

  const uploadUserAvatar = useCallback((formData) => {
    return dispatch(uploadAvatar(formData));
  }, [dispatch]);

  const deleteUserAvatar = useCallback(() => {
    return dispatch(deleteAvatar());
  }, [dispatch]);

  const updateUserEmail = useCallback((data) => {
    return dispatch(updateEmail(data));
  }, [dispatch]);

  const changePassword = useCallback((data) => {
    return dispatch(updatePassword(data));
  }, [dispatch]);

  const updateUserPhone = useCallback((data) => {
    return dispatch(updatePhone(data));
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  return {
    userData,
    isLoading,
    error,
    successMessage,
    getProfile,
    updateProfile,
    uploadUserAvatar,
    deleteUserAvatar,
    updateUserEmail,
    changePassword,
    updateUserPhone,
    clearError,
    clearSuccess
  };
};

export default useUser;