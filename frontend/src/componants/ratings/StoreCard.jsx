import React, { useState } from "react";
import { submitRating } from "../../api/apis";

export default function StoreCard({ store, userRating, onRatingSubmitted }) {
  const [rating, setRating] = useState(userRating || 0);
  const [loading, setLoading] = useState(false);

  const handleRating = async (value) => {
    setLoading(true);
    try {
      await submitRating(store.id, value);
      setRating(value);
      if (onRatingSubmitted) onRatingSubmitted(); 
    } catch (err) {
      console.error("Failed to submit rating", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white mb-2">
      <h3 className="font-semibold">{store.name}</h3>
      <p>Address: {store.address}</p>
      <p>Average Rating: {store.ratings?.length ? (store.ratings.reduce((a,b) => a + b.value, 0)/store.ratings.length).toFixed(1) : 0}</p>

      <div className="flex gap-2 mt-2">
        {[1,2,3,4,5].map((num) => (
          <button
            key={num}
            disabled={loading}
            className={`px-2 py-1 rounded ${num <= rating ? "bg-yellow-400" : "bg-gray-200"}`}
            onClick={() => handleRating(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
