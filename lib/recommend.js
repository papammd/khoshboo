const WEIGHTS = {
  season: 3,
  occasion: 3,
  family: 3,
  gender: 4,
  sweetness: 2,
  freshness: 2,
  longevity: 1.5,
  projection: 1.5,
  budget: 2,
}

const priceOrder = ["budget", "mid", "luxury"]

const closeness = (a, b) => 1 - Math.abs(a - b) / 4

const scorers = {
  season: (f, v) => (f.seasons.includes(v) ? 1 : 0),
  occasion: (f, v) => (f.occasions.includes(v) ? 1 : 0),
  family: (f, v) => (f.scentFamilies.includes(v) ? 1 : 0),
  gender: (f, v) => (f.gender === v || f.gender === "unisex" ? 1 : 0),
  sweetness: (f, v) => closeness(f.sweetness, v),
  freshness: (f, v) => closeness(f.freshness, v),
  longevity: (f, v) => closeness(f.longevity, v),
  projection: (f, v) => closeness(f.projection, v),
  budget: (f, v) => {
    const distance = Math.abs(priceOrder.indexOf(f.priceRange) - priceOrder.indexOf(v))
    return distance === 0 ? 1 : distance === 1 ? 0.4 : 0
  },
}

const numericKeys = ["sweetness", "freshness", "longevity", "projection"]

// ورودی خام (رشته‌های URL) را به preferences تمیز تبدیل می‌کند
export const parsePreferences = (params = {}) => {
  const prefs = {}

  for (const key of Object.keys(scorers)) {
    const raw = Array.isArray(params[key]) ? params[key][0] : params[key]
    if (!raw) continue

    if (numericKeys.includes(key)) {
      const n = Number(raw)
      if (Number.isInteger(n) && n >= 1 && n <= 5) prefs[key] = n
    } else {
      prefs[key] = raw
    }
  }

  return prefs
}

export const scoreFragrance = (fragrance, prefs) => {
  let total = 0
  let maxTotal = 0
  const matched = []

  for (const [key, value] of Object.entries(prefs)) {
    const weight = WEIGHTS[key]
    const score = scorers[key]?.(fragrance, value)
    if (weight === undefined || score === undefined) continue

    total += score * weight
    maxTotal += weight
    if (score >= 0.75) matched.push(key)
  }

  const percent = maxTotal === 0 ? 0 : Math.round((total / maxTotal) * 100)
  return { fragrance, percent, matched }
}

export const recommendFragrances = (fragrances, prefs, limit = 6) => {
  if (Object.keys(prefs).length === 0) return []

  return fragrances
    .map((f) => scoreFragrance(f, prefs))
    .sort((a, b) => b.percent - a.percent || b.fragrance.releaseYear - a.fragrance.releaseYear)
    .slice(0, limit)
}