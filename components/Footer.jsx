import Link from "next/link"

const columns = [
  {
    title: "کاوش",
    links: [
      { href: "/explore", label: "همه عطرها" },
      { href: "/compare", label: "مقایسه" },
      { href: "/find", label: "عطر مناسب من" },
    ],
  },
  {
    title: "خوش‌بو",
    links: [
      { href: "/about", label: "درباره ما" },
      { href: "/contact", label: "تماس با ما" },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-2xl font-bold tracking-tight">
            خوش‌بو
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-black/60">
            پلتفرم کشف، مقایسه و پیشنهاد عطر. عطر امضای خودتان را پیدا کنید.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-bold">{column.title}</h4>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 py-6 text-center text-xs text-black/40">
        © {new Date().getFullYear()} خوش‌بو. همه حقوق محفوظ است.
      </div>
    </footer>
  )
}

export default Footer