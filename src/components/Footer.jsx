import "./Footer.css";
import "boxicons";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of the Back to Top button
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

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

        {/* Newsletter CTA */}
        <div className="footer-section cta">
          <h4>Stay Connected</h4>
          <p>Sign up for our newsletter to receive updates and special offers!</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
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

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@bloomroom.com</p>
          <p>Phone: +254 700 000 000</p>
          <p>Location: Nairobi, Kenya</p>
          <p>Hours: Mon–Fri 9am–6pm</p>
        </div>

        {/* Social Media */}
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

        {/* Legal Links */}
        <div className="footer-section legal">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
            <li>
              <a href="/refunds">Refund Policy</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bloom Room. All rights reserved.</p>
      </div>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <box-icon name="chevron-up" color="#fff"></box-icon>
      </button>
    </footer>
  );
};

export default Footer;