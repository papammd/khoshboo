import Link from "next/link";
import {
  genderLabels,
  seasonLabels,
  occasionLabels,
  familyLabels,
  priceLabels,
} from "@/lib/labels";

const Dots = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-4 rounded-full ${n <= value ? "bg-black" : "bg-black/10"}`}
        />
      ))}
    </div>
    <span className="text-xs text-black/40">{value}/5</span>
  </div>
);

const ratingRows = [
  { key: "longevity", label: "ماندگاری" },
  { key: "projection", label: "پخش بو" },
  { key: "sweetness", label: "شیرینی" },
  { key: "freshness", label: "خنکی" },
];

const textRows = [
  { label: "غلظت", render: (f) => f.concentration },
  { label: "جنسیت", render: (f) => genderLabels[f.gender] },
  { label: "سال انتشار", render: (f) => f.releaseYear },
  { label: "بازه قیمت", render: (f) => priceLabels[f.priceRange] },
  {
    label: "فصل‌ها",
    render: (f) => f.seasons.map((s) => seasonLabels[s]).join("، "),
  },
  {
    label: "موقعیت‌ها",
    render: (f) => f.occasions.map((o) => occasionLabels[o]).join("، "),
  },
  {
    label: "خانواده بویی",
    render: (f) => f.scentFamilies.map((s) => familyLabels[s]).join("، "),
  },
  { label: "نت‌های سر", render: (f) => f.notes.top.join("، ") },
  { label: "نت‌های میانی", render: (f) => f.notes.middle.join("، ") },
  { label: "نت‌های پایه", render: (f) => f.notes.base.join("، ") },
];

const cellClass =
  "min-w-[200px] border-b border-black/10 px-4 py-4 align-top text-sm";
const labelClass =
  "w-28 border-b border-black/10 px-4 py-4 align-top text-sm text-black/50";
const emptyClass = `${cellClass} bg-black/[0.02]`;
const imageBox =
  "flex aspect-[4/5] w-full max-w-[200px] items-center justify-center rounded-xl text-xs";

const CompareTable = ({ items, available, canAdd, buildHref }) => {
  const selectedSlugs = items.map((i) => i.slug);
  const showPlaceholder = items.length < 2;
  const totalRows = ratingRows.length + textRows.length;

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/10">
      <table className="w-full border-collapse text-right">
        <thead>
          <tr>
            <th className={labelClass} />
            {items.map((f) => (
              <th key={f.id} className={`${cellClass} font-normal border-b-0 pb-0 `}>
                <div className={`${imageBox} bg-black/[0.03] text-black/30`}>
                  تصویر بطری
                </div>
              </th>
            ))}

            {showPlaceholder && (
              <th className={`${emptyClass} font-normal border-b-0 pb-0`}>
                <div
                  className={`${imageBox} border border-dashed border-black/15 text-black/30`}
                >
                  تصویر عطر بعدی
                </div>
              </th>
            )}
          </tr>
          <tr>
            <th className={labelClass} />
            {items.map((f) => (
              <th key={f.id} className={`${cellClass} font-normal `}>
                <p className="text-xs text-black/50">{f.brand}</p>
                <Link
                  href={`/fragrance/${f.slug}`}
                  className="mt-1 block text-lg font-bold transition hover:text-black/60"
                >
                  {f.name}
                </Link>
                <Link
                  href={buildHref(selectedSlugs.filter((s) => s !== f.slug))}
                  className="mt-2 inline-block text-xs text-black/40 transition hover:text-black"
                >
                  حذف ✕
                </Link>
              </th>
            ))}

            {showPlaceholder && (
              <th className={`${emptyClass} font-normal`}>
                <p className="text-sm font-bold text-black/60">
                  در انتظار انتخاب عطر بعدی
                </p>
                {canAdd && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {available.map((f) => (
                      <Link
                        key={f.id}
                        href={buildHref([...selectedSlugs, f.slug])}
                        className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs text-black/70 transition hover:border-black/30 hover:text-black"
                      >
                        + {f.name}
                      </Link>
                    ))}
                  </div>
                )}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {ratingRows.map((row) => (
            <tr key={row.key}>
              <th className={`${labelClass} font-normal`}>{row.label}</th>
              {items.map((f) => (
                <td key={f.id} className={cellClass}>
                  <Dots value={f[row.key]} />
                </td>
              ))}
              {showPlaceholder && <td className={emptyClass}>—</td>}
            </tr>
          ))}

          {textRows.map((row) => (
            <tr key={row.label}>
              <th className={`${labelClass} font-normal`}>{row.label}</th>
              {items.map((f) => (
                <td key={f.id} className={`${cellClass} leading-7`}>
                  {row.render(f)}
                </td>
              ))}
              {showPlaceholder && <td className={emptyClass}>—</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
