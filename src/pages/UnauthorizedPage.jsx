import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaHome, FaSignInAlt } from "react-icons/fa";

function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white text-center">
        <div className="mb-6">
          <div className="bg-red-500/20 dark:bg-red-900/40 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
            <FaLock className="text-red-500 text-4xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 font-poppins text-gray-800 dark:text-white">
          Access Denied
        </h1>

        <p className="mb-6 text-gray-600 dark:text-gray-300 font-inter">
          You don't have permission to access this page. Please log in with the
          appropriate account or go back to the home page.
        </p>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center justify-center text-white font-poppins"
          >
            <FaHome className="mr-2" /> Home Page
          </Link>

          <Link
            to="/login"
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-md flex items-center justify-center transition-colors duration-200 text-gray-700 dark:text-gray-200 font-poppins"
          >
            <FaSignInAlt className="mr-2" /> Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
