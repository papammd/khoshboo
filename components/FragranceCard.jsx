import Link from "next/link";
import { genderLabels, familyLabels } from "@/lib/labels";
import FragranceImage from "./FragranceImage";

const FragranceCard = ({ fragrance }) => {
  const {
    slug,
    name,
    brand,
    gender,
    concentration,
    scentFamilies,
    longevity,
    image,
  } = fragrance;

  return (
    <Link
      href={`/fragrance/${slug}`}
      className="group flex flex-col rounded-2xl border border-black/10 p-6 transition hover:border-black/30"
    >
      <FragranceImage
        src={image}
        alt={`${brand} ${name}`}
        className="mb-6 aspect-[4/5] rounded-xl"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />

      <p className="text-xs text-black/50">{brand}</p>
      <h3 className="mt-1 text-xl font-bold">{name}</h3>

      <p className="mt-1 text-xs text-black/40">
        {concentration} · {genderLabels[gender]}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {scentFamilies.slice(0, 3).map((family) => (
          <span
            key={family}
            className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/60"
          >
            {familyLabels[family]}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-black/40">
        <span>ماندگاری</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`h-1.5 w-4 rounded-full ${n <= longevity ? "bg-black" : "bg-black/10"}`}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default FragranceCard;
