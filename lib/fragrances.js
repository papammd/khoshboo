import { normalize, tokenize } from "./normalize"
export const fragrances = [
  {
    id: 1,
    slug: "dior-sauvage",
    name: "ساواژ",
    brand: "دیور",
    gender: "men",
    releaseYear: 2015,
    concentration: "EDT",
    priceRange: "mid",
    longevity: 4,
    projection: 4,
    sweetness: 2,
    freshness: 4,
    seasons: ["spring", "summer", "autumn"],
    occasions: ["daily", "casual"],
    scentFamilies: ["fresh", "spicy", "aromatic"],
    notes: {
      top: ["برگاموت", "فلفل"],
      middle: ["فلفل سچوان", "اسطوخودوس"],
      base: ["آمبروکسان", "سدر"],
    },
    description: "عطری جسور، تازه و ادویه‌ای با پایه برگاموت و آمبروکسان.",
  },
  {
    id: 2,
    slug: "creed-aventus",
    name: "اونتوس",
    brand: "کرید",
    gender: "men",
    releaseYear: 2010,
    concentration: "EDP",
    priceRange: "luxury",
    longevity: 4,
    projection: 4,
    sweetness: 3,
    freshness: 3,
    seasons: ["spring", "summer", "autumn"],
    occasions: ["office", "evening"],
    scentFamilies: ["fruity", "smoky", "woody"],
    notes: {
      top: ["آناناس", "برگاموت", "سیب"],
      middle: ["غان", "پچولی"],
      base: ["مشک", "خزه بلوط", "عنبر"],
    },
    description: "کلاسیک میوه‌ای و دودی با شروعی پرانرژی از آناناس.",
  },
  {
    id: 3,
    slug: "pdm-percival",
    name: "پرسیوال",
    brand: "پارفومز دو مارلی",
    gender: "men",
    releaseYear: 2019,
    concentration: "EDP",
    priceRange: "luxury",
    longevity: 4,
    projection: 4,
    sweetness: 2,
    freshness: 4,
    seasons: ["spring", "summer"],
    occasions: ["daily", "office"],
    scentFamilies: ["fresh", "aromatic", "citrus"],
    notes: {
      top: ["برگاموت", "لیمو"],
      middle: ["اسطوخودوس", "شمعدانی"],
      base: ["مشک", "سدر"],
    },
    description: "عطری معطر و تازه با حسی تمیز و شسته‌رفته.",
  },
  {
    id: 4,
    slug: "kilian-angels-share",
    name: "انجلز شر",
    brand: "کیلیان",
    gender: "unisex",
    releaseYear: 2020,
    concentration: "EDP",
    priceRange: "luxury",
    longevity: 5,
    projection: 4,
    sweetness: 5,
    freshness: 1,
    seasons: ["autumn", "winter"],
    occasions: ["evening", "date"],
    scentFamilies: ["gourmand", "woody", "warm-spicy"],
    notes: {
      top: ["کنیاک", "دارچین"],
      middle: ["لوبیا تونکا", "بلوط"],
      base: ["وانیل", "پرالین", "صندل"],
    },
    description:
      "عطری غنی و الکلی با الهام از کهنه‌شدن کنیاک در بشکه‌های بلوط.",
  },
  {
    id: 5,
    slug: "ysl-black-opium",
    name: "بلک اپیوم",
    brand: "ایو سن لوران",
    gender: "women",
    releaseYear: 2014,
    concentration: "EDP",
    priceRange: "mid",
    longevity: 4,
    projection: 4,
    sweetness: 5,
    freshness: 1,
    seasons: ["autumn", "winter"],
    occasions: ["evening", "date"],
    scentFamilies: ["gourmand", "coffee", "vanilla"],
    notes: {
      top: ["فلفل صورتی", "گلابی"],
      middle: ["قهوه", "یاس"],
      base: ["وانیل", "پچولی", "سدر"],
    },
    description: "عطری شیرین و اعتیادآور با ترکیب قهوه و وانیل برای شب.",
  },
  {
    id: 6,
    slug: "pdm-althair",
    name: "آلتایر",
    brand: "پارفومز دو مارلی",
    gender: "men",
    releaseYear: 2016,
    concentration: "EDP",
    priceRange: "luxury",
    longevity: 4,
    projection: 3,
    sweetness: 5,
    freshness: 1,
    seasons: ["autumn", "winter"],
    occasions: ["evening", "date"],
    scentFamilies: ["vanilla", "gourmand", "warm-spicy"],
    notes: {
      top: ["دارچین", "برگاموت"],
      middle: ["پرالین", "شکوفه پرتقال"],
      base: ["وانیل", "لوبیا تونکا", "مشک"],
    },
    description: "وانیلی نرم و کرمی با ادویه گرم و شیرینی لطیف.",
  },
];

export const getPopularFragrances = (limit = 6) => fragrances.slice(0, limit);

export const getFragranceBySlug = (slug) =>
  fragrances.find((fragrance) => fragrance.slug === slug) || null;

export const getAllSlugs = () => fragrances.map((fragrance) => fragrance.slug);

export const getSimilarFragrances = (fragrance, limit = 3) =>
  fragrances
    .filter((item) => item.id !== fragrance.id)
    .map((item) => ({
      item,
      score: item.scentFamilies.filter((f) =>
        fragrance.scentFamilies.includes(f),
      ).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);

const getSearchText = (f) =>
  normalize(
    [f.name, f.brand, f.slug.replace(/-/g, " "), ...f.notes.top, ...f.notes.middle, ...f.notes.base].join(" ")
  )

export const searchFragrances = ({ q, family, gender, season, sort } = {}) => {
  let result = [...fragrances]

  const tokens = tokenize(q)
  if (tokens.length > 0) {
    result = result.filter((f) => {
      const text = getSearchText(f)
      return tokens.every((token) => text.includes(token))
    })
  }

  if (family) result = result.filter((f) => f.scentFamilies.includes(family))
  if (gender) result = result.filter((f) => f.gender === gender)
  if (season) result = result.filter((f) => f.seasons.includes(season))

  if (sort === "longevity") result.sort((a, b) => b.longevity - a.longevity)
  if (sort === "newest") result.sort((a, b) => b.releaseYear - a.releaseYear)

  return result
}
export const getFragrancesBySlugs = (slugs = []) =>
  [...new Set(slugs)].map(getFragranceBySlug).filter(Boolean)