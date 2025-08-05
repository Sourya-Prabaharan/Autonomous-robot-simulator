export interface AnalyticsEvent {
  type: "page_view" | "add_to_cart" | "platform_click" | "phone_call" | "order_submission"
  page?: string
  item_id?: string
  item_name?: string
  platform?: string
  session_id?: string
  order_data?: any
}

/**
 * Generate a session ID for tracking user sessions
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get or create session ID from localStorage
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return generateSessionId()

  let sessionId = localStorage.getItem("tandoor_session_id")
  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem("tandoor_session_id", sessionId)
  }
  return sessionId
}

/**
 * Track page views
 */
export async function trackPageView(page: string) {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interaction_type: "page_view",
        page_url: page,
        session_id: getSessionId(),
      }),
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

/**
 * Track add to cart events
 */
export async function trackAddToCart(itemId: string, itemName: string) {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interaction_type: "add_to_cart",
        item_id: itemId,
        item_name: itemName,
        session_id: getSessionId(),
      }),
    })
  } catch (error) {
    console.error("Error tracking add to cart:", error)
  }
}

/**
 * Track platform clicks (UberEats, DoorDash)
 */
export async function trackPlatformClick(platform: string) {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interaction_type: "platform_click",
        platform,
        session_id: getSessionId(),
      }),
    })
  } catch (error) {
    console.error("Error tracking platform click:", error)
  }
}

/**
 * Track phone calls
 */
export async function trackPhoneCall() {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interaction_type: "phone_call",
        session_id: getSessionId(),
      }),
    })
  } catch (error) {
    console.error("Error tracking phone call:", error)
  }
}

/**
 * Track order submissions
 */
export async function trackOrder(orderData: {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  platform: string
  orderType?: string
  total?: number
}) {
  try {
    const response = await fetch("/api/track-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        session_id: getSessionId(),
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

/**
 * Track general interactions
 */
export async function trackInteraction(event: AnalyticsEvent) {
  try {
    await fetch("/api/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interaction_type: event.type,
        page_url: event.page,
        item_id: event.item_id,
        item_name: event.item_name,
        platform: event.platform,
        session_id: getSessionId(),
      }),
    })
  } catch (error) {
    console.error("Error tracking interaction:", error)
  }
}
