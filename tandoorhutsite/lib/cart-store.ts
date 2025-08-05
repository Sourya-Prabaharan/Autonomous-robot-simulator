"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * CartItem Interface - Defines the structure of items in the shopping cart
 * @param id - Unique identifier for the menu item
 * @param name - Display name of the dish
 * @param price - Price per unit in dollars
 * @param quantity - Number of this item in the cart
 * @param specialInstructions - Optional customer notes for preparation
 */
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  specialInstructions?: string
}

/**
 * CartStore Interface - Defines all cart-related state and actions
 * This creates a global state management system for the shopping cart
 */
interface CartStore {
  items: CartItem[] // Array of all items in cart
  addItem: (item: Omit<CartItem, "quantity">) => void // Add new item or increment existing
  removeItem: (id: string) => void // Remove item completely from cart
  updateQuantity: (id: string, quantity: number) => void // Change quantity of specific item
  clearCart: () => void // Empty the entire cart
  getTotalPrice: () => number // Calculate total price of all items
  getTotalItems: () => number // Calculate total number of items
}

/**
 * Zustand Store with Persistence
 * - create(): Creates the store with state and actions
 * - persist(): Saves cart to localStorage so it survives page refreshes
 * - The store is accessible from any component in the app
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state - empty cart
      items: [],

      /**
       * Add Item Function
       * - If item already exists, increment quantity by 1
       * - If item is new, add it with quantity 1
       * - Uses functional state update for React optimization
       */
      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === newItem.id)

        if (existingItem) {
          // Item exists - increment quantity
          set({
            items: items.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          // New item - add to cart with quantity 1
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }
      },

      /**
       * Remove Item Function
       * - Completely removes item from cart regardless of quantity
       * - Uses filter to create new array without the specified item
       */
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      /**
       * Update Quantity Function
       * - If quantity is 0 or less, remove item completely
       * - Otherwise, update the quantity to the new value
       * - Prevents negative quantities
       */
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
        } else {
          set({
            items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
          })
        }
      },

      /**
       * Clear Cart Function
       * - Empties the entire cart (used after successful checkout)
       * - Resets items array to empty
       */
      clearCart: () => {
        set({ items: [] })
      },

      /**
       * Get Total Price Function
       * - Calculates total cost of all items in cart
       * - Multiplies each item's price by its quantity and sums them
       * - Returns the total as a number
       */
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      /**
       * Get Total Items Function
       * - Calculates total number of individual items in cart
       * - Sums up all quantities (useful for cart badge display)
       * - Returns the count as a number
       */
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      // Persistence configuration
      name: "tandoor-hut-cart", // localStorage key name
    },
  ),
)
