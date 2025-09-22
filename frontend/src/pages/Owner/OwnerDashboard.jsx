import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/apis";
import { FiStar, FiUser, FiMail } from "react-icons/fi";

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
        const res = await api.get("/stores");
        const myStore = res.data.find((store) => store.ownerId === user.id);

        if (!myStore) {
          setMsg("No store assigned to your account");
          setRatings([]);
          setAvgRating(0);
          return;
        }

        const ratingsRes = await api.get(`/stores/${myStore.id}/ratings`);
        const myRatings = ratingsRes.data || [];

        setRatings(myRatings);

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
      <div className="text-center mt-10 text-gray-600 text-lg">Loading ratings…</div>
    );

  return (
    <div className="mt-6 max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Owner Dashboard</h2>

      {msg && (
        <div className="p-3 bg-yellow-100 text-yellow-800 rounded font-medium text-center">
          {msg}
        </div>
      )}

      {/* Average Rating Card */}
      <div className="flex items-center justify-center bg-white shadow-md rounded-xl p-6">
        <FiStar className="text-yellow-500 text-4xl mr-4" />
        <div>
          <p className="text-gray-500 text-sm">Average Rating of Your Store</p>
          <p className="text-3xl font-bold text-gray-900">{avgRating}</p>
        </div>
      </div>

      {/* Ratings Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border text-left text-gray-700 font-semibold">User Name</th>
              <th className="px-6 py-3 border text-left text-gray-700 font-semibold">Email</th>
              <th className="px-6 py-3 border text-left text-gray-700 font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.length > 0 ? (
              ratings.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-6 py-3 border flex items-center gap-2">
                    <FiUser className="text-gray-400" /> {r.user.name}
                  </td>
                  <td className="px-6 py-3 border flex items-center gap-2">
                    <FiMail className="text-gray-400" /> {r.user.email}
                  </td>
                  <td
                    className={`px-6 py-3 border font-semibold ${
                      r.value >= 4
                        ? "text-green-600"
                        : r.value >= 2
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.value} <FiStar className="inline text-yellow-400" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
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
