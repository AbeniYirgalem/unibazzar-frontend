import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  login as loginAction, 
  logout as logoutAction, 
  register as registerAction,
  requestPasswordReset,
  confirmPasswordReset,
  validateResetToken,
  refreshToken,
  verifyToken,
  clearError
} from '../store/authSlice';

/**
 * Custom hook for authentication related operations
 * @returns {Object} Authentication methods and state
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const { 
    isAuthenticated, 
    isLoading, 
    error, 
    accessToken, 
    refreshToken: refreshTokenValue,
    passwordResetRequested,
    passwordResetConfirmed,
    tokenValidationStatus
  } = useSelector(state => state.auth);

  const login = useCallback((credentials) => {
    return dispatch(loginAction(credentials));
  }, [dispatch]);

  const logout = useCallback(() => {
    return dispatch(logoutAction());
  }, [dispatch]);

  const register = useCallback((userData) => {
    return dispatch(registerAction(userData));
  }, [dispatch]);

  const resetPassword = useCallback((email) => {
    return dispatch(requestPasswordReset(email));
  }, [dispatch]);

  const confirmReset = useCallback((data) => {
    return dispatch(confirmPasswordReset(data));
  }, [dispatch]);

  const validateToken = useCallback((data) => {
    return dispatch(validateResetToken(data));
  }, [dispatch]);

  const refresh = useCallback(() => {
    return dispatch(refreshToken());
  }, [dispatch]);

  const verify = useCallback(() => {
    return dispatch(verifyToken());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    isAuthenticated,
    isLoading,
    error,
    accessToken,
    refreshToken: refreshTokenValue,
    passwordResetRequested,
    passwordResetConfirmed,
    tokenValidationStatus,
    login,
    logout,
    register,
    resetPassword,
    confirmReset,
    validateToken,
    refresh,
    verify,
    clearAuthError
  };
};

export default useAuth;