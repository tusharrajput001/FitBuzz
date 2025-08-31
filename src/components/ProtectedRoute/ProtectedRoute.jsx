import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect to signin page if not authenticated
    return <Navigate to="/signin" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
