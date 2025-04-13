import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // State for orders
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null, // Updated to handle file uploads
  });
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited

  // Fetch all products and orders when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await axios.get(
          "https://TeeKinyanjui.pythonanywhere.com/products"
        );
        setProducts(productsResponse.data);

        // Fetch orders
        const ordersResponse = await axios.get(
          "https://TeeKinyanjui.pythonanywhere.com/orders"
        );
        setOrders(ordersResponse.data);

        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false); // Stop loading
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image); // Append the image file

    try {
      const response = await axios.post(
        "https://TeeKinyanjui.pythonanywhere.com/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts([...products, response.data.product]); // Add the new product to the list
      setNewProduct({ name: "", description: "", price: "", category: "", image: null });
      setError("");
    } catch (err) {
      setError("Failed to add product.");
      console.error(err);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://TeeKinyanjui.pythonanywhere.com/products/${productId}`
      );
      setProducts(products.filter((product) => product.id !== productId));
      setError("");
    } catch (err) {
      setError("Failed to delete product.");
      console.error(err);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product); // Set the product to be edited
    setNewProduct({ ...product, image: null }); // Populate the form with the product's details
  };

  // Handle saving an edited product
  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    if (newProduct.image) {
      formData.append("image", newProduct.image); // Append the image file if it exists
    }

    try {
      await axios.put(
        `https://TeeKinyanjui.pythonanywhere.com/products/${editingProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? { ...newProduct, id: product.id } : product
        )
      );
      setEditingProduct(null); // Clear the editing state
      setNewProduct({ name: "", description: "", price: "", category: "", image: null });
      setError("");
    } catch (err) {
      setError("Failed to update product.");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Error Message */}
      {error && <div className="text-danger">{error}</div>}

      {/* Add/Edit Product Form */}
      <div className="mb-4">
        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={editingProduct ? handleSaveEdit : handleAddProduct}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {editingProduct ? "Save Changes" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Products List */}
      <div className="mb-5">
        <h3>Products</h3>
        <ul className="list-group">
          {products.map((product) => (
            <li className="list-group-item" key={product.id}>
              <strong>{product.name}</strong> - ${product.price}
              <button
                className="btn btn-warning btn-sm float-right ml-2"
                onClick={() => handleEditProduct(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm float-right"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Orders Section */}
      <div>
        <h3>Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="list-group">
            {orders.map((order) => (
              <li className="list-group-item" key={order.id}>
                <strong>Order ID:</strong> {order.id} <br />
                <strong>User ID:</strong> {order.user_id} <br />
                <strong>Total:</strong> ${order.total} <br />
                <strong>Date:</strong> {order.created_at}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;