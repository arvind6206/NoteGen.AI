import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData,
      );

      localStorage.setItem("token", res.data.token);

      alert(res.data.msg);

      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <label className="field-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="field-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
