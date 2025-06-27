"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  NavigationIcon,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

/**
 * Contact Information Data
 * - Centralized restaurant contact details
 * - Used across multiple sections for consistency
 * - Easy to update in one place
 */
const contactInfo = {
  address: {
    street: "Naperville, IL 60564",
    city: "Naperville",
    state: "Illinois",
    zip: "60564",
    country: "United States",
  },
  phone: "(630) 820-3600",
  email: "info@tandoorhut.com",
  hours: {
    "Monday - Thursday": "11:00 AM - 9:30 PM",
    "Friday - Saturday": "11:00 AM - 10:00 PM",
    Sunday: "11:00 AM - 9:30 PM",
  },
  socialMedia: {
    facebook: "https://facebook.com/tandoorhut",
    instagram: "https://instagram.com/tandoorhut",
    yelp: "https://yelp.com/biz/tandoor-hut-naperville",
  },
}

/**
 * Contact Methods Data
 * - Different ways customers can reach the restaurant
 * - Each method includes icon, title, description, and action
 * - Provides multiple touchpoints for customer convenience
 */
const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team for reservations, takeout orders, or questions",
    action: "Call Now",
    link: `tel:${contactInfo.phone}`,
    info: contactInfo.phone,
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your questions, feedback, or catering inquiries",
    action: "Send Email",
    link: `mailto:${contactInfo.email}`,
    info: contactInfo.email,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come experience authentic South Indian cuisine in our welcoming restaurant",
    action: "Get Directions",
    link: "https://www.google.com/maps/place/Tandoor+Hut/@41.7069791,-88.242069,13z/data=!4m15!1m8!3m7!1s0x880ef61f1a6c4e85:0x817a6177e842012b!2sNaperville,+IL+60564!3b1!8m2!3d41.6967777!4d-88.1974148!16s%2Fm%2F01_82h2!3m5!1s0x880ef79e03fe2dd7:0xd2487a1ad6744563!8m2!3d41.7312583!4d-88.2067861!16s%2Fg%2F1tcvvfxb",
    info: contactInfo.address.street,
  },
  {
    icon: MessageSquare,
    title: "Social Media",
    description: "Follow us for daily specials, events, and behind-the-scenes content",
    action: "Follow Us",
    link: contactInfo.socialMedia.instagram,
    info: "@tandoorhut",
  },
]

/**
 * FAQ Data
 * - Frequently asked questions and answers
 * - Reduces customer service load
 * - Provides immediate answers to common inquiries
 */
const faqData = [
  {
    question: "Do you take reservations?",
    answer:
      "Yes! We accept reservations for parties of 4 or more. You can call us at (630) 820-3600 or use our online reservation form below. Walk-ins are always welcome for smaller parties.",
  },
  {
    question: "Do you offer vegetarian and vegan options?",
    answer:
      "South Indian cuisine has many naturally vegetarian and vegan dishes. We clearly mark all vegetarian items on our menu and can modify many dishes to be vegan upon request.",
  },
  {
    question: "Can you accommodate food allergies?",
    answer:
      "Yes, we take food allergies very seriously. Please inform our staff about any allergies when ordering, and our chefs will ensure your meal is prepared safely. We can accommodate most common allergies including gluten-free options.",
  },
  {
    question: "Do you offer catering services?",
    answer:
      "Yes! We provide catering for events of all sizes, from small office lunches to large wedding celebrations. Visit our catering page or call us to discuss your event needs and get a custom quote.",
  },
  {
    question: "What are your most popular dishes?",
    answer:
      "Our signature dishes include Masala Dosa, Paper Dosa, Hyderabadi Chicken Biryani, and Chettinad Chicken. Our lunch specials are also very popular, offering complete meals at great value.",
  },
  {
    question: "Do you deliver?",
    answer:
      "We offer delivery through our online ordering system and popular delivery apps. Delivery is available within a 5-mile radius of our restaurant. Minimum order requirements may apply.",
  },
]

/**
 * ContactPage Component - Comprehensive contact and communication hub
 *
 * Purpose:
 * - Provide multiple ways for customers to contact the restaurant
 * - Handle reservations, inquiries, and feedback
 * - Display essential business information (hours, location, etc.)
 * - Answer common questions through FAQ section
 * - Offer interactive contact forms for different purposes
 *
 * Features:
 * - Multiple contact methods with direct action buttons
 * - Interactive reservation form with validation
 * - General inquiry form for questions and feedback
 * - Embedded Google Maps for location and directions
 * - FAQ section to reduce customer service load
 * - Business hours and location information
 * - Social media integration
 * - Responsive design for all devices
 */
