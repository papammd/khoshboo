import Header from "@/components/Header"
import Hero from "@/components/Hero"
import PopularFragrances from "@/components/PopularFragrances"
import FragranceFamilies from "@/components/FragranceFamilies"
import Footer from "@/components/Footer"

const Home = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <PopularFragrances />
        <FragranceFamilies />
      </main>
      <Footer />
    </>
  )
}

export default Home