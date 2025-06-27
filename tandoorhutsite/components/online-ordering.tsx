"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart, Smartphone, Phone, Clock, Star } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { CartSidebar } from "@/components/cart-sidebar"

/**
 * CartItem Interface - Structure for items in shopping cart
 */
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

/**
 * MenuItem Interface - Structure for menu items
 */
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  spiceLevel: string
  popular: boolean
  image: string
}

/**
 * Featured Menu Items - Popular items from Tandoor Hut
 * Updated with real menu items and pricing from the restaurant
 */
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Masala Dosa",
    description: "Rice crepe filled with spiced potato curry and onions",
    price: 8.5,
    category: "Tiffin",
    spiceLevel: "medium",
    popular: true,
    image: "🥞",
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with spiced chicken and aromatic herbs",
    price: 12.0,
    category: "Rice",
    spiceLevel: "medium",
    popular: true,
    image: "🍛",
  },
  {
    id: "3",
    name: "Butter Chicken",
    description: "Chicken in rich tomato butter sauce with cream",
    price: 11.0,
    category: "Entrees",
    spiceLevel: "mild",
    popular: true,
    image: "🍗",
  },
  {
    id: "4",
    name: "Idli - 3 piece",
    description: "Steamed rice cakes served with sambar and coconut chutney",
    price: 6.5,
    category: "Tiffin",
    spiceLevel: "mild",
    popular: false,
    image: "⚪",
  },
  {
    id: "5",
    name: "Chilli Paneer",
    description: "Cottage cheese cubes tossed in spicy Indo-Chinese sauce",
    price: 12.0,
    category: "Appetizers",
    spiceLevel: "medium",
    popular: true,
    image: "🧀",
  },
  {
    id: "6",
    name: "Samosa Chaat",
    description: "Crushed samosa with yogurt, mint, and tamarind chutneys",
    price: 7.5,
    category: "Chaat",
    spiceLevel: "medium",
    popular: false,
    image: "🥟",
  },
]

/**
 * Delivery Platform Quick Links - Updated with real URLs
 */
const quickOrderOptions = [
  {
    name: "UberEats",
    icon: "🚗",
    description: "Order for delivery",
    url: "https://www.ubereats.com/store/tandoor-hut/mChGPrbITXOG0PszzneUqg?srsltid=AfmBOoo1LyIE_I16LmWzbRi_P6TG0Zoxq786a8gWz4H2Bc-lcA3vdD9d",
    color: "bg-black text-white",
  },
  {
    name: "DoorDash",
    icon: "🏠",
    description: "Order for delivery",
    url: "https://www.doordash.com/store/tandoorhut-naperville-981534/1456703/?srsltid=AfmBOoplot9ZKL57MnCTUEiEY8nRfC2Ig1MLXE1k6XITr9vQk2zQetXf",
    color: "bg-red-600 text-white",
  },
]

/**
 * OnlineOrdering Component - Updated for delivery platform integration
 *
 * Purpose:
 * - Showcase popular menu items for easy selection
 * - Provide cart functionality for order building
 * - Direct customers to delivery platforms for final ordering
 * - Offer phone ordering alternative for pickup
 *
 * Features:
 * - Interactive menu with add-to-cart functionality
 * - Cart management with quantity controls
 * - Quick links to UberEats and DoorDash
 * - Phone ordering option
 * - Popular item highlights and ratings
 */
export function OnlineOrdering() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addItem, getTotalItems } = useCartStore()

  /**
   * Add item to cart
   */
  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    })
  }

  /**
   * Get spice level indicator
   */
  const getSpiceIcon = (level: string) => {
    switch (level) {
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
   * Handle quick order through platform
   */
  const handleQuickOrder = (platform: any) => {
    window.open(platform.url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Order Online</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Order your favorite South Indian dishes for pickup or delivery
          </p>
        </div>

        {/* Floating cart button */}
        <div className="fixed top-4 right-4 z-50">
          <Button onClick={() => setIsCartOpen(true)} className="bg-red-600 hover:bg-red-700 relative">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart ({getTotalItems()})
          </Button>
        </div>

        {/* Menu items grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getSpiceIcon(item.spiceLevel)}</span>
                    <Badge className="bg-red-600">${item.price.toFixed(2)}</Badge>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{item.description}</p>

                <Button onClick={() => handleAddToCart(item)} className="w-full bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Order Options */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {quickOrderOptions.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleQuickOrder(option)}
              className={`${option.color} hover:opacity-90 px-6 py-3`}
              size="lg"
            >
              <span className="text-xl mr-2">{option.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{option.name}</div>
                <div className="text-xs opacity-90">{option.description}</div>
              </div>
            </Button>
          ))}

          <Button
            onClick={() => (window.location.href = "tel:(630)820-3600")}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3"
            size="lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Call for Pickup</div>
              <div className="text-xs">(630) 820-3600</div>
            </div>
          </Button>
        </div>

        {/* Featured Menu Items */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Items</h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.image}</span>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          {item.popular && (
                            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          )}
                          {item.spiceLevel !== "none" && (
                            <span className="text-sm">{getSpiceIcon(item.spiceLevel)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-600 border-red-600 font-bold">
                      ${item.price.toFixed(2)}
                    </Badge>
                  </div>

                  {/* Item Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Order</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Build Your Cart</h4>
              <p className="text-sm text-gray-600">Add your favorite dishes to the cart using the buttons above</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold mb-2">2. Choose Platform</h4>
              <p className="text-sm text-gray-600">Select UberEats, DoorDash, or call for pickup</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold mb-2">3. Enjoy Your Meal</h4>
              <p className="text-sm text-gray-600">
                Get fresh, authentic South Indian food delivered or ready for pickup
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Information */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-2">Tandoor Hut - Naperville</h4>
            <p className="text-red-100 mb-4">Authentic South Indian Cuisine • Est. 1998</p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Thu: 11AM-9:30PM | Fri-Sat: 11AM-10PM | Sun: 11AM-9:30PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(630) 820-3600</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </section>
  )
}
