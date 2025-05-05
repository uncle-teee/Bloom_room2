import { useNavigate } from "react-router-dom";
import "./Blogs.css"; // Import the CSS file for styling
import React, { useEffect, useState } from "react";


const Blogs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace with your actual data fetching logic
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const blogPosts = [
    {
      id: 1,
      title: "The Beauty of Flowers",
      content:
        "Flowers have been a symbol of beauty and love for centuries. Learn how they can brighten your day.",
      author: "Trevor Kinyanjui",
      date: "April 28, 2025",
      image: "images/vase.JPG",
    },
    {
      id: 2,
      title: "How to Care for Your Plants",
      content:
        "Caring for plants can be therapeutic. Discover tips and tricks to keep your plants healthy.",
      author: "Shantaal Dahaboo",
      date: "April 27, 2025",
      image: "images/vase2.JPG",
    },
    {
      id: 3,
      title: "Top 5 Flowers for Every Occasion",
      content:
        "From weddings to birthdays, find out which flowers are perfect for every occasion.",
      author: "Shantaal Dahaboo",
      date: "April 26, 2025",
      image: "images/vase3.JPG",
    },
  ];

  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Our Blogs</h1>
      <div className="blogs-list">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-content">{post.content.slice(0, 100)}...</p>
            <p className="blog-meta">
              By {post.author} on {post.date}
            </p>
            <button
              className="view-details-button"
              onClick={() => navigate(`/blogs/${post.id}`)}
            >
              View More Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;