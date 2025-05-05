import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; // Importing Slider for testimonials
import "boxicons"; // Import Boxicons for icons

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://TeeKinyanjui.pythonanywhere.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);

        // Set featured products (e.g., first 4 products)
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading homepage...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Brighten Your Day with Bloom Room!</h1>
          <p className="hero-subtitle">
            Discover the beauty of flowers and bring joy to your loved ones.
          </p>
          <Link to="/shop" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.slice(0, 6).map((product) => ( // Display 6 products
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">KES {product.price.toFixed(2)}</p>
              <Link to={`/shop`} className="view-product-button">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <Slider
          className="categories-carousel"
          autoplay={true}
          autoplaySpeed={1800}
          infinite={true}
          slidesToShow={4} // Number of visible slides
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 768, // For tablets and smaller screens
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480, // For mobile screens
              settings: {
                slidesToShow: 2,
              },
            },
          ]}
        >
          {categories.map((category, index) => {
            // Map category names to specific image paths
            const categoryImages = {
              Roses: "/images/rose1.JPG",
              Lilies: "/images/lily1.JPG",
              Orchids: "/images/orchid1.JPG",
              Mixed: "/images/mixed1.JPG",
              Sunflowers: "/images/sunflower1.JPG",
              Advanced: "/images/advanced.JPG",
              Gifts: "/images/gift1.JPG",
              Tulips: "/images/tulip.JPG",
              Sunflower: "/images/sunflower2.JPG",
            };

            return (
              <div key={index} className="category-card">
                <div
                  className="category-image"
                  style={{
                    backgroundImage: `url(${categoryImages[category] || "/images/categories/default.jpg"})`, // Fallback to default image
                  }}
                ></div>
                <h3 className="category-name">{category}</h3>
              </div>
            );
          })}
        </Slider>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-slider">
          {[
            {
              text: "Such a wonderful experience! The website was easy to use, the flower selection was beautiful, and the checkout was quick. My anniversary roses looked even better than the photos. Thank you for making it so special!",
              author: "Carl Kerosi",
            },
            {
              text: "Amazing service and stunning flowers. My go-to shop for all occasions!",
              author: "Kevin Munjogu",
            },
            {
              text: "Bloom Room never disappoints. The quality and care are unmatched.",
              author: "Sarah Lee",
            },
            {
              text: "The flowers were absolutely stunning! I ordered a bouquet for my sister’s graduation, and she couldn’t stop smiling. The packaging was lovely, and they arrived right on time. I’ll definitely be ordering again!",
              author: "Beth Wanjiru",
            },
            {
              text: "🌸Absolutely beautiful flowers! I ordered a birthday bouquet and it was even more gorgeous than I imagined. Fast delivery too!",
              author: "Vanessa Wangare",
            },
          ].map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p>"{testimonial.text}"</p>
              <h4>- {testimonial.author}</h4>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Homepage;