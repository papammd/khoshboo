import Link from "next/link"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">صفحه پیدا نشد</h1>
      <p className="mt-3 text-black/60">ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-black px-7 py-3 text-sm text-white transition hover:bg-black/80"
      >
        بازگشت به خانه
      </Link>
    </div>
  )
}

export default NotFound