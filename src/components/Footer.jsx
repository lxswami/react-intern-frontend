import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // Optional if using React Router

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Center: Copyright */}
        <div className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} MyAuth. All rights reserved.
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-gray-600">
          <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
