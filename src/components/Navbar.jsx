import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import "boxicons"; // Import Boxicons
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [wishlistCount, setWishlistCount] = useState(0); // State for wishlist count
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [user, setUser] = useState(null); // State for user data

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]); // Re-check login status on location change

  useEffect(() => {
    const fetchWishlistCount = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("https://teekinyanjui.pythonanywhere.com/api/favorites/count", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist count");
        }

        const data = await response.json();
        console.log("Wishlist Count:", data.count); // Debugging log
        setWishlistCount(data.count); // Update the wishlist count
      } catch (err) {
        console.error("Failed to fetch wishlist count:", err);
        toast.error("Failed to load wishlist count.");
      }
    };

    const fetchCartCount = async () => {
      const token = localStorage.getItem("token"); // Retrieve the access token

      if (isLoggedIn && token) {
        try {
          const response = await fetch(`https://teekinyanjui.pythonanywhere.com/api/cart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the access token in the request
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Cart Count:", data.length); // Debugging log
            setCartCount(data.length); // Update the cart count
          } else {
            const errorText = await response.text(); // Read the response as text
            console.error("Failed to fetch cart count:", errorText);
          }
        } catch (err) {
          console.error("Failed to fetch cart count:", err);
          toast.error("Failed to load cart count.");
        }
      }
    };

    if (isLoggedIn) {
      fetchWishlistCount();
      fetchCartCount();
    }
  }, [isLoggedIn]); // Fetch counts when login status changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setWishlistCount(0); // Reset wishlist count
    setCartCount(0); // Reset cart count
    navigate("/");
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
            {/* Common Links for All Users */}
            <li className="nav-item">
              <Link className="nav-link bloom-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link bloom-link" to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link bloom-link" to="/blogs">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link bloom-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link bloom-link" to="/contact">
                Contact
              </Link>
            </li>

            {/* Wishlist Link */}
            {isLoggedIn && (
              <li className="nav-item wishlist-nav-item">
                <Link className="nav-link bloom-link wishlist-link" to="/wishlist">
                  <box-icon name="heart" type="solid" color="#ff69b4"></box-icon>
                  {wishlistCount > 0 && (
                    <span className="wishlist-count">{wishlistCount}</span>
                  )}
                </Link>
              </li>
            )}

            {/* Cart Link */}
            {isLoggedIn && (
              <li className="nav-item cart-nav-item">
                <Link className="nav-link bloom-link cart-link" to="/cart">
                  <box-icon name="cart" type="solid" color="#ff69b4"></box-icon>
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </Link>
              </li>
            )}

            {/* User Icon for Login/Logout */}
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link bloom-link user-icon"
                  onClick={handleLogout}
                >
                  <box-icon name="user-circle" type="solid" color="#ff69b4"></box-icon>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link bloom-link user-icon" to="/login">
                  <box-icon name="user-circle" type="solid" color="#ff69b4"></box-icon>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;