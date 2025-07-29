import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaThumbsUp, FaShieldAlt, FaClock } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-4xl text-blue-600" />,
    title: "10K+ Happy Users",
    description: "Thousands trust us with their device health every month.",
  },
  {
    icon: <FaThumbsUp className="text-4xl text-green-600" />,
    title: "98% Satisfaction",
    description: "Customer-first approach ensures near-perfect satisfaction.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-purple-600" />,
    title: "Secure Diagnostics",
    description: "We ensure privacy and security with every check.",
  },
  {
    icon: <FaClock className="text-4xl text-orange-500" />,
    title: "Quick Checks",
    description: "Get device insights and advice in seconds.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-100" id="why-choose">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
