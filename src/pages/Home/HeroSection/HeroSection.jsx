// src/pages/Home/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Predict & Prevent Electronic Failures
          </h1>
          <p className="text-lg lg:text-xl text-gray-200">
            Use real-time monitoring and manual input to keep your mobile and other personal electronics running smoothly.
          </p>
          <div className="space-x-4">
            <Link
              to="/manual-input"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Try Manual Input
            </Link>
            <Link
              to="/insights"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-700 transition"
            >
              View Insights
            </Link>
          </div>
        </div>

        {/* Hero Image or Illustration */}
        <div className="md:w-1/2">
          <img
            src="/images/device-monitoring.svg" // Replace with your image path
            alt="Device Monitoring"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
