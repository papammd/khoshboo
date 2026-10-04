import Link from "next/link"
import FragranceCard from "./FragranceCard"
import { getPopularFragrances } from "@/lib/fragrances"

const PopularFragrances = () => {
  const fragrances = getPopularFragrances(6)

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">عطرهای محبوب</h2>
        <Link href="/explore" className="text-sm text-black/60 transition hover:text-black">
          مشاهده همه ←
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fragrances.map((fragrance) => (
          <FragranceCard key={fragrance.id} fragrance={fragrance} />
        ))}
      </div>
    </section>
  )
}

export default PopularFragrances