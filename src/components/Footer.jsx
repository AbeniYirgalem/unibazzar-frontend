import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black shadow-md relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {/* UniBazzar Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white-300 font-poppins">
            UniBazzar
          </h2>
          <p className="text-sm font-inter">
            Connecting students across campuses with trusted local commerce —
            from books to tutoring and more.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-semibold mb-2 font-poppins">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm font-inter">
            <li>
              <Link to="/account" className="hover:text-yellow-300">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/listings" className="hover:text-yellow-300">
                Tutoring Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-md font-semibold mb-2 font-poppins">
            Stay Connected
          </h3>
          <div className="flex space-x-4 text-xl text-white-300 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram />
            </a>
          </div>
          <p className="text-sm font-inter">
            Ethiopian Universities · 🌐 Telebirr Integrated
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-center py-4 text-sm text-white font-inter">
        &copy; {new Date().getFullYear()} UniBazzar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
