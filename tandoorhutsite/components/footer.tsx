"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const handlePhoneClick = () => {
    window.open("tel:(630)820-3600")
  }

  const handleEmailClick = () => {
    window.open("mailto:info@tandoorhut.com")
  }

  const handleAddressClick = () => {
    window.open("https://maps.google.com/?q=Naperville,IL+60564", "_blank")
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">Tandoor Hut</h3>
            <p className="text-gray-300 mb-4">
              Authentic South Indian cuisine in the heart of Naperville. Experience traditional flavors with modern
              convenience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/tandoorhut"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/tandoorhut"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/tandoorhut"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-red-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-gray-300 hover:text-red-400 transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-red-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={handlePhoneClick}
                  className="text-gray-300 hover:text-red-400 transition-colors text-left"
                >
                  (630) 820-3600
                </button>
              </li>
              <li>
                <button
                  onClick={handleEmailClick}
                  className="text-gray-300 hover:text-red-400 transition-colors text-left"
                >
                  info@tandoorhut.com
                </button>
              </li>
              <li>
                <button
                  onClick={handleAddressClick}
                  className="text-gray-300 hover:text-red-400 transition-colors text-left"
                >
                  Naperville, IL 60564
                </button>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Mon-Thu: 11AM-9:30PM</li>
              <li>Fri-Sat: 11AM-10PM</li>
              <li>Sun: 11AM-9:30PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Tandoor Hut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
