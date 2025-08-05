import { neon } from "@neondatabase/serverless"

// Initialize Neon database connection using your provided connection string
const sql = neon(process.env.DATABASE_URL!)

/**
 * Database utility functions for Tandoor Hut analytics
 *
 * Purpose:
 * - Provide clean interface for database operations
 * - Handle error logging and connection management
 * - Support analytics tracking and reporting
 */

export interface OrderData {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    category?: string
  }>
  platform: "ubereats" | "doordash" | "phone"
  orderType: "delivery" | "pickup"
  customerInfo?: {
    name?: string
    email?: string
    phone?: string
  }
}

/**
 * Insert a new order and its items into the database
 */
export async function insertOrder(orderData: OrderData): Promise<string> {
  try {
    const orderId = `TH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const totalAmount = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Insert order
    await sql`
      INSERT INTO orders (
        order_id, 
        customer_name, 
        customer_email, 
        customer_phone, 
        platform, 
        order_type, 
        total_amount,
        status
      )
      VALUES (
        ${orderId}, 
        ${orderData.customerInfo?.name || null}, 
        ${orderData.customerInfo?.email || null}, 
        ${orderData.customerInfo?.phone || null}, 
        ${orderData.platform}, 
        ${orderData.orderType}, 
        ${totalAmount},
        'initiated'
      )
    `

    // Insert order items
    for (const item of orderData.items) {
      const itemTotal = item.price * item.quantity
      await sql`
        INSERT INTO order_items (
          order_id, 
          item_id, 
          item_name, 
          category, 
          price, 
          quantity, 
          item_total
        )
        VALUES (
          ${orderId}, 
          ${item.id}, 
          ${item.name}, 
          ${item.category || "Other"}, 
          ${item.price}, 
          ${item.quantity}, 
          ${itemTotal}
        )
      `
    }

    console.log(`Order ${orderId} inserted successfully with ${orderData.items.length} items`)
    return orderId
  } catch (error) {
    console.error("Database error inserting order:", error)
    throw new Error("Failed to save order to database")
  }
}

/**
 * Track customer interactions
 */
export async function insertInteraction(
  type: "page_view" | "add_to_cart" | "platform_click" | "phone_call",
  data?: {
    sessionId?: string
    itemId?: string
    itemName?: string
    platform?: string
    pageUrl?: string
    userAgent?: string
    ipAddress?: string | null
  },
) {
  try {
    await sql`
      INSERT INTO customer_interactions (
        session_id,
        interaction_type, 
        page_url,
        item_id, 
        item_name,
        platform,
        user_agent,
        ip_address
      )
      VALUES (
        ${data?.sessionId || null},
        ${type}, 
        ${data?.pageUrl || null},
        ${data?.itemId || null}, 
        ${data?.itemName || null},
        ${data?.platform || null},
        ${data?.userAgent || null},
        ${data?.ipAddress || null}
      )
    `
  } catch (error) {
    console.error("Database error inserting interaction:", error)
    // Don't throw error for analytics - shouldn't break user experience
  }
}

/**
 * Get analytics data for dashboard
 */
export async function getAnalytics(days = 7) {
  try {
    const dateFilter = new Date()
    dateFilter.setDate(dateFilter.getDate() - days)
    const dateString = dateFilter.toISOString().split("T")[0]

    // Get popular items
    const popularItems = await sql`
      SELECT 
        item_id,
        item_name,
        category,
        total_orders,
        total_quantity,
        total_revenue,
        last_ordered
      FROM item_analytics
      WHERE total_orders > 0
      ORDER BY total_orders DESC, total_revenue DESC
      LIMIT 10
    `

    // Get platform analytics
    const platformAnalytics = await sql`
      SELECT 
        platform,
        SUM(total_orders)::integer as total_orders,
        SUM(total_revenue)::numeric as total_revenue,
        AVG(total_revenue)::numeric as avg_daily_revenue
      FROM platform_analytics
      WHERE date >= ${dateString}
      GROUP BY platform
      ORDER BY total_orders DESC
    `

    // Get daily analytics
    const dailyAnalytics = await sql`
      SELECT 
        date,
        SUM(total_orders)::integer as total_orders,
        SUM(total_revenue)::numeric as total_revenue
      FROM platform_analytics
      WHERE date >= ${dateString}
      GROUP BY date
      ORDER BY date DESC
    `

    // Get interaction analytics
    const interactions = await sql`
      SELECT 
        interaction_type,
        DATE(created_at) as date,
        COUNT(*)::integer as count
      FROM customer_interactions
      WHERE created_at >= ${dateString}
      GROUP BY interaction_type, DATE(created_at)
      ORDER BY date DESC, count DESC
    `

    // Get recent orders for overview
    const recentOrders = await sql`
      SELECT 
        order_id,
        platform,
        total_amount,
        created_at,
        (SELECT COUNT(*) FROM order_items WHERE order_items.order_id = orders.order_id) as item_count
      FROM orders
      WHERE created_at >= ${dateString}
      ORDER BY created_at DESC
      LIMIT 20
    `

    return {
      popularItems,
      platformAnalytics,
      dailyAnalytics,
      interactions,
      recentOrders,
    }
  } catch (error) {
    console.error("Database error getting analytics:", error)
    throw new Error("Failed to fetch analytics data")
  }
}

/**
 * Get total statistics
 */
export async function getTotalStats() {
  try {
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM orders) as total_orders,
        (SELECT SUM(total_amount) FROM orders) as total_revenue,
        (SELECT COUNT(DISTINCT item_id) FROM order_items) as unique_items_ordered,
        (SELECT COUNT(*) FROM customer_interactions) as total_interactions
    `

    return (
      stats[0] || {
        total_orders: 0,
        total_revenue: 0,
        unique_items_ordered: 0,
        total_interactions: 0,
      }
    )
  } catch (error) {
    console.error("Database error getting total stats:", error)
    return {
      total_orders: 0,
      total_revenue: 0,
      unique_items_ordered: 0,
      total_interactions: 0,
    }
  }
}

/**
 * Test database connection
 */
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`
    console.log("Database connection successful:", result[0].current_time)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
