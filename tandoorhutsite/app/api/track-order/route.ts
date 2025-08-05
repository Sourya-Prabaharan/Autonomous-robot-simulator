import { type NextRequest, NextResponse } from "next/server"
import { insertOrder } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.items || !body.platform) {
      return NextResponse.json({ success: false, error: "items and platform are required" }, { status: 400 })
    }

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip")

    // Ensure IP is valid or null
    const validIp = ip && ip !== "" ? ip : null

    // Calculate total if not provided
    const total = body.total || body.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    const orderData = {
      items: JSON.stringify(body.items),
      platform: body.platform,
      orderType: body.orderType || "delivery",
      total: total,
      sessionId: body.session_id,
      ipAddress: validIp,
    }

    const orderId = await insertOrder(orderData)

    if (orderId) {
      return NextResponse.json({
        success: true,
        orderId: `TH-${orderId}`,
        message: "Order tracked successfully",
      })
    } else {
      return NextResponse.json({ success: false, error: "Failed to track order" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in track-order API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
