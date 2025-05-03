import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // No need to import BrowserRouter here
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./components/Cart"; // Assuming Cart is a component
import AdminDashboard from "./pages/AdminDashboard";
import 'boxicons'
import SingleProduct from "./pages/SingleProduct";
// import Footer from "./components/Footer"; // Import Footer
import Blogs from "./pages/Blogs"; // Import Blogs page
import BlogDetails from "./pages/BlogDetails"; // Import BlogDetails page
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Homepage from "./pages/HomePage";
import Wishlist from "./pages/Wishlist"; // Import Wishlist page


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Default landing page */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} /> {/* Add Wishlist route */}
        <Route path="/blogs" element={<Blogs />} /> {/* Add Blogs route */}
        <Route path="/blogs/:id" element={<BlogDetails />} /> {/* Blog Details Route */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
        {/* Add other routes here */}
      </Routes>
      {/* <Footer /> Add Footer here */}

    </>
  );
};

export default App;