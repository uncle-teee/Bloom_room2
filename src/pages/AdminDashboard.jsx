import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, blogsResponse] = await Promise.all([
          axios.get("https://TeeKinyanjui.pythonanywhere.com/products"),
          axios.get("https://TeeKinyanjui.pythonanywhere.com/blogs"),
        ]);
        setProducts(productsResponse.data);
        setBlogs(blogsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        toast.error("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
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
      toast.success("Product added successfully!");
    } catch (err) {
      setError("Failed to add product.");
      toast.error("Failed to add product.");
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
      const response = await axios.put(
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
          product.id === currentProduct.id ? response.data.product : product
        )
      );
      setShowEditProductModal(false);
      setCurrentProduct(null);
      toast.success("Product updated successfully!");
    } catch (err) {
      setError("Failed to update product.");
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`https://TeeKinyanjui.pythonanywhere.com/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (err) {
      setError("Failed to delete product.");
      toast.error("Failed to delete product.");
    }
  };

  // Blog Handlers
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://TeeKinyanjui.pythonanywhere.com/blogs", {
        title: newBlog.title,
        content: newBlog.content,
      });
      setBlogs([...blogs, response.data]);
      setShowAddBlogModal(false);
      setNewBlog({ title: "", content: "" });
      toast.success("Blog added successfully!");
    } catch (error) {
      setError("Failed to add blog.");
      toast.error("Failed to add blog.");
    }
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setShowEditBlogModal(true);
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://TeeKinyanjui.pythonanywhere.com/blogs/${currentBlog.id}`,
        {
          title: currentBlog.title,
          content: currentBlog.content,
        }
      );
      setBlogs(
        blogs.map((blog) =>
          blog.id === currentBlog.id ? { ...blog, title: currentBlog.title, content: currentBlog.content } : blog
        )
      );
      setShowEditBlogModal(false);
      setCurrentBlog(null);
      toast.success("Blog updated successfully!");
    } catch (error) {
      setError("Failed to update blog.");
      toast.error("Failed to update blog.");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`https://TeeKinyanjui.pythonanywhere.com/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== blog.id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      setError("Failed to delete blog.");
      toast.error("Failed to delete blog.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditProductModal) {
      setCurrentProduct({ ...currentProduct, [name]: value });
    } else if (showEditBlogModal) {
      setCurrentBlog({ ...currentBlog, [name]: value });
    } else if (showAddBlogModal) {
      setNewBlog({ ...newBlog, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

    const handleImageChange = (e) => {
        setNewProduct({...newProduct, image: e.target.files[0]});
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
          <li className="sidebar-item">
            <a href="#blogs">Manage Blogs</a>
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
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="blogs" className="section">
          <div className="section-header">
            <h3>Blogs</h3>
            <button className="add-button" onClick={() => setShowAddBlogModal(true)}>
              + Add Blog
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditBlog(blog)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteBlog(blog.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

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

        {showAddBlogModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Blog</h3>
              <form onSubmit={handleAddBlog}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    name="content"
                    value={newBlog.content}
                    onChange={handleInputChange}
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
                    onClick={() => setShowAddBlogModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditBlogModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Blog</h3>
              <form onSubmit={handleUpdateBlog}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentBlog.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    name="content"
                    value={currentBlog.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Update
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowEditBlogModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;