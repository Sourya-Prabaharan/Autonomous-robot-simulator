import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Array of featured dishes with metadata
const dishes = [
  {
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato, served with sambar and coconut chutney",
    price: "$14",
    image: "/placeholder.svg?height=300&width=400", // Replace with actual image path if available
    badge: "Chef's Special",
  },
  {
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice with tender meat, aromatic spices, and saffron",
    price: "$18",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Popular",
  },
  {
    name: "Mysore Pak",
    description: "Traditional South Indian sweet made with gram flour, ghee, and sugar",
    price: "$8",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Signature",
  },
]

// FeaturedDishes component: shows a grid of highlighted menu items
export function FeaturedDishes() {
  return (
    <section className="py-20 bg-white">
      {/* Container with max width and horizontal padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading and intro text */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved creations, crafted with authentic spices and traditional recipes
          </p>
        </div>

        {/* Responsive grid layout for cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Map over dishes array to render each card */}
          {dishes.map((dish, index) => (
            <Card
              key={index}
              className="overflow-hidden card-hover border-0 shadow-lg"
            >
              {/* Placeholder image area with emoji (can be swapped with actual images) */}
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <div className="text-6xl">🍛</div>
                </div>

                {/* Badge for highlighting dish status */}
                <Badge className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700 text-white shadow-md">
                  {dish.badge}
                </Badge>
              </div>

              {/* Dish name, price, and description */}
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{dish.name}</h3>
                  <span className="text-2xl font-bold text-orange-600">{dish.price}</span>
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
