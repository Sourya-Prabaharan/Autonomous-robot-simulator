import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function Hero() {
  return (
    // Main hero section, full viewport height, centered content, gradient background
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
      
      {/* Background image overlay with low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('/placeholder.svg?height=800&width=1200')`,
        }}
      />
      
      {/* Foreground container with higher z-index so it's above background */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
          Tandoor Hut
          {/* Subtitle below main title */}
          <span className="block text-3xl md:text-4xl font-light text-orange-600 mt-2">
            Authentic South Indian Cuisine
          </span>
        </h1>
        
        {/* Descriptive paragraph with relaxed line height */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience the rich flavors of South India in every bite. Spices, aromas, and traditions that transport you to
          the heart of South Indian culture.
        </p>
        
        {/* Buttons container, stacked vertically on small screens, horizontal on sm+ */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Primary action button for viewing menu */}
          <Button
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Secondary outlined button for making reservation */}
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="mr-2 h-5 w-5" />
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  )
}
