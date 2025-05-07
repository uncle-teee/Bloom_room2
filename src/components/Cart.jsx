import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import { debounce } from "lodash"; // Import lodash for debouncing

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { total, setTotal} = useState("")
  const [phone, setPhone] = useState("");

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
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
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(response.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Debounced function to update quantity
  const debouncedUpdateQuantity = debounce(async (productId, newQuantity) => {
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
  }, 300);

  const handleUpdateQuantity = (productId, newQuantity) => {
    debouncedUpdateQuantity(productId, newQuantity);
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

      setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
      toast.success("Item removed from cart!");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      toast.error("Failed to remove item from cart.");
    }
  };

  // Memoized calculation of total price
  const calculateTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

   // Handle checkout
   const handleCheckout = async () => {
    // if (!phone.startsWith("254")) {
    //   toast.error("Please enter a valid phone number in the 254 format.");
    //   return;
    // }
    console.log(total, phone)
    toast.success("Please wait");
    let data = new FormData();
    data.append("amount", total); // Use the total amount passed from the Cart page
    data.append("phone", phone); // Use the phone number from the input

    try {
      const response = await axios.post("https://teekinyanjui.pythonanywhere.com/api/mpesa_payment", data);

      if (response.status === 200) {
        toast.success(response.data.message); // Show success message from backend
        // navigate("/thank-you"); // Redirect to a thank-you page
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };


  if (loading) {
    return (
      <div className="loading">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="product-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;


  return (
    <div className="cart-container">
      <ToastContainer />
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Start shopping!</p>
      ) : (
        <div className="cart-products">
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.product_id} className="cart-item">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-item-image"
                  loading="lazy" // Lazy load images
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    {item.price} KES 
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
                    onClick={() => handleRemoveFromCart(item.product_id)}
                    className="cart-item-remove"
                  >
                    <span className="icon-closed">
                      <box-icon name="trash" type="solid" color="#ff69b4"></box-icon>
                    </span>
                    <span className="icon-open">
                    <box-icon name='trash' animation='tada' color='#ff69b4' ></box-icon>
                    </span>
                    Remove
                  </button>
                </div>

              </li>
            ))}
          </ul>
          <br />
          <div className="cart-total">
            <span>Total:</span>
            <span>{calculateTotal} KES</span>
         </div>
          <div className="checkout-form">
            <h3>Enter Your Phone Number</h3>
            <input
              type="text"
              placeholder="254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <Link to="/shop" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;