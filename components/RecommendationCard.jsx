import Link from "next/link"
import { criteriaLabels, familyLabels } from "@/lib/labels"

const RecommendationCard = ({ result, rank }) => {
  const { fragrance, percent, matched } = result
  const { slug, name, brand, concentration, scentFamilies } = fragrance

  return (
    <Link
      href={`/fragrance/${slug}`}
      className="flex items-center gap-5 rounded-2xl border border-black/10 p-5 transition hover:border-black/30"
    >
      <span className="text-2xl font-bold text-black/20">{rank}</span>

      <div className="flex-1">
        <p className="text-xs text-black/50">{brand}</p>
        <h3 className="mt-0.5 text-lg font-bold">
          {name} <span className="text-xs font-normal text-black/40">{concentration}</span>
        </h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {scentFamilies.slice(0, 3).map((family) => (
            <span key={family} className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/60">
              {familyLabels[family]}
            </span>
          ))}
        </div>

        {matched.length > 0 && (
          <p className="mt-3 text-xs text-black/50">
            تطابق خوب در: {matched.map((key) => criteriaLabels[key]).join("، ")}
          </p>
        )}
      </div>

      <div className="text-center">
        <p className="text-2xl font-bold">{percent}٪</p>
        <p className="text-xs text-black/40">تطابق</p>
      </div>
    </Link>
  )
}

export default RecommendationCard