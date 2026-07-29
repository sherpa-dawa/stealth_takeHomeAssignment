/**
 * Audit Planning Feature Constants
 * Single source of truth for enums, defaults, and magic strings
 */

// Risk levels
export const RISK_LEVELS = ["Low", "Medium", "High"] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

// Area statuses
export const AREA_STATUSES = [
  "Planning",
  "In Progress",
  "Review",
  "Complete",
] as const;
export type AreaStatus = (typeof AREA_STATUSES)[number];

// Task/Evidence statuses
export const TASK_STATUSES = ["Open", "In Progress", "Completed"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

// Filter defaults
export const DEFAULT_FILTERS = {
  risk: "All" as const,
  status: "All" as const,
  search: "",
} as const;

export type FilterState = typeof DEFAULT_FILTERS;

// URL query param keys
export const QUERY_PARAMS = {
  SEARCH: "search",
  RISK: "risk",
  STATUS: "status",
  CLIENT: "client",
} as const;

// Mock data configuration
export const MOCK_CONFIG = {
  FETCH_LATENCY_MS: 800,
  FETCH_ERROR_RATE: 0, // 0-1, probability of simulated error
} as const;

// Client names (for multi-tenancy demo)
export const CLIENTS = [
  "ABC Manufacturing Ltd.",
  "Tech Innovations Inc",
  "Global Finance Ltd",
  "Retail Solutions Co",
  "Manufacturing Plus",
] as const;

// Derived types
export type Client = (typeof CLIENTS)[number];
