import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://TeeKinyanjui.pythonanywhere.com/signup", {
        username,
        email,
        phone,
        password,
      });
      setSuccess("Signup successful! Redirecting to login...");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError("Signup failed. Please try again.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>
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
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
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
            Signup
          </button>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
          {success && <p className="text-success mt-3 text-center">{success}</p>}
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="bloom-link">
            Login here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;