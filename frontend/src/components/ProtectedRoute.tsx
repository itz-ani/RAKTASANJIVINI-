import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    alert("Not authorized! Please login first.");
    // Redirect explicitly to the homepage rather than the current path
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;