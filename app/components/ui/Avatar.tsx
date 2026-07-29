import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
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
    { className, initials, src, alt = "Avatar", size = "md", ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-full font-semibold bg-gradient-to-br from-primary-400 to-secondary-500 text-white",
        sizeClasses[size],
        className
      )}
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
        initials
      )}
    </div>
  )
);

Avatar.displayName = "Avatar";

export { Avatar };
