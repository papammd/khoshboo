import Link from "next/link"
import { getFamilies } from "@/lib/families"
import { familyLabels } from "@/lib/labels"

const FragranceFamilies = () => {
  const families = getFamilies()

  return (
    <section className="border-t border-black/10 bg-black/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">خانواده‌های بویی</h2>
          <p className="mt-3 text-black/60">از روی حال‌وهوای عطر، مسیر کشف را شروع کنید.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {families.map((family) => (
            <Link
              key={family.key}
              href={`/explore?family=${family.key}`}
              className="group flex flex-col rounded-2xl border border-black/10 bg-white p-5 transition hover:border-black/30"
            >
              <h3 className="text-lg font-bold">{familyLabels[family.key]}</h3>
              <p className="mt-2 text-xs leading-6 text-black/50">{family.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FragranceFamilies