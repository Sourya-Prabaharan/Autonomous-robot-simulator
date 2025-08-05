import { type NextRequest, NextResponse } from "next/server"
import { insertInteraction } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.interaction_type) {
      return NextResponse.json({ success: false, error: "interaction_type is required" }, { status: 400 })
    }

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip")

    // Ensure IP is valid or null (not empty string)
    const validIp = ip && ip !== "" ? ip : null

    const interaction = {
      type: body.interaction_type,
      page: body.page_url,
      item_id: body.item_id,
      item_name: body.item_name,
      platform: body.platform,
      session_id: body.session_id,
      ip_address: validIp,
    }

    const success = await insertInteraction(interaction)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to track interaction" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in track-interaction API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
