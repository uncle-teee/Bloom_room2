import React, { useState } from "react";
import "./Contact.css";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }

    setSuccessMessage("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions or need assistance? We're here to help. Reach out to us
          anytime!
        </p>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        {/* Left Column: Contact Information */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            We'd love to hear from you! Whether you have a question, need
            assistance with an order, or want a custom floral arrangement, our
            team is here to help.
          </p>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <strong> Location:</strong> The Bazaar, Moi Avenue, floor M1 unit
              6 room 8
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <strong> Phone:</strong> 0708 708798
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <strong> Email:</strong> contact@BloomRoom.co.ke
            </li>
            <li>
              <i className="fas fa-globe"></i>
              <strong> Website:</strong>{" "}
              <a
                href="https://BloomRoom.co.ke"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://BloomRoom.co.ke
              </a>
            </li>
          </ul>
          <h3>Business Hours</h3>
          <ul>
            <li>
              <i className="fas fa-clock"></i> Monday - Saturday: 8:30AM -
              6:30PM
            </li>
            <li>
              <i className="fas fa-clock"></i> Sunday & Public Holidays: Closed
            </li>
          </ul>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="contact-input"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="contact-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                className="contact-textarea"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit" className="contact-button">
              Send Message
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>

      {/* Google Map */}
      <div className="contact-map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.123456789!2d36.821946!3d-1.283253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d7c5b5b5b5%3A0x123456789abcdef!2sThe%20Bazaar%2C%20Moi%20Avenue%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1681234567890!5m2!1sen!2ske"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <Footer /> {/* Include the Footer component */} 
    </div>
  );
};

export default Contact;