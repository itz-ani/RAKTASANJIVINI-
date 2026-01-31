 import React from 'react';
import { useNavigate } from "react-router-dom";

import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Database, 
  Bell, 
  MapPin, 
  Award,
  Activity
} from 'lucide-react';


const features = [
  {
    icon: Heart,
    title: "Easy Blood Donation",
    description:
      "Simple registration process for donors with comprehensive health screening and easy scheduling.",
    color: "bg-red-100 text-red-600",
    link: "/easy-donation",
  },
  {
    icon: Database,
    title: "Real-time Inventory",
    description:
      "Live tracking of blood units across all blood banks with automatic updates and low-stock alerts.",
    color: "bg-blue-100 text-blue-600",
   link: "/inventory",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "HIPAA-compliant platform ensuring complete privacy and security of all medical information.",
    color: "bg-green-100 text-green-600",
   link: "/security",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Round-the-clock access to blood requests and emergency support for critical situations.",
    color: "bg-purple-100 text-purple-600",
   link: "/availability",
  },
  {
    icon: Users,
    title: "Multi-User Platform",
    description:
      "Separate dashboards for donors, patients, and blood banks with role-based access control.",
    color: "bg-orange-100 text-orange-600",
    link: "/multi-user",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Automated alerts for donation appointments, blood requests, and emergency requirements.",
    color: "bg-pink-100 text-pink-600",
    link: "/notifications",
  },
  {
    icon: MapPin,
    title: "Location Services",
    description:
      "Find nearby blood banks and donation centers with integrated mapping and directions.",
    color: "bg-indigo-100 text-indigo-600",
   link: "/location-services",
  },
  {
    icon: Award,
    title: "Donor Recognition",
    description:
      "Achievement system and certificates to recognize and appreciate regular blood donors.",
    color: "bg-yellow-100 text-yellow-600",
   link: "/donor-recognition",
  },
  {
    icon: Activity,
    title: "Health Monitoring",
    description:
      "Track donation history, health metrics, and eligibility status for optimal donor care.",
    color: "bg-teal-100 text-teal-600",
   link: "/health-monitoring",
  },
];

export function FeaturesSection() {
  const navigate = useNavigate();   

  const handleFeatureClick = (feature: any) => {
    if (feature.link) {
      navigate(feature.link);  
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Platform Features</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="text-red-600"> Blood Management</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform brings together donors, patients, and blood banks 
            with cutting-edge technology to save more lives efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={index}
                onClick={() => handleFeatureClick(feature)}
                className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
