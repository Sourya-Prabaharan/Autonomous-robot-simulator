import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make a reservation or get in touch. We'd love to welcome you to Bella Vista
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-600">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">
                      123 Via Roma, Little Italy
                      <br />
                      New York, NY 10013
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">(212) 555-0123</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@bellavistanyc.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-600">
                      Mon-Thu: 5:00 PM - 10:00 PM
                      <br />
                      Fri-Sat: 5:00 PM - 11:00 PM
                      <br />
                      Sun: 4:00 PM - 9:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-amber-600">Make a Reservation</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email Address" />
                <Input type="tel" placeholder="Phone Number" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input type="date" />
                  <Input type="time" />
                </div>
                <Input type="number" placeholder="Number of Guests" min="1" max="12" />
                <Textarea placeholder="Special Requests (optional)" rows={3} />
                <Button className="w-full bg-amber-600 hover:bg-amber-700">Make Reservation</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
