import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
