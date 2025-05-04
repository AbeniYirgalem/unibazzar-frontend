import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../redux/api/uniBazzarApi";
import { FaEnvelope, FaLock } from "react-icons/fa";

function PasswordResetPage() {
  const navigate = useNavigate();
  const { token, uidb64 } = useParams();
  const [searchParams] = useSearchParams();

  // Determine if we're in reset request mode or confirm mode
  const isConfirmMode = !!token && !!uidb64;
  const token_param = searchParams.get("token");
  const uid_param = searchParams.get("uid");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/password_reset/", { email });
      setSuccess("Password reset email sent! Please check your inbox.");
      setEmail("");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.email?.[0] ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Use the token/uid from either URL params or query params
      const tokenToUse = token || token_param;
      const uidToUse = uidb64 || uid_param;

      await api.post("/password_reset/confirm/", {
        token: tokenToUse,
        uid: uidToUse,
        new_password: password,
      });

      setSuccess("Password has been reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.token?.[0] ||
          error.response?.data?.password?.[0] ||
          "Failed to reset password. The link may be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md my-auto">
        <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 text-gray-800">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2 font-poppins">
              {isConfirmMode ? "Set New Password" : "Reset Your Password"}
            </h1>
            <p className="text-gray-600 text-sm font-inter">
              {isConfirmMode
                ? "Please enter your new password below"
                : "Enter your email address and we'll send you a link to reset your password"}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg mb-6">
              <p className="text-sm text-center">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-200 text-green-700 p-3 rounded-lg mb-6">
              <p className="text-sm text-center">{success}</p>
            </div>
          )}

          {isConfirmMode ? (
            // Confirm/Reset Form
            <form onSubmit={handleConfirmReset}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 pl-10 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-gray-800"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 pl-10 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-gray-800"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-md font-semibold mb-4 transition duration-300 shadow-md"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          ) : (
            // Request Form
            <form onSubmit={handleRequestReset}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-10 rounded-md bg-white border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-gray-800"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-md font-semibold mb-4 transition duration-300 shadow-md"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <a
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPage;
