import React from "react";
import { Routes, Route } from "react-router-dom"; // No need to import BrowserRouter here
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Flower App</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Add other routes here */}
      </Routes>
    </>
  );
};

export default App;