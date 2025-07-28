import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const role = localStorage.getItem("role");
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Element {...rest} />;
};

export default ProtectedRoute;
