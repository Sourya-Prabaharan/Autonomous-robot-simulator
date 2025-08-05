import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getMenuItemById, updateMenuItem, deleteMenuItem } from "@/lib/menu-management"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const item = await getMenuItemById(Number.parseInt(params.id))

    if (!item) {
      return NextResponse.json({ success: false, error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: item,
    })
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const itemData = await request.json()
    const success = await updateMenuItem(Number.parseInt(params.id), itemData)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to update menu item" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const success = await deleteMenuItem(Number.parseInt(params.id))

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to delete menu item" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
