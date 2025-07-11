import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-600">
          Trello Clone
        </Link>

        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-slate-700 hover:text-teal-600 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 hover:text-teal-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
