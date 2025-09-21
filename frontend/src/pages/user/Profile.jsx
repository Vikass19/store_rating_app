import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/apis"; // use centralized api.js
import AdminDashboard from "../Admin/Dashboard";
import OwnerDashboard from "../Owner/OwnerDashboard";
import UserStoreList from "../user/StoreList";

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
      await api.put("/auth/password", { password });
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
          <div className="p-4 text-gray-600 border rounded">
            No dashboard available
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      {/* User Info */}
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-2"><strong>Name:</strong> {user?.name}</div>
        <div className="mb-2"><strong>Email:</strong> {user?.email}</div>
        <div className="mb-2"><strong>Role:</strong> {user?.role}</div>
      </div>

      {/* Dashboard */}
      {renderDashboard()}

      {/* Change Password */}
      <div className="p-4 border rounded bg-gray-50 max-w-sm">
        <h3 className="font-semibold mb-2">Change Password</h3>
        {msg && <div className="mb-2 text-green-600">{msg}</div>}
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <button
          onClick={changePassword}
          className="bg-blue-600 text-white px-3 py-1 rounded w-full"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
