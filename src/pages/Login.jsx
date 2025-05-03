import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Use username instead of email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://TeeKinyanjui.pythonanywhere.com/login",
        { username, password }
      );

      // Save token and user info
      localStorage.setItem("token", response.data.token); // Save JWT token
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.user_id,
          is_admin: response.data.is_admin,
        })
      );

      // Redirect based on role
      if (response.data.is_admin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="bloom-link">
            Signup here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;