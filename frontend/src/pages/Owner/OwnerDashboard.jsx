import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/apis"; // updated to use centralized api.js

export default function OwnerDashboard() {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchRatings = async () => {
      setLoading(true);
      setMsg("");
      try {
        // Use proper API endpoint for store owner
        const res = await api.get("/stores"); // fetch all stores first
        const myStore = res.data.find((store) => store.ownerId === user.id);

        if (!myStore) {
          setMsg("No store assigned to your account");
          setRatings([]);
          setAvgRating(0);
          return;
        }

        // Fetch ratings for this store
        const ratingsRes = await api.get(`/stores/${myStore.id}/ratings`);
        const myRatings = ratingsRes.data || [];

        setRatings(myRatings);

        // Calculate average rating
        const total = myRatings.reduce((sum, r) => sum + r.value, 0);
        const avg = myRatings.length ? total / myRatings.length : 0;
        setAvgRating(avg.toFixed(2));
      } catch (err) {
        console.error("Failed to fetch ratings", err);
        setMsg("Failed to fetch ratings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user]);

  if (loading)
    return (
      <div className="text-center mt-6 text-gray-700">Loading ratings…</div>
    );

  return (
    <div className="mt-6 max-w-4xl mx-auto p-4 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Owner Dashboard</h2>

      {msg && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">{msg}</div>
      )}

      <p className="mb-4">
        Average Rating of Your Store:{" "}
        <strong className="text-gray-900">{avgRating}</strong>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border text-gray-900">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.length > 0 ? (
              ratings.map((r) => (
                <tr key={r.id}>
                  <td className="border px-4 py-2">{r.user.name}</td>
                  <td className="border px-4 py-2">{r.user.email}</td>
                  <td className="border px-4 py-2">{r.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No ratings submitted yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
