import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({ text: "", type: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email))
      newErrors.email = "Invalid email address";

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!form.password || !passwordRegex.test(form.password))
      newErrors.password =
        "Password must be 8-16 chars, include 1 uppercase & 1 special char";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    if (!validate()) return;

    try {
      await login(form);
      setMsg({ text: "Login successful! Redirecting…", type: "success" });
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Login failed",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Login</h2>

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
          Login
        </button>
      </form>
    </div>
  );
}
