import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // <--- Now 'loading' will be provided

  console.log(
    "ProtectedRoute: Rendered. isAuthenticated:",
    isAuthenticated,
    "loading:",
    loading
  ); // NEW LOG

  // If AuthProvider is still determining authentication status, show a loading message
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-700">Authenticating...</div>
    );
  }

  // If not loading, then check if authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />; // Use replace to prevent back button issues
};

export default ProtectedRoute;
