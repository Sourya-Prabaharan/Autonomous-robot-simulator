"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"

/**
 * Delivery Platform Data - Simplified version
 * - Real UberEats and DoorDash links for Tandoor Hut Naperville
 * - Removed delivery fees, times, and complex details
 * - Focus on simple platform selection
 */
const deliveryPlatforms = [
  {
    name: "UberEats",
    logo: "🚗",
    description: "Order delivery from Tandoor Hut",
    rating: 4.6,
    reviews: 1250,
    orderUrl:
      "https://www.ubereats.com/store/tandoor-hut/mChGPrbITXOG0PszzneUqg?srsltid=AfmBOoo1LyIE_I16LmWzbRi_P6TG0Zoxq786a8gWz4H2Bc-lcA3vdD9d",
    backgroundColor: "bg-black",
    textColor: "text-white",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    name: "DoorDash",
    logo: "🏠",
    description: "Get your favorite South Indian food delivered",
    rating: 4.5,
    reviews: 890,
    orderUrl:
      "https://www.doordash.com/store/tandoorhut-naperville-981534/1456703/?srsltid=AfmBOoplot9ZKL57MnCTUEiEY8nRfC2Ig1MLXE1k6XITr9vQk2zQetXf",
    backgroundColor: "bg-red-600",
    textColor: "text-white",
    buttonColor: "bg-white hover:bg-gray-100 text-red-600",
  },
]

/**
 * Restaurant Information for Delivery Platforms
 */
const restaurantInfo = {
  name: "Tandoor Hut",
  address: "Naperville, IL 60564",
  phone: "(630) 820-3600",
  cuisine: "South Indian",
  rating: 4.6,
  totalReviews: 2140,
  deliveryRadius: "5 miles",
  operatingHours: {
    "Monday - Thursday": "11:00 AM - 9:30 PM",
    "Friday - Saturday": "11:00 AM - 10:00 PM",
    Sunday: "11:00 AM - 9:30 PM",
  },
}

/**
 * DeliveryPlatforms Component - Third-party delivery integration
 *
 */
export function DeliveryPlatforms() {
  /**
   * Handle platform ordering
   * - Opens the respective delivery platform in a new tab
   * - Tracks which platform was selected (for analytics)
   */
  const handleOrderFromPlatform = (platform: any) => {
    // Track platform selection (for analytics)
    console.log(`Customer selected ${platform.name} for delivery`)

    // Open platform URL in new tab
    window.open(platform.orderUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Order for Delivery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Get authentic South Indian cuisine delivered to your door in Naperville and surrounding areas
          </p>
        </div>

        {/* Delivery Platforms Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {deliveryPlatforms.map((platform, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Platform Header */}
              <CardHeader className={`${platform.backgroundColor} ${platform.textColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{platform.logo}</span>
                    <div>
                      <CardTitle className="text-2xl">{platform.name}</CardTitle>
                      <p className="text-sm opacity-90">{platform.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">{platform.reviews} reviews</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Order Button - simplified */}
                <Button
                  onClick={() => handleOrderFromPlatform(platform)}
                  className={`w-full ${platform.buttonColor} font-semibold py-3 text-lg`}
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Order on {platform.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Prefer to Order Directly?</h3>
            <p className="text-red-100 mb-4">Call us for pickup orders and skip the delivery fees!</p>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
              onClick={() => (window.location.href = "tel:(630)820-3600")}
            >
              📞 Call (630) 820-3600
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
