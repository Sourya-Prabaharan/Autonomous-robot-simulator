import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, Users, Utensils } from "lucide-react"

/**
 * Features Data Structure
 * - Array of objects representing key restaurant selling points
 * - Each feature has an icon, title, and description
 * - Icons come from Lucide React icon library
 * - Used to build trust and highlight unique value propositions
 */
const features = [
  {
    icon: Award, // Lucide React icon component
    title: "Authentic Cuisine",
    description: "Traditional South Indian recipes prepared with care",
  },
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "All dishes prepared fresh daily with quality ingredients",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Welcoming atmosphere for families and groups",
  },
  {
    icon: Utensils,
    title: "Traditional Methods",
    description: "Authentic cooking techniques and spice blends",
  },
]

/**
 * About Component - Restaurant features and value propositions
 *
 * Purpose:
 * - Build credibility and trust with potential customers
 * - Highlight what makes the restaurant special
 * - Provide social proof and quality indicators
 * - Create emotional connection with brand values
 *
 * Design Features:
 * - Clean, minimal design focusing on key benefits
 * - Icon-based visual communication for quick scanning
 * - Card layout for easy reading and visual separation
 * - Responsive grid that adapts to screen size
 *
 * Content Strategy:
 * - Focus on quality and authenticity (key differentiators)
 * - Family-friendly messaging (broad appeal)
 * - Traditional methods (authenticity proof)
 * - Fresh ingredients (quality assurance)
 */
export function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-red-600 to-red-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header with title and description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Tandoor Hut</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience authentic South Indian flavors in the heart of Naperville
          </p>
        </div>

        {/* Features grid - responsive layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map through features array to create feature cards */}
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* Dynamic icon component - feature.icon is a React component */}
                <feature.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />

                {/* Feature title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>

                {/* Feature description */}
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
