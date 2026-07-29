import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { componentColors, getColorClass } from "@/lib/colorTokens";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "px-2 py-0.5 text-xs rounded",
        md: "px-2.5 py-1 text-xs rounded-md",
        lg: "px-3 py-1.5 text-sm rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof badgeVariants>, "variant"> {
  variant?: keyof typeof componentColors.badge;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "neutral", size, ...props }, ref) => {
    const colors = componentColors.badge[variant];
    const colorClasses = cn(
      getColorClass("bg", colors.bg),
      getColorClass("text", colors.text),
      variant === "outline" &&
        getColorClass("border", componentColors.badge.outline.border)
    );

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ size }), colorClasses, className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
