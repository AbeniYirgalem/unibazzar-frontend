// src/components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // If specific roles are required, check if user has one of them
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // Redirect to unauthorized or default page
    return <Navigate to="/unauthorized" />;
  }

  // User is authenticated and has the required role (if any)
  return children;
};

export default PrivateRoute;
