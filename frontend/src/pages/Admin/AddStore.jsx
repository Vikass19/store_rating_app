// src/components/admin/AddStore.jsx
import React, { useState } from "react";
import api from "../../api/apis";

export default function AddStore({ onStoreAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      
      await api.createStore(form);
      setMsg({ text: "Store added successfully!", type: "success" });
      setForm({ name: "", email: "", address: "", ownerId: "" });
      if (onStoreAdded) onStoreAdded(); // refresh parent dashboard data
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Failed to add store",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2 text-gray-900">Add New Store</h3>
      {msg.text && (
        <div
          className={`mb-2 p-2 rounded ${
            msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}
      <form onSubmit={submit} className="grid grid-cols-4 gap-2">
        <input
          name="name"
          className="border p-2 rounded"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="border p-2 rounded"
          placeholder="Store Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          className="border p-2 rounded"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="ownerId"
          className="border p-2 rounded"
          placeholder="Owner ID"
          value={form.ownerId}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="col-span-4 mt-2 bg-gray-900 text-white py-2 rounded hover:bg-black transition"
        >
          {loading ? "Adding..." : "Add Store"}
        </button>
      </form>
    </div>
  );
}
