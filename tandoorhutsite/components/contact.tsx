import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

// Contact section component with contact details and reservation form
export function Contact() {
  return (
    <section className="py-20 bg-white">
      {/* Max width container with padding */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make a reservation or get in touch. We'd love to welcome you to Tandoor Hut
          </p>
        </div>

        {/* Two-column grid layout for contact info and reservation form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side: Contact information */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address */}
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">
                      456 Curry Lane<br />
                      Edison, NJ 08817
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">(732) 555-0123</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@tandoorhut.com</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-600">
                      Tue–Thu: 11:30 AM – 10:00 PM<br />
                      Fri–Sat: 11:30 AM – 11:00 PM<br />
                      Sun: 12:00 PM – 9:00 PM<br />
                      Mon: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side: Reservation form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">Make a Reservation</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Reservation Form */}
              <form className="space-y-4">
                {/* Name fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>

                {/* Email and phone */}
                <Input type="email" placeholder="Email Address" />
                <Input type="tel" placeholder="Phone Number" />

                {/* Date and time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input type="date" />
                  <Input type="time" />
                </div>

                {/* Number of guests */}
                <Input type="number" placeholder="Number of Guests" min="1" max="12" />

                {/* Optional notes */}
                <Textarea placeholder="Special Requests (optional)" rows={3} />

                {/* Submit button */}
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Make Reservation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
