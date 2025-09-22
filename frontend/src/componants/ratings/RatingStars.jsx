export default  function RatingStars({ value, editable, onChange }) {
  return (
    <div className="flex space-x-1">
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-xl ${star <= value ? "text-yellow-500" : "text-gray-300"}`}
          onClick={() => editable && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
