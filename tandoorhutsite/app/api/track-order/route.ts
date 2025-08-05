import { type NextRequest, NextResponse } from "next/server"
import { insertOrder, type OrderData } from "@/lib/database"

/**
 * POST /api/track-order
 *
 * Tracks customer orders when they're initiated through the cart system
 * This helps us understand what customers are ordering and through which platforms
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No items in order",
        },
        { status: 400 },
      )
    }

    if (!body.platform || !["ubereats", "doordash", "phone"].includes(body.platform)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid platform",
        },
        { status: 400 },
      )
    }

    // Create order data object
    const orderData: OrderData = {
      items: body.items.map((item: any) => ({
        id: item.id || `item-${Date.now()}`,
        name: item.name,
        price: Number.parseFloat(item.price),
        quantity: Number.parseInt(item.quantity),
        category: item.category || "Other",
      })),
      platform: body.platform,
      orderType: body.orderType || "delivery",
      customerInfo: {
        name: body.customerName,
        email: body.customerEmail,
        phone: body.customerPhone,
      },
    }

    // Insert order into database
    const orderId = await insertOrder(orderData)

    console.log(`Order tracked: ${orderId} with ${orderData.items.length} items via ${orderData.platform}`)

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order tracked successfully",
      itemCount: orderData.items.length,
      totalAmount: orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    })
  } catch (error) {
    console.error("API error tracking order:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to track order",
      },
      { status: 500 },
    )
  }
}
