import React from "react";

export default function RatingStars({ value = 0, editable = false, onChange }) {
  const stars = [1,2,3,4,5];
  return (
    <div className="flex gap-1">
      {stars.map(s => (
        <button
          key={s}
          onClick={() => editable && onChange && onChange(s)}
          className={`text-xl ${s <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          aria-label={`Rate ${s}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
