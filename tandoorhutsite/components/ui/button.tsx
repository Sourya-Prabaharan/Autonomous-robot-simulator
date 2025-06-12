// Import everything from React (e.g., forwardRef, useEffect, etc.)
import * as React from "react"

// Import Slot from Radix UI – allows rendering a different element while preserving props
import { Slot } from "@radix-ui/react-slot"

// Import 'cva' (class variance authority) to manage Tailwind class variants, and the type helper 'VariantProps'
import { cva, type VariantProps } from "class-variance-authority"

// Import a utility function for conditional class name merging
import { cn } from "@/lib/utils"

// Define variant-based class names for the Button component using cva
const buttonVariants = cva(
  // Base set of Tailwind classes applied to all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    // Define available variants for button appearance and size
    variants: {
      // Visual style options for the button
      variant: {
        // Default button style: primary colors with shadow and hover effect
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        // Destructive style: red/danger color scheme
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // Outline style: bordered button with background and hover effect
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // Secondary button: muted alternative style
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // Ghost button: no border or background, hover-only effect
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link-style button: styled like a hyperlink
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Size options for the button
      size: {
        // Default size
        default: "h-9 px-4 py-2",
        // Small button size
        sm: "h-8 rounded-md px-3 text-xs",
        // Large button size
        lg: "h-10 rounded-md px-8",
        // Icon-only button size
        icon: "h-9 w-9",
      },
    },
    // Default variant and size used if none are specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Define props for the Button component
// Includes standard HTML button attributes, variant props from buttonVariants, and optional 'asChild'
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // If true, renders a child component (e.g., <Link>) instead of a <button>
}

// Define the Button component using React.forwardRef for ref forwarding support
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If 'asChild' is true, render as the Slot component (from Radix); otherwise, use a <button> element
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        // Combine variant-based classes with any additional classes passed in
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref} // Forward the ref
        {...props} // Spread remaining props onto the rendered component
      />
    )
  }
)

// Set display name for the component (useful for debugging in dev tools)
Button.displayName = "Button"

// Export the Button component and the buttonVariants utility
export { Button, buttonVariants }
