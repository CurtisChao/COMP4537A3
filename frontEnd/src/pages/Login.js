import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import UserContext from "../context/UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const { login } = useContext(UserContext);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Implement your login logic here
      try {
        const response = await axios.post(
          "http://localhost:6001/login",
          {
            username,
            password,
          }
        );
  
        if (response.data && response.data.token) {
          // Save the token in local storage or any other storage you prefer
          login(response.data.username, response.data.token, response.data.role);
  
          // If successful, update the loggedIn state
          navigate("/");
        } else {
          // Handle error, display a message or update component state
          console.error("Login failed");
        }
      } catch (error) {
        // Handle error, display a message or update component state
        console.error("Login failed:", error.response.data);
      }
    };
    const handleRegisterClick = () => {
      navigate("/register");
    };
  
    return (
      <div className={styles.body}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <b style={{fontSize: 30, paddingLeft: 130, paddingBottom: 15, color: 'black'}}>Poke Api</b>
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
          <button type="submit" style={{backgroundColor:'greenyellow', width: "80%", marginLeft: "40px"}}>
            Login
          </button>
          <button type="button" style={{backgroundColor:'purple', width: "80%", marginLeft: "40px"}} onClick={handleRegisterClick}>
            Register
          </button>
        </form>
      </div>
      </div>
    );
  }
  
  export default Login;