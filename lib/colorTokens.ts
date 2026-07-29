/**
 * Color Token System
 * Single source of truth for all colors used in the application.
 * Supports both Tailwind class generation and semantic color mapping.
 */

export const colorTokens = {
  // Semantic Colors
  semantic: {
    success: {
      light: "emerald-50",
      base: "emerald-500",
      dark: "emerald-700",
    },
    warning: {
      light: "amber-50",
      base: "amber-500",
      dark: "amber-700",
    },
    danger: {
      light: "red-50",
      base: "red-500",
      dark: "red-700",
    },
    info: {
      light: "blue-50",
      base: "blue-500",
      dark: "blue-700",
    },
    neutral: {
      lighter: "neutral-50",
      light: "neutral-100",
      medium: "neutral-200",
      base: "neutral-500",
      dark: "neutral-600",
      darker: "neutral-700",
      darkest: "neutral-900",
    },
  },

  // Primary Brand Colors
  primary: {
    light: "primary-50",
    base: "primary-500",
    dark: "primary-700",
  },

  // Secondary Brand Colors
  secondary: {
    light: "secondary-50",
    base: "secondary-500",
    dark: "secondary-700",
  },

  // Accent Colors
  accent: {
    light: "accent-50",
    base: "accent-500",
    dark: "accent-700",
  },
} as const;

/**
 * Risk Level Color Mapping
 * Maps domain risk levels to visual colors
 */
export const riskColorMap = {
  Low: {
    bg: colorTokens.semantic.success.light,
    text: colorTokens.semantic.success.dark,
    border: colorTokens.semantic.success.base,
  },
  Medium: {
    bg: colorTokens.semantic.warning.light,
    text: colorTokens.semantic.warning.dark,
    border: colorTokens.semantic.warning.base,
  },
  High: {
    bg: colorTokens.semantic.danger.light,
    text: colorTokens.semantic.danger.dark,
    border: colorTokens.semantic.danger.base,
  },
} as const;

/**
 * Area Status Color Mapping
 * Maps domain area statuses to visual colors
 */
export const statusColorMap = {
  Planning: {
    bg: colorTokens.secondary.light,
    text: colorTokens.secondary.dark,
    border: colorTokens.secondary.base,
  },
  "In Progress": {
    bg: colorTokens.primary.light,
    text: colorTokens.primary.dark,
    border: colorTokens.primary.base,
  },
  Review: {
    bg: colorTokens.semantic.warning.light,
    text: colorTokens.semantic.warning.dark,
    border: colorTokens.semantic.warning.base,
  },
  Complete: {
    bg: colorTokens.semantic.success.light,
    text: colorTokens.semantic.success.dark,
    border: colorTokens.semantic.success.base,
  },
} as const;

/**
 * Component Color Presets
 * Predefined color combinations for common component variants
 */
export const componentColors = {
  badge: {
    primary: {
      bg: colorTokens.primary.light,
      text: colorTokens.primary.dark,
    },
    secondary: {
      bg: colorTokens.secondary.light,
      text: colorTokens.secondary.dark,
    },
    accent: {
      bg: colorTokens.accent.light,
      text: colorTokens.accent.dark,
    },
    success: {
      bg: colorTokens.semantic.success.light,
      text: colorTokens.semantic.success.dark,
    },
    warning: {
      bg: colorTokens.semantic.warning.light,
      text: colorTokens.semantic.warning.dark,
    },
    danger: {
      bg: colorTokens.semantic.danger.light,
      text: colorTokens.semantic.danger.dark,
    },
    neutral: {
      bg: colorTokens.semantic.neutral.lighter,
      text: colorTokens.semantic.neutral.darker,
    },
    outline: {
      bg: "white",
      text: colorTokens.semantic.neutral.darker,
      border: colorTokens.semantic.neutral.light,
    },
  },

  button: {
    primary: {
      text: colorTokens.primary.dark,
      hover: colorTokens.primary.light,
    },
    success: {
      text: colorTokens.semantic.success.dark,
      hover: colorTokens.semantic.success.light,
    },
    danger: {
      text: colorTokens.semantic.danger.dark,
      hover: colorTokens.semantic.danger.light,
    },
    neutral: {
      text: colorTokens.semantic.neutral.dark,
      hover: colorTokens.semantic.neutral.light,
    },
  },

  border: {
    light: colorTokens.semantic.neutral.light,
    default: colorTokens.semantic.neutral.medium,
    dark: colorTokens.semantic.neutral.dark,
  },

  text: {
    primary: colorTokens.semantic.neutral.darkest,
    secondary: colorTokens.semantic.neutral.dark,
    tertiary: colorTokens.semantic.neutral.base,
    muted: colorTokens.semantic.neutral.medium,
  },

  background: {
    default: "white",
    secondary: colorTokens.semantic.neutral.lighter,
    tertiary: colorTokens.semantic.neutral.light,
  },

  progress: {
    bar: "blue-500",
    background: "neutral-300",
  },

  highlight: {
    border: colorTokens.semantic.danger.base,
    shadow: colorTokens.semantic.danger.base,
  },
} as const;

/**
 * Helper to generate Tailwind classes from color tokens
 * Usage: getColorClasses('bg', colorTokens.primary.light)
 * Returns: 'bg-primary-50'
 */
export function getColorClass(property: string, token: string): string {
  return `${property}-${token}`;
}

/**
 * Helper to get risk color tokens by risk level
 * Usage: getRiskColors('High')
 * Returns: { bg: 'red-50', text: 'red-700', border: 'red-500' }
 */
export function getRiskColors(riskLevel: keyof typeof riskColorMap) {
  return riskColorMap[riskLevel];
}

/**
 * Helper to get status color tokens by status
 * Usage: getStatusColors('In Progress')
 * Returns: { bg: 'primary-50', text: 'primary-700', border: 'primary-500' }
 */
export function getStatusColors(status: keyof typeof statusColorMap) {
  return statusColorMap[status];
}