export default function ContactPage() {
  // Form state management for reservation form
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })

  // Form state management for general inquiry form
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // UI state management
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false)
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false)
  const [reservationStatus, setReservationStatus] = useState<"idle" | "success" | "error">("idle")
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "success" | "error">("idle")

  /**
   * Handle Reservation Form Submission
   * - Validates required fields
   * - Simulates API call to reservation system
   * - Provides user feedback on success/failure
   * - Resets form after successful submission
   */
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !reservationForm.name ||
      !reservationForm.email ||
      !reservationForm.phone ||
      !reservationForm.date ||
      !reservationForm.time ||
      !reservationForm.guests
    ) {
      setReservationStatus("error")
      return
    }

    setIsSubmittingReservation(true)
    setReservationStatus("idle")

    try {
      // Simulate API call (2 second delay)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create reservation object
      const reservation = {
        ...reservationForm,
        id: `RES${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: "pending",
      }

      // Log reservation (in production, this would go to a database)
      console.log("Reservation submitted:", reservation)

      setReservationStatus("success")

      // Reset form after successful submission
      setReservationForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        specialRequests: "",
      })
    } catch (error) {
      setReservationStatus("error")
    } finally {
      setIsSubmittingReservation(false)
    }
  }

  /**
   * Handle General Inquiry Form Submission
   * - Validates required fields
   * - Simulates API call to customer service system
   * - Provides user feedback on success/failure
   * - Resets form after successful submission
   */
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.subject || !inquiryForm.message) {
      setInquiryStatus("error")
      return
    }

    setIsSubmittingInquiry(true)
    setInquiryStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create inquiry object
      const inquiry = {
        ...inquiryForm,
        id: `INQ${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: "new",
      }

      // Log inquiry (in production, this would go to a database)
      console.log("Inquiry submitted:", inquiry)

      setInquiryStatus("success")

      // Reset form after successful submission
      setInquiryForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setInquiryStatus("error")
    } finally {
      setIsSubmittingInquiry(false)
    }
  }

  return (
    <>
      {/* Site navigation header */}
      <Navigation />

      {/* Main page content - starts below fixed header */}
      <main className="min-h-screen pt-16">
        {/* Hero Section - Page introduction */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-orange-100 leading-relaxed">
              We'd love to hear from you! Whether you have questions, want to make a reservation, or just want to say
              hello, we're here to help.
            </p>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Can We Help You?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the best way to reach us based on your needs
              </p>
            </div>

            {/* Contact methods grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 border-0">
                  <CardContent className="p-6">
                    <method.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{method.description}</p>
                    <p className="text-orange-600 font-semibold mb-4">{method.info}</p>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => window.open(method.link, "_blank")}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Reservation Form */}
              <Card className="shadow-xl">
                <CardHeader className="bg-orange-600 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Make a Reservation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Success/Error Messages */}
                  {reservationStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800">
                        Reservation request submitted successfully! We'll call you within 2 hours to confirm.
                      </span>
                    </div>
                  )}

                  {reservationStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800">Please fill in all required fields.</span>
                    </div>
                  )}

                  <form onSubmit={handleReservationSubmit} className="space-y-4">
                    {/* Personal Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name *"
                        value={reservationForm.name}
                        onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={reservationForm.email}
                        onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                      required
                    />

                    {/* Reservation Details */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Input
                        type="date"
                        value={reservationForm.date}
                        onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                        required
                        min={new Date().toISOString().split("T")[0]} // Prevent past dates
                      />
                      <Input
                        type="time"
                        value={reservationForm.time}
                        onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="Guests *"
                        min="1"
                        max="20"
                        value={reservationForm.guests}
                        onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                        required
                      />
                    </div>

                    <Textarea
                      placeholder="Special Requests (dietary restrictions, celebration, etc.)"
                      rows={3}
                      value={reservationForm.specialRequests}
                      onChange={(e) => setReservationForm({ ...reservationForm, specialRequests: e.target.value })}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={isSubmittingReservation}
                    >
                      {isSubmittingReservation ? "Submitting..." : "Request Reservation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* General Inquiry Form */}
              <Card className="shadow-xl">
                <CardHeader className="bg-gray-800 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Success/Error Messages */}
                  {inquiryStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800">Message sent successfully! We'll respond within 24 hours.</span>
                    </div>
                  )}

                  {inquiryStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800">Please fill in all required fields.</span>
                    </div>
                  )}

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name *"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <Input
                      placeholder="Subject *"
                      value={inquiryForm.subject}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                      required
                    />

                    <Textarea
                      placeholder="Your Message *"
                      rows={5}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      required
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gray-800 hover:bg-gray-900"
                      disabled={isSubmittingInquiry}
                    >
                      {isSubmittingInquiry ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location & Hours Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Business Information */}
              <div>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                      <MapPin className="h-6 w-6" />
                      Visit Our Restaurant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-gray-600">
                          {contactInfo.address.street}
                          <br />
                          {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                          <br />
                          {contactInfo.address.country}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-4">
                      <Phone className="h-6 w-6 text-orange-600" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-gray-600">{contactInfo.phone}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-orange-600" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-600">{contactInfo.email}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-orange-600 mt-1" />
                      <div>
                        <p className="font-semibold mb-2">Hours</p>
                        <div className="space-y-1 text-sm text-gray-600">
                          {Object.entries(contactInfo.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span>{day}:</span>
                              <span>{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Directions Button */}
                    <div className="pt-4">
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() =>
                          window.open(
                            "https://www.google.com/maps/place/Tandoor+Hut/@41.7069791,-88.242069,13z/data=!4m15!1m8!3m7!1s0x880ef61f1a6c4e85:0x817a6177e842012b!2sNaperville,+IL+60564!3b1!8m2!3d41.6967777!4d-88.1974148!16s%2Fm%2F01_82h2!3m5!1s0x880ef79e03fe2dd7:0xd2487a1ad6744563!8m2!3d41.7312583!4d-88.2067861!16s%2Fg%2F1tcvvfxb",
                            "_blank",
                          )
                        }
                      >
                        <NavigationIcon className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-orange-600">Find Us on the Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1234567890123!2d-88.2067861!3d41.7312583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef79e03fe2dd7%3A0xd2487a1ad6744563!2sTandoor%20Hut!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>📍 Located in beautiful Naperville, Illinois</p>
                      <p>🚗 Convenient parking available</p>
                      <p>♿ Wheelchair accessible</p>
                      <p>🛍️ Near downtown Naperville shopping district</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Quick answers to common questions about our restaurant</p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </>
  )
}
