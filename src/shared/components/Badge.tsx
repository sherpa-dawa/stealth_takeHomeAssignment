import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";
import { badgeColorMap } from "@/theme/colorMap";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold border transition-colors duration-200",
  {
    variants: {
      size: {
        xs: "px-1.5 py-0.5 text-xs rounded",
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
  variant?: keyof typeof badgeColorMap;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "neutral", size, style, ...props }, ref) => {
    const colors = badgeColorMap[variant] || badgeColorMap["neutral"]!;

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ size }), className)}
        style={{
          backgroundColor: colors.backgroundColor,
          color: colors.textColor,
          borderColor: colors.borderColor,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
