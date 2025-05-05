import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Common Layout component for profile forms
 */
const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden text-gray-800 dark:text-white">
          {children}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
