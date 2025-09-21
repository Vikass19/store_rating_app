import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // clear token & session
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide text-gray-100">
          MyApp
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-gray-200 font-medium">
          {user?.role === "NORMAL_USER" && (
            <Link
              to="/stores"
              className="hover:text-white transition-colors duration-200"
            >
              Stores
            </Link>
          )}
          {user?.role === "STORE_OWNER" && (
            <Link
              to="/owner/dashboard"
              className="hover:text-white transition-colors duration-200"
            >
              Owner Dashboard
            </Link>
          )}
          {user?.role === "SYSTEM_ADMINISTRATOR" && (
            <Link
              to="/admin/dashboard"
              className="hover:text-white transition-colors duration-200"
            >
              Admin Dashboard
            </Link>
          )}
          {user && (
            <Link
              to="/profile"
              className="hover:text-white transition-colors duration-200"
            >
              Profile
            </Link>
          )}
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
