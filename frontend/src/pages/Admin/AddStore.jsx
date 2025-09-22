import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { createStore } from "../../api/apis";

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
      await createStore(form);
      setMsg({ text: "Store added successfully!", type: "success" });
      setForm({ name: "", email: "", address: "", ownerId: "" });
      if (onStoreAdded) onStoreAdded();
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
    <section className="p-6 border rounded-lg shadow-md bg-white space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FiShoppingBag className="text-black" size={22} />
        <h3 className="font-semibold text-gray-900 text-lg">Add New Store</h3>
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

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          name="name"
          placeholder="Store Name"
          className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Store Email"
          className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="ownerId"
          placeholder="Owner ID"
          className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          value={form.ownerId}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-1 md:col-span-4 mt-2 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
        >
          <FiShoppingBag />
          {loading ? "Adding..." : "Add Store"}
        </button>
      </form>
    </section>
  );
}
