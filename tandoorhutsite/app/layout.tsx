import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

/**
 * Font Configuration
 * - Inter: Clean, readable font for body text loaded via Next.js font system
 * - ITC Avant Garde Gothic Bold will be handled via CSS fallbacks
 * - This combination provides strong branding while maintaining readability
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

/**
 * Metadata Configuration
 * - Used by Next.js for SEO and social media sharing
 * - title: Appears in browser tab and search results
 * - description: Used by search engines and social media previews
 * - This metadata applies to all pages unless overridden
 */
export const metadata: Metadata = {
  title: "Tandoor Hut - Authentic South Indian Cuisine",
  description:
    "Experience the finest South Indian flavors at Tandoor Hut. Traditional recipes, fresh spices, and warm hospitality since 1998.",
}

/**
 * RootLayout Component - The main layout wrapper for the entire application
 *
 * Purpose:
 * - Wraps all pages in the application
 * - Provides consistent HTML structure
 * - Applies global fonts and styles
 * - Sets up the basic document structure
 *
 * Features:
 * - HTML lang attribute for accessibility
 * - Global font application via className
 * - CSS custom properties for font families
 * - Children prop renders the actual page content
 *
 * @param children - The page content that will be rendered inside this layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Apply fonts globally with CSS custom properties */}
      <body className={`${inter.variable} font-sans`}>
        {/* All page content renders here */}
        {children}
      </body>
    </html>
  )
}
