import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FragranceCard from "@/components/FragranceCard"
import RatingBar from "@/components/RatingBar"
import {
  getFragranceBySlug,
  getAllSlugs,
  getSimilarFragrances,
} from "@/lib/fragrances"
import {
  genderLabels,
  seasonLabels,
  occasionLabels,
  familyLabels,
  priceLabels,
} from "@/lib/labels"

export const generateStaticParams = () =>
  getAllSlugs().map((slug) => ({ slug }))

export const generateMetadata = async ({ params }) => {
  const { slug } = await params
  const fragrance = getFragranceBySlug(slug)

  if (!fragrance) return { title: "عطر پیدا نشد | خوش‌بو" }

  return {
    title: `${fragrance.brand} ${fragrance.name} | خوش‌بو`,
    description: fragrance.description,
  }
}

const noteGroups = [
  { key: "top", label: "نت‌های سر" },
  { key: "middle", label: "نت‌های میانی" },
  { key: "base", label: "نت‌های پایه" },
]

const FragranceDetail = async ({ params }) => {
  const { slug } = await params
  const fragrance = getFragranceBySlug(slug)

  if (!fragrance) notFound()

  const similar = getSimilarFragrances(fragrance)

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <nav className="mb-8 text-sm text-black/50">
            <Link href="/" className="transition hover:text-black">خانه</Link>
            <span className="mx-2">/</span>
            <Link href="/explore" className="transition hover:text-black">کاوش</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{fragrance.name}</span>
          </nav>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-black/[0.03] text-sm text-black/30">
              تصویر بطری
            </div>

            <div>
              <p className="text-sm text-black/50">{fragrance.brand}</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                {fragrance.name}
              </h1>
              <p className="mt-3 text-sm text-black/50">
                {fragrance.concentration} · {genderLabels[fragrance.gender]} · {fragrance.releaseYear}
              </p>

              <p className="mt-6 leading-8 text-black/70">{fragrance.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {fragrance.scentFamilies.map((family) => (
                  <Link
                    key={family}
                    href={`/explore?family=${family}`}
                    className="rounded-full bg-black/5 px-3 py-1.5 text-sm text-black/70 transition hover:bg-black hover:text-white"
                  >
                    {familyLabels[family]}
                  </Link>
                ))}
              </div>

              <div className="mt-10 space-y-4 rounded-2xl border border-black/10 p-6">
                <RatingBar label="ماندگاری" value={fragrance.longevity} />
                <RatingBar label="پخش بو" value={fragrance.projection} />
                <RatingBar label="شیرینی" value={fragrance.sweetness} />
                <RatingBar label="خنکی" value={fragrance.freshness} />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="text-black/50">فصل‌ها</dt>
                  <dd className="mt-1">
                    {fragrance.seasons.map((s) => seasonLabels[s]).join("، ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-black/50">موقعیت‌ها</dt>
                  <dd className="mt-1">
                    {fragrance.occasions.map((o) => occasionLabels[o]).join("، ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-black/50">بازه قیمت</dt>
                  <dd className="mt-1">{priceLabels[fragrance.priceRange]}</dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">هرم بویایی</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {noteGroups.map((group) => (
                <div key={group.key} className="rounded-2xl border border-black/10 p-6">
                  <h3 className="text-sm text-black/50">{group.label}</h3>
                  <p className="mt-3 leading-8">{fragrance.notes[group.key].join("، ")}</p>
                </div>
              ))}
            </div>
          </section>

          {similar.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">عطرهای مشابه</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item) => (
                  <FragranceCard key={item.id} fragrance={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default FragranceDetail