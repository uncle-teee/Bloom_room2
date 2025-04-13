import axios from "axios";

const API = axios.create({
  baseURL: "http://TeeKinyanjui.pythonanywhere.com", // Replace with your Flask backend URL
});

// Authentication APIs
export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);

// Product APIs
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);