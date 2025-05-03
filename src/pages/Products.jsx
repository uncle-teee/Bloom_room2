import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import Carousel from "./Carousel";
import "boxicons"; // Import Boxicons
import Footer from "../components/Footer"; // Import Footer


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://TeeKinyanjui.pythonanywhere.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <Carousel />
      <div className="products-container">
        <h2 className="products-title">Available products</h2>
        <div className="search-bar">
          <box-icon name="search" color="#ff69b4"></box-icon>
          <input
            type="text"
            placeholder="Search product by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image_url} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description.slice(0, 70)}...</p>
                  <p className="price">{product.price} KES</p>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default Products;