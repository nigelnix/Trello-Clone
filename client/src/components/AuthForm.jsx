import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLogin = type === "login";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isLogin ? "Log in to your account" : "Create your account"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm mb-1">
                Username
              </label>{" "}
              {/* Changed label htmlFor */}
              <input
                type="text"
                id="username" // Changed id
                name="username" // Changed name to 'username' to match backend User model
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.username || ""} // Access formData.username
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>{" "}
            {/* Added htmlFor */}
            <input
              type="email"
              id="email" // Added id
              name="email" // Added name
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>{" "}
            {/* Added htmlFor */}
            <input
              type="password"
              id="password" // Added id
              name="password" // Added name
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && ( // Only show avatar field for registration
            <div>
              <label htmlFor="avatar" className="block text-sm mb-1">
                Avatar URL (Optional)
              </label>
              <input
                type="url" // Use type="url" for better input validation
                id="avatar"
                name="avatar"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., https://example.com/your-avatar.jpg"
                value={formData.avatar || ""}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log In
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
