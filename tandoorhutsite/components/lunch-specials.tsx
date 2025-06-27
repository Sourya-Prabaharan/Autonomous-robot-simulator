import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

/**
 * Lunch Specials Data Structure
 * - Time-limited offers designed to drive midday traffic
 * - Each special includes complete meal details and timing
 * - Structured to show value and convenience
 * - Includes itemized breakdown for transparency
 */
const lunchSpecials = [
  {
    name: "South Indian Thali",
    description: "Complete meal with rice, sambar, rasam, vegetable curry, pickle, papad, and dessert",
    price: "$16",
    time: "11:30 AM - 3:00 PM", // Limited time availability
    items: ["Steamed Rice", "Sambar", "Rasam", "2 Vegetable Curries", "Pickle", "Papad", "Curd", "Sweet"], // Detailed breakdown
  },
  {
    name: "Dosa Combo",
    description: "Choice of any dosa with sambar, coconut chutney, tomato chutney, and filter coffee",
    price: "$14",
    time: "11:30 AM - 3:00 PM",
    items: ["Any Dosa", "Sambar", "3 Chutneys", "Filter Coffee"],
  },
  {
    name: "Biryani Special",
    description: "Chicken or vegetable biryani with raita, pickle, and papad",
    price: "$15",
    time: "12:00 PM - 3:00 PM", // Slightly different timing
    items: ["Biryani", "Raita", "Pickle", "Papad", "Sweet Lassi"],
  },
]

/**
 * LunchSpecials Component - Time-limited value offerings
 *
 * Purpose:
 * - Drive lunch traffic during slower midday hours
 * - Provide value perception with complete meal deals
 * - Introduce customers to variety of dishes
 * - Create urgency with time-limited availability
 *
 * Business Strategy:
 * - Bundle pricing to increase average order value
 * - Complete meals reduce decision fatigue
 * - Time limits create urgency and exclusivity
 * - Variety appeals to different preferences
 *
 * Design Features:
 * - Gradient headers for visual appeal
 * - Clock icons emphasize time-limited nature
 * - Itemized lists show value and transparency
 * - Card layout for easy comparison
 * - Consistent pricing display
 */
export function LunchSpecials() {
  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lunch Specials</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic South Indian lunch combinations served fresh daily
          </p>
        </div>

        {/* Specials grid - responsive layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map through lunch specials to create special cards */}
          {lunchSpecials.map((special, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              {/* Card header with gradient background */}
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{special.name}</CardTitle>
                  {/* Price badge with contrasting colors */}
                  <Badge className="bg-white text-red-600 hover:bg-gray-100">{special.price}</Badge>
                </div>

                {/* Time availability with clock icon */}
                <div className="flex items-center text-red-100">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{special.time}</span>
                </div>
              </CardHeader>

              {/* Card content with description and items */}
              <CardContent className="p-6">
                {/* Special description */}
                <p className="text-gray-600 mb-4">{special.description}</p>

                {/* Items included header */}
                <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>

                {/* Itemized list with bullet points */}
                <ul className="space-y-1">
                  {special.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                      {/* Custom bullet point with brand color */}
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
