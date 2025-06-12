// Import everything from React (e.g., forwardRef)
import * as React from "react"

// Import the utility function for conditionally combining class names
import { cn } from "@/lib/utils"

// Define the main Card container component using React.forwardRef
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  // Destructure className and other props, forward ref to the div element
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Combine base styles with any additional className passed in
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props} // Spread remaining props onto the div
    />
  )
)
Card.displayName = "Card" // Set display name for debugging

// Define the CardHeader component for the top section of the card
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Styles for vertical layout and spacing
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// Define the CardTitle component for displaying the title in the card header
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Styling for bold, clean title text
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// Define the CardDescription component for showing subtitle or supporting text
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Smaller text with muted color
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

// Define the CardContent component for the main content body of the card
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Padding with no top padding (since header has it)
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

// Define the CardFooter component for footer content like actions or info
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Align items horizontally with padding and no top padding
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

// Export all card-related components for use elsewhere
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
