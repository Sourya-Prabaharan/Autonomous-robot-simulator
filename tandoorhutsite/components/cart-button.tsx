"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

interface CartButtonProps {
  onClick?: () => void
}

export function CartButton({ onClick }: CartButtonProps = {}) {
  const { items } = useCartStore()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Button
      variant="outline"
      size="sm"
      className="relative border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
      onClick={onClick}
    >
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  )
}
