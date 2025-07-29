import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arda Turan",
    role: "Tech Enthusiast",
    message:
      "The predictive insights helped me spot performance issues early. Fantastic tool for phone maintenance!",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    name: "Elizabeth Olsen ",
    role: "Blogger & Reviewer",
    message:
      "Sleek design, real-time insights, and the manual input feature is a game changer for diagnostics.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 4,
  },
  {
    name: "Anne Hathaway",
    role: "Freelance Developer",
    message:
      "Saved me hours of debugging battery drain issues. Highly recommend to any tech-savvy user!",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Real feedback from our trusted users who rely on Predictive Maintenance for optimal device health.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 transition hover:-translate-y-1 hover:shadow-xl duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{t.message}"</p>
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
