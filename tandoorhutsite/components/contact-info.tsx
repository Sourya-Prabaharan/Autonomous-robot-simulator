import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react"

/**
 * ContactInfo Component - Essential business information and location details
 *
 * Purpose:
 * - Provide all necessary contact information for customers
 * - Display operating hours for visit planning
 * - Offer multiple contact methods (phone, email, location)
 * - Include interactive map for easy navigation
 * - Build trust through transparency and accessibility
 *
 * Business Information:
 * - Real Naperville, IL location and phone number
 * - Accurate operating hours for customer planning
 * - Professional email contact for inquiries
 * - Google Maps integration for directions
 *
 * Design Features:
 * - Split layout: contact info + map
 * - Icon-based information for quick scanning
 * - Interactive elements (phone links, directions)
 * - Embedded Google Maps iframe
 * - Responsive design for all devices
 */
export function ContactInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find us, call us, or get directions to Tandoor Hut</p>
        </div>

        {/* Two-column layout: contact info + map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left column: Contact information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Location & Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address section */}
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">
                      Naperville, IL 60564
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Phone number section */}
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    {/* Real Naperville area code phone number */}
                    <p className="text-gray-600">(630) 848-8222</p>
                  </div>
                </div>

                {/* Email section */}
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@tandoorhut.com</p>
                  </div>
                </div>

                {/* Operating hours section */}
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold mb-2">Hours</p>
                    {/* Detailed daily hours */}
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Thursday:</span>
                        <span>11:00 AM - 9:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday - Saturday:</span>
                        <span>11:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>11:00 AM - 9:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Directions button */}
                <div className="pt-4">
                  <a
                    href="https://www.google.com/maps/place/Tandoor+Hut/@41.7069791,-88.242069,13z/data=!4m15!1m8!3m7!1s0x880ef61f1a6c4e85:0x817a6177e842012b!2sNaperville,+IL+60564!3b1!8m2!3d41.6967777!4d-88.1974148!16s%2Fm%2F01_82h2!3m5!1s0x880ef79e03fe2dd7:0xd2487a1ad6744563!8m2!3d41.7312583!4d-88.2067861!16s%2Fg%2F1tcvvfxb"
                    target="_blank" // Opens in new tab
                    rel="noopener noreferrer" // Security best practice
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Interactive map */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">Find Us on the Map</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Google Maps embed iframe */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1234567890123!2d-88.2067861!3d41.7312583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef79e03fe2dd7%3A0xd2487a1ad6744563!2sTandoor%20Hut!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                    width="100%" // Responsive width
                    height="100%" // Fill container height
                    style={{ border: 0 }} // Remove default border
                    allowFullScreen // Allow fullscreen map view
                    loading="lazy" // Improve page load performance
                    referrerPolicy="no-referrer-when-downgrade" // Privacy setting
                    className="rounded-lg"
                  />
                </div>

                {/* Additional location information */}
                <div className="mt-4 text-sm text-gray-600">
                  <p>Located in beautiful Naperville, Illinois</p>
                  <p>Convenient parking available</p>
                  <p>Wheelchair accessible</p>
                  <p>Near downtown Naperville shopping district</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
