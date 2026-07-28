import {
  AuditOverview,
  AuditArea,
  ProgressBreakdown,
  Deadline,
  ActivityItem,
} from "./types";

export const auditOverview: AuditOverview = {
  clientName: "Acme Corporation",
  financialYear: "2024",
  engagementStatus: "Active",
  engagementPartner: "Sarah Johnson",
  auditManager: "Michael Chen",
  overallProgress: 58,
  startDate: "2024-01-15",
  dueDate: "2024-12-31",
};

export const auditAreas: AuditArea[] = [
  {
    id: "revenue",
    name: "Revenue",
    risk: "High",
    progress: 45,
    assignedAuditor: { id: "a1", name: "Emma Wilson", avatar: "EW" },
    openTasks: 8,
    evidenceRequested: 12,
    status: "In Progress",
  },
  {
    id: "cash-bank",
    name: "Cash & Bank",
    risk: "High",
    progress: 72,
    assignedAuditor: { id: "a2", name: "David Martinez", avatar: "DM" },
    openTasks: 3,
    evidenceRequested: 5,
    status: "Review",
  },
  {
    id: "payroll",
    name: "Payroll",
    risk: "Medium",
    progress: 85,
    assignedAuditor: { id: "a3", name: "Lisa Anderson", avatar: "LA" },
    openTasks: 2,
    evidenceRequested: 2,
    status: "Review",
  },
  {
    id: "inventory",
    name: "Inventory",
    risk: "High",
    progress: 30,
    assignedAuditor: { id: "a1", name: "Emma Wilson", avatar: "EW" },
    openTasks: 15,
    evidenceRequested: 18,
    status: "Planning",
  },
  {
    id: "fixed-assets",
    name: "Fixed Assets",
    risk: "Medium",
    progress: 62,
    assignedAuditor: { id: "a4", name: "James Rodriguez", avatar: "JR" },
    openTasks: 5,
    evidenceRequested: 8,
    status: "In Progress",
  },
  {
    id: "accounts-receivable",
    name: "Accounts Receivable",
    risk: "Medium",
    progress: 78,
    assignedAuditor: { id: "a2", name: "David Martinez", avatar: "DM" },
    openTasks: 2,
    evidenceRequested: 3,
    status: "Review",
  },
  {
    id: "accounts-payable",
    name: "Accounts Payable",
    risk: "Low",
    progress: 100,
    assignedAuditor: { id: "a3", name: "Lisa Anderson", avatar: "LA" },
    openTasks: 0,
    evidenceRequested: 0,
    status: "Complete",
  },
  {
    id: "expenses",
    name: "Expenses",
    risk: "Low",
    progress: 55,
    assignedAuditor: { id: "a5", name: "Jennifer Taylor", avatar: "JT" },
    openTasks: 6,
    evidenceRequested: 7,
    status: "In Progress",
  },
];

export const progressBreakdown: ProgressBreakdown = {
  planning: 15,
  evidence: 58,
  review: 27,
};

export const highRiskAreas: AuditArea[] = auditAreas.filter(
  (area) => area.risk === "High"
);

export const deadlines: Deadline[] = [
  {
    id: 1,
    title: "Revenue Testing Complete",
    date: "2024-08-30",
    daysRemaining: 33,
  },
  {
    id: 2,
    title: "Inventory Count & Reconciliation",
    date: "2024-09-15",
    daysRemaining: 50,
  },
  {
    id: 3,
    title: "Final Audit Report Due",
    date: "2024-12-31",
    daysRemaining: 157,
  },
];

export const activityItems: ActivityItem[] = [
  {
    id: 1,
    user: "Emma Wilson",
    action: "Requested additional supporting documents for Revenue area",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "David Martinez",
    action: "Completed Cash & Bank reconciliation testing",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: "Lisa Anderson",
    action: "Marked Payroll area as ready for final review",
    time: "1 day ago",
  },
  {
    id: 4,
    user: "Michael Chen",
    action: "Updated engagement timeline and milestones",
    time: "2 days ago",
  },
];
