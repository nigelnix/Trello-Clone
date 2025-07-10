// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Layout>
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        formData={formData}
        setFormData={setFormData}
      />
    </Layout>
  );
};

export default RegisterPage;
