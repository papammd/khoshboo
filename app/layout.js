import { Vazirmatn } from "next/font/google"
import "./globals.css"

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
})

export const metadata = {
  title: "خوش‌بو | کشف عطر امضای شما",
  description: "عطرها را جستجو، مقایسه و کشف کنید و عطر مناسب خودتان را پیدا کنید.",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}

export default RootLayout