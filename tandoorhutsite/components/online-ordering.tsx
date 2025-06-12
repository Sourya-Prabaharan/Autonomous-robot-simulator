"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, ShoppingCart, X, CreditCard } from "lucide-react"

// Define type for items in the shopping cart
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  specialInstructions?: string
}

// Define type for menu items displayed to the user
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  spiceLevel: string
  image?: string
}

// Sample menu items to be displayed
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato",
    price: 12.99,
    category: "Dosas",
    spiceLevel: "medium",
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with tender chicken",
    price: 16.99,
    category: "Biryanis",
    spiceLevel: "medium",
  },
  {
    id: "3",
    name: "Sambar",
    description: "Traditional lentil curry with vegetables",
    price: 8.99,
    category: "Curries",
    spiceLevel: "mild",
  },
  {
    id: "4",
    name: "Idli Sambar",
    description: "Steamed rice cakes with lentil curry",
    price: 9.99,
    category: "Appetizers",
    spiceLevel: "mild",
  },
  {
    id: "5",
    name: "Chicken Tikka Masala",
    description: "Tender chicken in creamy tomato sauce",
    price: 15.99,
    category: "Curries",
    spiceLevel: "medium",
  },
  {
    id: "6",
    name: "Vegetable Biryani",
    description: "Aromatic rice with mixed vegetables",
    price: 13.99,
    category: "Biryanis",
    spiceLevel: "mild",
  },
]

export function OnlineOrdering() {
  // State to hold items added to cart
  const [cart, setCart] = useState<CartItem[]>([])
  // State to toggle visibility of cart sidebar
  const [isCartOpen, setIsCartOpen] = useState(false)
  // State to track if checkout process is ongoing
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  // State to hold customer information entered in the form
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    specialInstructions: "",
  })

  // Add a menu item to the cart or increase quantity if already added
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      // Increase quantity by 1 if item exists in cart
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      // Add new item to cart with quantity 1
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ])
    }
  }

  // Remove an item completely from the cart by its ID
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  // Update the quantity of a cart item or remove if quantity is 0
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Calculate total price of all items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Return emoji icon based on spice level of menu item
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

  // Simulated PayPal checkout process
  const handlePayPalCheckout = async () => {
    if (cart.length === 0) return

    setIsCheckingOut(true)

    try {
      // Simulate async payment delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create an order summary object
      const orderSummary = {
        items: cart,
        total: getTotalPrice(),
        customer: customerInfo,
        orderNumber: `TH${Date.now()}`,
        timestamp: new Date().toISOString(),
      }

      console.log("Order placed:", orderSummary)
      alert(`Order #${orderSummary.orderNumber} placed successfully! Total: $${getTotalPrice().toFixed(2)}`)

      // Reset cart and form after successful order
      setCart([])
      setCustomerInfo({
        name: "",
        phone: "",
        email: "",
        address: "",
        specialInstructions: "",
      })
      setIsCartOpen(false)
    } catch (error) {
      alert("Payment failed. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  // Simulated Stripe checkout process (similar to PayPal)
  const handleStripeCheckout = async () => {
    if (cart.length === 0) return

    setIsCheckingOut(true)

    try {
      // Simulate async payment delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create an order summary object
      const orderSummary = {
        items: cart,
        total: getTotalPrice(),
        customer: customerInfo,
        orderNumber: `TH${Date.now()}`,
        timestamp: new Date().toISOString(),
      }

      console.log("Order placed:", orderSummary)
      alert(`Order #${orderSummary.orderNumber} placed successfully! Total: $${getTotalPrice().toFixed(2)}`)

      // Reset cart and form after successful order
      setCart([])
      setCustomerInfo({
        name: "",
        phone: "",
        email: "",
        address: "",
        specialInstructions: "",
      })
      setIsCartOpen(false)
    } catch (error) {
      alert("Payment failed. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header and description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Order Online</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Order your favorite South Indian dishes for pickup or delivery
          </p>
        </div>

        {/* Cart button fixed at top right */}
        <div className="fixed top-4 right-4 z-50">
          <Button onClick={() => setIsCartOpen(true)} className="bg-orange-600 hover:bg-orange-700 relative">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart ({cart.length})
            {/* Badge showing total quantity of items in cart */}
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Grid of menu items */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  {/* Menu item name */}
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  {/* Spice level icon and price badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getSpiceIcon(item.spiceLevel)}</span>
                    <Badge className="bg-orange-600">${item.price.toFixed(2)}</Badge>
                  </div>
                </div>
                {/* Menu item description */}
                <p className="text-gray-600 mb-4">{item.description}</p>
                {/* Button to add item to cart */}
                <Button onClick={() => addToCart(item)} className="w-full bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart sidebar overlay, visible when isCartOpen is true */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
              <div className="p-6">
                {/* Header of cart sidebar with close button */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Your Order</h3>
                  <Button variant="outline" size="sm" onClick={() => setIsCartOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* If cart empty, show message */}
                {cart.length === 0 ? (
                  <p className="text-gray-600">Your cart is empty</p>
                ) : (
                  <>
                    {/* List of cart items with quantity controls */}
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Button to decrease quantity */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            {/* Display current quantity */}
                            <span className="w-8 text-center">{item.quantity}</span>
                            {/* Button to increase quantity */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total price display */}
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total: ${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Customer information form inputs */}
                    <div className="space-y-4 mb-6">
                      <Input
                        placeholder="Your Name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      />
                      <Input
                        placeholder="Phone Number"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      />
                      <Input
                        placeholder="Email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      />
                      <Textarea
                        placeholder="Delivery Address (optional for pickup)"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      />
                      <Textarea
                        placeholder="Special Instructions"
                        value={customerInfo.specialInstructions}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            specialInstructions: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Checkout buttons for PayPal and Stripe */}
                    <div className="space-y-3">
                      <Button
                        onClick={handlePayPalCheckout}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!customerInfo.name || !customerInfo.phone || isCheckingOut}
                      >
                        {/* Show loading text if processing */}
                        {isCheckingOut ? "Processing..." : `Pay with PayPal - $${getTotalPrice().toFixed(2)}`}
                      </Button>

                      <Button
                        onClick={handleStripeCheckout}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={!customerInfo.name || !customerInfo.phone || isCheckingOut}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        {isCheckingOut ? "Processing..." : `Pay with Card - $${getTotalPrice().toFixed(2)}`}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
