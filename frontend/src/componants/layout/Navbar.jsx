import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const links = [
    { role: "NORMAL_USER", label: "Stores", path: "/stores" },
    { role: "STORE_OWNER", label: "Owner Dashboard", path: "/owner/dashboard" },
    { role: "SYSTEM_ADMINISTRATOR", label: "Admin Dashboard", path: "/admin/dashboard" },
    { role: "ANY", label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-gray-100">
        store rating app
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-gray-200 font-medium">
          {links.map(
            (link) =>
              (link.role === "ANY" || user?.role === link.role) && (
                <Link
                  key={link.label}
                  to={link.path}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
          )}
        </div>

        {/* User actions (desktop) */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col p-4 space-y-3">
            {links.map(
              (link) =>
                (link.role === "ANY" || user?.role === link.role) && (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
            )}

            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
