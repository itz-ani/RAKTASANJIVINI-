 import React from "react";

export default function HealthMonitoring() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-white p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-red-600 mb-8 text-center">
          Health Monitoring
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Track donor health metrics and vitals to ensure safe blood donation.
          Stay informed about important metrics even if we don't store data.
        </p>

        {/* Health Metrics Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Hemoglobin (Hb)", value: "≥ 12.5 g/dL (women), ≥ 13 g/dL (men)", icon: "🩸" },
            { title: "Blood Pressure (BP)", value: "Systolic 90–180 mmHg, Diastolic 50–100 mmHg", icon: "💓" },
            { title: "Pulse", value: "50–100 bpm", icon: "⏱️" },
            { title: "Temperature", value: "36–37.5°C", icon: "🌡️" },
            { title: "Weight", value: "≥ 50 kg", icon: "⚖️" },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 hover:scale-105 transform transition">
              <span className="text-4xl">{metric.icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-red-600">{metric.title}</h2>
                <p className="text-gray-700">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Donor Tips</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">🍎 Eat a healthy meal before donation.</li>
            <li className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">💧 Drink plenty of water.</li>
            <li className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">🛌 Get enough rest before donating.</li>
            <li className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">👩‍⚕️ Consult a doctor if feeling unwell.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
