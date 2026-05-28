import * as React from "react"
import { cn } from "@/lib/utils"

// Card container
export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-[#1A1A1A] border border-white/5 rounded-[32px] p-6 shadow-xl hover:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </div>
))

// Card sub‑components
export const CardHeader = ({ className = "", ...props }) => (
  <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
)

export const CardTitle = ({ className = "", ...props }) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)

export const CardDescription = ({ className = "", ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export const CardContent = ({ className = "", ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

export const CardFooter = ({ className = "", ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
)
