import React, { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
      console.log("RegisterPage: Attempting registration with data:", formData); // ADD THIS LOG
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(
        "RegisterPage: Registration successful! Response data:",
        res.data
      ); // ADD THIS LOG
      login(res.data.user, res.data.token); // This is the critical line
      console.log("RegisterPage: login() function called."); // ADD THIS LOG
      navigate("/boards");
    } catch (err) {
      console.error(
        "RegisterPage: Registration error:",
        err.response?.data || err.message
      ); // More detailed error log
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default RegisterPage;
