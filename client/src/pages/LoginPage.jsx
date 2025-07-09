// src/pages/LoginPage.jsx
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
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
      return alert("Email and password are required.");
    }

    try {
      const res = await axios.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
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
