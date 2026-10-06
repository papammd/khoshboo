import Link from "next/link"
import FragranceCard from "@/components/FragranceCard"
import ExploreFilters from "@/components/ExploreFilters"
import { searchFragrances } from "@/lib/fragrances"

export const metadata = {
  title: "کاوش عطرها | خوش‌بو",
  description: "عطرها را بر اساس نام، برند، خانواده بویی، فصل و جنسیت جستجو و فیلتر کنید.",
}

const Explore = async ({ searchParams }) => {
  const params = await searchParams
  const results = searchFragrances(params)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">کاوش عطرها</h1>
      <p className="mt-3 text-black/60">{results.length} عطر پیدا شد</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <ExploreFilters params={params} />
        </aside>

        <section>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((fragrance) => (
                <FragranceCard key={fragrance.id} fragrance={fragrance} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/15 p-12 text-center">
              <p className="text-lg font-bold">عطری پیدا نشد</p>
              <p className="mt-2 text-sm text-black/60">فیلترها را تغییر دهید یا جستجو را پاک کنید.</p>
              <Link
                href="/explore"
                className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm text-white transition hover:bg-black/80"
              >
                پاک کردن فیلترها
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Explore