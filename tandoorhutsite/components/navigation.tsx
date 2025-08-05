"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { CartButton } from "@/components/cart-button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-600">Tandoor Hut</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </Link>
            <Link href="/catering" className="text-gray-700 hover:text-red-600 transition-colors">
              Catering
            </Link>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/menu">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Order Online</Button>
              </Link>
              <CartButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartButton />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-red-600 transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/catering"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Catering
              </Link>
              <div className="px-3 py-2">
                <Link href="/menu" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Order Online</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
