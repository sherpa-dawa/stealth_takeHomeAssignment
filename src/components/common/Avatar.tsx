import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAvatarColors, getInitials } from "@/lib/theme/avatarColors";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  name?: string; // Name to generate colors from
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

const sizePixels = {
  sm: 32,
  md: 40,
  lg: 48,
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      initials,
      src,
      alt = "Avatar",
      size = "md",
      name,
      style,
      ...props
    },
    ref
  ) => {
    // Generate colors from name if provided
    const colors = name ? getAvatarColors(name) : undefined;

    // Generate initials from name if not provided
    const displayInitials = initials || (name ? getInitials(name) : undefined);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-full font-semibold",
          sizeClasses[size],
          className
        )}
        style={{
          backgroundColor: colors?.backgroundColor,
          color: colors?.textColor,
          ...style,
        }}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={sizePixels[size]}
            height={sizePixels[size]}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          displayInitials
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
