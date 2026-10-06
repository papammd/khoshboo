import Link from "next/link"
import { genderLabels, seasonLabels, familyLabels } from "@/lib/labels"

const selectClass =
  "w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black/40"

const ExploreFilters = ({ params }) => {
  return (
    <form method="GET" action="/explore" className="space-y-4 rounded-2xl border border-black/10 p-5">
      <div>
        <label htmlFor="q" className="mb-1.5 block text-xs text-black/50">جستجو</label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={params.q || ""}
          placeholder="نام، برند یا نت..."
          className={selectClass}
        />
      </div>

      <div>
        <label htmlFor="family" className="mb-1.5 block text-xs text-black/50">خانواده بویی</label>
        <select id="family" name="family" defaultValue={params.family || ""} className={selectClass}>
          <option value="">همه</option>
          {Object.entries(familyLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="gender" className="mb-1.5 block text-xs text-black/50">جنسیت</label>
        <select id="gender" name="gender" defaultValue={params.gender || ""} className={selectClass}>
          <option value="">همه</option>
          {Object.entries(genderLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="season" className="mb-1.5 block text-xs text-black/50">فصل</label>
        <select id="season" name="season" defaultValue={params.season || ""} className={selectClass}>
          <option value="">همه</option>
          {Object.entries(seasonLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1.5 block text-xs text-black/50">مرتب‌سازی</label>
        <select id="sort" name="sort" defaultValue={params.sort || ""} className={selectClass}>
          <option value="">پیش‌فرض</option>
          <option value="longevity">بیشترین ماندگاری</option>
          <option value="newest">جدیدترین</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-full bg-black px-4 py-2.5 text-sm text-white transition hover:bg-black/80"
        >
          اعمال فیلتر
        </button>
        <Link
          href="/explore"
          className="rounded-full border border-black/15 px-4 py-2.5 text-sm transition hover:bg-black/5"
        >
          پاک کردن
        </Link>
      </div>
    </form>
  )
}

export default ExploreFilters