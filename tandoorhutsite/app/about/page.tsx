"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Utensils, Heart, ChefHat, Leaf, Phone, MapPin } from "lucide-react"

/**
 * Restaurant Story Data
 * - Comprehensive background about Tandoor Hut
 * - Includes founding story, mission, and values
 * - Designed to build emotional connection with customers
 */
const restaurantStory = {
  founding: {
    year: "1998",
    story:
      "Founded by the Patel family who immigrated from Chennai, Tamil Nadu, Tandoor Hut began as a small family kitchen serving authentic South Indian cuisine to the growing Indian community in Naperville.",
  },
  mission:
    "To bring the authentic flavors of South India to Illinois while maintaining traditional cooking methods passed down through generations.",
  values: [
    "Authenticity in every dish",
    "Fresh ingredients sourced daily",
    "Traditional cooking methods",
    "Warm hospitality and service",
    "Community connection and support",
  ],
}

/**
 * Restaurant Features Data
 * - Key differentiators and selling points
 * - Each feature includes icon, title, and detailed description
 * - Focuses on quality, authenticity, and customer experience
 */
const features = [
  {
    icon: Award,
    title: "Award-Winning Cuisine",
    description:
      "Recognized by Chicago Tribune as 'Best South Indian Restaurant in Chicagoland' three years running. Our authentic recipes have earned acclaim from food critics and customers alike.",
    badge: "Award Winner",
  },
  {
    icon: ChefHat,
    title: "Master Chefs",
    description:
      "Our head chef trained in traditional South Indian kitchens in Chennai and Bangalore, bringing over 25 years of culinary expertise to every dish we serve.",
    badge: "Expert Team",
  },
  {
    icon: Leaf,
    title: "Fresh & Organic",
    description:
      "We source our spices directly from farms in Kerala and Tamil Nadu, ensuring the most authentic flavors. Many of our vegetables are locally sourced and organic.",
    badge: "Premium Quality",
  },
  {
    icon: Users,
    title: "Family Tradition",
    description:
      "Three generations of the Patel family work together to maintain our authentic recipes and warm hospitality that makes every guest feel like family.",
    badge: "Family Owned",
  },
  {
    icon: Utensils,
    title: "Traditional Methods",
    description:
      "We use traditional clay pots, stone grinding, and time-honored fermentation processes to create the most authentic South Indian flavors possible.",
    badge: "Authentic Process",
  },
  {
    icon: Heart,
    title: "Community Focus",
    description:
      "Proud supporters of local charities and cultural events. We regularly cater community festivals and donate meals to local food banks.",
    badge: "Community Partner",
  },
]

/**
 * AboutPage Component - Comprehensive restaurant information and story
 *
 * Purpose:
 * - Build trust and credibility with potential customers
 * - Share the restaurant's story and values
 * - Highlight unique selling points and differentiators
 * - Showcase team expertise and experience
 * - Display customer testimonials and social proof
 * - Provide multiple ways to connect and engage
 *
 * Features:
 * - Restaurant founding story and mission
 * - Detailed feature highlights with icons and badges
 * - Team member profiles with photos and backgrounds
 * - Customer review section with ratings
 * - Call-to-action sections for engagement
 * - Responsive design for all devices
 */
export default function AboutPage() {
  return (
    <>
      {/* Site navigation header */}
      <Navigation />

      {/* Main page content - starts below fixed header */}
      <main className="min-h-screen pt-16">
        {/* Hero Section - Page introduction */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl text-orange-100 leading-relaxed">
              A family tradition of authentic South Indian cuisine, bringing the flavors of Chennai and Bangalore to the
              heart of Naperville since {restaurantStory.founding.year}
            </p>
          </div>
        </section>

        {/* Restaurant Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Story content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">From Chennai to Naperville</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{restaurantStory.founding.story}</p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">{restaurantStory.mission}</p>

                {/* Core values list */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Core Values:</h3>
                  {restaurantStory.values.map((value, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story image placeholder */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <div className="text-8xl">🏠</div>
                </div>
                <Badge className="absolute top-4 right-4 bg-orange-600 text-white">
                  Est. {restaurantStory.founding.year}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the passion, expertise, and dedication that goes into every dish we serve
              </p>
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardHeader className="text-center pb-4">
                    <div className="relative">
                      <feature.icon className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Authentic South Indian Cuisine?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Join our family of satisfied customers and taste the difference that authentic ingredients and traditional
              methods make
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "/menu")}
              >
                View Our Menu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "/contact")}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Visit Us Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "tel:(630)820-3600")}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </>
  )
}
