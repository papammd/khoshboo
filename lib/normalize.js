const persianDigits = "۰۱۲۳۴۵۶۷۸۹"
const arabicDigits = "٠١٢٣٤٥٦٧٨٩"

export const normalize = (text = "") =>
  String(text)
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d))
    .replace(/[٠-٩]/g, (d) => arabicDigits.indexOf(d))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "") // اعراب و کشیده
    .replace(/\u200c/g, " ") // نیم‌فاصله -> فاصله
    .replace(/\s+/g, " ")
    .trim()

export const tokenize = (text) => normalize(text).split(" ").filter(Boolean)