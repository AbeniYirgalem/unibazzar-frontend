import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetStep, setResetStep] = useState(uid && token ? 'confirm' : 'request');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const { 
    resetPassword, 
    confirmReset, 
    validateToken,
    isLoading, 
    error, 
    passwordResetRequested,
    passwordResetConfirmed,
    tokenValidationStatus,
    clearAuthError 
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If we have uid and token in URL, validate them
    if (uid && token && resetStep === 'confirm') {
      validateToken({ uid, token });
    }
  }, [uid, token, validateToken, resetStep]);

  useEffect(() => {
    // Handle token validation result
    if (tokenValidationStatus === 'invalid') {
      setErrorMessage('Invalid or expired password reset link. Please request a new one.');
      setResetStep('request');
    }
  }, [tokenValidationStatus]);

  useEffect(() => {
    // Handle password reset request success
    if (passwordResetRequested) {
      setSuccessMessage('Password reset email sent! Check your inbox for further instructions.');
    }
  }, [passwordResetRequested]);

  useEffect(() => {
    // Handle password reset confirmation success
    if (passwordResetConfirmed) {
      setSuccessMessage('Your password has been reset successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [passwordResetConfirmed, navigate]);

  useEffect(() => {
    // Handle errors
    if (error) {
      if (error.detail) {
        setErrorMessage(error.detail);
      } else if (typeof error === 'object') {
        // Format field errors
        const fieldErrors = Object.entries(error)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        setErrorMessage(fieldErrors);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  }, [error]);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!email) {
      setErrorMessage('Email is required');
      return;
    }
    
    try {
      await resetPassword(email);
    } catch (err) {
      // Error is already handled in the useEffect above
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    try {
      await confirmReset({
        uid,
        token,
        password
      });
    } catch (err) {
      // Error is already handled in the useEffect above
    }
  };

  const handleCloseError = () => {
    setErrorMessage(null);
    clearAuthError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-8 pb-6 text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Reset Password</h1>
            <p className="mt-2 text-neutral-600">
              {resetStep === 'request' 
                ? 'Enter your email to reset your password' 
                : 'Enter your new password'}
            </p>
          </div>
          
          {errorMessage && (
            <div className="px-6 pb-4">
              <Alert 
                type="error" 
                message={errorMessage}
                onClose={handleCloseError}
              />
            </div>
          )}

          {successMessage && (
            <div className="px-6 pb-4">
              <Alert 
                type="success" 
                message={successMessage}
                autoClose={true}
              />
            </div>
          )}
          
          {resetStep === 'request' ? (
            <form className="px-6 pt-2 pb-8 space-y-6" onSubmit={handleRequestReset}>
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-neutral-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input pl-10"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full btn-primary py-3 flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" /> : 'Send Reset Instructions'}
                </button>
              </div>
              
              <div className="text-center">
                <Link to="/login" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  <ArrowLeft size={16} className="mr-1" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <form className="px-6 pt-2 pb-8 space-y-6" onSubmit={handleConfirmReset}>
              <div>
                <label htmlFor="password" className="label">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-neutral-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="input pl-10 pr-10"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="text-neutral-500 hover:text-neutral-700 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-neutral-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="input pl-10"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full btn-primary py-3 flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" /> : 'Reset Password'}
                </button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setResetStep('request')}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to reset request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;