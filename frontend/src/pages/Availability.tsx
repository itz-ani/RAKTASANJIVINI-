 import React from "react";
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function Availability() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">24/7 Blood Availability</h1>
        <p className="text-gray-700 text-lg mb-12">
          We provide round-the-clock access to blood requests and emergency support for critical situations.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Phone Support */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaPhoneAlt />
            </div>
            <h2 className="text-xl font-semibold mb-2">Emergency Hotline</h2>
            <p className="text-gray-600 font-bold text-lg">+91 98765 43211</p>
          </div>

          {/* Email Support */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center justify-center text-blue-600 text-4xl mb-4">
              <FaEnvelope />
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Support</h2>
            <p className="text-gray-600 font-bold text-lg">support@raktasanjivini.com</p>
          </div>

          {/* Availability */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center justify-center text-green-600 text-4xl mb-4">
              <FaClock />
            </div>
            <h2 className="text-xl font-semibold mb-2">24/7 Availability</h2>
            <p className="text-gray-600 font-bold text-lg">Always ready for blood emergencies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
