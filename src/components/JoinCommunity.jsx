import React, { useState } from "react";
import { Send } from "lucide-react";

export default function JoinCommunity() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="py-16 px-8 md:py-20 md:px-12 lg:py-24 lg:px-16 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-6">
                Join Our Community
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6 md:mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter for exclusive offers, early access
                to new collections, and style inspiration.
              </p>
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-6 py-3 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe</span>
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 text-green-800 px-6 py-4 rounded-xl max-w-lg mx-auto">
                  <p className="font-medium">Thanks for subscribing!</p>
                  <p className="text-sm">
                    We've sent a confirmation to your email address.
                  </p>
                </div>
              )}
              <p className="text-gray-400 text-xs sm:text-sm mt-5 md:mt-6 max-w-xl mx-auto">
                By subscribing, you agree to our{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>{" "}
                and consent to receive updates from our company.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
