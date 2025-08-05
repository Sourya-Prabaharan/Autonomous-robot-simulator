"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Phone } from "lucide-react"
import { trackPlatformClick, trackPhoneCall } from "@/lib/analytics"

export function OnlineOrdering() {
  const handleUberEatsClick = () => {
    trackPlatformClick("ubereats")
    window.open("https://www.ubereats.com/store/tandoor-hut/kKWuBdGdQJOvYJhJJhJJhJ", "_blank")
  }

  const handleDoorDashClick = () => {
    trackPlatformClick("doordash")
    window.open("https://www.doordash.com/store/tandoor-hut-naperville-123456/", "_blank")
  }

  const handlePhoneCall = () => {
    trackPhoneCall()
    window.open("tel:(630)820-3600")
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Order Online</h2>
          <p className="text-xl text-gray-600">Get your favorite dishes delivered or ready for pickup</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>UberEats</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Fast delivery through UberEats</p>
              <Button onClick={handleUberEatsClick} className="w-full bg-green-600 hover:bg-green-700">
                Order on UberEats
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle>DoorDash</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Quick delivery via DoorDash</p>
              <Button onClick={handleDoorDashClick} className="w-full bg-red-600 hover:bg-red-700">
                Order on DoorDash
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Phone Order</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Call us directly for pickup or delivery</p>
              <Button onClick={handlePhoneCall} className="w-full bg-blue-600 hover:bg-blue-700">
                Call (630) 820-3600
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
