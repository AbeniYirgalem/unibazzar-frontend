import { FaBookOpen, FaUserGraduate, FaStore, FaHandshake } from "react-icons/fa";

function About() {
  return (
    <div className="pl-10 pt-20 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">About UniBazzar</h1>
        <p className="mb-6 text-lg text-gray-800 dark:text-gray-300">
          UniBazzar is a digital platform built to empower Ethiopian university students by streamlining
          campus commerce and community connection. Whether you're buying a second-hand textbook,
          offering tutoring services, listing your café menu, or connecting with other students — UniBazzar brings
          everything to one place.
        </p>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex items-start space-x-4">
            <FaBookOpen className="text-blue-500 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-1">Academic Marketplace</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Buy and sell books, notes, and learning materials within your campus network.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaUserGraduate className="text-blue-500 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-1">Tutoring & Services</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Find or offer tutoring services in subjects you excel at. Support peer learning.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaStore className="text-blue-500 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-1">Local Commerce</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cafés and student-run shops can list their menus and items for on-campus discovery.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaHandshake className="text-blue-500 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-1">Campus Connections</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Stay updated on campus activities, make friends, and build lasting collaborations.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-700 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">Join the UniBazzar Community</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Ready to elevate your campus experience? Sign up, explore, and connect today.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
