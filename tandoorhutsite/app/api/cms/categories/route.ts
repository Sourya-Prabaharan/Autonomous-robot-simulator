import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getAllCategories, createCategory } from "@/lib/menu-management"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const categories = await getAllCategories()

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const categoryData = await request.json()
    const success = await createCategory(categoryData)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
