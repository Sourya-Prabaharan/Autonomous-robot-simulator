// Import everything from React (e.g., forwardRef)
import * as React from "react"

// Import the utility function for conditionally merging class names
import { cn } from "@/lib/utils"

// Define the Input component using React.forwardRef to allow ref forwarding
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  // Destructure className, type, and other props; forward ref to the <input> element
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Set the input type (e.g., text, email, password, etc.)
        className={cn(
          // Apply base Tailwind styles and merge with any additional className
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref} // Forward the ref to the input element
        {...props} // Spread the rest of the props onto the input element
      />
    )
  }
)

// Set display name for easier debugging in React DevTools
Input.displayName = "Input"

// Export the Input component
export { Input }
