import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Predictive Maintenance
          </h2>
          <p className="text-sm text-gray-400">
            Empowering users with intelligent device diagnostics and care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/submit-review" className="hover:text-white">Submit Review</Link></li>
            <li><Link to="/manual-input" className="hover:text-white">Manual Input</Link></li>
            <li><Link to="/insights" className="hover:text-white">Insights</Link></li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><MapPin size={16} /> 2-Dhanmondi, Dhaka-1209</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +880 987654321</li>
            <li className="flex items-center gap-2"><Mail size={16} /> Contact Us</li>
            
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-sky-400"><Twitter /></a>
            <a href="#" className="hover:text-pink-400"><Instagram /></a>
            <a href="#" className="hover:text-blue-300"><Linkedin /></a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Predictive Maintenance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
