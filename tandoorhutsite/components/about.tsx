// Import Card and CardContent components for layout
import { Card, CardContent } from "@/components/ui/card"

// Import icons from lucide-react for visual features
import { Award, Clock, Users, Utensils } from "lucide-react"

// Define an array of feature objects to display in the UI
const features = [
  {
    icon: Award, // Icon component to display
    title: "Authentic Cuisine", // Title text
    description: "Traditional South Indian recipes prepared with care", // Description text
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

// Define and export the About section component
export function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      {/* Container to center content and apply padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading and subtitle section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Tandoor Hut
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience authentic South Indian flavors in the heart of Naperville
          </p>
        </div>

        {/* Grid layout for feature cards: 2 columns on medium screens, 4 on large */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Loop through the features array to generate a card for each feature */}
          {features.map((feature, index) => (
            <Card
              key={index} // Unique key for each element in list
              className="text-center border-none shadow-lg hover:shadow-xl transition-shadow" // Card styles and hover effect
            >
              <CardContent className="p-6">
                {/* Render the icon component dynamically */}
                <feature.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                {/* Feature title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
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
