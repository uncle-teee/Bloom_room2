import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("token"); // Retrieve access token from localStorage
  const userId = localStorage.getItem("user_id"); // Retrieve userId from localStorage
  const navigate = useNavigate();

  // Fetch products and wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://teekinyanjui.pythonanywhere.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const uniqueCategories = ["All", ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      if (!token || !userId) return; // Skip fetching wishlist if token or userId is not available
      try {
        setLoadingWishlist(true);
        const response = await fetch(`https://teekinyanjui.pythonanywhere.com/api/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the access token in the request
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        setWishlist(data.map((item) => item.product_id)); // Map to product IDs
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load wishlist. Please try again later.");
      } finally {
        setLoadingWishlist(false);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, [token, userId]);

  // Handle category change
  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setFilteredProducts(
        category === "All"
          ? products
          : products.filter((product) => product.category === category)
      );
    },
    [products]
  );

  // Handle adding to cart
  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.error("Please log in first to add products to cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://teekinyanjui.pythonanywhere.com/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the access token in the request
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product to cart");
      }

      const data = await response.json();
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error adding product to cart");
    }
  };

  // Handle toggling wishlist
  const toggleWishlist = async (productId) => {
    if (!token) {
      toast.error("Please log in to manage your wishlist.");
      navigate("/login");
      return;
    }
  
    try {
      const isInWishlist = wishlist.includes(productId);
  
      if (!isInWishlist) {
        // Add to wishlist
        const response = await fetch("https://teekinyanjui.pythonanywhere.com/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to add product to wishlist");
        }
        const data = await response.json();
        console.log("Added to Wishlist:", data); // Debugging log
  
        // Refetch wishlist to sync with Wishlist page
        const wishlistResponse = await fetch(`https://teekinyanjui.pythonanywhere.com/api/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedWishlist = await wishlistResponse.json();
        setWishlist(updatedWishlist.map((item) => item.product_id));
        toast.success("Added to wishlist.");
      }
    } catch (err) {
      console.error("Error in toggleWishlist:", err);
      toast.error(err.message || "Failed to update wishlist.");
    }
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    if (rating === null || rating === undefined) {
      return <span className="product-rating">No rating yet</span>;
    }
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <span className="product-rating">
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="loading">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="product-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="shop-container">
      <ToastContainer />
      <h1 className="shop-title">Shop</h1>

      {/* Category Filter */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-rating">{renderStars(product.rating || 0)}</p>
            <p className="product-price">KES {product.price.toFixed(2)}</p>
            <div className="product-actions">
              <button
                className={`wishlist-button ${wishlist.includes(product.id) ? "in-wishlist" : ""}`}
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.includes(product.id) ? "💖 Wishlist" : "🤍 Wishlist"}
              </button>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;