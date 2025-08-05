"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white pt-16">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Authentic South Indian Cuisine</h1>
        <p className="text-xl md:text-2xl mb-8 text-red-100">
          Experience the rich flavors of traditional Indian cooking in Naperville
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              View Menu
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold bg-transparent"
            onClick={() => window.open("tel:(630)820-3600")}
          >
            Make Reservation
          </Button>
        </div>
      </div>
    </section>
  )
}
