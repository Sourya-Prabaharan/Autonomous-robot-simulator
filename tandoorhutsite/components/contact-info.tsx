import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react"

// Component to display contact information and map
export function ContactInfo() {
  return (
    <section className="py-20 bg-white">
      {/* Container for max width and horizontal padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find us, call us, or get directions to Tandoor Hut
          </p>
        </div>

        {/* Grid layout: contact details on left, map on right (on large screens) */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Location & Hours
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Address Section */}
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">
                      Naperville, IL 60564<br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">(630) 848-8222</p>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@tandoorhut.com</p>
                  </div>
                </div>

                {/* Hours Section */}
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold mb-2">Hours</p>
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

                {/* Directions Button */}
                <div className="pt-4">
                  <a
                    href="https://www.google.com/maps/place/Tandoor+Hut/..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Embedded Google Map Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">
                  Find Us on the Map
                </CardTitle>
              </CardHeader>

              <CardContent>
                {/* Responsive iframe with aspect ratio for map */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=..."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>

                {/* Additional Location Notes */}
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
