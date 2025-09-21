import React, { useEffect, useState, useContext } from "react";
import api from "../../api/apis"; // use centralized api.js
import RatingStars from "../../componants/ratings/RatingStars";
import { AuthContext } from "../../context/AuthContext";

export default function StoreList() {
  const { user } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/stores");
        setStores(res.data);
      } catch (e) {
        console.error(e);
        setError("Failed to load stores. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleRatingChange = async (storeId, value) => {
    if (!user || user.role !== "NORMAL_USER") return;
    try {
      await api.post(`/stores/${storeId}/rate`, { value });
      setStores((prev) =>
        prev.map((s) =>
          s.id === storeId
            ? { ...s, userRating: { value } }
            : s
        )
      );
    } catch (e) {
      console.error("Failed to submit rating", e);
    }
  };

  if (loading) return <div>Loading stores...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      <div className="grid gap-4">
        {stores.map((s) => {
          const avgRating = s.ratings?.length
            ? (s.ratings.reduce((a, b) => a + b.value, 0) / s.ratings.length).toFixed(1)
            : "N/A";

          return (
            <div
              key={s.id}
              className="p-4 border rounded flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <div className="font-semibold text-gray-800">{s.name}</div>
                <div className="text-sm text-gray-600">{s.address}</div>
                <div className="text-sm text-gray-700">Avg Rating: {avgRating}</div>
              </div>

              <div>
                <RatingStars
                  value={s.userRating?.value || 0}
                  editable={user?.role === "NORMAL_USER"}
                  onChange={(v) => handleRatingChange(s.id, v)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
