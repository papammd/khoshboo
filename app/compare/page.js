import Link from "next/link"
import CompareTable from "@/components/CompareTable"
import { fragrances, getFragrancesBySlugs } from "@/lib/fragrances"

export const metadata = {
  title: "مقایسه عطرها | خوش‌بو",
  description: "چند عطر را کنار هم بگذارید و ماندگاری، پخش بو، نت‌ها و ویژگی‌هایشان را مقایسه کنید.",
}

const MAX_ITEMS = 4

const buildHref = (slugs) => (slugs.length ? `/compare?items=${slugs.join(",")}` : "/compare")

const Compare = async ({ searchParams }) => {
  const { items: raw = "" } = await searchParams
  const slugs = (Array.isArray(raw) ? raw.join(",") : raw).split(",").filter(Boolean)

  const selected = getFragrancesBySlugs(slugs).slice(0, MAX_ITEMS)
  const selectedSlugs = selected.map((f) => f.slug)
  const available = fragrances.filter((f) => !selectedSlugs.includes(f.slug))
  const canAdd = selected.length < MAX_ITEMS

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">مقایسه عطرها</h1>
      <p className="mt-3 text-black/60">تا {MAX_ITEMS} عطر را کنار هم بگذارید.</p>

      {selected.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-black/15 p-10 text-center">
          <p className="text-lg font-bold">اولین عطر را انتخاب کنید</p>
          <p className="mt-2 text-sm text-black/60">مشخصاتش بلافاصله نمایش داده می‌شود.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {fragrances.map((f) => (
              <Link
                key={f.id}
                href={buildHref([f.slug])}
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/70 transition hover:border-black/30 hover:text-black"
              >
                + {f.brand} {f.name}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          {selected.length >= 2 && (
            <div className="mt-8 rounded-2xl border border-black/10 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold">
                  {canAdd ? "افزودن عطر به مقایسه" : "حداکثر تعداد انتخاب شده است"}
                </h2>
                <Link href="/compare" className="text-xs text-black/50 transition hover:text-black">
                  پاک کردن همه
                </Link>
              </div>

              {canAdd && (
                <div className="flex flex-wrap gap-2">
                  {available.map((f) => (
                    <Link
                      key={f.id}
                      href={buildHref([...selectedSlugs, f.slug])}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/70 transition hover:border-black/30 hover:text-black"
                    >
                      + {f.brand} {f.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8">
            <CompareTable
              items={selected}
              available={available}
              canAdd={canAdd}
              buildHref={buildHref}
            />
          </div>

          {selected.length === 1 && (
            <p className="mt-4 text-center text-sm text-black/50">
              <Link href="/compare" className="transition hover:text-black">پاک کردن و شروع دوباره</Link>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Compare