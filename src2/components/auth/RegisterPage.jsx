import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const { register, isAuthenticated, isLoading, error, clearAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Handle registration errors
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
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      
      const result = await register(registrationData);
      
      if (!result.error) {
        setSuccessMessage('Registration successful! You can now log in.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      // Error is already handled in the useEffect above
    }
  };

  const handleCloseError = () => {
    setErrorMessage(null);
    clearAuthError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700 px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-8 pb-6 text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Join UniBazzar</h1>
            <p className="mt-2 text-neutral-600">Create your account</p>
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
          
          <form className="px-6 pt-2 pb-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full_name" className="label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User size={18} className="text-neutral-500" />
                </div>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="input pl-10"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="label">
                Password
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
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
                Confirm Password
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
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="role" className="label">
                I am a
              </label>
              <select
                id="role"
                name="role"
                className="input"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="merchant">Merchant</option>
                <option value="tutor">Tutor</option>
                <option value="campus_admin">Campus Admin</option>
              </select>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full btn-primary py-3 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : 'Create Account'}
              </button>
            </div>
            
            <div className="text-center">
              <Link to="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;