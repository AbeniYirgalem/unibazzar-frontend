import { Link } from "react-router-dom";
import {
  FaCamera,
  FaEnvelope,
  FaUser,
  FaUniversity,
  FaStar,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "../redux/slices/authSlice";
import universities from "../data/universities";

function Account() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  // Find university name from ID
  const getUserUniversity = (universityId) => {
    if (!universityId) return "Not specified";
    const university = universities.find((uni) => uni.id === universityId);
    return university ? university.name : "Unknown University";
  };

  // Capitalize first letter of a string
  const capitalize = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-20">
      {/* Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="/assets/default_user.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-800">
            {user ? capitalize(user.role) : "Loading..."}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - User Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                {user?.full_name ? (
                  <div className="w-20 h-20 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold">
                    {user.full_name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>
                ) : (
                  <img
                    src="/assets/default_user.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? "Loading..." : user?.full_name || "User"}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.role && capitalize(user.role)}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-4">User Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2" />
                  <span className="text-sm">
                    {user?.email || "Email not available"}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaUniversity className="mr-2" />
                  <span className="text-sm">
                    {user?.university
                      ? getUserUniversity(user.university)
                      : "University not specified"}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaStar className="mr-2" />
                  <span className="text-sm">
                    Member since:{" "}
                    {user?.date_joined
                      ? new Date(user.date_joined).toLocaleDateString()
                      : "Not available"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
                Profile
              </button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded">
                Activity
              </button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded">
                Settings
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">Profile Settings</h3>
            <Link
              to="/profile"
              className="block w-full bg-gray-100 py-2 rounded text-left px-3 hover:bg-gray-200"
            >
              Edit profile
            </Link>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3 hover:bg-gray-200">
              Change password
            </button>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3 hover:bg-gray-200">
              Privacy settings
            </button>
          </div>
        </div>

        {/* Center Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold text-lg mb-4">Account Overview</h3>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : !user ? (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
                Could not load user data. Please try refreshing the page.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Account Status
                  </h4>
                  <p className="text-sm">
                    Your account is{" "}
                    <span className="text-green-600 font-medium">active</span>.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Account Type
                  </h4>
                  <p className="text-sm flex items-center">
                    <span className="mr-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {capitalize(user.role || "User")}
                    </span>
                    {user.role === "student" &&
                      "Access to student marketplace features"}
                    {user.role === "merchant" &&
                      "Access to merchant selling features"}
                    {user.role === "tutor" && "Access to tutoring features"}
                    {user.role === "campus_admin" && "Administrator privileges"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Email Verification
                  </h4>
                  <p className="text-sm">
                    {user.is_verified ? (
                      <span className="text-green-600">
                        Your email has been verified.
                      </span>
                    ) : (
                      <span className="text-yellow-600">
                        Please verify your email to access all features.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="text-sm text-gray-500 italic text-center py-8">
              Your recent activity will appear here.
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white shadow mt-6 p-4 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto rounded">
        <p className="text-sm text-gray-600 mb-2 md:mb-0">
          Stay informed! Subscribe to the campus newsletter for exclusive
          offers!
        </p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your university email"
            className="border px-3 py-1 rounded text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
