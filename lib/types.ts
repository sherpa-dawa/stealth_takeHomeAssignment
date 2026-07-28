export type RiskLevel = "Low" | "Medium" | "High";
export type AreaStatus = "Planning" | "In Progress" | "Review" | "Complete";

export interface Auditor {
  id: string;
  name: string;
  avatar?: string;
}

export interface AuditArea {
  id: string;
  name: string;
  risk: RiskLevel;
  progress: number; // 0-100
  assignedAuditor: Auditor | null;
  openTasks: number;
  evidenceRequested: number;
  status: AreaStatus;
}

export interface AuditOverview {
  clientName: string;
  financialYear: string;
  engagementStatus: string;
  engagementPartner: string;
  auditManager: string;
  overallProgress: number;
  startDate: string;
  dueDate: string;
}

export interface ProgressBreakdown {
  planning: number;
  evidence: number;
  review: number;
}

export interface Deadline {
  id: number;
  title: string;
  date: string;
  daysRemaining: number;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
}
