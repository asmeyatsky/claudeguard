import Hero from '../components/landing/Hero'
import Problems from '../components/landing/Problems'
import ModuleCards from '../components/landing/ModuleCards'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Hero />
      <Problems />
      <ModuleCards />
      <Footer />
    </div>
  )
}
