import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, Bell, Settings } from 'lucide-react';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { userData } = useSelector(state => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-primary-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div 
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate('/')}
              >
                UniBazzar
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button 
                  className="p-2 rounded-full hover:bg-primary-800 transition-colors"
                  onClick={() => navigate('/profile')}
                >
                  <User size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-primary-800 transition-colors">
                  <Bell size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-primary-800 transition-colors">
                  <Settings size={20} />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-primary-800 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-primary-800 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex items-center p-2 hover:bg-neutral-100 rounded-md">
              <User size={20} className="mr-3 text-primary-600" />
              <button 
                className="block w-full text-left"
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
              >
                Profile
              </button>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 rounded-md">
              <Bell size={20} className="mr-3 text-primary-600" />
              <button className="block w-full text-left">Notifications</button>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 rounded-md">
              <Settings size={20} className="mr-3 text-primary-600" />
              <button className="block w-full text-left">Settings</button>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 rounded-md">
              <LogOut size={20} className="mr-3 text-primary-600" />
              <button 
                className="block w-full text-left"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-neutral-600">© 2025 UniBazzar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;