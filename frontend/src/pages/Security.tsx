import React from "react";
import { ShieldCheck, Lock, Fingerprint, Bell, Eye, Key } from "lucide-react";

export default function Security() {
  const features = [
    {
      title: "Advanced Encryption",
      description: "All data is encrypted end-to-end using industry-grade AES-256 security.",
      icon: Lock,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Two-Factor Authentication",
      description: "Users can enable OTP or biometric verification for added security.",
      icon: Fingerprint,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Secure Access Control",
      description: "Fine-grained role-based access for admins, donors, and hospitals.",
      icon: Key,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Threat Alerts",
      description: "Real-time alerts for unauthorized access or suspicious activities.",
      icon: Bell,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Privacy Protection",
      description: "Strict privacy policies ensure personal data is never misused.",
      icon: Eye,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Verified Accounts",
      description: "Users and hospitals undergo identity verification for trust & safety.",
      icon: ShieldCheck,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Security & Privacy
        </h1>

        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Your safety is our top priority. We use advanced security practices to protect data,
          prevent misuse, and maintain complete transparency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
