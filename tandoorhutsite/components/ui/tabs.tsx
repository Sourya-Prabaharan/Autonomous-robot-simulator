// Ensure this file is treated as a Client Component in Next.js
"use client"

// Import everything from React (e.g., forwardRef)
import * as React from "react"

// Import the Tabs components from Radix UI (TabsPrimitive)
import * as TabsPrimitive from "@radix-ui/react-tabs"

// Import utility for conditional class name merging
import { cn } from "@/lib/utils"

// Re-export the Tabs root component directly from Radix
const Tabs = TabsPrimitive.Root

// Define the TabsList component, which wraps the tab triggers (like the tab bar)
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>, // Get the correct element type from Radix
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> // Get all valid props for this component
>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref} // Forward the ref
      // Combine default styles with any passed-in className
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props} // Spread other props to the underlying component
    />
  )
)
// Set display name for DevTools clarity
TabsList.displayName = TabsPrimitive.List.displayName

// Define the individual tab trigger component (like a button for each tab)
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref} // Forward the ref
      className={cn(
        // Base styles + styles for active/disabled/focus-visible states
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className
      )}
      {...props}
    />
  )
)
// Set display name for easier debugging
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// Define the content component shown when a specific tab is active
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref} // Forward the ref
      className={cn(
        // Apply spacing and focus styles
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
)
// Set display name for the content component
TabsContent.displayName = TabsPrimitive.Content.displayName

// Export all custom tab components
export { Tabs, TabsList, TabsTrigger, TabsContent }
