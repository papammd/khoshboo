import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">صفحه پیدا نشد</h1>
        <p className="mt-3 text-black/60">ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-black px-7 py-3 text-sm text-white transition hover:bg-black/80"
        >
          بازگشت به خانه
        </Link>
      </main>
      <Footer />
    </>
  )
}

export default NotFound