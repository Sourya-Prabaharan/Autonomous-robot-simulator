import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Menu Categories Data Structure - Updated with Real Tandoor Hut Menu
 * - Exact items and pricing from the restaurant's actual menu
 * - Organized by categories as shown in the menu images
 * - Includes authentic Indian dish names and descriptions
 * - Pricing matches the restaurant's current rates
 */
const menuCategories = [
  {
    title: "Appetizers - Vegetarian",
    items: [
      {
        name: "Chilli Paneer",
        description: "Cottage cheese cubes tossed in spicy Indo-Chinese sauce",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Baby Corn Manchurian",
        description: "Crispy baby corn in tangy Manchurian sauce",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Gobi Manchurian",
        description: "Cauliflower florets in spicy Manchurian gravy",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Gobi 65",
        description: "Spiced and fried cauliflower with curry leaves",
        price: "$12.00",
        spice: "hot",
      },
      {
        name: "Paneer Pakoda",
        description: "Cottage cheese fritters with mint chutney",
        price: "$12.00",
        spice: "mild",
      },
      {
        name: "Veg Samosa",
        description: "Crispy pastry filled with spiced vegetables",
        price: "$1.75",
        spice: "mild",
      },
      {
        name: "Aloo Bonda",
        description: "Deep-fried potato dumplings with chutneys",
        price: "$1.75",
        spice: "mild",
      },
      {
        name: "Mysore Bonda",
        description: "Spicy lentil fritters from Mysore",
        price: "$1.75",
        spice: "medium",
      },
      {
        name: "Masala Vada",
        description: "Spiced lentil donuts with sambar",
        price: "$1.75",
        spice: "medium",
      },
      {
        name: "Medhu Vada",
        description: "Traditional South Indian lentil donuts",
        price: "$1.75",
        spice: "mild",
      },
    ],
  },
  {
    title: "Appetizers - Non Vegetarian",
    items: [
      {
        name: "Chicken Samosa",
        description: "Crispy pastry filled with spiced chicken",
        price: "$2.00",
        spice: "medium",
      },
      {
        name: "Chicken 65",
        description: "Spicy deep-fried chicken with curry leaves",
        price: "$13.00",
        spice: "hot",
      },
      {
        name: "Chilli Chicken",
        description: "Chicken pieces in spicy Indo-Chinese sauce",
        price: "$13.00",
        spice: "hot",
      },
      {
        name: "Chilli Fish",
        description: "Fish fillets in tangy chilli sauce",
        price: "$15.00",
        spice: "hot",
      },
      {
        name: "Tilapia Fish Fry",
        description: "Marinated and fried tilapia with spices",
        price: "$11.00",
        spice: "medium",
      },
    ],
  },
  {
    title: "Tiffin Specials",
    items: [
      {
        name: "Idli - 3 piece",
        description: "Steamed rice cakes with sambar and chutney",
        price: "$6.50",
        spice: "mild",
      },
      {
        name: "Sambar Idli",
        description: "Idli soaked in flavorful sambar",
        price: "$6.50",
        spice: "mild",
      },
      {
        name: "Plain Dosa",
        description: "Traditional crispy rice crepe",
        price: "$7.00",
        spice: "mild",
      },
      {
        name: "Masala Dosa",
        description: "Rice crepe filled with spiced potato",
        price: "$8.50",
        spice: "medium",
      },
      {
        name: "Podi Dosa",
        description: "Dosa with spicy lentil powder",
        price: "$8.50",
        spice: "hot",
      },
      {
        name: "Mysore Masala Dosa",
        description: "Spicy red chutney dosa with potato filling",
        price: "$9.00",
        spice: "hot",
      },
      {
        name: "Ghee Roast Dosa",
        description: "Crispy dosa roasted in pure ghee",
        price: "$13.00",
        spice: "mild",
      },
      {
        name: "Uthapam",
        description: "Thick rice pancake with vegetables",
        price: "$8.50",
        spice: "medium",
      },
    ],
  },
  {
    title: "Rice Specials",
    items: [
      {
        name: "Chicken Biryani",
        description: "Fragrant basmati rice with spiced chicken",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Chicken Fried Rice",
        description: "Wok-fried rice with chicken and vegetables",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Veg Biryani",
        description: "Aromatic rice with mixed vegetables",
        price: "$10.00",
        spice: "mild",
      },
      {
        name: "Veg Fried Rice",
        description: "Stir-fried rice with fresh vegetables",
        price: "$11.00",
        spice: "mild",
      },
      {
        name: "Egg Biryani",
        description: "Spiced rice with boiled eggs",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Hakka Noodles Veg",
        description: "Indo-Chinese style vegetable noodles",
        price: "$12.00",
        spice: "medium",
      },
      {
        name: "Hakka Noodles - Chicken",
        description: "Stir-fried noodles with chicken",
        price: "$13.00",
        spice: "medium",
      },
    ],
  },
  {
    title: "Entree Specials - Vegetarian",
    items: [
      {
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato cream sauce",
        price: "$10.00",
        spice: "mild",
      },
      {
        name: "Palak Paneer",
        description: "Cottage cheese in creamy spinach gravy",
        price: "$10.00",
        spice: "mild",
      },
      {
        name: "Punjabi Kadhi",
        description: "Yogurt-based curry with pakoras",
        price: "$9.00",
        spice: "mild",
      },
      {
        name: "Dal Makhani",
        description: "Creamy black lentils with butter",
        price: "$9.00",
        spice: "mild",
      },
      {
        name: "Dal Tadka",
        description: "Yellow lentils with aromatic tempering",
        price: "$9.00",
        spice: "mild",
      },
    ],
  },
  {
    title: "Entree Specials - Non Vegetarian",
    items: [
      {
        name: "Goat Roast",
        description: "Tender roasted goat with South Indian spices",
        price: "$15.00",
        spice: "hot",
      },
      {
        name: "Goat Curry",
        description: "Traditional goat curry with aromatic spices",
        price: "$15.00",
        spice: "hot",
      },
      {
        name: "Goat Chilli Masala",
        description: "Spicy goat curry with green chilies",
        price: "$15.00",
        spice: "hot",
      },
      {
        name: "Shrimp Masala",
        description: "Prawns in spicy onion tomato gravy",
        price: "$15.00",
        spice: "medium",
      },
      {
        name: "Lamb Keema",
        description: "Minced lamb with peas and spices",
        price: "$16.00",
        spice: "medium",
      },
      {
        name: "Chicken Roast",
        description: "Dry roasted chicken with curry leaves",
        price: "$14.00",
        spice: "medium",
      },
      {
        name: "Butter Chicken",
        description: "Chicken in rich tomato butter sauce",
        price: "$11.00",
        spice: "mild",
      },
      {
        name: "Egg Curry",
        description: "Boiled eggs in spicy onion gravy",
        price: "$9.00",
        spice: "medium",
      },
    ],
  },
  {
    title: "Breads & Tandoori",
    items: [
      {
        name: "Butter Naan",
        description: "Soft bread with butter from tandoor",
        price: "$3.50",
        spice: "none",
      },
      {
        name: "Garlic Naan",
        description: "Naan bread with garlic and herbs",
        price: "$4.00",
        spice: "mild",
      },
      {
        name: "Tandoori Chicken",
        description: "Marinated chicken cooked in tandoor",
        price: "$4.50",
        spice: "medium",
      },
      {
        name: "Chicken Tikka",
        description: "Boneless chicken pieces from tandoor",
        price: "$13.00",
        spice: "medium",
      },
      {
        name: "Paneer Tikka",
        description: "Marinated cottage cheese from tandoor",
        price: "$13.00",
        spice: "medium",
      },
      {
        name: "Rumali Roti",
        description: "Thin handkerchief bread",
        price: "$4.50",
        spice: "none",
      },
    ],
  },
  {
    title: "Chaat Specials",
    items: [
      {
        name: "Samosa Chaat",
        description: "Crushed samosa with yogurt and chutneys",
        price: "$7.50",
        spice: "medium",
      },
      {
        name: "Papdi Chaat",
        description: "Crispy wafers with yogurt and tamarind",
        price: "$7.50",
        spice: "medium",
      },
      {
        name: "Bhel Puri",
        description: "Puffed rice with tangy chutneys",
        price: "$7.50",
        spice: "medium",
      },
      {
        name: "Peanut Chaat",
        description: "Spiced peanuts with onions and lime",
        price: "$7.50",
        spice: "medium",
      },
      {
        name: "Aloo Tikki Chaat",
        description: "Potato patties with yogurt and chutneys",
        price: "$7.50",
        spice: "medium",
      },
    ],
  },
  {
    title: "Beverages & Desserts",
    items: [
      {
        name: "Masala Chai",
        description: "Spiced Indian tea with milk",
        price: "$2.00",
        spice: "mild",
      },
      {
        name: "Filter Coffee",
        description: "South Indian style coffee",
        price: "$2.00",
        spice: "none",
      },
      {
        name: "Mango Lassi",
        description: "Yogurt drink with fresh mango",
        price: "$4.00",
        spice: "none",
      },
      {
        name: "Gulab Jamun",
        description: "Sweet milk dumplings in syrup",
        price: "$1.00",
        spice: "none",
      },
      {
        name: "Carrot Halwa",
        description: "Sweet carrot pudding with nuts",
        price: "$3.00",
        spice: "none",
      },
      {
        name: "Rasmalai",
        description: "Cottage cheese dumplings in sweet milk",
        price: "$1.50",
        spice: "none",
      },
    ],
  },
]

