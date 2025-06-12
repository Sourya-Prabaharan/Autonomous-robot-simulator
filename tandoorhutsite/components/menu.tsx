import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const menuCategories = [
  {
    title: "Appetizers",
    items: [
      {
        name: "Medu Vada",
        description: "Crispy lentil donuts served with sambar and coconut chutney",
        price: "$8",
        spice: "mild",
      },
      {
        name: "Vegetable Pakora",
        description: "Assorted vegetables dipped in spiced chickpea batter and fried",
        price: "$10",
        spice: "medium",
      },
      {
        name: "Samosa Chaat",
        description: "Crushed samosas topped with yogurt, chutneys, and spices",
        price: "$12",
        spice: "medium",
      },
      {
        name: "Idli Sambar",
        description: "Steamed rice cakes served with lentil curry and coconut chutney",
        price: "$9",
        spice: "mild",
      },
      {
        name: "Chicken 65",
        description: "Spicy deep-fried chicken marinated in yogurt and spices",
        price: "$14",
        spice: "hot",
      },
      {
        name: "Paneer Tikka",
        description: "Grilled cottage cheese cubes marinated in tandoor spices",
        price: "$13",
        spice: "medium",
      },
    ],
  },
  {
    title: "Dosas & Crepes",
    items: [
      {
        name: "Plain Dosa",
        description: "Traditional crispy rice crepe served with sambar and chutneys",
        price: "$10",
        spice: "mild",
      },
      { name: "Masala Dosa", description: "Rice crepe filled with spiced potato curry", price: "$12", spice: "medium" },
      {
        name: "Paper Dosa",
        description: "Extra crispy and thin rice crepe, our signature dish",
        price: "$14",
        spice: "mild",
      },
      {
        name: "Mysore Masala Dosa",
        description: "Spicy red chutney spread with potato filling",
        price: "$13",
        spice: "hot",
      },
      {
        name: "Rava Dosa",
        description: "Semolina crepe with onions, chilies, and coriander",
        price: "$11",
        spice: "medium",
      },
      {
        name: "Cheese Dosa",
        description: "Rice crepe filled with melted cheese and spices",
        price: "$13",
        spice: "mild",
      },
    ],
  },
  {
    title: "Curries & Main Dishes",
    items: [
      {
        name: "Chettinad Chicken",
        description: "Spicy chicken curry with black pepper, fennel, and curry leaves",
        price: "$18",
        spice: "hot",
      },
      {
        name: "Kerala Fish Curry",
        description: "Fish simmered in coconut milk with tamarind and spices",
        price: "$20",
        spice: "medium",
      },
      {
        name: "Mutton Curry",
        description: "Tender goat meat cooked in aromatic South Indian spices",
        price: "$22",
        spice: "hot",
      },
      {
        name: "Vegetable Aviyal",
        description: "Mixed vegetables in coconut and yogurt sauce",
        price: "$16",
        spice: "mild",
      },
      {
        name: "Sambar",
        description: "Traditional lentil curry with vegetables and tamarind",
        price: "$14",
        spice: "medium",
      },
      { name: "Rasam", description: "Tangy tomato and tamarind soup with spices", price: "$12", spice: "medium" },
    ],
  },
  {
    title: "Biryanis & Rice",
    items: [
      {
        name: "Hyderabadi Chicken Biryani",
        description: "Fragrant basmati rice with chicken, saffron, and fried onions",
        price: "$19",
        spice: "medium",
      },
      {
        name: "Mutton Biryani",
        description: "Aromatic rice with tender mutton and traditional spices",
        price: "$23",
        spice: "medium",
      },
      {
        name: "Vegetable Biryani",
        description: "Basmati rice with mixed vegetables and aromatic spices",
        price: "$17",
        spice: "mild",
      },
      {
        name: "Lemon Rice",
        description: "Tangy rice with curry leaves, mustard seeds, and peanuts",
        price: "$12",
        spice: "mild",
      },
      {
        name: "Curd Rice",
        description: "Cooling yogurt rice with mustard seeds and curry leaves",
        price: "$10",
        spice: "mild",
      },
      {
        name: "Coconut Rice",
        description: "Fragrant rice cooked with fresh coconut and spices",
        price: "$13",
        spice: "mild",
      },
    ],
  },
  {
    title: "Breads & Sides",
    items: [
      {
        name: "Uthappam",
        description: "Thick rice pancake topped with onions, tomatoes, and chilies",
        price: "$11",
        spice: "medium",
      },
      {
        name: "Appam",
        description: "Fermented rice pancake with crispy edges and soft center",
        price: "$9",
        spice: "mild",
      },
      {
        name: "Garlic Naan",
        description: "Soft bread with garlic and butter from our tandoor",
        price: "$4",
        spice: "mild",
      },
      { name: "Parotta", description: "Flaky layered bread served with curry", price: "$5", spice: "mild" },
      {
        name: "Coconut Chutney",
        description: "Fresh coconut ground with green chilies and ginger",
        price: "$3",
        spice: "mild",
      },
      {
        name: "Pickle Assortment",
        description: "Traditional South Indian pickles - mango, lime, and mixed vegetable",
        price: "$4",
        spice: "hot",
      },
    ],
  },
  {
    title: "Desserts & Beverages",
    items: [
      {
        name: "Mysore Pak",
        description: "Traditional sweet made with gram flour, ghee, and sugar",
        price: "$6",
        spice: "none",
      },
      {
        name: "Gulab Jamun",
        description: "Soft milk dumplings in rose-flavored sugar syrup",
        price: "$7",
        spice: "none",
      },
      { name: "Payasam", description: "Traditional rice pudding with cardamom and nuts", price: "$8", spice: "none" },
      {
        name: "Filter Coffee",
        description: "Authentic South Indian coffee brewed with chicory",
        price: "$4",
        spice: "none",
      },
      {
        name: "Masala Chai",
        description: "Spiced tea with cardamom, ginger, and cinnamon",
        price: "$3",
        spice: "mild",
      },
      {
        name: "Fresh Lime Soda",
        description: "Refreshing lime drink with mint and black salt",
        price: "$4",
        spice: "none",
      },
    ],
  },
]

const getSpiceIcon = (level: string) => {
  switch (level) {
    case "none":
      return "🥛"
    case "mild":
      return "🌶️"
    case "medium":
      return "🌶️🌶️"
    case "hot":
      return "🌶️🌶️🌶️"
    default:
      return ""
  }
}

export function Menu() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic South Indian dishes prepared with traditional spices and cooking methods
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <Card key={index} className="h-fit">
              <CardHeader className="bg-orange-600 text-white">
                <CardTitle className="text-2xl text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-sm">{getSpiceIcon(item.spice)}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
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
