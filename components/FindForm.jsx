import Link from "next/link"
import {
  seasonLabels,
  occasionLabels,
  familyLabels,
  priceLabels,
  levelLabels,
} from "@/lib/labels"

const selectClass =
  "w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black/40"

const Field = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-xs text-black/50">{label}</label>
    {children}
  </div>
)

const SelectField = ({ id, label, options, value }) => (
  <Field id={id} label={label}>
    <select id={id} name={id} defaultValue={value || ""} className={selectClass}>
      <option value="">مهم نیست</option>
      {Object.entries(options).map(([key, text]) => (
        <option key={key} value={key}>{text}</option>
      ))}
    </select>
  </Field>
)

const genderOptions = { men: "مردانه", women: "زنانه" }

const FindForm = ({ prefs }) => {
  const get = (key) => (prefs[key] !== undefined ? String(prefs[key]) : "")

  return (
    <form method="GET" action="/find" className="space-y-5 rounded-2xl border border-black/10 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="gender" label="برای چه کسی؟" options={genderOptions} value={get("gender")} />
        <SelectField id="season" label="بیشتر در کدام فصل؟" options={seasonLabels} value={get("season")} />
        <SelectField id="occasion" label="برای چه موقعیتی؟" options={occasionLabels} value={get("occasion")} />
        <SelectField id="family" label="چه حال‌وهوایی؟" options={familyLabels} value={get("family")} />
        <SelectField id="sweetness" label="چقدر شیرین؟" options={levelLabels} value={get("sweetness")} />
        <SelectField id="freshness" label="چقدر خنک؟" options={levelLabels} value={get("freshness")} />
        <SelectField id="longevity" label="ماندگاری مورد نظر" options={levelLabels} value={get("longevity")} />
        <SelectField id="projection" label="پخش بو" options={levelLabels} value={get("projection")} />
        <SelectField id="budget" label="بودجه" options={priceLabels} value={get("budget")} />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="rounded-full bg-black px-7 py-3 text-sm text-white transition hover:bg-black/80"
        >
          عطر مناسب من را پیدا کن
        </button>
        <Link
          href="/find"
          className="rounded-full border border-black/15 px-5 py-3 text-sm transition hover:bg-black/5"
        >
          پاک کردن
        </Link>
      </div>
    </form>
  )
}

export default FindForm