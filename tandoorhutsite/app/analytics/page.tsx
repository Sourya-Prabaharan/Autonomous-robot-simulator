"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, ShoppingCart, Phone, Eye, DollarSign, Calendar, Star } from "lucide-react"

/**
 * Analytics Dashboard Page
 *
 * Features:
 * - Real-time analytics from PostgreSQL database
 * - Popular items tracking
 * - Platform performance comparison
 * - Customer interaction insights
 * - Revenue and order statistics
 */

interface AnalyticsData {
  totalStats: {
    total_orders: number
    total_revenue: number
    unique_items_ordered: number
    total_interactions: number
  }
  popularItems: Array<{
    item_id: string
    item_name: string
    category: string
    price: number
    total_orders: number
    total_quantity: number
    total_revenue: number
    last_ordered: string
  }>
  platformAnalytics: Array<{
    platform: string
    total_orders: number
    total_revenue: number
    avg_daily_revenue: number
  }>
  dailyAnalytics: Array<{
    date: string
    total_orders: number
    total_revenue: number
  }>
  interactions: Array<{
    interaction_type: string
    date: string
    count: number
  }>
  recentOrders: Array<{
    order_id: string
    platform: string
    total_amount: number
    created_at: string
    item_count: number
  }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/analytics?days=30")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Failed to fetch analytics")
      }
    } catch (err) {
      setError("Error loading analytics data")
      console.error("Analytics fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading analytics...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || "No data available"}</p>
              <button onClick={fetchAnalytics} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Retry
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tandoor Hut Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights into customer orders and behavior</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingCart className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{data.totalStats.total_orders || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${Number(data.totalStats.total_revenue || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Menu Items Ordered</p>
                    <p className="text-2xl font-bold text-gray-900">{data.totalStats.unique_items_ordered || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Customer Interactions</p>
                    <p className="text-2xl font-bold text-gray-900">{data.totalStats.total_interactions || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Tabs defaultValue="popular" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="popular">Popular Items</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
            </TabsList>

            {/* Popular Items Tab */}
            <TabsContent value="popular">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Most Popular Menu Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.popularItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No orders yet. Popular items will appear here once customers start ordering.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {data.popularItems.slice(0, 10).map((item, index) => (
                        <div key={item.item_id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="secondary"
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                            >
                              {index + 1}
                            </Badge>
                            <div>
                              <h3 className="font-semibold">{item.item_name}</h3>
                              <p className="text-sm text-gray-600">{item.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{item.total_orders} orders</p>
                            <p className="text-sm text-gray-600">${Number(item.total_revenue).toFixed(2)} revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Platforms Tab */}
            <TabsContent value="platforms">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.platformAnalytics.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No platform data yet. Data will appear here once orders are placed.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {data.platformAnalytics.map((platform) => (
                        <div key={platform.platform} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold capitalize">
                              {platform.platform === "ubereats"
                                ? "UberEats"
                                : platform.platform === "doordash"
                                  ? "DoorDash"
                                  : "Phone Orders"}
                            </h3>
                            <Badge variant="outline">{platform.total_orders} orders</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Total Revenue</p>
                              <p className="font-semibold">${Number(platform.total_revenue).toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Avg Daily Revenue</p>
                              <p className="font-semibold">${Number(platform.avg_daily_revenue).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.recentOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No recent orders. Orders will appear here once customers start ordering.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {data.recentOrders.slice(0, 15).map((order) => (
                        <div key={order.order_id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{order.order_id}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString()} at{" "}
                              {new Date(order.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">
                              {order.platform === "ubereats"
                                ? "UberEats"
                                : order.platform === "doordash"
                                  ? "DoorDash"
                                  : "Phone"}
                            </Badge>
                            <p className="font-semibold">${Number(order.total_amount).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">{order.item_count} items</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interactions Tab */}
            <TabsContent value="interactions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Customer Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.interactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No interaction data yet. Data will appear here as customers use the website.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {data.interactions.slice(0, 10).map((interaction, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {interaction.interaction_type === "page_view" && <Eye className="h-5 w-5 text-blue-600" />}
                            {interaction.interaction_type === "add_to_cart" && (
                              <ShoppingCart className="h-5 w-5 text-green-600" />
                            )}
                            {interaction.interaction_type === "platform_click" && (
                              <BarChart3 className="h-5 w-5 text-purple-600" />
                            )}
                            {interaction.interaction_type === "phone_call" && (
                              <Phone className="h-5 w-5 text-red-600" />
                            )}
                            <div>
                              <h3 className="font-semibold capitalize">
                                {interaction.interaction_type.replace("_", " ")}
                              </h3>
                              <p className="text-sm text-gray-600">{new Date(interaction.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{interaction.count} times</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
