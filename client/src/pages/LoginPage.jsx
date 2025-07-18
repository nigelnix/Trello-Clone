import React, { useState } from "react";
import AuthForm from "../components/AuthForm.jsx"; // Ensure .jsx extension
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import Layout from "../components/Layout.jsx"; // <-- REMOVE THIS IMPORT

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("Email and password are required."); // Replace with better UX later
    }

    try {
      // Ensure this matches your backend route: /api/auth/login
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      login(res.data.user, res.data.token);
      navigate("/boards"); // Redirect to the boards overview page
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed"); // Replace with better UX later
      console.error("Login error:", err);
    }
  };

  return (
    // <Layout> {/* <-- REMOVE THIS REDUNDANT LAYOUT WRAPPER */}
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      formData={formData}
      setFormData={setFormData}
    />
    // </Layout> {/* <-- REMOVE THIS REDUNDANT LAYOUT WRAPPER */}
  );
};

export default LoginPage;
