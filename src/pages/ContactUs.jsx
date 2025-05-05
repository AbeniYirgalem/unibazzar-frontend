import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom"; // optional if you want to redirect


function ContactUs() {
  const form = useRef();
  const navigate = useNavigate(); // for redirection

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3mz40xo",
        "template_v91fivj",
        form.current,
        "HYyiqhg1vWEQSxlTF"
      )
      .then(
        (result) => {
          alert("Message sent!");
          navigate("/thank-you"); // redirect to a thank you page
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="pl-10 pt-20 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-10">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">Contact Us</h1>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
