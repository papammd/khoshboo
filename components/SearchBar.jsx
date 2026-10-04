"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore")
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mx-auto flex w-full max-w-2xl items-center rounded-full border border-black/15 bg-white p-1.5 transition focus-within:border-black/40"
    >
      <label htmlFor="hero-search" className="sr-only">
        جستجوی عطر
      </label>
      <input
        id="hero-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجو بر اساس نام، برند یا نت..."
        className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-black/40 md:text-base"
      />
      <button
        type="submit"
        className="rounded-full bg-black px-6 py-3 text-sm text-white transition hover:bg-black/80"
      >
        جستجو
      </button>
    </form>
  )
}

export default SearchBar