
const RatingBar = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-black/60">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`h-1.5 w-6 rounded-full ${n <= value ? "bg-black" : "bg-black/10"}`}
          />
        ))}
      </div>
    </div>
  )
}

export default RatingBar