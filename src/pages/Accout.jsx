import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
//import profilePic from "../assets/Screenshot 2025-04-29 202625.png";

function Account() {
  return (
    <div className="bg-gray-100 min-h-screen mt-20 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center dark:bg-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Campus Feed</h1>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="/assets/default_user.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-800 dark:text-gray-100">Student</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow rounded p-4 dark:bg-gray-800 dark:text-white">
            <div className="flex items-center space-x-4">
              {/* <img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover" /> */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Student Profile
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">367 connections</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded dark:bg-blue-700 dark:hover:bg-blue-600">
                Posts
              </button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded dark:bg-gray-700 dark:text-white">
                About
              </button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded dark:bg-gray-700 dark:text-white">
                Gallery
              </button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded dark:bg-gray-700 dark:text-white">
                Videos
              </button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded dark:bg-gray-700 dark:text-white">
                Connections
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded p-4 space-y-3 dark:bg-gray-800 dark:text-white">
            <h3 className="font-semibold text-gray-800 dark:text-white">Profile Settings</h3>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3 dark:bg-gray-700 dark:text-white">
              Add bio
            </button>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3 dark:bg-gray-700 dark:text-white">
              Edit profile
            </button>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3 dark:bg-gray-700 dark:text-white">
              Add Interests
            </button>
          </div>

          <div className="bg-white shadow rounded p-4 dark:bg-gray-800 dark:text-white">
            <h3 className="font-semibold text-gray-800 mb-4 dark:text-white">Gallery</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          </div>
        </div>

        {/* Center Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded p-4 dark:bg-gray-800 dark:text-white">
            <input
              type="text"
              placeholder="What's happening on campus?"
              className="w-full border rounded px-4 py-2 text-sm mb-2 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-between items-center text-gray-500 text-sm dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <FaCamera />
                <span>Photo</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm dark:bg-blue-700">
                Share
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded p-4 dark:bg-gray-800 dark:text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {/* <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" /> */}
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    Exploring
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
                </div>
              </div>
              <span className="bg-black text-white px-2 py-0.5 text-xs rounded">
                UPGRADE PLAN
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              I discovered a passion for traditional Ethiopian crafts. Check out
              my latest creations and projects. Embracing culture and
              creativity!
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-full h-24 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white shadow mt-6 p-4 flex justify-between items-center max-w-6xl mx-auto rounded dark:bg-gray-800 dark:text-white">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Stay informed! Subscribe to the campus newsletter for exclusive
          offers!
        </p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your university email"
            className="border px-3 py-1 rounded text-sm dark:bg-gray-700 dark:text-white"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm dark:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
