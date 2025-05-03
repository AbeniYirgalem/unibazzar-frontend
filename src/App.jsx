import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetails";
import MarketplacePage from "./pages/MarketplacePage";
import Account from "./pages/Accout";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import SimilarItemsPage from "./pages/SimilarItemsPage";
import TutorDashboard from "./pages/TutorDashboard";
import CampusAdminDashboard from "./pages/CampusAdminDashboard";
import Chat from "./components/Chat/Chat";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5"; // Import icons

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

        {/* Theme Toggle Button */}
        <div className="text-right p-4">
          <button
            onClick={toggleTheme}
            className="text-2xl text-gray-800 dark:text-white focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <IoSunny /> : <IoMoon />}
          </button>
        </div>

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/listings" element={<MarketplacePage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/similar/:id" element={<SimilarItemsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chat" element={<Chat />} />

          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateListingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutordashboard"
            element={
              <PrivateRoute>
                <TutorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/campusadmindashboard"
            element={
              <PrivateRoute>
                <CampusAdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
