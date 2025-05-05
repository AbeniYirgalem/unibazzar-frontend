import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Hanna Mekonnen",
    university: "Addis Ababa University",
    rating: 5,
    text: "I found the perfect textbook for my course at a great price. UniBazzar made the process so easy and safe!",
    image: "/assets/default_user.png",
  },
  {
    id: 2,
    name: "Samuel Tadesse",
    university: "Bahir Dar University",
    rating: 5,
    text: "Selling my old electronics was quick and hassle-free. I love how UniBazzar connects students across campuses.",
    image: "/assets/default_user.png",
  },
  {
    id: 3,
    name: "Liya Teshome",
    university: "Haramaya University",
    rating: 4,
    text: "The tutoring services I found here really helped me boost my grades. Highly recommended for all students!",
    image: "/assets/default_user.png",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Students Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Real experiences from students and campus sellers who use UniBazzar
            to buy, sell, and connect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className={
                      index < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Trusted by thousands of students and campus sellers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <img
              src="/assets/default_user.png"
              alt="UniBazzar"
              className="h-8"
            />
            <img
              src="/assets/default_user.png"
              alt="Campus"
              className="h-8 rounded"
            />
            <img
              src="/assets/default_user.png"
              alt="User"
              className="h-8 rounded-full"
            />
            <img
              src="/assets/default_user.png"
              alt="UniBazzar"
              className="h-8"
            />
            <img
              src="/assets/default_user.png"
              alt="Campus"
              className="h-8 rounded"
            />
            <img
              src="/assets/default_user.png"
              alt="User"
              className="h-8 rounded-full"
            />
            <img
              src="/assets/default_user.png"
              alt="UniBazzar"
              className="h-8"
            />
            <img
              src="/assets/default_user.png"
              alt="Campus"
              className="h-8 rounded"
            />
            <img
              src="/assets/default_user.png"
              alt="User"
              className="h-8 rounded-full"
            />
            <img
              src="/assets/default_user.png"
              alt="UniBazzar"
              className="h-8"
            />
            <img
              src="/assets/default_user.png"
              alt="Campus"
              className="h-8 rounded"
            />
            <img
              src="/assets/default_user.png"
              alt="User"
              className="h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
