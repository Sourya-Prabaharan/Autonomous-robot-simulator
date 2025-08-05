import { type NextRequest, NextResponse } from "next/server"
import { insertInteraction } from "@/lib/database"

/**
 * POST /api/track-interaction
 *
 * Tracks customer interactions like page views, cart additions, platform clicks
 * This helps us understand customer behavior and preferences
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate interaction type
    const validTypes = ["page_view", "add_to_cart", "platform_click", "phone_call"]
    if (!body.type || !validTypes.includes(body.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid interaction type",
        },
        { status: 400 },
      )
    }

    // Get client IP and user agent
    const userAgent = request.headers.get("user-agent") || ""

    // Prefer X-Forwarded-For, fall back to request.ip.  Trim whitespace.
    const forwardedFor = request.headers.get("x-forwarded-for")
    let ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : (request.ip ?? null)

    // If ipAddress is an empty string, use null so Postgres inet accepts it
    if (!ipAddress) ipAddress = null

    // Track the interaction
    await insertInteraction(body.type, {
      sessionId: body.sessionId,
      itemId: body.itemId,
      itemName: body.itemName,
      platform: body.platform,
      pageUrl: body.pageUrl,
      userAgent,
      ipAddress, // ← now string | null, never "unknown"
    })

    return NextResponse.json({
      success: true,
      message: "Interaction tracked successfully",
      type: body.type,
    })
  } catch (error) {
    console.error("API error tracking interaction:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to track interaction",
      },
      { status: 500 },
    )
  }
}
