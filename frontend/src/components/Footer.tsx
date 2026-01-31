import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 rounded-full p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Rakta Sanjivini</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Revolutionizing blood bank management through technology. 
              Connecting donors, patients, and blood banks to save lives efficiently.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Blood Donation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Blood Requests</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Inventory Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Emergency Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Health Screening</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Donor Recognition</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Healthcare Avenue,<br />
                  Medical District,<br />
                  New Delhi, India 110001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-300">support@raktasanjivini.com</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-red-600 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Emergency Hotline</h4>
              <p className="text-red-100 text-sm mb-2">24/7 Emergency Blood Services</p>
              <p className="text-white font-bold">+91 98765 43211</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} Rakta Sanjivini. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Developed with ❤️ for saving lives
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-red-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}