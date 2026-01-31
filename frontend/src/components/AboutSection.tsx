import React from 'react';
import { Heart, Target, Users, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">About Rakta Sanjivini</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Revolutionizing Blood Bank Management for a 
              <span className="text-red-600"> Better Tomorrow</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Rakta Sanjivini is a comprehensive blood bank management system designed to bridge 
              the gap between blood donors, patients in need, and blood banks. Our platform 
              leverages modern technology to ensure efficient, secure, and transparent blood 
              donation and distribution processes.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded with the mission to save lives through technology, we provide a seamless 
              experience for all stakeholders in the blood donation ecosystem. From real-time 
              inventory management to donor recognition programs, we're committed to making 
              blood donation more accessible and effective.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600 mb-1">2023</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Partner Hospitals</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWFtJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHMlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc1ODYwMTIwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Medical team professionals"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
            
            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Excellence Award</div>
                  <div className="text-sm text-gray-600">Healthcare Innovation 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-red-50 rounded-2xl">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To save lives by creating a seamless, technology-driven platform that connects 
              blood donors with those in need, ensuring no life is lost due to blood shortage.
            </p>
          </div>

          <div className="text-center p-8 bg-blue-50 rounded-2xl">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading blood bank management platform globally, making blood 
              donation accessible, efficient, and impactful for communities worldwide.
            </p>
          </div>

          <div className="text-center p-8 bg-green-50 rounded-2xl">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Compassion, integrity, innovation, and collaboration drive everything we do. 
              We believe in transparency, security, and putting human life above all else.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-red-600">Dedicated Team</span>
          </h3>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Our diverse team of healthcare professionals, technologists, and social impact 
            advocates work tirelessly to improve blood donation experiences.
          </p>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1746806942689-f8966f63ed75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwdm9sdW50ZWVyJTIwaGVscGluZ3xlbnwxfHx8fDE3NTg2MDEyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Blood donation volunteers helping"
              className="rounded-2xl shadow-xl w-full h-64 object-cover"
            />
            
            <div className="absolute inset-0 bg-red-600 bg-opacity-80 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <h4 className="text-2xl font-bold mb-2">Join Our Mission</h4>
                <p className="text-lg opacity-90">
                  Be part of a team that's saving lives every day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}