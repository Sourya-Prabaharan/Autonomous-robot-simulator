"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { trackPhoneCall } from "@/lib/analytics"

export function ContactInfo() {
  const handlePhoneClick = () => {
    trackPhoneCall()
    window.open("tel:(630)820-3600")
  }

  const handleEmailClick = () => {
    window.open("mailto:info@tandoorhut.com")
  }

  const handleDirectionsClick = () => {
    window.open("https://maps.google.com/?q=Naperville,IL+60564", "_blank")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Us Today</h2>
          <p className="text-xl text-gray-600">Come experience authentic South Indian flavors in Naperville</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600 text-sm mb-3">Naperville, IL 60564</p>
              <Button size="sm" variant="outline" onClick={handleDirectionsClick}>
                Get Directions
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 text-sm mb-3">(630) 820-3600</p>
              <Button size="sm" variant="outline" onClick={handlePhoneClick}>
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Mail className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">info@tandoorhut.com</p>
              <Button size="sm" variant="outline" onClick={handleEmailClick}>
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <div className="text-gray-600 text-sm mb-3">
                <p>Mon-Thu: 11AM-9:30PM</p>
                <p>Fri-Sat: 11AM-10PM</p>
                <p>Sun: 11AM-9:30PM</p>
              </div>
              <Link href="/contact">
                <Button size="sm" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4">
              View Our Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
