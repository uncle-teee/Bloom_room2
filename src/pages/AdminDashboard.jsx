import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://TeeKinyanjui.pythonanywhere.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image);

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
      setProducts([...products, response.data.product]);
      setShowAddProductModal(false);
      setNewProduct({ name: "", price: "", stock: "", category: "", image: null });
    } catch (err) {
      setError("Failed to add product.");
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowEditProductModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("price", currentProduct.price);
    formData.append("stock", currentProduct.stock);
    formData.append("category", currentProduct.category);
    if (currentProduct.image) {
      formData.append("image", currentProduct.image);
    }

    try {
      await axios.put(
        `https://TeeKinyanjui.pythonanywhere.com/products/${currentProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? currentProduct : product
        )
      );
      setShowEditProductModal(false);
      setCurrentProduct(null);
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditProductModal) {
      setCurrentProduct({ ...currentProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    if (showEditProductModal) {
      setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="admin-title">Admin</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a href="#products">Manage Products</a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <section id="products" className="section">
          <div className="section-header">
            <h3>Products</h3>
            <button
              className="add-button"
              onClick={() => setShowAddProductModal(true)}
            >
              + Add Product
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock || "N/A"}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add Product Modal */}
        {showAddProductModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Product</h3>
              <form onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowAddProductModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditProductModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Product</h3>
              <form onSubmit={handleUpdateProduct}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={currentProduct.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Update
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowEditProductModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;