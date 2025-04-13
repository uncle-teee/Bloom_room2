import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://TeeKinyanjui.pythonanywhere.com/products"); // Update the URL if needed
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
              <img
                src={product.image_url}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;