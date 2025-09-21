import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to get token from localStorage or context
const getAuthHeader = () => {
  const token = localStorage.getItem("token"); // store JWT after login
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ------------------- USER APIs -------------------

// Fetch all users (ADMIN only)
export const fetchUsers = async () => {
  try {
    const res = await api.get("/auth/", { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err.response?.data || err.message);
    throw err;
  }
};

// Create new user (ADMIN only)
export const createUser = async (userData) => {
  try {
    const res = await api.post("/auth/", userData, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error creating user:", err.response?.data || err.message);
    throw err;
  }
};

// Update password (logged-in user)
export const updatePassword = async (newPassword) => {
  try {
    const res = await api.put("/auth/password", { password: newPassword }, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error updating password:", err.response?.data || err.message);
    throw err;
  }
};



// Add helper to set token dynamically
export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};



// ------------------- STORE APIs -------------------

// Fetch all stores
export const fetchStores = async () => {
  try {
    const res = await api.get("/stores/", { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error fetching stores:", err.response?.data || err.message);
    throw err;
  }
};

// Create new store (ADMIN or STORE_OWNER)
export const createStore = async (storeData) => {
  try {
    const res = await api.post("/stores/", storeData, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error creating store:", err.response?.data || err.message);
    throw err;
  }
};

// Fetch store by ID
export const fetchStoreById = async (storeId) => {
  try {
    const res = await api.get(`/stores/${storeId}`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error fetching store:", err.response?.data || err.message);
    throw err;
  }
};

// ------------------- RATING APIs -------------------

// Submit a rating (USER)
export const submitRating = async (storeId, rating) => {
  try {
    const res = await api.post("/stores/rating", { storeId, value: rating }, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error submitting rating:", err.response?.data || err.message);
    throw err;
  }
};

// Fetch ratings for a store
export const fetchStoreRatings = async (storeId) => {
  try {
    const res = await api.get(`/stores/${storeId}/ratings`, { headers: getAuthHeader() });
    return res.data;
  } catch (err) {
    console.error("Error fetching store ratings:", err.response?.data || err.message);
    throw err;
  }
};

// ------------------- AUTH APIs -------------------

// Signup
export const signup = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err;
  }
};

// Login
export const login = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data; // usually contains token
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await api.post("/auth/logout", {}, { headers: getAuthHeader() });
    localStorage.removeItem("token");
    return res.data;
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
};

export default api;
