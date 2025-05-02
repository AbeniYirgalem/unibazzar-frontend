import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth); // Added user state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      // Check the user role after login
      if (user?.role === "merchant") {
        navigate("/merchant-dashboard"); // Redirect to merchant dashboard if the user is a merchant
      } else {
        navigate("/listings"); // Default redirect to listings page
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 items-center justify-center rounded-tr-[256px] rounded-br-[256px] px-10 text-white text-center">
        <div>
          <h2 className="text-5xl font-extrabold mb-4">UniBazzar</h2>
          <p className="text-lg max-w-md mx-auto">
            The trusted campus marketplace where you can buy, sell, and connect
            with peers.
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 py-12 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <div className="bg-yellow-400 p-4 rounded-full mb-6 shadow-md mx-auto w-fit">
            <span className="text-blue-900 font-bold text-lg">UB</span>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">
            Log In
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Join the campus marketplace now
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your university email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 mt-8" />
              ) : (
                <FaEye className="h-5 w-5 mt-8" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-md font-semibold mb-4 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
