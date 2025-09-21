import React, { createContext, useState, useEffect } from "react";
import api, { setToken , login, signup, logout } from "../api/apis";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    if (token && userRaw) {
      setUser(JSON.parse(userRaw));
      api.setToken(token); 
    }
  }, []);

  const loginUser = async (credentials) => {
    const data = await login(credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    api.setToken(data.token);
    setUser(data.user);
    return data;
  };

  const registerUser = async (userData) => {
    const data = await signup(userData);
    return data;
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn("Logout request failed, clearing local data anyway");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      api.setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login: loginUser, logout: logoutUser, register: registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
