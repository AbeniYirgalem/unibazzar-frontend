import { FaBookOpen, FaUserGraduate, FaStore, FaHandshake, FaBullseye, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/signup");
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 pt-20 pb-10 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl px-6 sm:px-10 py-10">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center sm:text-left">
          About UniBazzar
        </h1>
        <p className="mb-6 text-base sm:text-lg text-gray-800 dark:text-gray-300">
          UniBazzar is a digital platform built to empower Ethiopian university students by streamlining
          campus commerce and community connection. Whether you're buying a second-hand textbook,
          offering tutoring services, listing your café menu, or connecting with other students —
          UniBazzar brings everything to one place.
        </p>

        {/* Mission */}
        <div className="flex items-start gap-4 mb-8">
          <FaBullseye className="text-blue-500 text-2xl sm:text-3xl mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-1">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              To create a connected and self-sustaining university ecosystem where students can thrive academically,
              socially, and economically through peer-to-peer commerce and collaboration.
            </p>
          </div>
        </div>

        {/* Who It's For */}
        <div className="flex items-start gap-4 mb-10">
          <FaUsers className="text-blue-500 text-2xl sm:text-3xl mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-1">
              Who It’s For
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              UniBazzar is designed for Ethiopian university students who want to buy, sell, connect, and collaborate
              within their campus community. Whether you're a student entrepreneur, tutor, buyer, or simply looking to engage with others,
              UniBazzar is for you.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8">
          {[{
            Icon: FaBookOpen,
            title: "Academic Marketplace",
            desc: "Buy and sell books, notes, and learning materials within your campus network."
          }, {
            Icon: FaUserGraduate,
            title: "Tutoring & Services",
            desc: "Find or offer tutoring services in subjects you excel at. Support peer learning."
          }, {
            Icon: FaStore,
            title: "Local Commerce",
            desc: "Cafés and student-run shops can list their menus and items for on-campus discovery."
          }, {
            Icon: FaHandshake,
            title: "Campus Connections",
            desc: "Stay updated on campus activities, make friends, and build lasting collaborations."
          }].map(({ Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transition transform hover:scale-[1.02] hover:shadow-md cursor-default"
            >
              <Icon className="text-blue-500 text-2xl sm:text-3xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-100 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-700 rounded-xl p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            Join the UniBazzar Community
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Ready to elevate your campus experience? Sign up, explore, and connect today.
          </p>
          <button
            onClick={handleJoinClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
