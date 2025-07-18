import React from "react";
import { Link } from "react-router-dom";
// import Layout from '../components/Layout.jsx'; // <-- REMOVE THIS IMPORT

const HomePage = () => {
  return (
    // <Layout> {/* <-- REMOVE THIS REDUNDANT LAYOUT WRAPPER */}
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">
        Welcome to Your App!
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Please log in or register to access your dashboard.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 shadow-md"
        >
          Sign Up
        </Link>
      </div>
    </div>
    // </Layout> {/* <-- REMOVE THIS REDUNDANT LAYOUT WRAPPER */}
  );
};

export default HomePage;
