import React, { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default LoginPage;
