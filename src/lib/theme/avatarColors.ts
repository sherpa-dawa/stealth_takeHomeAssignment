/**
 * Avatar Color System
 * Generates consistent, deterministic colors for avatars based on name/initials
 * Uses color tokens for consistency with the design system
 */

import { colorMap } from "./colorMap";

export interface AvatarColorPair {
  backgroundColor: string;
  textColor: string;
}

// Color palette for avatars - pairs of (background, text) colors
const avatarColors: AvatarColorPair[] = [
  {
    backgroundColor: colorMap.primary.light,
    textColor: colorMap.primary.dark,
  },
  {
    backgroundColor: colorMap.secondary.light,
    textColor: colorMap.secondary.dark,
  },
  {
    backgroundColor: colorMap.accent.light,
    textColor: colorMap.accent.dark,
  },
  {
    backgroundColor: "#fecaca", // light red
    textColor: "#991b1b", // dark red
  },
  {
    backgroundColor: "#fbbf24", // light amber
    textColor: "#78350f", // dark amber
  },
  {
    backgroundColor: "#86efac", // light green
    textColor: "#15803d", // dark green
  },
  {
    backgroundColor: "#bfdbfe", // light blue
    textColor: "#1e40af", // dark blue
  },
  {
    backgroundColor: "#c4b5fd", // light purple
    textColor: "#5b21b6", // dark purple
  },
];

/**
 * Generate a hash from a string
 * Used to deterministically select colors based on name
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get avatar colors based on name/initials
 * Same name always gets same colors
 *
 * @param name - The person's name or initials
 * @returns Object with backgroundColor and textColor
 *
 * @example
 * const colors = getAvatarColors("Sarah Johnson");
 * // Returns: { backgroundColor: "#f0f4ff", textColor: "#3d32d4" }
 */
export function getAvatarColors(name: string): AvatarColorPair {
  const hash = hashCode(name);
  const colorIndex = hash % avatarColors.length;
  return avatarColors[colorIndex]!;
}

/**
 * Get initials from a name
 *
 * @param name - The person's full name
 * @returns Two-letter initials (uppercase)
 *
 * @example
 * getInitials("Sarah Johnson") // → "SJ"
 * getInitials("Emma") // → "EM" (doubled last letter)
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length >= 2) {
    const first = parts[0]?.[0] || "?";
    const last = parts[parts.length - 1]?.[0] || "?";
    return (first + last).toUpperCase();
  }

  if (parts.length === 1) {
    const single = parts[0] || "";
    return single
      .slice(0, 2)
      .toUpperCase()
      .padEnd(2, single[0] || "?");
  }

  return "??";
}
