import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css"; // Add styles for the single product page
import { toast } from "react-toastify";

const SingleProduct = ({ setProducts }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: paramProductId } = useParams(); // Get productId from URL params if needed
  const { total, image_url, description, name, id: stateProductId } = location.state || {}; // Get details passed from the Cart page
  const productId = stateProductId || paramProductId; // Use stateProductId or fallback to paramProductId
  const [phone, setPhone] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false); // New state for review submission

  console.log("Location state:", location.state); // Debug: Check the state object
  console.log("Product ID:", productId); // Debug: Check the productId

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://teekinyanjui.pythonanywhere.com/api/reviews/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews.");
      } finally {
        setLoadingReviews(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // Handle adding a review
  const handleAddReview = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add a review.");
      navigate("/login");
      return;
    }

    if (!rating || !comment) {
      toast.error("Please provide a rating and comment.");
      return;
    }

    setSubmittingReview(true); // Set loading state for review submission

    try {
      console.log("Submitting review:", { product_id: productId, rating, comment }); // Debugging log
      const response = await axios.post(
        "https://teekinyanjui.pythonanywhere.com/api/reviews",
        { product_id: productId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Review added successfully!");
        setRating(0); // Reset rating
        setComment(""); // Reset comment

        // Fetch reviews again to get the full details
        const reviewsResponse = await axios.get(
          `https://teekinyanjui.pythonanywhere.com/api/reviews/${productId}`
        );
        setReviews(reviewsResponse.data);

        // Refetch products to update ratings in the Shop page
        const productsResponse = await axios.get("https://teekinyanjui.pythonanywhere.com/products");
        setProducts(productsResponse.data); // Update the products state in Shop.jsx
      } else {
        toast.error("Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error adding review:", error.response || error.message);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Show backend error message
      } else {
        toast.error("Failed to add review. Please try again.");
      }
    } finally {
      setSubmittingReview(false); // Reset loading state
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!phone.startsWith("254")) {
      toast.error("Please enter a valid phone number in the 254 format.");
      return;
    }

    try {
      const response = await axios.post("https://teekinyanjui.pythonanywhere.com/api/mpesa_payment", {
        amount: total, // Use the total amount passed from the Cart page
        phone,
      });

      if (response.status === 200) {
        toast.success(response.data.message); // Show success message from backend
        navigate("/thank-you"); // Redirect to a thank-you page
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  if (!total || !image_url || !description || !name) {
    return <p>Product details not found. Please go back to the cart.</p>;
  }

  return (
    <div className="single-product-container">
      <h2 className="single-product-title">{name}</h2>
      <img src={image_url} alt={name} className="single-product-image" />
      <p className="single-product-description">{description}</p>
      <p className="single-product-total">Total Amount: {total} KES</p>

      {/* Checkout Form */}
      <div className="checkout-form">
        <h3>Enter Your Phone Number</h3>
        <input
          type="text"
          placeholder="254712345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className="review">
              <p>
                <strong>{review.username || "Anonymous"}</strong>{" "}
                ({review.created_at ? new Date(review.created_at).toLocaleString() : "Unknown Date"})
              </p>
              <p>Rating: {review.rating || 0} / 5</p>
              <p>{review.comment || "No comment provided."}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="add-review-form">
          <h4>Add a Review</h4>
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={submittingReview}>
            {submittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;