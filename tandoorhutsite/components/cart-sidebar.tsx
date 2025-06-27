"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus, X, Smartphone, Phone } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

/**
 * CartSidebar Props Interface
 */
interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Delivery Platform Options - Simplified
 */
const deliveryOptions = [
  {
    name: "UberEats",
    logo: "🚗",
    description: "Order for delivery",
    url: "https://www.ubereats.com/store/tandoor-hut/mChGPrbITXOG0PszzneUqg?srsltid=AfmBOoo1LyIE_I16LmWzbRi_P6TG0Zoxq786a8gWz4H2Bc-lcA3vdD9d",
    backgroundColor: "bg-black",
    textColor: "text-white",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    name: "DoorDash",
    logo: "🏠",
    description: "Order for delivery",
    url: "https://www.doordash.com/store/tandoorhut-naperville-981534/1456703/?srsltid=AfmBOoplot9ZKL57MnCTUEiEY8nRfC2Ig1MLXE1k6XITr9vQk2zQetXf",
    backgroundColor: "bg-red-600",
    textColor: "text-white",
    buttonColor: "bg-white hover:bg-gray-100 text-red-600",
  },
]

/**
 * CartSidebar Component - Updated for delivery platform integration
 *
 * Purpose:
 * - Display cart items and total
 * - Provide options to order via UberEats or DoorDash
 * - Offer direct phone ordering as alternative
 * - Remove complex payment processing in favor of external platforms
 *
 * Features:
 * - Cart management (add/remove items, quantities)
 * - Delivery platform selection
 * - Direct links to external ordering platforms
 * - Phone ordering option for pickup
 * - Order summary and total calculation
 */
export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  /**
   * Handle ordering through delivery platform
   * - Constructs order summary for external platform
   * - Opens delivery platform in new tab
   * - Provides order details for customer reference
   */
  const handleOrderThroughPlatform = (platform: any) => {
    if (items.length === 0) {
      alert("Your cart is empty. Please add items before ordering.")
      return
    }

    // Create order summary for customer reference
    const orderSummary = {
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal: getTotalPrice(),
      platform: platform.name,
      timestamp: new Date().toISOString(),
    }

    // Log order summary for customer reference
    console.log("Order Summary for", platform.name, ":", orderSummary)

    // Show order summary to customer
    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const confirmMessage = `Order Summary for ${platform.name}:\n\n${itemsList}\n\nSubtotal: $${getTotalPrice().toFixed(
      2,
    )}\n\nYou'll be redirected to ${platform.name} to complete your order. Continue?`

    if (confirm(confirmMessage)) {
      // Open delivery platform
      window.open(platform.url, "_blank", "noopener,noreferrer")

      // Optional: Clear cart after redirecting (uncomment if desired)
      // setTimeout(() => {
      //   clearCart()
      //   onClose()
      // }, 1000)
    }
  }

  /**
   * Handle phone ordering
   * - Creates order summary for phone call
   * - Initiates phone call to restaurant
   * - Provides order details for phone conversation
   */
  const handlePhoneOrder = () => {
    if (items.length === 0) {
      alert("Your cart is empty. Please add items before calling.")
      return
    }

    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const orderSummary = `Order Summary for Phone Call:\n\n${itemsList}\n\nSubtotal: $${getTotalPrice().toFixed(
      2,
    )}\n\nPlease have this information ready when you call (630) 820-3600`

    alert(orderSummary)

    // Initiate phone call
    window.location.href = "tel:(630)820-3600"
  }

  // Don't render if sidebar is closed
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Your Order</h3>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <p className="text-sm text-gray-500">Add some delicious South Indian dishes to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Subtotal:</span>
                  <span className="text-2xl font-bold text-red-600">${getTotalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  *Delivery fees and taxes will be calculated on the delivery platform
                </p>
              </div>

              {/* Delivery Platform Options */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">Choose Your Delivery Option:</h4>

                {/* Delivery Platforms */}
                {deliveryOptions.map((platform, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlatform === platform.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPlatform(platform.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{platform.logo}</span>
                        <div>
                          <h5 className="font-semibold">{platform.name}</h5>
                          <p className="text-sm text-gray-600">{platform.description}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleOrderThroughPlatform(platform)}
                      className={`w-full ${platform.buttonColor} font-medium`}
                      size="sm"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Order on {platform.name}
                    </Button>
                  </div>
                ))}

                {/* Phone Ordering Option */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h5 className="font-semibold">Call for Pickup</h5>
                      <p className="text-sm text-gray-600">No delivery fees • Ready in 15-20 min</p>
                    </div>
                  </div>

                  <Button
                    onClick={handlePhoneOrder}
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 font-medium"
                    size="sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call (630) 820-3600
                  </Button>
                </div>
              </div>

              {/* Remove the entire "Ordering Tips" section */}

              {/* Clear Cart Button */}
              <div className="mt-6 pt-4 border-t">
                <Button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clearCart()
                    }
                  }}
                  variant="outline"
                  className="w-full text-gray-600 hover:text-red-600 hover:border-red-600"
                  size="sm"
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
