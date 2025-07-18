import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log(
    "ProtectedRoute: Rendered. isAuthenticated:",
    isAuthenticated,
    "loading:",
    loading
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-700">Authenticating...</div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
