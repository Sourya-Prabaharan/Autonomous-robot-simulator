import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const lunchSpecials = [
  {
    name: "South Indian Thali",
    description: "Complete meal with rice, sambar, rasam, vegetable curry, pickle, papad, and dessert",
    price: "$16",
    time: "11:30 AM - 3:00 PM",
    items: ["Steamed Rice", "Sambar", "Rasam", "2 Vegetable Curries", "Pickle", "Papad", "Curd", "Sweet"],
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
    time: "12:00 PM - 3:00 PM",
    items: ["Biryani", "Raita", "Pickle", "Papad", "Sweet Lassi"],
  },
]

export function LunchSpecials() {
  return (
    // Section for lunch specials with vertical padding and subtle gradient background
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section heading and subtitle, centered */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lunch Specials</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic South Indian lunch combinations served fresh daily
          </p>
        </div>

        {/* Grid layout for lunch special cards: 3 columns on large screens */}
        <div className="grid lg:grid-cols-3 gap-8">
          {lunchSpecials.map((special, index) => (
            // Individual card with shadow effect on hover and smooth transition
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              
              {/* Card header with gradient background and white text */}
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                
                {/* Flex container for title and price badge */}
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{special.name}</CardTitle>
                  
                  {/* Price badge with white background and orange text */}
                  <Badge className="bg-white text-orange-600 hover:bg-gray-100">{special.price}</Badge>
                </div>
                
                {/* Time display with clock icon, styled light orange */}
                <div className="flex items-center text-orange-100">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{special.time}</span>
                </div>
              </CardHeader>
              
              {/* Card content with padding */}
              <CardContent className="p-6">
                
                {/* Description paragraph */}
                <p className="text-gray-600 mb-4">{special.description}</p>
                
                {/* Includes heading */}
                <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                
                {/* List of included items with small orange bullet points */}
                <ul className="space-y-1">
                  {special.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
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
