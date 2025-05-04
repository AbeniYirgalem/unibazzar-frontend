import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        localStorage.removeItem("authTokens");
        localStorage.removeItem("newUserData");
        sessionStorage.clear();

        console.log("Logout successful, redirecting to login page");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("newUserData");
        sessionStorage.clear();
        navigate("/login", { replace: true });
      });
  };

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/listings" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const protectedLinks = [
    { name: "Post", path: "/create" },
    { name: "My Account", path: "/account" },
  ];

  return (
    <>
      <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="md:hidden text-gray-200"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <Link to="/" className="text-2xl font-bold text-emerald-400">
                UniBazzar
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[...commonLinks, ...(user ? protectedLinks : [])].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-emerald-400 transition"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <Link
                  to="/cart"
                  className="relative text-gray-300 hover:text-emerald-400"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {user ? (
                <>
                  <span className="text-gray-300">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:text-emerald-400 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-emerald-500 text-white px-4 py-1.5 rounded hover:bg-emerald-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <span className="text-xl font-bold text-emerald-400">
                UniBazzar
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {[...commonLinks, ...(user ? protectedLinks : [])].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-emerald-400 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <Link
                  to="/cart"
                  className="hover:text-emerald-400 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart ({cartCount})
                </Link>
              )}

              {user ? (
                <>
                  <span className="text-gray-300">{user.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:text-emerald-400 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-emerald-500 text-white px-4 py-1 rounded hover:bg-emerald-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
