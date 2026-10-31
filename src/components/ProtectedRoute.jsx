import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser, canAccessRoute } from '../utils/roleUtils';

function ProtectedRoute({ children, allowedRoles = null }) {
  const location = useLocation();
  const user = getUser();

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access (supports multiple roles)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Optional: route-based access map (keep your existing logic)
  if (canAccessRoute && !canAccessRoute(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;