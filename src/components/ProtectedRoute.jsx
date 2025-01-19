import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const { isAuthenticated, role } = auth;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
