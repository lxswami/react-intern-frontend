import React from "react";

const About = () => {
  return (
    <div className="px-4 py-12 bg-gray-50 min-h-[80vh]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          We are committed to providing modern and secure authentication experiences.
          Our platform helps developers and businesses implement login, register, and user management with ease.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10 text-left">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-sm text-gray-600">
              To simplify authentication for modern web apps while ensuring top-tier security and user experience.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-sm text-gray-600">
              Empower developers to build safer, smarter login systems with minimal effort.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Values</h3>
            <p className="text-sm text-gray-600">
              Security, simplicity, performance, and customer success are at the heart of what we build.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
