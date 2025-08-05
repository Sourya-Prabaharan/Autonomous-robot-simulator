"use client"

/**
 * Client-side analytics tracking utilities
 *
 * Purpose:
 * - Track user interactions on the website
 * - Send data to API endpoints for database storage
 * - Provide easy-to-use functions for components
 */

// Generate a simple session ID for tracking
const getSessionId = () => {
  if (typeof window === "undefined") return null

  let sessionId = sessionStorage.getItem("tandoor-session-id")
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem("tandoor-session-id", sessionId)
  }
  return sessionId
}

/**
 * Track page view
 */
export const trackPageView = async (pageUrl: string) => {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "page_view",
        pageUrl,
        sessionId: getSessionId(),
      }),
    })
    console.log(`Tracked: Page view - ${pageUrl}`)
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

/**
 * Track add to cart
 */
export const trackAddToCart = async (itemId: string, itemName: string) => {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "add_to_cart",
        itemId,
        itemName,
        sessionId: getSessionId(),
      }),
    })
    console.log(`Tracked: Add to cart - ${itemName}`)
  } catch (error) {
    console.error("Error tracking add to cart:", error)
  }
}

/**
 * Track platform click (UberEats, DoorDash, Phone)
 */
export const trackPlatformClick = async (platform: string) => {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "platform_click",
        platform,
        sessionId: getSessionId(),
      }),
    })
    console.log(`Tracked: Platform click - ${platform}`)
  } catch (error) {
    console.error("Error tracking platform click:", error)
  }
}

/**
 * Track phone call
 */
export const trackPhoneCall = async () => {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "phone_call",
        sessionId: getSessionId(),
      }),
    })
    console.log("Tracked: Phone call")
  } catch (error) {
    console.error("Error tracking phone call:", error)
  }
}

/**
 * Track order submission
 */
export const trackOrder = async (orderData: {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  platform: string
  orderType: string
}) => {
  try {
    const response = await fetch("/api/track-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        sessionId: getSessionId(),
      }),
    })

    const result = await response.json()

    if (result.success) {
      console.log(`Order ${result.orderId} tracked successfully`)
      return result.orderId
    } else {
      console.error("Failed to track order:", result.error)
      return null
    }
  } catch (error) {
    console.error("Error tracking order:", error)
    return null
  }
}
