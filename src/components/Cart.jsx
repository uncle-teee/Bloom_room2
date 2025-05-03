import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Cart.css"; // Import the CSS file for styling

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // State to store cart items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage
      if (!token) {
        setError("You need to log in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://teekinyanjui.pythonanywhere.com/cart/${JSON.parse(localStorage.getItem("user")).id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );
        setCart(response.data); // Set cart items
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Handle updating the quantity of an item in the cart
  const handleUpdateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to modify your cart.");
      return;
    }

    try {
      await axios.put(
        `https://teekinyanjui.pythonanywhere.com/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the cart state with the new quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
            : item
        )
      );
      toast.success("Quantity updated successfully!");
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update quantity.");
    }
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to modify your cart.");
      return;
    }

    try {
      await axios.delete(`https://teekinyanjui.pythonanywhere.com/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update cart items after removal
      setCart(cart.filter((item) => item.product_id !== productId));
      toast.success("Item removed from cart!");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      toast.error("Failed to remove item from cart.");
    }
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) {
    return <div className="loading">Loading your cart...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="cart-container">
      <ToastContainer /> {/* Add ToastContainer */}
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Start shopping!</p>
      ) : (
        <div className="cart-content">
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.product_id} className="cart-item">
                <img src={item.image_url} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    {item.price} KES x {item.quantity} = {item.price * item.quantity} KES
                  </p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.product_id, Math.max(1, item.quantity - 1))
                      }
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() =>
                      navigate(`/product/${item.product_id}`, {
                        state: {
                          total: item.price * item.quantity,
                          image_url: item.image_url,
                          description: item.description,
                          name: item.name,
                        },
                      })
                    }
                    className="cart-item-view-details"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.product_id)}
                    className="cart-item-remove"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total:</span>
            <span>{calculateTotal()} KES</span>
          </div>
          {/* <button className="checkout-button" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button> */}
        </div>
      )}
      <Link to="/shop" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;