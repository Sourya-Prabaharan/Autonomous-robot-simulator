"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartButton } from "@/components/cart-button"
import { CartSidebar } from "@/components/cart-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, MapPin, Phone, Plus } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

/**
 * Complete Menu Data - Updated with Real Tandoor Hut Menu
 * Organized by categories with exact pricing from menu images
 */
const menuCategories = [
  {
    title: "Appetizers - Vegetarian",
    items: [
      {
        id: "app-veg-1",
        name: "Chilli Paneer",
        description: "Cottage cheese cubes tossed in spicy Indo-Chinese sauce with bell peppers",
        price: 12.0,
        spice: "medium",
        popular: true,
      },
      {
        id: "app-veg-2",
        name: "Baby Corn Manchurian",
        description: "Crispy baby corn in tangy Manchurian sauce with onions and peppers",
        price: 12.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-veg-3",
        name: "Gobi Manchurian",
        description: "Cauliflower florets in spicy Manchurian gravy with aromatic spices",
        price: 12.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-veg-4",
        name: "Gobi 65",
        description: "Spiced and fried cauliflower with curry leaves and green chilies",
        price: 12.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "app-veg-5",
        name: "Paneer Pakoda",
        description: "Cottage cheese fritters with mint chutney and tamarind sauce",
        price: 12.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "app-veg-6",
        name: "Veg Samosa",
        description: "Crispy pastry filled with spiced vegetables and served with chutneys",
        price: 1.75,
        spice: "mild",
        popular: true,
      },
      {
        id: "app-veg-7",
        name: "Aloo Bonda",
        description: "Deep-fried potato dumplings with coconut and mint chutneys",
        price: 1.75,
        spice: "mild",
        popular: false,
      },
      {
        id: "app-veg-8",
        name: "Mysore Bonda",
        description: "Spicy lentil fritters from Mysore with sambar and chutney",
        price: 1.75,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-veg-9",
        name: "Masala Vada",
        description: "Spiced lentil donuts with sambar and coconut chutney",
        price: 1.75,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-veg-10",
        name: "Medhu Vada",
        description: "Traditional South Indian lentil donuts, crispy outside and soft inside",
        price: 1.75,
        spice: "mild",
        popular: false,
      },
      {
        id: "app-veg-11",
        name: "Mirchi Bajji",
        description: "Stuffed green chilies in chickpea batter, deep fried",
        price: 1.75,
        spice: "hot",
        popular: false,
      },
      {
        id: "app-veg-12",
        name: "Cut Mirchi Bajji",
        description: "Sliced green chili fritters with onions and spices",
        price: 2.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "app-veg-13",
        name: "Onion Pakoda",
        description: "Crispy onion fritters with chickpea flour and spices",
        price: 4.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-veg-14",
        name: "Vada Pav",
        description: "Mumbai street food - spiced potato fritter in bread bun",
        price: 4.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-veg-15",
        name: "Dahi Vada",
        description: "Lentil dumplings soaked in yogurt with sweet and tangy chutneys",
        price: 4.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "app-veg-16",
        name: "Dhokla",
        description: "Steamed Gujarati snack made from fermented chickpea flour",
        price: 4.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "app-veg-17",
        name: "Chakli",
        description: "Spiral-shaped crispy snack made from rice flour and spices",
        price: 3.0,
        spice: "mild",
        popular: false,
      },
    ],
  },
  {
    title: "Appetizers - Non Vegetarian",
    items: [
      {
        id: "app-nonveg-1",
        name: "Chicken Samosa",
        description: "Crispy pastry filled with spiced chicken and served with chutneys",
        price: 2.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "app-nonveg-2",
        name: "Chicken 65",
        description: "Spicy deep-fried chicken with curry leaves and green chilies",
        price: 13.0,
        spice: "hot",
        popular: true,
      },
      {
        id: "app-nonveg-3",
        name: "Chilli Chicken",
        description: "Chicken pieces in spicy Indo-Chinese sauce with bell peppers",
        price: 13.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "app-nonveg-4",
        name: "Chilli Fish",
        description: "Fish fillets in tangy chilli sauce with onions and peppers",
        price: 15.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "app-nonveg-5",
        name: "Tilapia Fish Fry",
        description: "Marinated and fried tilapia with South Indian spices",
        price: 11.0,
        spice: "medium",
        popular: false,
      },
    ],
  },
  {
    title: "Tiffin Specials",
    items: [
      {
        id: "tiffin-1",
        name: "Idli - 3 piece",
        description: "Steamed rice cakes served with sambar and coconut chutney",
        price: 6.5,
        spice: "mild",
        popular: true,
      },
      {
        id: "tiffin-2",
        name: "Sambar Idli",
        description: "Soft idli soaked in flavorful sambar with vegetables",
        price: 6.5,
        spice: "mild",
        popular: false,
      },
      {
        id: "tiffin-3",
        name: "Plain Dosa",
        description: "Traditional crispy rice crepe served with sambar and chutneys",
        price: 7.0,
        spice: "mild",
        popular: true,
      },
      {
        id: "tiffin-4",
        name: "Masala Dosa",
        description: "Rice crepe filled with spiced potato curry and onions",
        price: 8.5,
        spice: "medium",
        popular: true,
      },
      {
        id: "tiffin-5",
        name: "Podi Dosa",
        description: "Dosa with spicy lentil powder and ghee",
        price: 8.5,
        spice: "hot",
        popular: false,
      },
      {
        id: "tiffin-6",
        name: "Mysore Masala Dosa",
        description: "Spicy red chutney dosa with potato filling",
        price: 9.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "tiffin-7",
        name: "Onion Chili Dosa",
        description: "Dosa topped with onions and green chilies",
        price: 8.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "tiffin-8",
        name: "Ghee Roast Dosa",
        description: "Crispy dosa roasted in pure ghee with special spices",
        price: 13.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "tiffin-9",
        name: "Cheese Dosa",
        description: "Dosa filled with melted cheese and spices",
        price: 8.5,
        spice: "mild",
        popular: false,
      },
      {
        id: "tiffin-10",
        name: "Chocolate Dosa",
        description: "Sweet dosa with chocolate spread - a unique treat",
        price: 8.5,
        spice: "none",
        popular: false,
      },
      {
        id: "tiffin-11",
        name: "Plain Rava Dosa",
        description: "Semolina crepe with onions and curry leaves",
        price: 8.5,
        spice: "mild",
        popular: false,
      },
      {
        id: "tiffin-12",
        name: "Onion Chilli Rava Dosa/Masala",
        description: "Rava dosa with onions, chilies, and potato filling",
        price: 9.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "tiffin-13",
        name: "Uthapam",
        description: "Thick rice pancake topped with onions, tomatoes, and chilies",
        price: 8.5,
        spice: "medium",
        popular: false,
      },
    ],
  },
  {
    title: "Rice Specials",
    items: [
      {
        id: "rice-1",
        name: "Chicken Biryani",
        description: "Fragrant basmati rice with spiced chicken and aromatic herbs",
        price: 12.0,
        spice: "medium",
        popular: true,
      },
      {
        id: "rice-2",
        name: "Chicken Fried Rice",
        description: "Wok-fried rice with chicken, vegetables, and soy sauce",
        price: 12.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "rice-3",
        name: "Veg Biryani",
        description: "Aromatic basmati rice with mixed vegetables and spices",
        price: 10.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "rice-4",
        name: "Veg Fried Rice",
        description: "Stir-fried rice with fresh vegetables and Indo-Chinese flavors",
        price: 11.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "rice-5",
        name: "Egg Biryani",
        description: "Spiced basmati rice with boiled eggs and fried onions",
        price: 12.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "rice-6",
        name: "Hakka Noodles Veg",
        description: "Indo-Chinese style vegetable noodles with soy sauce",
        price: 12.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "rice-7",
        name: "Hakka Noodles - Chicken",
        description: "Stir-fried noodles with chicken and vegetables",
        price: 13.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "rice-8",
        name: "Chef Special Variety - Rice",
        description: "Daily special rice preparation by our chef",
        price: 8.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "rice-9",
        name: "White Rice",
        description: "Steamed basmati rice, perfect with curries",
        price: 7.0,
        spice: "none",
        popular: false,
      },
    ],
  },
  {
    title: "Entree Specials - Vegetarian",
    items: [
      {
        id: "entree-veg-1",
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato cream sauce with butter",
        price: 10.0,
        spice: "mild",
        popular: true,
      },
      {
        id: "entree-veg-2",
        name: "Palak Paneer",
        description: "Cottage cheese in creamy spinach gravy with spices",
        price: 10.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "entree-veg-3",
        name: "Punjabi Kadhi",
        description: "Yogurt-based curry with pakoras and aromatic spices",
        price: 9.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "entree-veg-4",
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked with butter and cream",
        price: 9.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "entree-veg-5",
        name: "Dal Tadka",
        description: "Yellow lentils with aromatic tempering of cumin and mustard",
        price: 9.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "entree-veg-6",
        name: "Veg Entrees (Chef Special of the day)",
        description: "Daily special vegetarian curry prepared by our chef",
        price: 9.0,
        spice: "medium",
        popular: false,
      },
    ],
  },
  {
    title: "Entree Specials - Non Vegetarian",
    items: [
      {
        id: "entree-nonveg-1",
        name: "Goat Roast",
        description: "Tender roasted goat with South Indian spices and curry leaves",
        price: 15.0,
        spice: "hot",
        popular: true,
      },
      {
        id: "entree-nonveg-2",
        name: "Goat Curry",
        description: "Traditional goat curry with aromatic spices and onions",
        price: 15.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "entree-nonveg-3",
        name: "Goat Chilli Masala",
        description: "Spicy goat curry with green chilies and black pepper",
        price: 15.0,
        spice: "hot",
        popular: false,
      },
      {
        id: "entree-nonveg-4",
        name: "Shrimp Masala",
        description: "Prawns in spicy onion tomato gravy with coconut",
        price: 15.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "entree-nonveg-5",
        name: "Lamb Keema",
        description: "Minced lamb with peas, onions, and aromatic spices",
        price: 16.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "entree-nonveg-6",
        name: "Chicken Roast",
        description: "Dry roasted chicken with curry leaves and black pepper",
        price: 14.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "entree-nonveg-7",
        name: "Butter Chicken",
        description: "Chicken in rich tomato butter sauce with cream",
        price: 11.0,
        spice: "mild",
        popular: true,
      },
      {
        id: "entree-nonveg-8",
        name: "Chicken Entrees (Chef Special of the day)",
        description: "Daily special chicken curry prepared by our chef",
        price: 9.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "entree-nonveg-9",
        name: "Egg Curry",
        description: "Boiled eggs in spicy onion tomato gravy",
        price: 9.0,
        spice: "medium",
        popular: false,
      },
    ],
  },
  {
    title: "Breads & Tandoori Specials",
    items: [
      {
        id: "bread-1",
        name: "Butter Naan",
        description: "Soft leavened bread with butter from our tandoor",
        price: 3.5,
        spice: "none",
        popular: true,
      },
      {
        id: "bread-2",
        name: "Garlic Naan",
        description: "Naan bread with fresh garlic and herbs",
        price: 4.0,
        spice: "mild",
        popular: true,
      },
      {
        id: "bread-3",
        name: "Chilli Naan",
        description: "Spicy naan with green chilies and coriander",
        price: 4.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "bread-4",
        name: "Tandoori Roti",
        description: "Whole wheat bread cooked in tandoor",
        price: 3.5,
        spice: "none",
        popular: false,
      },
      {
        id: "bread-5",
        name: "Chapathi",
        description: "Soft whole wheat flatbread",
        price: 2.0,
        spice: "none",
        popular: false,
      },
      {
        id: "bread-6",
        name: "Rumali Roti",
        description: "Thin handkerchief bread, soft and delicate",
        price: 4.5,
        spice: "none",
        popular: false,
      },
      {
        id: "bread-7",
        name: "Tandoori Chicken",
        description: "Marinated chicken cooked in tandoor with spices",
        price: 4.5,
        spice: "medium",
        popular: true,
      },
      {
        id: "bread-8",
        name: "Chicken Tikka",
        description: "Boneless chicken pieces marinated and grilled in tandoor",
        price: 13.0,
        spice: "medium",
        popular: false,
      },
      {
        id: "bread-9",
        name: "Paneer Tikka",
        description: "Marinated cottage cheese grilled in tandoor",
        price: 13.0,
        spice: "medium",
        popular: false,
      },
    ],
  },
  {
    title: "Chaat Specials",
    items: [
      {
        id: "chaat-1",
        name: "Samosa Chaat",
        description: "Crushed samosa with yogurt, mint, and tamarind chutneys",
        price: 7.5,
        spice: "medium",
        popular: true,
      },
      {
        id: "chaat-2",
        name: "Papdi Chaat",
        description: "Crispy wafers with yogurt, chutneys, and spices",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-3",
        name: "Bhel Puri",
        description: "Puffed rice with tangy chutneys, onions, and sev",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-4",
        name: "Peanut Chaat",
        description: "Spiced peanuts with onions, tomatoes, and lime",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-5",
        name: "Aloo Tikki Chaat",
        description: "Potato patties with yogurt, chutneys, and spices",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-6",
        name: "Ragda Chaat",
        description: "White pea curry with crispy toppings and chutneys",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-7",
        name: "Pani Puri",
        description: "Crispy shells with spiced water, chutneys, and filling",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-8",
        name: "Vatana Chaat",
        description: "Dried pea curry with onions, chutneys, and spices",
        price: 7.5,
        spice: "medium",
        popular: false,
      },
      {
        id: "chaat-9",
        name: "Masala Peanut",
        description: "Roasted peanuts with spices and curry leaves",
        price: 6.0,
        spice: "medium",
        popular: false,
      },
    ],
  },
  {
    title: "Beverages & Desserts",
    items: [
      {
        id: "bev-1",
        name: "Masala Chai",
        description: "Spiced Indian tea with milk, cardamom, and ginger",
        price: 2.0,
        spice: "mild",
        popular: true,
      },
      {
        id: "bev-2",
        name: "Filter Coffee",
        description: "Authentic South Indian coffee brewed with chicory",
        price: 2.0,
        spice: "none",
        popular: true,
      },
      {
        id: "bev-3",
        name: "Mango Lassi",
        description: "Creamy yogurt drink blended with fresh mango",
        price: 4.0,
        spice: "none",
        popular: false,
      },
      {
        id: "bev-4",
        name: "Salt/Sweet Lassi",
        description: "Traditional yogurt drink, choice of salted or sweetened",
        price: 4.0,
        spice: "none",
        popular: false,
      },
      {
        id: "bev-5",
        name: "Spicy Lassi",
        description: "Yogurt drink with black salt and roasted cumin",
        price: 4.0,
        spice: "mild",
        popular: false,
      },
      {
        id: "dessert-1",
        name: "Gulab Jamun",
        description: "Sweet milk dumplings in rose-flavored sugar syrup",
        price: 1.0,
        spice: "none",
        popular: true,
      },
      {
        id: "dessert-2",
        name: "Carrot Halwa",
        description: "Sweet carrot pudding with milk, nuts, and cardamom",
        price: 3.0,
        spice: "none",
        popular: false,
      },
      {
        id: "dessert-3",
        name: "Suji Halwa",
        description: "Semolina pudding with ghee, nuts, and raisins",
        price: 3.5,
        spice: "none",
        popular: false,
      },
      {
        id: "dessert-4",
        name: "Rasmalai",
        description: "Cottage cheese dumplings in sweetened milk with pistachios",
        price: 1.5,
        spice: "none",
        popular: false,
      },
      {
        id: "dessert-5",
        name: "Rasgula",
        description: "Spongy cottage cheese balls in sugar syrup",
        price: 1.5,
        spice: "none",
        popular: false,
      },
      {
        id: "dessert-6",
        name: "Kulfi",
        description: "Traditional Indian ice cream with cardamom and pistachios",
        price: 2.5,
        spice: "none",
        popular: false,
      },
    ],
  },
]

