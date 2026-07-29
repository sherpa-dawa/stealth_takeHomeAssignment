/**
 * Query key factory for TanStack Query
 * Centralizes all query key definitions for consistency and refetch management
 */

export const auditQueryKeys = {
  all: ["audit"] as const,
  audits: () => [...auditQueryKeys.all, "audits"] as const,
  auditsByClient: (client: string) =>
    [...auditQueryKeys.audits(), client] as const,
  overview: () => [...auditQueryKeys.all, "overview"] as const,
  overviewByClient: (client: string) =>
    [...auditQueryKeys.overview(), client] as const,
  progress: () => [...auditQueryKeys.all, "progress"] as const,
  highRiskAreas: () => [...auditQueryKeys.all, "high-risk"] as const,
  highRiskAreasByClient: (client: string) =>
    [...auditQueryKeys.highRiskAreas(), client] as const,
  deadlines: () => [...auditQueryKeys.all, "deadlines"] as const,
  activity: () => [...auditQueryKeys.all, "activity"] as const,
} as const;
