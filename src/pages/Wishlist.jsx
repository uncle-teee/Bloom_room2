import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Wishlist.css";
import axios from "axios";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const token = localStorage.getItem("token"); // Retrieve access token from localStorage
  const user = localStorage.getItem("user"); // Retrieve userId from localStorage
  const userId = user?.id;

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!token || !userId) return;
      try {
        const response = await axios.get("https://teekinyanjui.pythonanywhere.com/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist products");
        }
        const data = await response.json();
        console.log("Fetched Wishlist Products:", data);
        setWishlistProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load wishlist. Please try again later.");
      }
    };

    fetchWishlistProducts();
  }, [token, userId]);

  const removeFromWishlist = async (favoriteId) => {
    try {
      const response = await fetch(
        `https://teekinyanjui.pythonanywhere.com/api/favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }
      setWishlistProducts(wishlistProducts.filter((product) => product.favorite_id !== favoriteId));
      toast.success("Removed from wishlist.");
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove product from wishlist.");
    }
  };

  if (wishlistProducts.length === 0) {
    return <p className="empty-wishlist">Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-container">
      <ToastContainer />
      <h1 className="wishlist-title">Your Wishlist</h1>
      <div className="wishlist-grid">
        {wishlistProducts.map((product) => (
          <div key={product.favorite_id} className="wishlist-card">
            <img src={product.image_url} alt={product.name} className="wishlist-image" />
            <h3 className="wishlist-name">{product.name}</h3>
            <p className="wishlist-description">{product.description}</p>
            <p className="wishlist-price">KES {product.price.toFixed(2)}</p>
            <button
              className="remove-wishlist-button"
              onClick={() => removeFromWishlist(product.favorite_id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
