import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, allowedRoles = [], ...rest }) => {
   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role");

   // If no token or role, redirect to login
   if (!token || !role) {
      return <Navigate to="/login" />;
   }

   // Ensure that allowedRoles is an array before using .includes()
   if (Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {
      return <Navigate to="/login" />; // Redirect if the role is not allowed
   }

   return <Component {...rest} />;
};

export default ProtectedRoute;
