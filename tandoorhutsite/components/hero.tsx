import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-orange-50">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/placeholder.svg?height=800&width=1200')`,
        }}
      />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Bella Vista
          <span className="block text-3xl md:text-4xl font-light text-amber-600 mt-2">Authentic Italian Cuisine</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Experience the finest Italian flavors in an elegant atmosphere. Fresh ingredients, traditional recipes,
          unforgettable moments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
            View Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3">
            <Phone className="mr-2 h-5 w-5" />
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  )
}
