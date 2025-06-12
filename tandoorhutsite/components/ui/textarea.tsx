// Import everything from React (e.g., forwardRef)
import * as React from "react"

// Import the utility for conditionally merging class names
import { cn } from "@/lib/utils"

// Define the Textarea component using React.forwardRef to allow ref forwarding
const Textarea = React.forwardRef<
  HTMLTextAreaElement, // Ref type for a <textarea> element
  React.ComponentProps<"textarea"> // Use standard textarea props
>(
  // Destructure className and other props, forward ref to the <textarea> element
  ({ className, ...props }, ref) => {
    return (
      <textarea
        // Apply base Tailwind styles and merge with any additional className
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref} // Forward the ref
        {...props} // Spread the rest of the props onto the textarea element
      />
    )
  }
)

// Set a display name for debugging and DevTools clarity
Textarea.displayName = "Textarea"

// Export the Textarea component
export { Textarea }
