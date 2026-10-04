import Link from "next/link"

const links = [
  { href: "/explore", label: "کاوش" },
  { href: "/compare", label: "مقایسه" },
  { href: "/find", label: "عطر مناسب من" },
]

const Header = () => {
  return (
    <header className="w-full border-b border-black/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          خوش‌بو
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-black/70 transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="hidden rounded-full border border-black/15 px-5 py-2 text-sm transition hover:bg-black hover:text-white md:block"
        >
          ورود
        </button>
      </div>
    </header>
  )
}

export default Header