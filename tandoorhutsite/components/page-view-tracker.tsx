"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/analytics"

/**
 * PageViewTracker Component
 *
 * Purpose:
 * - Automatically track page views when users navigate
 * - Send analytics data to database
 * - Client-side only component to avoid hydration issues
 */
export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view when component mounts or pathname changes
    trackPageView(pathname)
  }, [pathname])

  // This component doesn't render anything visible
  return null
}
