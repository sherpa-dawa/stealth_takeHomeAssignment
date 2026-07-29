import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500 shadow-sm hover:shadow-md",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:ring-neutral-500",
        outline:
          "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-500",
        ghost:
          "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-500",
        danger:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-sm hover:shadow-md",
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-emerald-500 shadow-sm hover:shadow-md",
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
