"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  // State to track if the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-orange-600">
              Tandoor Hut
            </a>
          </div>

          {/* Desktop navigation links - hidden on small screens */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
              Menu
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop "Order Online" button - hidden on small screens */}
          <div className="hidden md:flex">
            <Button className="bg-orange-600 hover:bg-orange-700">Order Online</Button>
          </div>

          {/* Mobile menu toggle button - visible only on small screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu open state on click
              className="text-gray-700 hover:text-orange-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Show 'X' icon if menu is open, otherwise show 'Menu' icon */}
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - shown only when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile navigation links */}
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>

            {/* Mobile "Order Online" button */}
            <div className="pt-2">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Order Online</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
