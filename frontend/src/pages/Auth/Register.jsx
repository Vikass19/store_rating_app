import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiHome, FiLock, FiShield } from "react-icons/fi";

export default function Register() {
  const [role, setRole] = useState("NORMAL_USER");
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({ text: "", type: "" });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    
    if (!form.name || form.name.length < 20 || form.name.length > 60)
      newErrors.name = "Name must be 20-60 characters.";

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email))
      newErrors.email = "Invalid email address.";

    
    if ((role === "NORMAL_USER" || role === "SYSTEM_ADMINISTRATOR") && form.address.length > 400)
      newErrors.address = "Address cannot exceed 400 characters.";

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!form.password || !passwordRegex.test(form.password))
      newErrors.password =
        "Password must be 8-16 characters, include at least one uppercase letter and one special character.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    if (!validate()) return;

    try {
      await register({ ...form, role });
      setMsg({ text: "Registration successful! Redirecting to login…", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Signup failed", type: "error" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Register</h2>
      {msg.text && (
        <div
          className={`p-3 mb-4 rounded font-medium text-center ${
            msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        {/* Role Selector */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-900 mb-1 flex items-center gap-2">
            <FiShield /> Select Role
          </label>
          <select
            className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="NORMAL_USER">Normal User</option>
            <option value="SYSTEM_ADMINISTRATOR">System Administrator</option>
          </select>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-black">
            <FiUser className="text-gray-500" />
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full outline-none text-gray-900"
              required
            />
          </div>
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-black">
            <FiMail className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full outline-none text-gray-900"
              required
            />
          </div>
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Address */}
        {(role === "NORMAL_USER" || role === "SYSTEM_ADMINISTRATOR") && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-black">
              <FiHome className="text-gray-500" />
              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full outline-none text-gray-900"
                required
              />
            </div>
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-black">
            <FiLock className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full outline-none text-gray-900"
              required
            />
          </div>
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
