import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const dishes = [
  {
    name: "Osso Buco alla Milanese",
    description: "Braised veal shanks with saffron risotto and gremolata",
    price: "$42",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Chef's Special",
  },
  {
    name: "Linguine alle Vongole",
    description: "Fresh clams with white wine, garlic, and Italian parsley",
    price: "$28",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Popular",
  },
  {
    name: "Tiramisu della Casa",
    description: "Traditional mascarpone dessert with espresso and cocoa",
    price: "$12",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Signature",
  },
]

export function FeaturedDishes() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved creations, crafted with passion and the finest ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-64 object-cover" />
                <Badge className="absolute top-4 left-4 bg-amber-600 hover:bg-amber-700">{dish.badge}</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{dish.name}</h3>
                  <span className="text-2xl font-bold text-amber-600">{dish.price}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
