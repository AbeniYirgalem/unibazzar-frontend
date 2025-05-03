function ContactUs() {
  return (
    <div className="pl-10 pt-20 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-10">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          We'd love to hear from you! Reach out with any questions, feedback, or partnership inquiries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">📍 Location</h3>
              <p>Ethiopian Universities — Campus-wide Network</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">📧 Email</h3>
              <p>support@unibazzar.et</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">📞 Phone</h3>
              <p>+251 912 345 678</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">🕒 Office Hours</h3>
              <p>Mon – Fri: 9am – 5pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
