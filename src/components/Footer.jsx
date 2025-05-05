import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-black/70 dark:bg-[#0a1535]/80 backdrop-blur-xl overflow-hidden shadow-2xl z-20">
      {/* Glassmorphic & Glowing Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#152B67]/20 blur-3xl animate-pulse-slower"></div>
        <div className="absolute -bottom-10 right-1/4 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-10 md:mb-20 relative">
          <div className="bg-gradient-to-r from-[#152B67]/80 to-blue-600/80 rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 overflow-hidden relative border border-white/10 backdrop-blur-md">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-blue-300/20 blur-3xl"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
              <div className="md:col-span-3 text-center md:text-left">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 font-poppins">
                  Stay updated with UniBazzar
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm md:text-base font-inter max-w-md mx-auto md:mx-0">
                  Join our community and receive the latest updates, news, and
                  exclusive offers.
                </p>
              </div>
              <div className="md:col-span-2 w-full">
                <form className="flex flex-col sm:flex-row gap-3 w-full items-stretch sm:items-center justify-center md:justify-end">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 border border-white/20 transition-all duration-200 font-inter flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white hover:bg-blue-50 text-[#152B67] font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group font-poppins"
                  >
                    Subscribe
                    <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {/* UniBazzar Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white font-poppins">
              UniBazzar
            </h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed font-inter">
              Connecting students across campuses with trusted local commerce —
              from books to tutoring and more.
            </p>
            <div className="flex space-x-4 mt-4">
              <SocialIcon
                href="https://facebook.com"
                icon={<FaFacebook size={18} />}
              />
              <SocialIcon
                href="https://twitter.com"
                icon={<FaTwitter size={18} />}
              />
              <SocialIcon
                href="https://instagram.com"
                icon={<FaInstagram size={18} />}
              />
              <SocialIcon
                href="https://telegram.org"
                icon={<FaTelegram size={18} />}
              />
            </div>
            <p className="text-xs text-blue-200 mt-4 font-inter">
              🌐 Ethiopian Universities ·
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 font-poppins">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/account" label="Profile" />
              <FooterLink to="/listings" label="Tutoring Services" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 font-poppins">
              Resources
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 font-poppins">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm font-inter">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">📍</span>
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400">📞</span>
                <span>+251 900 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400">✉️</span>
                <span>support@unibazzar.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-white/10 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} UniBazzar. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link
              to="/privacy"
              className="hover:text-blue-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-blue-300 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/faq"
              className="hover:text-blue-300 transition-colors duration-200"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-300 text-sm hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 group font-inter"
      >
        <span className="transform group-hover:translate-x-1 transition-transform duration-200">
          {label}
        </span>
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-200 transform hover:scale-105 shadow-lg"
    >
      {icon}
    </a>
  );
}

export default Footer;
