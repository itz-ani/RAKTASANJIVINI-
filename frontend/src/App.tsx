 import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import { AuthForms } from "./components/AuthForms";

import ProtectedRouter from "./components/ProtectedRoute";
// Feature Pages
import EasyDonation from "./pages/EasyDonation";
import Notifications from "./pages/Notifications";
import Inventory from "./pages/Inventory";
import DonorRecognition from "./pages/DonorRecognition";
import HealthMonitory from "./pages/HealthMonitoring";
import Location from "./pages/LocationServices";
import MultiUser from "./pages/MultiUser";
import Availability from "./pages/Availability";
import  Security from "./pages/Security";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  // 🔐 SECURITY FEATURE UI STATE
  const [message, setMessage] = useState<string>("");

  // 🔐 SECURITY FEATURE API CALL
  const checkStock = async () => {
    try {
      const res = await fetch("http://localhost:5000/check-stock");
      const data = await res.text();
      setMessage(data);
    } catch (err) {
      console.error(err);
      setMessage("Error checking stock!");
    }
  };

  // 🔥 Login system
  const handleLogin = (type: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("");
    setCurrentView("home");
  };

  const handleGetStarted = () => {
    if (isLoggedIn) setCurrentView("dashboard");
    else setCurrentView("register");
  };

  // 🔥 Main content switching
  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div>
            <Dashboard userType={userType} />

            {/* 🔐 SECURITY FEATURE UI SHOWN ONLY IN DASHBOARD */}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h2 className="text-xl font-semibold mb-4">Security Check</h2>
              <button
                onClick={checkStock}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Check Blood Stock
              </button>
              <p className="mt-4 font-bold text-gray-900">{message}</p>
            </div>
          </div>
        );

      case "login":
        return (
          <AuthForms
            isLogin={true}
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView("register")}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        );

      case "register":
        return (
          <AuthForms
            isLogin={false}
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView("register")}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        );

      case "about":
        return (
          <>
            <AboutSection />
            <Footer />
          </>
        );

      case "features":
        return (
          <>
            <FeaturesSection />
            <Footer />
          </>
        );

      case "contact":
        return (
          <>
            <div className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                  Contact Us
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                  Get in touch with our team for support, partnerships, or general inquiries.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div>
                    <h3 className="font-semibold">Emergency Hotline</h3>
                    <p className="text-red-600 font-bold text-xl">+91 98765 43211</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">General Support</h3>
                    <p className="text-blue-600 font-bold text-xl">+91 98765 43210</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-green-600 font-bold">support@raktasanjivini.com</p>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </>
        );

      default:
        return (
          <>
            <HeroSection onGetStarted={handleGetStarted} />
            <FeaturesSection />
            <AboutSection />
            <Footer />
          </>
        );
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation
          currentView={currentView}
          setCurrentView={setCurrentView}
          isLoggedIn={isLoggedIn}
          userType={userType}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={renderContent()} />

          {/* All Feature Pages */}
          <Route path="/easy-donation" element={<ProtectedRouter isLoggedIn={isLoggedIn}><EasyDonation /></ProtectedRouter>} />
          <Route path="/notifications" element={<ProtectedRouter isLoggedIn={isLoggedIn}><Notifications /></ProtectedRouter>} />
          <Route path="/multi-user" element={<ProtectedRouter isLoggedIn={isLoggedIn}><MultiUser /></ProtectedRouter>} />
          <Route path="/location-services" element={<ProtectedRouter isLoggedIn={isLoggedIn}> <Location /></ProtectedRouter>} />
          <Route path="/health-monitoring" element={<ProtectedRouter isLoggedIn={isLoggedIn}><HealthMonitory /></ProtectedRouter>} />
          <Route path="/donor-recognition" element={<ProtectedRouter isLoggedIn={isLoggedIn}><DonorRecognition /></ProtectedRouter>} />
          <Route path="/inventory" element={<ProtectedRouter isLoggedIn={isLoggedIn}><Inventory /></ProtectedRouter>} />
          <Route path="/availability" element={<ProtectedRouter isLoggedIn={isLoggedIn}><Availability /></ProtectedRouter>} />
          <Route path="/security" element={<ProtectedRouter isLoggedIn={isLoggedIn}><Security /></ProtectedRouter>} />
        </Routes>
      </div>
    </Router>
  );
}
