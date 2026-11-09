import * as React from "react";

import { Avatar as AvatarPrimitive, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "cn";

type AvatarProps = Omit<React.ComponentProps<typeof AvatarPrimitive>, "size"> & {
  image?: string;
  name?: string;
  fallback?: React.ReactNode;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

function getInitials(name?: string) {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (words.length === 0) {
    return "?";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function Avatar({ image, name, fallback, alt, size = "md", className, ...props }: AvatarProps) {
  const primitiveSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "default";
  const fallbackContent = fallback !== undefined ? fallback : getInitials(name);

  return (
    <AvatarPrimitive
      {...props}
      size={primitiveSize}
      className={cn(size === "xl" && "size-12", className)}
    >
      {image ? <AvatarImage src={image} alt={alt ?? name ?? ""} /> : null}
      <AvatarFallback className="bg-primary text-primary-foreground">
        {fallbackContent}
      </AvatarFallback>
    </AvatarPrimitive>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge };
export type { AvatarProps };
export default Avatar;
