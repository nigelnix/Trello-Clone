import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Destructure 'user' from useAuth

  // Function to generate initials for the default avatar
  const getInitials = (username) => {
    if (!username) return "U"; // Default to 'U' if no username
    const parts = username.split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-600">
          Trello Clone
        </Link>

        <div className="space-x-4 flex items-center">
          {" "}
          {/* Added flex items-center for avatar alignment */}
          {isAuthenticated ? (
            <>
              {user && ( // Only render avatar section if user object exists
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    // If user has an avatar URL, display the image
                    <img
                      src={user.avatar}
                      alt={`${user.username || "User"}'s avatar`}
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                        e.target.outerHTML = `<div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm">
                                                ${getInitials(user.username)}
                                              </div>`;
                      }}
                    />
                  ) : (
                    // If no avatar URL, display initials
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm">
                      {getInitials(user.username)}
                    </div>
                  )}
                  {/* Display username or email, hidden on small screens */}
                  <span className="text-slate-700 font-medium hidden sm:inline">
                    {user.username || user.email}
                  </span>
                </div>
              )}

              <Link
                to="/boards"
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
