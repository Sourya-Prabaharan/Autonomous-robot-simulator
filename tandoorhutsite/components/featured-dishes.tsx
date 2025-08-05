import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Featured Dishes Data Structure
 * - Curated selection of the restaurant's most popular items
 * - Each dish includes name, description, price, image, and badge
 * - Designed to entice visitors and showcase menu quality
 * - Strategic selection representing different categories
 */
const dishes = [
  {
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato, served with sambar and coconut chutney",
    price: "$14",  
    image: "/placeholder.svg?height=300&width=400", // Placeholder image URL
    badge: "Chef's Special", // Special designation for marketing
  },
  {
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice with tender meat, aromatic spices, and saffron",
    price: "$18",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Popular", // Social proof indicator
  },
  {
    name: "Mysore Pak",
    description: "Traditional South Indian sweet made with gram flour, ghee, and sugar",
    price: "$8",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Signature", // Unique restaurant offering
  },
]

/**
 * FeaturedDishes Component - Showcase of restaurant's best offerings
 *
 * Purpose:
 * - Create immediate appetite appeal for visitors
 * - Highlight menu diversity (appetizer, main, dessert)
 * - Provide price anchoring for customer expectations
 * - Drive interest toward full menu exploration
 *
 * Marketing Strategy:
 * - "Chef's Special" - Authority and expertise
 * - "Popular" - Social proof and validation
 * - "Signature" - Uniqueness and exclusivity
 *
 * Visual Design:
 * - Card-based layout for clean presentation
 * - Hover effects for interactivity
 * - Badge system for special designations
 * - Emoji icons as visual food representations
 * - Responsive grid layout
 */
export function FeaturedDishes() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved creations, crafted with authentic spices and traditional recipes
          </p>
        </div>

        {/* Dishes grid - responsive layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Map through dishes array to create dish cards */}
          {dishes.map((dish, index) => (
            <Card key={index} className="overflow-hidden card-hover border-0 shadow-lg">
              {/* Image section with badge overlay */}
              <div className="relative">
                {/* Placeholder image area with gradient background */}
                <div className="w-full h-64 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                  {/* Food emoji as visual representation */}
                  <div className="text-6xl">🍛</div> 
                </div>

                {/* Special designation badge positioned over image */}
                <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white shadow-md">
                  {dish.badge}
                </Badge>
              </div>

              {/* Card content with dish details */}
              <CardContent className="p-6">
                {/* Dish name and price header */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{dish.name}</h3>
                  <span className="text-2xl font-bold text-red-600">{dish.price}</span>
                </div>

                {/* Dish description */}
                <p className="text-gray-600 leading-relaxed">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
