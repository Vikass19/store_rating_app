import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componants/layout/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/user/Profile";
import StoreList from "./pages/user/StoreList";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);

  
  const redirectIfAuthenticated = (element) => (user ? <Navigate to="/profile" replace /> : element);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={<Navigate to={user ? "/profile" : "/login"} replace />}
          />

          {/* Public routes */}
          <Route path="/login" element={redirectIfAuthenticated(<Login />)} />
          <Route path="/register" element={redirectIfAuthenticated(<Register />)} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute allowedRoles={["NORMAL_USER", "SYSTEM_ADMINISTRATOR", "STORE_OWNER"]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["NORMAL_USER"]} />}>
            <Route path="/stores" element={<StoreList />} />
          </Route>

         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}
