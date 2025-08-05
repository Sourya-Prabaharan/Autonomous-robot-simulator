import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface AdminUser {
  id: number
  username: string
  email: string
  role: string
  is_active: boolean
}

/**
 * Authenticate admin user
 */
export async function authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
  try {
    const users = await sql`
      SELECT id, username, email, password_hash, role, is_active
      FROM admin_users 
      WHERE username = ${username} AND is_active = true
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

/**
 * Generate JWT token
 */
export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" },
  )
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

/**
 * Create new admin user
 */
export async function createAdminUser(
  username: string,
  email: string,
  password: string,
  role = "admin",
): Promise<boolean> {
  try {
    const hashedPassword = await hashPassword(password)

    await sql`
      INSERT INTO admin_users (username, email, password_hash, role)
      VALUES (${username}, ${email}, ${hashedPassword}, ${role})
    `

    return true
  } catch (error) {
    console.error("Error creating admin user:", error)
    return false
  }
}
