import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




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
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterClick}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;