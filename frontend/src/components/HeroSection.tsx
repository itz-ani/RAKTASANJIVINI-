import React from 'react';
import { Button } from './ui/button';
import { Heart, Users, Shield, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative bg-gradient-to-br from-red-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-medium">Saving Lives Together</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-red-600">Rakta Sanjivini</span>
                <br />
                Blood Bank Management
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Connecting donors, patients, and blood banks through a secure, efficient platform. 
                Help save lives by donating blood or find the blood you need when you need it most.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">500+</div>
                <div className="text-sm text-gray-600">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">50+</div>
                <div className="text-sm text-gray-600">Blood Banks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">1000+</div>
                <div className="text-sm text-gray-600">Lives Saved</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              >
                Get Started
                <Heart className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3"
              >
                Learn More
              </Button>
            </div>

            {/* Features Quick View */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm text-gray-600">Easy Registration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm text-gray-600">Secure Platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm text-gray-600">24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYmxvb2QlMjBkb25hdGlvbiUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzU4NjAxMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Blood donation healthcare"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Available Now</div>
                  <div className="text-sm text-gray-600">O+ Blood Type</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">50+ Donors</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-red-500" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
      </div>
    </div>
  );
}