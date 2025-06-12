import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    // Footer section with dark background and white text, vertical padding
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid container: 4 columns on md screens, with gaps */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand info and social icons, spans 2 columns */}
          <div className="col-span-2">
            {/* Brand name */}
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Tandoor Hut</h3>
            {/* Short description */}
            <p className="text-gray-300 mb-4 max-w-md">
              Authentic South Indian cuisine in beautiful Naperville, Illinois. Fresh ingredients, traditional recipes,
              and warm hospitality.
            </p>
            {/* Social media icons with hover effects */}
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick navigation links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Order Online
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Catering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact information */}
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

        {/* Bottom copyright bar with border on top and centered text */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Tandoor Hut Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
