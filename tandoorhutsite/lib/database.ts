import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface CustomerInteraction {
  type: string
  page?: string
  item_id?: string
  item_name?: string
  platform?: string
  session_id?: string
  ip_address?: string | null
}

export interface OrderData {
  items: string
  platform: string
  orderType: string
  total: number
  sessionId?: string
  ipAddress?: string | null
}

/**
 * Insert customer interaction into database
 */
export async function insertInteraction(interaction: CustomerInteraction) {
  try {
    // Validate required field
    if (!interaction.type) {
      throw new Error("interaction_type is required")
    }

    const result = await sql`
      INSERT INTO customer_interactions (
        interaction_type, 
        page_url, 
        item_id, 
        item_name, 
        platform, 
        session_id, 
        ip_address,
        created_at
      )
      VALUES (
        ${interaction.type},
        ${interaction.page || null},
        ${interaction.item_id || null},
        ${interaction.item_name || null},
        ${interaction.platform || null},
        ${interaction.session_id || null},
        ${interaction.ip_address || null},
        NOW()
      )
      RETURNING id
    `

    console.log(`Tracked interaction: ${interaction.type}`)
    return result[0]?.id
  } catch (error) {
    console.error("Database error inserting interaction:", error)
    throw error
  }
}

/**
 * Insert order into database
 */
export async function insertOrder(orderData: OrderData) {
  try {
    const result = await sql`
      INSERT INTO orders (
        items,
        platform,
        order_type,
        total_amount,
        session_id,
        ip_address,
        created_at
      )
      VALUES (
        ${orderData.items},
        ${orderData.platform},
        ${orderData.orderType},
        ${orderData.total},
        ${orderData.sessionId || null},
        ${orderData.ipAddress || null},
        NOW()
      )
      RETURNING id
    `

    return result[0]?.id
  } catch (error) {
    console.error("Database error inserting order:", error)
    throw error
  }
}

/**
 * Get analytics data
 */
export async function getAnalyticsData() {
  try {
    // Get interaction counts by type
    const interactionCounts = await sql`
      SELECT 
        interaction_type,
        COUNT(*) as count
      FROM customer_interactions 
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY interaction_type
      ORDER BY count DESC
    `

    // Get popular menu items
    const popularItems = await sql`
      SELECT 
        item_name,
        COUNT(*) as add_to_cart_count
      FROM customer_interactions 
      WHERE interaction_type = 'add_to_cart' 
        AND created_at >= NOW() - INTERVAL '30 days'
        AND item_name IS NOT NULL
      GROUP BY item_name
      ORDER BY add_to_cart_count DESC
      LIMIT 10
    `

    // Get platform clicks
    const platformClicks = await sql`
      SELECT 
        platform,
        COUNT(*) as clicks
      FROM customer_interactions 
      WHERE interaction_type = 'platform_click' 
        AND created_at >= NOW() - INTERVAL '30 days'
        AND platform IS NOT NULL
      GROUP BY platform
      ORDER BY clicks DESC
    `

    // Get daily page views
    const dailyPageViews = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as views
      FROM customer_interactions 
      WHERE interaction_type = 'page_view' 
        AND created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `

    // Get order statistics
    const orderStats = await sql`
      SELECT 
        COUNT(*) as total_orders,
        AVG(total_amount) as average_order_value,
        SUM(total_amount) as total_revenue
      FROM orders 
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `

    return {
      interactionCounts,
      popularItems,
      platformClicks,
      dailyPageViews,
      orderStats: orderStats[0] || { total_orders: 0, average_order_value: 0, total_revenue: 0 },
    }
  } catch (error) {
    console.error("Database error getting analytics:", error)
    throw error
  }
}
