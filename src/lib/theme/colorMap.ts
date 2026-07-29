/**
 * Color Map - Hex values for all badge and status colors
 * Using hex values instead of Tailwind classes to avoid purging issues
 */

export const colorMap = {
  primary: {
    light: "#f0f4ff",
    base: "#5b6dff",
    dark: "#3d32d4",
  },
  secondary: {
    light: "#f8f4ff",
    base: "#9560ff",
    dark: "#7d37e8",
  },
  accent: {
    light: "#f0fdfb",
    base: "#14b8a6",
    dark: "#0f766e",
  },
  success: {
    light: "#f0fdf4",
    base: "#10b981",
    dark: "#047857",
  },
  warning: {
    light: "#fef3c7",
    base: "#f59e0b",
    dark: "#d97706",
  },
  danger: {
    light: "#fee2e2",
    base: "#ef4444",
    dark: "#dc2626",
  },
  neutral: {
    light: "#f5f5f4",
    base: "#78716b",
    dark: "#44403c",
  },
} as const;

export type ColorVariant = keyof typeof colorMap;

export interface BadgeColorProps {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export const badgeColorMap: Record<string, BadgeColorProps> = {
  primary: {
    backgroundColor: colorMap.primary.light,
    textColor: colorMap.primary.dark,
    borderColor: colorMap.primary.base,
  },
  secondary: {
    backgroundColor: colorMap.secondary.light,
    textColor: colorMap.secondary.dark,
    borderColor: colorMap.secondary.base,
  },
  accent: {
    backgroundColor: colorMap.accent.light,
    textColor: colorMap.accent.dark,
    borderColor: colorMap.accent.base,
  },
  success: {
    backgroundColor: colorMap.success.light,
    textColor: colorMap.success.dark,
    borderColor: colorMap.success.base,
  },
  warning: {
    backgroundColor: colorMap.warning.light,
    textColor: colorMap.warning.dark,
    borderColor: colorMap.warning.base,
  },
  danger: {
    backgroundColor: colorMap.danger.light,
    textColor: colorMap.danger.dark,
    borderColor: colorMap.danger.base,
  },
  neutral: {
    backgroundColor: colorMap.neutral.light,
    textColor: colorMap.neutral.dark,
    borderColor: colorMap.neutral.base,
  },
  outline: {
    backgroundColor: "#ffffff",
    textColor: colorMap.neutral.dark,
    borderColor: colorMap.neutral.light,
  },
};

// Risk-specific colors (solid backgrounds with white text)
export const riskBadgeColorMap: Record<string, BadgeColorProps> = {
  High: {
    backgroundColor: "#dc2626", // Lighter red
    textColor: "#ffffff", // White text
    borderColor: "#991b1b",
  },
  Medium: {
    backgroundColor: "#a855f7", // Lighter purple
    textColor: "#ffffff", // White text
    borderColor: "#6d28d9",
  },
  Low: {
    backgroundColor: "#f3e8ff", // Light purple
    textColor: "#6b21a8", // Dark purple text
    borderColor: "#e9d5ff",
  },
};
