import FindForm from "@/components/FindForm"
import RecommendationCard from "@/components/RecommendationCard"
import { fragrances } from "@/lib/fragrances"
import { parsePreferences, recommendFragrances } from "@/lib/recommend"

export const metadata = {
  title: "عطر مناسب من | خوش‌بو",
  description: "به چند سؤال کوتاه جواب دهید و عطرهایی که بیشترین تطابق را با سلیقه شما دارند پیدا کنید.",
}

const Find = async ({ searchParams }) => {
  const params = await searchParams
  const prefs = parsePreferences(params)
  const results = recommendFragrances(fragrances, prefs)
  const hasPrefs = Object.keys(prefs).length > 0

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">عطر مناسب من</h1>
      <p className="mt-3 text-black/60">
        هر سؤالی که مهم نیست را خالی بگذارید. فقط به معیارهای انتخابی شما امتیاز داده می‌شود.
      </p>

      <div className="mt-8">
        <FindForm prefs={prefs} />
      </div>

      {hasPrefs && (
        <section className="mt-12">
          <h2 className="mb-5 text-xl font-bold">عطرهای پیشنهادی</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <RecommendationCard key={result.fragrance.id} result={result} rank={index + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Find