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
      <b style={{fontSize: 30, paddingLeft: 130, paddingBottom: 15, color: 'black'}}>Register</b>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            width: "80%",
            boxSizing: "border-box",
            marginBottom: "10px",
            marginLeft: "40px",
            backgroundColor: "coral"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            width: "80%",
            boxSizing: "border-box",
            marginBottom: "10px",
            marginLeft: "40px",
            backgroundColor: "coral"
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            width: "80%",
            boxSizing: "border-box",
            marginBottom: "10px",
            marginLeft: "40px",
            backgroundColor: "coral"
          }}
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
