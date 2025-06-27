"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

/**
 * CartButton Props Interface
 * @param onClick - Function to execute when button is clicked (opens cart sidebar)
 * @param className - Optional additional CSS classes for styling
 */
interface CartButtonProps {
  onClick: () => void
  className?: string
}

/**
 * CartButton Component - Floating cart button with item count
 * Features:
 * - Shows shopping cart icon with text
 * - Displays number of unique items in cart
 * - Shows red badge with total quantity when cart has items
 * - Positioned fixed on screen for easy access
 * - Connects to global cart state via Zustand
 */
export function CartButton({ onClick, className = "" }: CartButtonProps) {
  // Get cart data from global store
  const { items, getTotalItems } = useCartStore()
  const totalItems = getTotalItems() // Total quantity of all items

  return (
    <Button onClick={onClick} className={`bg-red-600 hover:bg-red-700 relative ${className}`}>
      {/* Shopping cart icon */}
      <ShoppingCart className="h-5 w-5 mr-2" />
      {/* Text showing number of unique items (not total quantity) */}
      Cart ({items.length}){/* Red notification badge - only shows when cart has items */}
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
          {totalItems}
        </Badge>
      )}
    </Button>
  )
}
