"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

/**
 * Navigation Component - Main site navigation header
 * Features:
 * - Fixed position header that stays at top during scroll
 * - Responsive design with mobile hamburger menu
 * - Desktop horizontal navigation
 * - Brand logo/name with ITC Avant Garde Gothic Bold style and red theme
 * - Call-to-action button for online ordering
 * - Semi-transparent background with backdrop blur
 */
export function Navigation() {
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    // Fixed header with backdrop blur and shadow
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo section with ITC Avant Garde Gothic Bold styling */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-avant-garde text-red-600 brand-name">
              TANDOOR HUT
            </a>
          </div>

          {/* Desktop navigation menu - hidden on mobile */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Home
            </a>
            <a href="/menu" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Menu
            </a>
            <a href="/about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Contact
            </a>
            <a href="/catering" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Catering
            </a>
          </nav>

          {/* Desktop CTA button - hidden on mobile */}
          <div className="hidden md:flex">
            <Button
              className="bg-red-600 hover:bg-red-700 font-medium"
              onClick={() => (window.location.href = "/menu")}
            >
              Order Online
            </Button>
          </div>

          {/* Mobile menu toggle button - only visible on mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/menu"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="/catering"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Catering
            </a>

            <div className="pt-2">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 font-medium"
                onClick={() => {
                  setIsMenuOpen(false)
                  window.location.href = "/menu"
                }}
              >
                Order Online
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
