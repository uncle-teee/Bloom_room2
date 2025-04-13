import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://TeeKinyanjui.pythonanywhere.com/login",
        { email, password }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      if (response.data.is_admin) {
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      } else {
        navigate("/products"); // Redirect to Products page for regular users
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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