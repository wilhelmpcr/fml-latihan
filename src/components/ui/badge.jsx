import * as React from "react";
import { cn } from "@/lib/utils";

// Simple badge component – variant prop controls background color
export const Badge = React.forwardRef(
  ({ className, variant = "secondary", children, ...props }, ref) => {
    const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors";
    const variants = {
      secondary: "bg-secondary text-secondary-foreground",
      primary: "bg-primary text-primary-foreground",
      destructive: "bg-destructive/10 text-destructive",
    };
    const variantClass = variants[variant] || variants["secondary"];
    return (
      <span
        ref={ref}
        className={cn(base, variantClass, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
