"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

/**
 * Hero Component - Main landing section of the homepage
 * Features:
 * - Large title with ITC Avant Garde Gothic Bold style
 * - Call-to-action buttons with red theme
 * - Red gradient background
 * - Responsive design for mobile and desktop
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 via-red-100 to-red-200">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('/placeholder.svg?height=800&width=1200')`,
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
        {/* Restaurant name with ITC Avant Garde Gothic Bold style */}
        <h1 className="text-5xl md:text-7xl font-avant-garde text-gray-900 mb-6 animate-fade-in brand-name">
          TANDOOR HUT
          <span className="block text-3xl md:text-4xl font-sans font-light text-red-600 mt-2 normal-case tracking-normal">
            Authentic South Indian Cuisine
          </span>
        </h1>

        {/* Description paragraph */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience the rich flavors of South India in every bite. Spices, aromas, and traditions that transport you to
          the heart of South Indian culture.
        </p>

        {/* Call-to-action buttons with red theme */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            onClick={() => (window.location.href = "/menu")}
          >
            View Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            <Phone className="mr-2 h-5 w-5" />
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  )
}
