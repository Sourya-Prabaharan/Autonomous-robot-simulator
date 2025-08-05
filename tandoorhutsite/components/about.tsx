import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone } from "lucide-react"

export function About() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Welcome to Tandoor Hut</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving authentic South Indian cuisine with traditional recipes passed down through generations. Experience
            the true taste of India in the heart of Naperville.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <div className="text-gray-600">
                <p>Mon-Thu: 11AM-9:30PM</p>
                <p>Fri-Sat: 11AM-10PM</p>
                <p>Sun: 11AM-9:30PM</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Naperville, IL 60564</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">(630) 820-3600</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
