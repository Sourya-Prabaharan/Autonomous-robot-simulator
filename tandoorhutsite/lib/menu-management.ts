import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface MenuItem {
  id?: number
  item_id: string
  name: string
  description?: string
  price: number
  category: string
  subcategory?: string
  is_available: boolean
  is_featured: boolean
  spice_level: "none" | "mild" | "medium" | "hot" | "very_hot"
  dietary_info?: string[]
  image_url?: string
  prep_time?: number
  calories?: number
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface MenuCategory {
  id?: number
  name: string
  description?: string
  is_active: boolean
  sort_order: number
}

/**
 * Get all menu items
 */
export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const items = await sql`
      SELECT * FROM menu_items 
      ORDER BY category, sort_order, name
    `
    return items as MenuItem[]
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return []
  }
}

/**
 * Get menu item by ID
 */
export async function getMenuItemById(id: number): Promise<MenuItem | null> {
  try {
    const items = await sql`
      SELECT * FROM menu_items WHERE id = ${id}
    `
    return items.length > 0 ? (items[0] as MenuItem) : null
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return null
  }
}

/**
 * Create new menu item
 */
export async function createMenuItem(item: Omit<MenuItem, "id" | "created_at" | "updated_at">): Promise<boolean> {
  try {
    await sql`
      INSERT INTO menu_items (
        item_id, name, description, price, category, subcategory,
        is_available, is_featured, spice_level, dietary_info,
        image_url, prep_time, calories, sort_order
      ) VALUES (
        ${item.item_id}, ${item.name}, ${item.description || null}, ${item.price},
        ${item.category}, ${item.subcategory || null}, ${item.is_available},
        ${item.is_featured}, ${item.spice_level}, ${item.dietary_info || null},
        ${item.image_url || null}, ${item.prep_time || null}, 
        ${item.calories || null}, ${item.sort_order}
      )
    `
    return true
  } catch (error) {
    console.error("Error creating menu item:", error)
    return false
  }
}

/**
 * Update menu item
 */
export async function updateMenuItem(id: number, item: Partial<MenuItem>): Promise<boolean> {
  try {
    await sql`
      UPDATE menu_items SET
        name = COALESCE(${item.name}, name),
        description = COALESCE(${item.description}, description),
        price = COALESCE(${item.price}, price),
        category = COALESCE(${item.category}, category),
        subcategory = COALESCE(${item.subcategory}, subcategory),
        is_available = COALESCE(${item.is_available}, is_available),
        is_featured = COALESCE(${item.is_featured}, is_featured),
        spice_level = COALESCE(${item.spice_level}, spice_level),
        dietary_info = COALESCE(${item.dietary_info}, dietary_info),
        image_url = COALESCE(${item.image_url}, image_url),
        prep_time = COALESCE(${item.prep_time}, prep_time),
        calories = COALESCE(${item.calories}, calories),
        sort_order = COALESCE(${item.sort_order}, sort_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
    return true
  } catch (error) {
    console.error("Error updating menu item:", error)
    return false
  }
}

/**
 * Delete menu item
 */
export async function deleteMenuItem(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM menu_items WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return false
  }
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<MenuCategory[]> {
  try {
    const categories = await sql`
      SELECT * FROM menu_categories 
      WHERE is_active = true
      ORDER BY sort_order, name
    `
    return categories as MenuCategory[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

/**
 * Create new category
 */
export async function createCategory(category: Omit<MenuCategory, "id">): Promise<boolean> {
  try {
    await sql`
      INSERT INTO menu_categories (name, description, is_active, sort_order)
      VALUES (${category.name}, ${category.description || null}, ${category.is_active}, ${category.sort_order})
    `
    return true
  } catch (error) {
    console.error("Error creating category:", error)
    return false
  }
}

/**
 * Update category
 */
export async function updateCategory(id: number, category: Partial<MenuCategory>): Promise<boolean> {
  try {
    await sql`
      UPDATE menu_categories SET
        name = COALESCE(${category.name}, name),
        description = COALESCE(${category.description}, description),
        is_active = COALESCE(${category.is_active}, is_active),
        sort_order = COALESCE(${category.sort_order}, sort_order)
      WHERE id = ${id}
    `
    return true
  } catch (error) {
    console.error("Error updating category:", error)
    return false
  }
}

/**
 * Toggle item availability
 */
export async function toggleItemAvailability(id: number): Promise<boolean> {
  try {
    await sql`
      UPDATE menu_items 
      SET is_available = NOT is_available, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
    return true
  } catch (error) {
    console.error("Error toggling item availability:", error)
    return false
  }
}

/**
 * Bulk update prices by category
 */
export async function bulkUpdatePrices(category: string, percentage: number): Promise<boolean> {
  try {
    await sql`
      UPDATE menu_items 
      SET price = price * (1 + ${percentage / 100}), updated_at = CURRENT_TIMESTAMP
      WHERE category = ${category}
    `
    return true
  } catch (error) {
    console.error("Error bulk updating prices:", error)
    return false
  }
}
