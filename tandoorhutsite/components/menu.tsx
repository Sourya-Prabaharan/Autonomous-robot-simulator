import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const menuCategories = [
  {
    title: "Antipasti",
    items: [
      { name: "Bruschetta Trio", description: "Classic tomato, mushroom, and ricotta variations", price: "$16" },
      {
        name: "Antipasto della Casa",
        description: "Selection of cured meats, cheeses, and marinated vegetables",
        price: "$24",
      },
      { name: "Burrata Caprese", description: "Creamy burrata with heirloom tomatoes and basil", price: "$18" },
    ],
  },
  {
    title: "Primi Piatti",
    items: [
      {
        name: "Spaghetti Carbonara",
        description: "Traditional Roman recipe with guanciale and pecorino",
        price: "$22",
      },
      { name: "Risotto ai Porcini", description: "Arborio rice with wild mushrooms and truffle oil", price: "$26" },
      { name: "Gnocchi Sorrentina", description: "Potato dumplings with tomato sauce and mozzarella", price: "$20" },
    ],
  },
  {
    title: "Secondi Piatti",
    items: [
      { name: "Branzino in Crosta", description: "Mediterranean sea bass in herb crust", price: "$34" },
      { name: "Bistecca alla Fiorentina", description: "Grilled T-bone steak with rosemary (for two)", price: "$68" },
      { name: "Pollo Parmigiana", description: "Breaded chicken breast with tomato and mozzarella", price: "$28" },
    ],
  },
]

export function Menu() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic Italian dishes prepared with love and the finest ingredients
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <Card key={index} className="h-fit">
              <CardHeader className="bg-amber-600 text-white">
                <CardTitle className="text-2xl text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          {item.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
