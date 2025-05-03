import React from "react";
import "./About.css";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>
          Bringing beauty and joy to your life with handpicked flowers and heartfelt arrangements.
        </p>
      </div>

      {/* Main Content */}
      <div className="about-main">
        {/* Left Column: Text */}
        <div className="about-text">
          <h2>Welcome to Bloom Room</h2>
          <p>
            At Bloom Room, we are passionate about flowers and dedicated to making your moments special. Whether you're
            celebrating a milestone, expressing love, or simply brightening someone's day, our flowers are handpicked
            and arranged with care.
          </p>
          <p>
            Our mission is to deliver happiness and beauty to your doorstep. We believe in the power of flowers to
            transform spaces, uplift spirits, and create lasting memories.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="about-image-container">
          <img src="images/BloomRoom Floral Logo Design.png" alt="About Us" className="about-image" />
        </div>
      </div>

      {/* Mission, Vision, and Values */}
      <div className="about-values">
        <div className="value-item">
          <h3>Our Mission</h3>
          <p>
            To bring joy and beauty to every occasion with fresh, high-quality flowers and exceptional service.
          </p>
        </div>
        <div className="value-item">
          <h3>Our Vision</h3>
          <p>
            To be the leading provider of floral arrangements, spreading happiness and love across the globe.
          </p>
        </div>
        <div className="value-item">
          <h3>Our Values</h3>
          <ul>
            <li>🌸 Quality: We ensure every flower is fresh and beautiful.</li>
            <li>🌸 Care: Every arrangement is crafted with love and attention to detail.</li>
            <li>🌸 Customer Satisfaction: Your happiness is our priority.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;