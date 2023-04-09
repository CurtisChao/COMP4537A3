import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement your register logic here
    try {
      const response = await axios.post(
        "http://localhost:6001/register",
        {
          username,
          password,
          email,
        }
      );

      // If successful, redirect to login page
      navigate("/login");
    } catch (error) {
      // Handle error, display a message or update component state
      console.error("Registration failed:", error.response.data);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
        <button type="button" onClick={handleLoginClick}>
          Go to Login
        </button>
      </form>
    </div>
  );
}

export default Register;
