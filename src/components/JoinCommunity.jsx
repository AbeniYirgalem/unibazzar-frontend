import React from 'react';
import { Send } from 'lucide-react';

export default function JoinCommunity() {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#0b1120] text-white py-20 px-4 sm:px-6 md:px-12 rounded-2xl shadow-lg lg:w-[1500px] lg:py-[70px] max-w-7xl mx-4 sm:mx-6 md:mx-12 lg:mx-auto my-10">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Join Our Community</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-6">
          Subscribe to our newsletter for exclusive offers, early access to new collections, and style inspiration.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="px-5 py-3 w-full sm:w-[500px] rounded-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition duration-200"
          >
            Subscribe <Send size={18} />
          </button>
        </form>

        <p className="text-xs sm:text-sm text-gray-400 mt-5 max-w-xl mx-auto">
          By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a> and consent to receive updates from our company.
        </p>
      </div>
    </div>
  );
}