/**
 * Spice Level Icon Function
 */
const getSpiceIcon = (level: string) => {
  switch (level) {
    case "none":
      return ""
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

/**
 * MenuPage Component - Complete menu page with authentic Tandoor Hut items
 */
export default function MenuPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    })
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 mr-4"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            </div>

            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Complete Menu</h1>
              <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
                Authentic South Indian cuisine with traditional recipes and fresh ingredients
              </p>
            </div>
          </div>
        </section>

        {/* Restaurant Information Bar */}
        <section className="bg-gray-900 text-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span>Naperville, IL 60564</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span>(630) 820-3600</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-400" />
                <span>Mon-Thu: 11AM-9:30PM | Fri-Sat: 11AM-10PM | Sun: 11AM-9:30PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Cart Button */}
        <div className="fixed top-20 right-4 z-40">
          <CartButton onClick={() => setIsCartOpen(true)} />
        </div>

        {/* Menu Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-12">
              {menuCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                    <h2 className="text-3xl font-bold text-center">{category.title}</h2>
                  </div>

                  <div className="p-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {category.items.map((item, itemIndex) => (
                        <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                  {item.popular && (
                                    <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">Popular</Badge>
                                  )}
                                  {item.spice !== "none" && <span className="text-sm">{getSpiceIcon(item.spice)}</span>}
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>

                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-red-600 border-red-600 font-bold">
                                    ${item.price.toFixed(2)}
                                  </Badge>

                                  <Button
                                    size="sm"
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-xl text-red-100 mb-8">
              Experience authentic South Indian flavors delivered fresh to your table
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => setIsCartOpen(true)}
              >
                View Cart & Checkout
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "tel:(630)820-3600")}
              >
                Call (630) 820-3600
              </Button>
            </div>
          </div>
        </section>

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </main>

      <Footer />
    </>
  )
}
