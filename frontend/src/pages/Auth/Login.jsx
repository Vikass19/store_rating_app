import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>

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
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
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
          Login
        </button>
      </form>
    </div>
  );
}