/**
 * Spice Level Icon Function
 * - Converts text spice levels to visual emoji indicators
 * - Provides quick visual reference for customers
 * - Helps customers make informed choices based on heat preference
 */
const getSpiceIcon = (level: string) => {
  switch (level) {
    case "none":
      return "🥛" // Milk glass for no spice (cooling)
    case "mild":
      return "🌶️" // Single pepper
    case "medium":
      return "🌶️🌶️" // Double pepper
    case "hot":
      return "🌶️🌶️🌶️" // Triple pepper
    default:
      return ""
  }
}

/**
 * Menu Component - Complete menu display for homepage
 * Updated with authentic Tandoor Hut menu items and pricing
 */
export function Menu() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic South Indian dishes prepared with traditional spices and cooking methods
          </p>
        </div>

        {/* Menu categories grid - responsive layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map through menu categories */}
          {menuCategories.map((category, index) => (
            <Card key={index} className="h-fit">
              {/* Category header with brand colors */}
              <CardHeader className="bg-red-600 text-white">
                <CardTitle className="text-2xl text-center">{category.title}</CardTitle>
              </CardHeader>

              {/* Category items list */}
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Map through items in each category */}
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                      {/* Item header with name, spice level, and price */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            {/* Spice level indicator */}
                            <span className="text-sm">{getSpiceIcon(item.spice)}</span>
                          </div>
                        </div>
                        {/* Price badge */}
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          {item.price}
                        </Badge>
                      </div>
                      {/* Item description */}
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
