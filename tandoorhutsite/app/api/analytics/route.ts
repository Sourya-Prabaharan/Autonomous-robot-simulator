import { type NextRequest, NextResponse } from "next/server"
import { getAnalytics, getTotalStats } from "@/lib/database"

/**
 * GET /api/analytics
 *
 * Returns analytics data for the dashboard
 * Supports query parameters: days (default 7), type (summary, detailed)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "7")
    const type = searchParams.get("type") || "detailed"

    // Get analytics data
    const analytics = await getAnalytics(days)
    const totalStats = await getTotalStats()

    // Return summary or detailed data
    if (type === "summary") {
      return NextResponse.json({
        success: true,
        data: {
          totalStats,
          popularItemsCount: analytics.popularItems.length,
          recentOrdersCount: analytics.recentOrders.length,
          platformCount: analytics.platformAnalytics.length,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        totalStats,
        popularItems: analytics.popularItems,
        platformAnalytics: analytics.platformAnalytics,
        dailyAnalytics: analytics.dailyAnalytics,
        interactions: analytics.interactions,
        recentOrders: analytics.recentOrders,
      },
    })
  } catch (error) {
    console.error("API error getting analytics:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics",
      },
      { status: 500 },
    )
  }
}
