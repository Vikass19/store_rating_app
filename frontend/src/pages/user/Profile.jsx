import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/apis";
import AdminDashboard from "../Admin/Dashboard";
import OwnerDashboard from "../Owner/OwnerDashboard";
import UserStoreList from "../user/StoreList";
import { FiUser, FiMail, FiLock, FiShield } from "react-icons/fi";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const changePassword = async () => {
    setMsg("");
    setError("");
    if (!password) return setError("Password cannot be empty");
    try {
      await api.put("/auth/users/password", { password });
      setMsg("Password updated successfully");
      setPassword("");
    } catch (e) {
      setError(
        e.response?.data?.message || "Failed to update password. Try again."
      );
    }
  };

  const renderDashboard = () => {
    switch (user?.role) {
      case "SYSTEM_ADMINISTRATOR":
        return <AdminDashboard />;
      case "STORE_OWNER":
        return <OwnerDashboard />;
      case "NORMAL_USER":
        return <UserStoreList />;
      default:
        return (
          <div className="p-4 text-gray-500 border rounded bg-white shadow-sm">
            No dashboard available
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      {/* User Info */}
      <div className="p-6 border rounded-lg bg-white shadow-md flex flex-col space-y-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
        <div className="flex items-center text-gray-800 space-x-2">
          <FiUser className="text-gray-600" />
          <span><strong>Name:</strong> {user?.name}</span>
        </div>
        <div className="flex items-center text-gray-800 space-x-2">
          <FiMail className="text-gray-600" />
          <span><strong>Email:</strong> {user?.email}</span>
        </div>
        <div className="flex items-center text-gray-800 space-x-2">
          <FiShield className="text-gray-600" />
          <span><strong>Role:</strong> {user?.role}</span>
        </div>
      </div>

      {/* Dashboard */}
      {renderDashboard()}

      {/* Change Password */}
      <div className="p-6 border rounded-lg bg-white shadow-md max-w-sm space-y-3">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
          <FiLock className="text-gray-600" />
          <span>Change Password</span>
        </h3>

        {msg && <div className="text-green-600">{msg}</div>}
        {error && <div className="text-red-600">{error}</div>}

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={changePassword}
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
