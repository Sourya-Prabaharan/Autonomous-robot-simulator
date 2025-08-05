"use client"

import { useState } from "react"
import { X, Minus, Plus, ShoppingCart, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { trackOrder, trackPlatformClick, trackPhoneCall } from "@/lib/analytics"

/**
 * CartSidebar Component - Shopping cart with order tracking
 *
 * Features:
 * - Display cart items with quantities and prices
 * - Update item quantities
 * - Remove items from cart
 * - Submit orders via UberEats, DoorDash, or Phone
 * - Track all interactions in PostgreSQL database
 */

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderStatus, setOrderStatus] = useState<string | null>(null)

  /**
   * Handle order submission via different platforms
   */
  const handleOrderSubmission = async (platform: "ubereats" | "doordash" | "phone") => {
    if (items.length === 0) {
      setOrderStatus("Please add items to your cart first")
      return
    }

    setIsSubmitting(true)
    setOrderStatus(null)

    try {
      // Track platform click
      await trackPlatformClick(platform)

      // Prepare order data
      const orderData = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        platform,
        orderType: "delivery" as const,
      }

      // Track the order in database
      const orderId = await trackOrder(orderData)

      if (orderId) {
        setOrderStatus(
          `Order ${orderId} submitted successfully! ${
            platform === "phone"
              ? "We'll call you to confirm your order."
              : `Redirecting to ${platform === "ubereats" ? "UberEats" : "DoorDash"}...`
          }`,
        )

        // Clear cart after successful order
        setTimeout(() => {
          clearCart()
          setOrderStatus(null)
          onClose()
        }, 3000)

        // Redirect to external platforms
        if (platform === "ubereats") {
          setTimeout(() => {
            window.open("https://www.ubereats.com/store/tandoor-hut/4bWOBroxSdOABc_5dYVVJA", "_blank")
          }, 1500)
        } else if (platform === "doordash") {
          setTimeout(() => {
            window.open("https://www.doordash.com/store/tandoor-hut-naperville-1486077/", "_blank")
          }, 1500)
        }
      } else {
        setOrderStatus("Failed to submit order. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      setOrderStatus("Error submitting order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handle phone call tracking
   */
  const handlePhoneCall = () => {
    trackPhoneCall()
    window.location.href = "tel:(630)820-3600"
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            {items.length > 0 && <Badge variant="secondary">{items.length}</Badge>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-red-600 font-semibold">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Status */}
        {orderStatus && (
          <div className="p-4 border-t">
            <div
              className={`p-3 rounded-lg text-sm ${
                orderStatus.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {orderStatus}
            </div>
          </div>
        )}

        {/* Footer - Order Options */}
        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-red-600">${getTotalPrice().toFixed(2)}</span>
            </div>

            {/* Order Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleOrderSubmission("ubereats")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Order via UberEats"}
              </Button>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleOrderSubmission("doordash")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Order via DoorDash"}
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                onClick={() => handleOrderSubmission("phone")}
                disabled={isSubmitting}
              >
                <Phone className="h-4 w-4 mr-2" />
                {isSubmitting ? "Processing..." : "Order by Phone"}
              </Button>

              <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50" onClick={handlePhoneCall}>
                <Phone className="h-4 w-4 mr-2" />
                Call (630) 820-3600
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              Orders are tracked for analytics and customer service
            </p>
          </div>
        )}
      </div>
    </>
  )
}
