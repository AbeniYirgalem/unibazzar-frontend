import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Spinner from '../common/Spinner';
import Alert from '../common/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const { login, isAuthenticated, isLoading, error, clearAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Handle login errors
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
        setErrorMessage('Authentication failed. Please try again.');
      }
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }
    
    try {
      await login({ email, password });
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
            <h1 className="text-3xl font-bold text-neutral-900">Welcome to UniBazzar</h1>
            <p className="mt-2 text-neutral-600">Sign in to your account</p>
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
          
          <form className="px-6 pt-2 pb-8 space-y-6" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
                  required
                  className="input pl-10 pr-10"
                  placeholder="Enter your password"
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>
              
              <Link to="/reset-password" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full btn-primary py-3 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </button>
            </div>
            
            <div className="text-center">
              <Link to="/register" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;