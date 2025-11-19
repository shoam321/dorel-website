"use client"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors cursor-pointer font-bold ${
            value >= star ? "bg-red-600 border-red-600 text-white" : "bg-zinc-900 border-zinc-700 text-zinc-500"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
