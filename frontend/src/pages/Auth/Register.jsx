import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("NORMAL_USER");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    try {
      await register({ ...form, role });
      setMsg({ text: "Registration successful! Redirecting to login…", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Signup failed",
        type: "error"
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Register</h2>

      {msg.text && (
        <div
          className={`p-2 mb-3 rounded ${
            msg.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={submit} className="space-y-3">
        {/* Role Selector */}
        <label className="block">
          <span className="font-medium text-gray-900">Select Role</span>
          <select
            className="w-full p-2 border mt-1 rounded text-gray-900"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="NORMAL_USER">Normal User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="SYSTEM_ADMINISTRATOR">System Administrator</option>
          </select>
        </label>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded text-gray-900"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded text-gray-900"
          required
        />

        {/* Address required for NORMAL_USER & SYSTEM_ADMINISTRATOR */}
        {(role === "NORMAL_USER" || role === "SYSTEM_ADMINISTRATOR") && (
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full p-2 border rounded text-gray-900"
            required
          />
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded text-gray-900"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
