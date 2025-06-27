"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Calendar, CheckCircle, Utensils, Heart, Star, Phone, Mail, AlertCircle } from "lucide-react"

/**
 * Catering Packages Data
 * - Different catering options for various event sizes
 * - Each package includes items, pricing, and serving information
 * - Designed to accommodate different budgets and preferences
 */
const cateringPackages = [
  {
    name: "Executive Lunch Package",
    description: "Perfect for office meetings and corporate events",
    minGuests: 10,
    maxGuests: 25,
    pricePerPerson: 18.99,
    items: [
      "Choice of 2 main dishes (Chicken Biryani, Vegetable Curry)",
      "Basmati rice and naan bread",
      "Mixed vegetable side dish",
      "Raita and pickle assortment",
      "Fresh fruit dessert",
      "Disposable plates, utensils, and napkins",
    ],
    popular: false,
    badge: "Corporate",
  },
  {
    name: "Family Celebration Package",
    description: "Ideal for family gatherings, birthdays, and small celebrations",
    minGuests: 15,
    maxGuests: 50,
    pricePerPerson: 24.99,
    items: [
      "Choice of 3 main dishes (including vegetarian options)",
      "Assorted dosas and uthappam",
      "Sambar and coconut chutney",
      "2 rice dishes (Biryani and Lemon Rice)",
      "Traditional sweets (Gulab Jamun, Mysore Pak)",
      "Filter coffee and masala chai service",
      "Complete setup with serving utensils",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Grand Wedding Package",
    description: "Full-service catering for weddings and large celebrations",
    minGuests: 50,
    maxGuests: 300,
    pricePerPerson: 32.99,
    items: [
      "5 main dishes including premium options",
      "Live dosa and chaat stations",
      "Complete South Indian breakfast spread",
      "3 types of biryani (Chicken, Mutton, Vegetable)",
      "Traditional wedding sweets and desserts",
      "Professional service staff included",
      "Elegant serving dishes and presentation",
      "Customizable menu based on preferences",
    ],
    popular: false,
    badge: "Premium",
  },
  {
    name: "Custom Package",
    description: "Tailored specifically to your event needs and budget",
    minGuests: 5,
    maxGuests: 500,
    pricePerPerson: "Custom",
    items: [
      "Work with our chef to create your perfect menu",
      "Accommodate dietary restrictions and preferences",
      "Flexible pricing based on selections",
      "Available for any event size",
      "Optional add-ons: live cooking stations, premium dishes",
      "Professional consultation included",
    ],
    popular: false,
    badge: "Flexible",
  },
]

/**
 * Event Types Data
 * - Different types of events we cater
 * - Each type includes icon, description, and typical package recommendations
 */
const eventTypes = [
  {
    icon: Users,
    title: "Corporate Events",
    description: "Office parties, meetings, conferences, and business celebrations",
    recommendedPackage: "Executive Lunch Package",
    features: ["Professional presentation", "Timely delivery", "Minimal cleanup"],
  },
  {
    icon: Heart,
    title: "Weddings & Celebrations",
    description: "Weddings, anniversaries, engagement parties, and milestone celebrations",
    recommendedPackage: "Grand Wedding Package",
    features: ["Traditional presentation", "Full service staff", "Custom menus"],
  },
  {
    icon: Calendar,
    title: "Family Gatherings",
    description: "Birthday parties, family reunions, holiday celebrations, and get-togethers",
    recommendedPackage: "Family Celebration Package",
    features: ["Family-style service", "Kid-friendly options", "Flexible timing"],
  },
  {
    icon: Utensils,
    title: "Special Occasions",
    description: "Religious ceremonies, cultural events, fundraisers, and community gatherings",
    recommendedPackage: "Custom Package",
    features: ["Cultural authenticity", "Religious dietary compliance", "Community pricing"],
  },
]

/**
 * Customer Testimonials Data
 * - Real feedback from catering customers
 * - Builds trust and credibility for catering services
 * - Highlights different aspects of service quality
 */
const cateringTestimonials = [
  {
    name: "Jennifer Martinez",
    event: "Corporate Holiday Party",
    guests: 45,
    rating: 5,
    review:
      "Tandoor Hut catered our company holiday party and it was absolutely perfect! The food was authentic and delicious, and they handled everything professionally. Our employees are still talking about how amazing the dosas were!",
    date: "2 months ago",
  },
  {
    name: "Raj & Priya Sharma",
    event: "Wedding Reception",
    guests: 150,
    rating: 5,
    review:
      "We chose Tandoor Hut for our wedding reception and couldn't be happier. They worked with us to create a perfect menu that honored our traditions while appealing to all our guests. The live dosa station was a huge hit!",
    date: "6 months ago",
  },
  {
    name: "Michael Thompson",
    event: "Birthday Celebration",
    guests: 25,
    rating: 5,
    review:
      "Fantastic catering for my wife's 50th birthday! The Family Celebration Package was perfect - great variety, authentic flavors, and reasonable pricing. The setup was beautiful and cleanup was minimal.",
    date: "1 month ago",
  },
]

/**
 * CateringPage Component - Comprehensive catering services showcase
 *
 * Purpose:
 * - Showcase catering packages and services
 * - Handle catering inquiries and quote requests
 * - Display pricing and package information
 * - Build trust through testimonials and event photos
 * - Provide easy contact methods for catering bookings
 *
 * Features:
 * - Multiple catering packages with detailed information
 * - Event type recommendations and guidance
 * - Interactive quote request form with validation
 * - Customer testimonials and success stories
 * - Pricing calculator and package comparisons
 * - Direct contact options for consultations
 * - Responsive design for all devices
 */
export default function CateringPage() {
  // Form state for catering inquiry
  const [cateringForm, setCateringForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    location: "",
    details: "",
  })

  // UI state management
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  /**
   * Handle Catering Form Submission
   * - Validates required fields
   * - Simulates API call to catering team
   * - Provides user feedback and confirmation
   * - Resets form after successful submission
   */
  const handleCateringSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !cateringForm.name ||
      !cateringForm.email ||
      !cateringForm.phone ||
      !cateringForm.eventType ||
      !cateringForm.eventDate ||
      !cateringForm.guestCount
    ) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create catering inquiry
      const inquiry = {
        ...cateringForm,
        id: `CAT${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: "new",
      }

      console.log("Catering inquiry submitted:", inquiry)
      setSubmitStatus("success")

      // Reset form
      setCateringForm({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        budget: "",
        location: "",
        details: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Site navigation header */}
      <Navigation />

      {/* Main page content */}
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Catering Services</h1>
            <p className="text-xl md:text-2xl text-orange-100 leading-relaxed mb-8">
              Bring authentic South Indian flavors to your special events with our professional catering services
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge className="bg-white text-orange-600 px-4 py-2">✨ 25+ Years Experience</Badge>
              <Badge className="bg-white text-orange-600 px-4 py-2">👥 5-500 Guests</Badge>
              <Badge className="bg-white text-orange-600 px-4 py-2">🏆 Award-Winning Cuisine</Badge>
            </div>
          </div>
        </section>

        {/* Catering Packages Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Catering Packages</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose from our carefully crafted packages or let us create a custom menu for your event
              </p>
            </div>

            {/* Packages grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {cateringPackages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-xl transition-shadow duration-300 ${pkg.popular ? "ring-2 ring-orange-600" : ""}`}
                >
                  <CardHeader className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl text-gray-900 mb-2">{pkg.name}</CardTitle>
                        <p className="text-gray-600">{pkg.description}</p>
                      </div>
                      <Badge className={`${pkg.popular ? "bg-orange-600" : "bg-gray-600"} text-white`}>
                        {pkg.badge}
                      </Badge>
                    </div>

                    {/* Pricing and guest info */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="text-3xl font-bold text-orange-600">
                        {typeof pkg.pricePerPerson === "string" ? pkg.pricePerPerson : `$${pkg.pricePerPerson}`}
                        {typeof pkg.pricePerPerson !== "string" && (
                          <span className="text-sm text-gray-600">/person</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <Users className="h-4 w-4 inline mr-1" />
                        {pkg.minGuests}-{pkg.maxGuests} guests
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <h4 className="font-semibold text-gray-900 mb-3">Package Includes:</h4>
                    <ul className="space-y-2 mb-6">
                      {pkg.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => document.getElementById("catering-form")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Get Quote for This Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perfect for Any Event</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We cater all types of events with the same attention to quality and authenticity
              </p>
            </div>

            {/* Event types grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {eventTypes.map((eventType, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <eventType.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{eventType.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{eventType.description}</p>

                    <div className="mb-4">
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Recommended: {eventType.recommendedPackage}
                      </Badge>
                    </div>

                    <ul className="text-xs text-gray-500 space-y-1">
                      {eventType.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Catering Customers Say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real experiences from satisfied customers who trusted us with their special events
              </p>
            </div>

            {/* Testimonials grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {cateringTestimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.review}"</p>

                    {/* Customer info */}
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.event} • {testimonial.guests} guests
                      </p>
                      <p className="text-xs text-gray-500">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Request Form Section */}
        <section id="catering-form" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Request a Catering Quote</h2>
              <p className="text-xl text-gray-600">
                Tell us about your event and we'll create a custom proposal for you
              </p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">
                      Thank you! We've received your catering inquiry and will contact you within 24 hours with a
                      detailed quote.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-800">Please fill in all required fields.</span>
                  </div>
                )}

                <form onSubmit={handleCateringSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name *"
                      value={cateringForm.name}
                      onChange={(e) => setCateringForm({ ...cateringForm, name: e.target.value })}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={cateringForm.email}
                      onChange={(e) => setCateringForm({ ...cateringForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={cateringForm.phone}
                    onChange={(e) => setCateringForm({ ...cateringForm, phone: e.target.value })}
                    required
                  />

                  {/* Event Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      value={cateringForm.eventType}
                      onChange={(e) => setCateringForm({ ...cateringForm, eventType: e.target.value })}
                      required
                    >
                      <option value="">Select Event Type *</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="wedding">Wedding/Celebration</option>
                      <option value="family">Family Gathering</option>
                      <option value="religious">Religious/Cultural Event</option>
                      <option value="other">Other</option>
                    </select>

                    <Input
                      type="date"
                      value={cateringForm.eventDate}
                      onChange={(e) => setCateringForm({ ...cateringForm, eventDate: e.target.value })}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Number of Guests *"
                      min="5"
                      max="500"
                      value={cateringForm.guestCount}
                      onChange={(e) => setCateringForm({ ...cateringForm, guestCount: e.target.value })}
                      required
                    />
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      value={cateringForm.budget}
                      onChange={(e) => setCateringForm({ ...cateringForm, budget: e.target.value })}
                    >
                      <option value="">Budget Range (Optional)</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="over-5000">Over $5,000</option>
                    </select>
                  </div>

                  <Input
                    placeholder="Event Location/Venue"
                    value={cateringForm.location}
                    onChange={(e) => setCateringForm({ ...cateringForm, location: e.target.value })}
                  />

                  <Textarea
                    placeholder="Additional Details (dietary restrictions, special requests, preferred dishes, etc.)"
                    rows={4}
                    value={cateringForm.details}
                    onChange={(e) => setCateringForm({ ...cateringForm, details: e.target.value })}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Catering Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Event?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Our catering team is standing by to help make your event unforgettable
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "tel:(630)820-3600")}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (630) 820-3600
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "mailto:catering@tandoorhut.com")}
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Us
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
