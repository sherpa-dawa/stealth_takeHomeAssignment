/**
 * Audit Planning Feature - Public API
 * This is the only file external code should import from
 */

// Components (re-export from index in components folder)
export { default as AuditAreaCard } from "./components/AuditAreaCard";
export { default as AuditAreaGrid } from "./components/AuditAreaGrid";
export { default as FilterBar } from "./components/FilterBar";
export { default as Sidebar } from "./components/Sidebar";
export { default as OverviewBar } from "./components/OverviewBar";
export { default as WorkspaceHeader } from "./components/WorkspaceHeader";

// Hooks
export { useAuditWorkspace } from "./hooks/useAuditWorkspace";

// Services
export { auditService } from "./services/auditService";

// Types
export type {
  AuditArea,
  AuditOverview,
  ActivityItem,
  Auditor,
  Task,
  Evidence,
} from "@/features/audit-planning/types";
export type { RiskLevel, AreaStatus, TaskStatus } from "./constants";

// Constants
export {
  RISK_LEVELS,
  AREA_STATUSES,
  AREA_STATUSES as STATUSES,
  DEFAULT_FILTERS,
  CLIENTS,
} from "./constants";
