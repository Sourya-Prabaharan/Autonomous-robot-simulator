// Import everything from React (e.g., useState, useEffect, etc.)
import * as React from "react"

// Import 'cva' (a utility for class composition with variants) and the type helper 'VariantProps' from the class-variance-authority package
import { cva, type VariantProps } from "class-variance-authority"

// Import a utility function 'cn' used to concatenate Tailwind CSS classes conditionally
import { cn } from "@/lib/utils"

// Define a set of class variants for the Badge component using cva
const badgeVariants = cva(
  // Base set of Tailwind CSS utility classes applied to all variants
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    // Define different visual styles (variants) for the badge
    variants: {
      variant: {
        // Default style: primary background and text colors with shadow and hover effect
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        // Secondary style: secondary background and text colors with hover effect
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive style: red/danger color scheme for alerts or errors
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        // Outline style: no background, default text color
        outline: "text-foreground",
      },
    },
    // Set the default variant to "default" if none is provided
    defaultVariants: {
      variant: "default",
    },
  }
)

// Define the props that the Badge component accepts
// Includes standard HTML div attributes and variant-specific props from badgeVariants
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Define the Badge component
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    // Combine the computed variant class with any additional classes passed via className
    // Spread the remaining props onto the <div> element
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Export the Badge component and the badgeVariants object
export { Badge, badgeVariants }
