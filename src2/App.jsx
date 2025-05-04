import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

// Auth components
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import PasswordResetPage from './components/auth/PasswordResetPage';

// Profile components
import ProfilePage from './components/profile/ProfilePage';
import StudentProfileForm from './components/profile/forms/StudentProfileForm';
import MerchantProfileForm from './components/profile/forms/MerchantProfileForm';
import TutorProfileForm from './components/profile/forms/TutorProfileForm';
import CampusAdminProfileForm from './components/profile/forms/CampusAdminProfileForm';

// Common components
import UniversitiesList from './components/common/UniversitiesList';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Profile form selector based on role
const ProfileFormRouter = ({ mode }) => {
  const userRole = store.getState().user?.userData?.role;
  
  switch (userRole) {
    case 'student':
      return <StudentProfileForm mode={mode} />;
    case 'merchant':
      return <MerchantProfileForm mode={mode} />;
    case 'tutor':
      return <TutorProfileForm mode={mode} />;
    case 'campus_admin':
      return <CampusAdminProfileForm mode={mode} />;
    default:
      return <Navigate to="/profile" replace />;
  }
};

function App() {
  // Keep tokens fresh
  useEffect(() => {
    const verifyToken = async () => {
      const { auth } = store.getState();
      if (auth.isAuthenticated) {
        try {
          await store.dispatch({
            type: 'auth/verifyToken',
          });
        } catch (error) {
          // If token verification fails, refresh token
          try {
            await store.dispatch({
              type: 'auth/refreshToken',
            });
          } catch (refreshError) {
            // If refresh fails, we'll be logged out automatically by the API interceptor
          }
        }
      }
    };

    verifyToken();
    
    const tokenRefreshInterval = setInterval(verifyToken, 15 * 60 * 1000); // 15 minutes
    
    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<PasswordResetPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/create-profile" 
              element={
                <ProtectedRoute>
                  <ProfileFormRouter mode="create" />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/edit-profile" 
              element={
                <ProtectedRoute>
                  <ProfileFormRouter mode="edit" />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/universities" 
              element={
                <ProtectedRoute>
                  <UniversitiesList />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect root to appropriate place */}
            <Route 
              path="/" 
              element={
                store.getState().auth.isAuthenticated ? 
                <Navigate to="/profile" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;