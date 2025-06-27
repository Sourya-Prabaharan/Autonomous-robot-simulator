import { Facebook, Instagram, Twitter } from "lucide-react"

/**
 * Footer Component - Site-wide footer with additional information and links
 *
 * Purpose:
 * - Provide secondary navigation and information
 * - Include social media links for community building
 * - Display contact information for easy access
 * - Add credibility with professional presentation
 * - Improve SEO with additional internal links
 *
 * Content Strategy:
 * - Restaurant description reinforces brand message
 * - Quick links provide easy navigation
 * - Contact information repeated for convenience
 * - Social media links encourage engagement
 * - Copyright notice establishes legitimacy
 *
 * Design Features:
 * - Dark background for visual contrast
 * - Multi-column responsive layout
 * - Hover effects on interactive elements
 * - Consistent brand colors (orange accents)
 * - Clean typography hierarchy
 */
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer content grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand section - takes up 2 columns on larger screens */}
          <div className="col-span-2">
            {/* Restaurant name with brand color */}
            <h3 className="text-2xl font-bold text-red-400 mb-4">Tandoor Hut</h3>

            {/* Restaurant description */}
            <p className="text-gray-300 mb-4 max-w-md">
              Authentic South Indian cuisine in beautiful Naperville, Illinois. Fresh ingredients, traditional recipes,
              and warm hospitality.
            </p>

            {/* Social media links */}
            <div className="flex space-x-4">
              {/* Facebook icon with hover effect */}
              <Facebook className="h-6 w-6 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
              {/* Instagram icon with hover effect */}
              <Instagram className="h-6 w-6 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
              {/* Twitter icon with hover effect */}
              <Twitter className="h-6 w-6 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick links section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Order Online
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Catering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact information section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Naperville, IL 60564</li>
              <li>United States</li>
              <li>(630) 848-8222</li>
              <li>info@tandoorhut.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright section with top border */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Tandoor Hut Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
