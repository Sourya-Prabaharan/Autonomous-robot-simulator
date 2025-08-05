"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Star } from "lucide-react"
import { trackPlatformClick, trackPhoneCall } from "@/lib/analytics"

/**
 * OnlineOrdering Component - Delivery platform integration
 *
 * Features:
 * - Links to UberEats and DoorDash
 * - Phone ordering option
 * - Analytics tracking for all interactions
 * - Restaurant information display
 */
export function OnlineOrdering() {
  /**
   * Handle platform clicks with analytics tracking
   */
  const handlePlatformClick = (platform: string, url: string) => {
    trackPlatformClick(platform)
    window.open(url, "_blank")
  }

  /**
   * Handle phone call with analytics tracking
   */
  const handlePhoneCall = () => {
    trackPhoneCall()
    window.location.href = "tel:(630)820-3600"
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Order Online</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get authentic South Indian cuisine delivered fresh to your door
          </p>
        </div>

        {/* Restaurant Info Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 border-red-100">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
              <CardTitle className="text-2xl text-center text-red-800">Tandoor Hut - Naperville</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 text-red-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600 text-sm">Naperville, IL 60564</p>
                </div>

                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-red-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                  <p className="text-gray-600 text-sm">
                    Mon-Thu: 11AM-9:30PM
                    <br />
                    Fri-Sat: 11AM-10PM
                    <br />
                    Sun: 11AM-9:30PM
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <Phone className="h-8 w-8 text-red-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <Button
                    variant="link"
                    className="text-red-600 hover:text-red-700 p-0 h-auto font-semibold"
                    onClick={handlePhoneCall}
                  >
                    (630) 820-3600
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Platforms */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* UberEats Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">UE</span>
              </div>
              <CardTitle className="text-xl">UberEats</CardTitle>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-2">4.8 rating</span>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Fast Delivery
                </Badge>
                <p className="text-gray-600">Order through UberEats for quick and reliable delivery</p>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() =>
                  handlePlatformClick("ubereats", "https://www.ubereats.com/store/tandoor-hut/4bWOBroxSdOABc_5dYVVJA")
                }
              >
                Order on UberEats
              </Button>
            </CardContent>
          </Card>

          {/* DoorDash Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">DD</span>
              </div>
              <CardTitle className="text-xl">DoorDash</CardTitle>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-2">4.9 rating</span>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Popular Choice
                </Badge>
                <p className="text-gray-600">Order through DoorDash for convenient delivery options</p>
              </div>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() =>
                  handlePlatformClick("doordash", "https://www.doordash.com/store/tandoor-hut-naperville-1486077/")
                }
              >
                Order on DoorDash
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Phone Order Section */}
        <div className="text-center mt-12">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prefer to Call?</h3>
              <p className="text-gray-600 mb-4">Call us directly for pickup orders or special requests</p>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                onClick={handlePhoneCall}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call (630) 820-3600
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">All orders are tracked for analytics and to improve our service</p>
        </div>
      </div>
    </section>
  )
}
