import React from "react";
import "./Footer.css"; // Import the CSS file for styling
import "boxicons"; // Import Boxicons for icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h4>Bloom Room</h4>
          <p>
            Your one-stop shop for beautiful flowers and gifts. We deliver
            happiness to your doorstep with love and care.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <box-icon type="logo" name="facebook" color="#fff"></box-icon>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <box-icon type="logo" name="twitter" color="#fff"></box-icon>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <box-icon type="logo" name="instagram" color="#fff"></box-icon>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <box-icon type="logo" name="linkedin" color="#fff"></box-icon>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bloom Room. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;