import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css"; // Import CSS for styling
import "boxicons"; // Import Boxicons for icons

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        <box-icon name={isOpen ? "x" : "menu"} color="#fff"></box-icon>
      </button>
      <nav className="menu-items">
        <Link to="/dashboard">
          <box-icon name="dashboard" color="#ff69b4"></box-icon>
          <span>Dashboard</span>
        </Link>
        <Link to="/products">
          <box-icon name="shopping-bag" color="#ff69b4"></box-icon>
          <span>Products</span>
        </Link>
        <Link to="/cart">
          <box-icon name="cart" color="#ff69b4"></box-icon>
          <span>Cart</span>
        </Link>
        <Link to="/settings">
          <box-icon name="cog" color="#ff69b4"></box-icon>
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideMenu;