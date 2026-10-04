import Link from "next/link"
import SearchBar from "./SearchBar"

const suggestions = ["دیور ساواژ", "کرید اونتوس", "وانیل", "عود", "تابستانی و خنک"]

const Hero = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center md:py-36">
      <p className="mb-6 text-xs text-black/50">کشف عطر</p>

      <h1 className="text-4xl font-bold leading-[1.3] tracking-tight md:text-6xl">
        عطر امضای خودتان را پیدا کنید.
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-black/60 md:text-lg">
        عطرها را کاوش و مقایسه کنید و آن‌هایی را پیدا کنید که با سبک زندگی شما می‌خوانند.
      </p>

      <div className="mt-10">
        <SearchBar />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-black/40">پیشنهاد:</span>
        {suggestions.map((item) => (
          <Link
            key={item}
            href={`/explore?q=${encodeURIComponent(item)}`}
            className="rounded-full border border-black/10 px-3 py-1 text-black/60 transition hover:border-black/30 hover:text-black"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/find"
          className="inline-block rounded-full border border-black/15 px-7 py-3 text-sm transition hover:bg-black hover:text-white"
        >
          عطر مناسب من را پیدا کن ←
        </Link>
      </div>
    </section>
  )
}

export default Hero