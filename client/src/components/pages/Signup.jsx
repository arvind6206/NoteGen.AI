import React from "react";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData,
      );
      alert(res.data.msg);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="signup">
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>

        <label className="field-label">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

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

        <button type="submit">Sign Up</button>

        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Signup;
