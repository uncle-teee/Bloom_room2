import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Redirect to the home page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bloom-navbar">
      <div className="container">
        <Link className="navbar-brand bloom-brand" to="/">
          Bloom Room
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/admin-dashboard">
                    Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link bloom-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : location.pathname === "/login" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : location.pathname === "/signup" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link bloom-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;