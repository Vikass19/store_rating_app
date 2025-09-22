import React, { useEffect, useState, useContext } from "react";
import api from "../../api/apis"; 
import RatingStars from "../../componants/ratings/RatingStars";
import { AuthContext } from "../../context/AuthContext";

export default function StoreList() {
  const { user } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStores = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/stores");
      const storesWithUserRating = res.data.map((s) => {
        const userRatingObj = s.ratings?.find(r => r.userId === user?.id);
        return { ...s, userRating: userRatingObj ? userRatingObj.value : 0 };
      });
      setStores(storesWithUserRating);
    } catch (e) {
      console.error(e);
      setError("Failed to load stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleRatingChange = async (storeId, value) => {
    if (!user || user.role !== "NORMAL_USER") return;
    try {
      await api.post(`/ratings/${storeId}/rate`, { value });
      setStores(prev =>
        prev.map(s =>
          s.id === storeId ? { ...s, userRating: value } : s
        )
      );
    } catch (e) {
      console.error("Failed to submit rating", e.response?.data || e.message);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading stores...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6 px-4">
      <h2 className="text-3xl font-bold text-center text-gradient mb-6">
        🌟 Stores Around You
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {stores.map((s) => {
          const avgRating = s.ratings?.length
            ? (s.ratings.reduce((a, b) => a + b.value, 0) / s.ratings.length).toFixed(1)
            : "N/A";

          return (
            <div
              key={s.id}
              className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 flex justify-between items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{s.name}</h3>
                <p className="text-gray-500 mt-1">{s.address}</p>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium text-sm">
                  Avg Rating: {avgRating} ⭐
                </div>
              </div>

              <div className="flex-shrink-0">
                <RatingStars
                  value={s.userRating || 0}
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
