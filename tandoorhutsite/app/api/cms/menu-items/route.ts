import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getAllMenuItems, createMenuItem } from "@/lib/menu-management"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const items = await getAllMenuItems()

    return NextResponse.json({
      success: true,
      data: items,
    })
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const itemData = await request.json()

    // Generate item_id if not provided
    if (!itemData.item_id) {
      itemData.item_id = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const success = await createMenuItem(itemData)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to create menu item" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
