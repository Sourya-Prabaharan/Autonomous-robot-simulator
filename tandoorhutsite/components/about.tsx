import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, Users, Utensils } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized by Michelin Guide for exceptional Italian cuisine",
  },
  {
    icon: Clock,
    title: "Since 1985",
    description: "Nearly 40 years of culinary excellence and tradition",
  },
  {
    icon: Users,
    title: "Family Owned",
    description: "Three generations of authentic Italian recipes",
  },
  {
    icon: Utensils,
    title: "Fresh Daily",
    description: "Ingredients sourced daily from local Italian markets",
  },
]

export function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 1985 by the Rossi family, Bella Vista has been serving authentic Italian cuisine with a passion
              that spans three generations. Our commitment to traditional recipes, combined with the finest imported and
              locally-sourced ingredients, creates an unforgettable dining experience.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              From our wood-fired pizza oven to our handmade pasta, every dish tells a story of Italian heritage and
              culinary artistry. We invite you to become part of our extended family and experience the warmth of
              Italian hospitality.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <feature.icon className="h-8 w-8 text-amber-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Restaurant interior"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold text-amber-600">4.9★</div>
              <div className="text-sm text-gray-600">Google Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
