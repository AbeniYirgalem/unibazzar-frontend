import { useState } from "react";
// import loginImage from "../assets/Login.png"; // Adjust the path based on your folder structure

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      
      {/* Left background image */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600 rounded-tr-[256px] rounded-br-[256px] flex items-center justify-center overflow-hidden">
        {/* <img
          src={loginImage}
          alt="Left Illustration"
          className="w-2/3 h-auto object-contain"
        /> */}
      </div>

      {/* Right background image */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-300 rounded-tl-[256px] rounded-bl-[256px] flex items-center justify-center overflow-hidden">
        {/* <img
          src={loginImage}
          alt="Right Illustration"
          className="w-1/3 h-auto object-contain"
        /> */}
      </div>

      {/* Center Login Card */}
      <div className="relative z-10 bg-[#d9e6f5] p-12 rounded-lg shadow-lg w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="bg-blue-600 p-4 rounded-full mb-6">
          {/* <img src={loginImage} alt="UniBazz Logo" className="w-12 h-12" /> */}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">Log In</h1>
        <p className="text-gray-600 mb-8 text-center">Join the campus marketplace now</p>

        {/* Email Input */}
        <div className="w-full mb-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your university email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="w-full mb-8 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-11 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0l9 9a1 1 0 01-1.414 1.414l-9-9a1 1 0 010-1.414z" />
                <path d="M11.293 7.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414l4-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3c-7.333 0-10 7-10 7s2.667 7 10 7 10-7 10-7-2.667-7-10-7zm0 12a5 5 0 110-10 5 5 0 010 10z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Login Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-md font-semibold">
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
