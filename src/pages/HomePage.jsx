import { Link } from "react-router-dom";
import { useState } from "react";

function HomePage() {

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to UniBazzar</h1>
        <p className="text-xl md:text-2xl mb-8">
          Your one-stop campus marketplace for textbooks, notes, tutoring, and more.
        </p>
        <Link
          to="/listings"
          className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-full text-lg shadow-md transition"
        >
          Start Browsing
        </Link>
      </section>

      {/* What You Can Do Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What You Can Do with UniBazzar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Sell Easily",
                desc: "List your textbooks, notes, and services in seconds.",
                icon: "/assets/sell-icon.png",
              },
              {
                title: "Buy Affordably",
                desc: "Find verified campus deals that match your budget.",
                icon: "/assets/buy-icon.png",
              },
              {
                title: "Support Locals",
                desc: "Trade within your university and support fellow students.",
                icon: "/assets/support-icon.png",
              },
            ].map((item, index) => (
              <div key={index}>
                <img src={item.icon} alt={item.title} className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Post Items",
                desc: "Upload textbooks, notes, or tutoring services to sell easily.",
                icon: "/assets/post-icon.png",
              },
              {
                title: "Browse Listings",
                desc: "Find academic materials, tutors, or even part-time jobs.",
                icon: "/assets/browse-icon.png",
              },
              {
                title: "Secure Payments",
                desc: "Pay safely via Telebirr or trusted payment methods.",
                icon: "/assets/payment-icon.png",
              },
            ].map((item, index) => (
              <div key={index}>
                <img src={item.icon} alt={item.title} className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <blockquote className="text-xl italic text-gray-700 mb-6">
            "UniBazzar helped me save money and time by connecting directly with sellers on campus!"
          </blockquote>
          <p className="font-semibold text-gray-800">- John Doe, Addis Ababa University</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
