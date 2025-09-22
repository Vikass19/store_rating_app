// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api, { setToken, login, signup, logout } from "../api/apis";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore session if token/user are already in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    if (token && userRaw) {
      try {
        setUser(JSON.parse(userRaw));
        setToken(token);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Login
  const loginUser = async (credentials) => {
    const data = await login(credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // Register
  const registerUser = async (userData) => {
    return await signup(userData);
  };

  // Logout
  const logoutUser = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn("Logout request failed, clearing local data anyway");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
