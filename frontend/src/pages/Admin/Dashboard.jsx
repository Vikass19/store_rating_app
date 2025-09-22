import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAdminData from "../../hooks/useAdmin";
import AddStore from "./AddStore";
import AddUser from "./AddUser";
import { FiUsers, FiShoppingBag, FiStar, FiLogOut } from "react-icons/fi"; // replaced FiStore


export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const { stats, users, stores, loading, refresh } = useAdminData();
  const [filter, setFilter] = useState({ name: "", email: "", address: "", role: "" });

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
    <div className="max-w-7xl mx-auto mt-6 space-y-6 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      {/* Add User & Add Store */}
      <div className="grid md:grid-cols-2 gap-6">
        <AddUser onUserAdded={refresh} />
        <AddStore onStoreAdded={refresh} />
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard icon={<FiUsers size={28} />} label="Users" value={stats.users} />
     <StatCard icon={<FiShoppingBag size={28} />} label="Stores" value={stats.stores} />

        <StatCard icon={<FiStar size={28} />} label="Ratings" value={stats.ratings} />
      </div>

      {/* Filters */}
      <h2 className="text-1xl font-extrabold text-gray-900">filter</h2>
      <section className="p-4 border rounded grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50">
        
        {["name", "email", "address", "role"].map(k => (
          <input
            key={k}
            placeholder={k[0].toUpperCase() + k.slice(1)}
            className="border p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            value={filter[k]}
            onChange={e => setFilter({ ...filter, [k]: e.target.value })}
          />
        ))}
      </section>

      {/* Users Table */}
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

      {/* Stores Table */}
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

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white border rounded-lg shadow-md hover:shadow-xl transition">
      <div className="text-black">{icon}</div>
      <div>
        <p className="text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function DataTable({ title, headers, rows }) {
  return (
    <section className="mt-6">
      <h3 className="font-bold mb-3 text-gray-900 text-2xl">{title}</h3>
      <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {headers.map(h => (
                <th key={h} className="px-4 py-3 border text-gray-900">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                {r.map((cell, j) => (
                  <td key={j} className="px-4 py-3 border text-gray-900">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
