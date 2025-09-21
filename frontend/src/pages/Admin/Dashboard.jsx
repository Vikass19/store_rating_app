import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAdminData from "../../hooks/useAdmin";
import AddStore from "./AddStore";
import api from "../../api/apis";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const { stats, users, stores, loading, refresh } = useAdminData();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "NORMAL_USER"
  });
  const [filter, setFilter] = useState({ name: "", email: "", address: "", role: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleAddUser = async () => {
    try {
      await api.createUser(newUser);
      setMsg({ text: "User added successfully!", type: "success" });
      setNewUser({ name: "", email: "", password: "", address: "", role: "NORMAL_USER" });
      refresh();
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Failed to add user",
        type: "error"
      });
    }
  };

  const match = (text, value) => text?.toLowerCase().includes(value.toLowerCase());

  const filteredUsers = users.filter(u =>
    match(u.name, filter.name) &&
    match(u.email, filter.email) &&
    match(u.address, filter.address) &&
    match(u.role, filter.role)
  );

  const filteredStores = stores.filter(s =>
    match(s.name, filter.name) &&
    match(s.email, filter.email) &&
    match(s.address, filter.address)
  );

  if (loading) return <p className="p-4 text-gray-700">Loading dashboard…</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {["Users", "Stores", "Ratings"].map((label, i) => (
          <div
            key={label}
            className="p-4 border rounded text-center bg-gray-100 text-gray-900"
          >
            {`Total ${label}: ${Object.values(stats)[i]}`}
          </div>
        ))}
      </div>

      
      <section className="p-4 border rounded space-y-2 bg-white">
        <h3 className="font-semibold text-gray-900">Add New User</h3>
        {msg.text && (
          <div
            className={`p-2 rounded ${
              msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {msg.text}
          </div>
        )}
        <div className="grid grid-cols-5 gap-2">
          {["name", "email", "password", "address"].map(k => (
            <input
              key={k}
              type={k === "password" ? "password" : "text"}
              name={k}
              placeholder={k[0].toUpperCase() + k.slice(1)}
              className="border p-2 rounded text-gray-900"
              value={newUser[k]}
              onChange={e => setNewUser({ ...newUser, [k]: e.target.value })}
            />
          ))}
          <select
            className="border p-2 rounded text-gray-900"
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="NORMAL_USER">Normal User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="SYSTEM_ADMINISTRATOR">Admin</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
        >
          Add User
        </button>
      </section>

    
      <AddStore onStoreAdded={refresh} />

      {/* Filters */}
      <section className="p-4 border rounded grid grid-cols-4 gap-2 bg-gray-50">
        {["name", "email", "address", "role"].map(k => (
          <input
            key={k}
            placeholder={k[0].toUpperCase() + k.slice(1)}
            className="border p-2 rounded text-gray-900"
            value={filter[k]}
            onChange={e => setFilter({ ...filter, [k]: e.target.value })}
          />
        ))}
      </section>

      
      <DataTable
        title="Users"
        headers={["Name", "Email", "Address", "Role", "Rating"]}
        rows={filteredUsers.map(u => [
          u.name,
          u.email,
          u.address,
          u.role,
          u.role === "STORE_OWNER" ? u.rating || 0 : "-"
        ])}
      />

    
      <DataTable
        title="Stores"
        headers={["Name", "Email", "Address", "Rating"]}
        rows={filteredStores.map(s => [
          s.name,
          s.email,
          s.address,
          s.ratings?.length
            ? (s.ratings.reduce((a, b) => a + b.value, 0) / s.ratings.length).toFixed(1)
            : 0
        ])}
      />
    </div>
  );
}


function DataTable({ title, headers, rows }) {
  return (
    <section>
      <h3 className="font-semibold mb-2 text-gray-900">{title}</h3>
      <div className="overflow-x-auto border rounded bg-white">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              {headers.map(h => (
                <th key={h} className="px-2 py-1 border text-gray-900">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {r.map((cell, j) => (
                  <td key={j} className="px-2 py-1 border text-gray-900">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
