import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { createUser } from "../../api/apis";

export default function AddUser({ onUserAdded }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "Normal User"
  });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const roleMap = {
    "Normal User": "NORMAL_USER",
    "Store Owner": "STORE_OWNER",
    "Admin": "SYSTEM_ADMINISTRATOR"
  };

  const handleAddUser = async () => {
    try {
      const payload = { ...newUser, role: roleMap[newUser.role] || newUser.role };
      await createUser(payload);
      setMsg({ text: "User added successfully!", type: "success" });
      setNewUser({ name: "", email: "", password: "", address: "", role: "Normal User" });
      if (onUserAdded) onUserAdded();
    } catch (err) {
      console.error("Add user error:", err.response?.data || err.message);
      setMsg({
        text: err.response?.data?.message || "Failed to add user",
        type: "error"
      });
    }
  };

  return (
    <section className="p-6 border rounded-lg bg-white shadow-md space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FiUserPlus className="text-black" size={22} />
        <h3 className="font-semibold text-gray-900 text-lg">Add New User</h3>
      </div>

      {msg.text && (
        <div
          className={`p-3 rounded ${
            msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {["name", "email", "password", "address"].map((k) => (
          <input
            key={k}
            type={k === "password" ? "password" : "text"}
            placeholder={k[0].toUpperCase() + k.slice(1)}
            className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            value={newUser[k]}
            onChange={(e) => setNewUser({ ...newUser, [k]: e.target.value })}
          />
        ))}

        <select
          className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="Normal User">Normal User</option>
          <option value="Store Owner">Store Owner</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <button
        onClick={handleAddUser}
        className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
      >
        <FiUserPlus /> Add User
      </button>
    </section>
  );
}
