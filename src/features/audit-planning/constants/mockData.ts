import {
  AuditOverview,
  AuditArea,
  ProgressBreakdown,
  Deadline,
  ActivityItem,
} from "@/features/audit-planning/types";

export const clients = [
  "ABC Manufacturing Ltd.",
  "Tech Innovations Inc",
  "Global Finance Ltd",
  "Retail Solutions Co",
  "Manufacturing Plus",
];

// ============================================
// ABC Manufacturing Ltd. - Data
// ============================================
const abcOverview: AuditOverview = {
  clientName: "ABC Manufacturing Ltd.",
  financialYear: "2025",
  engagementStatus: "Planning",
  engagementPartner: "Michael Scott",
  auditManager: "Sarah Johnson",
  overallProgress: 42,
  startDate: "2026-07-01",
  dueDate: "2026-08-15",
};

const abcAuditAreas: AuditArea[] = [
  {
    id: "revenue",
    name: "Revenue",
    risk: "High",
    progress: 65,
    assignedAuditor: { id: "u1", name: "Sarah Johnson", avatar: "SJ" },
    tasks: [
      { id: "t1", title: "Analyze revenue transactions", status: "Open" },
      { id: "t2", title: "Review sales agreements", status: "Open" },
      { id: "t3", title: "Test revenue cutoff", status: "In Progress" },
      { id: "t4", title: "Verify customer credits", status: "Open" },
      { id: "t5", title: "Check revenue recognition", status: "Open" },
      { id: "t6", title: "Review accruals", status: "In Progress" },
      { id: "t7", title: "Test invoice accuracy", status: "Open" },
      { id: "t8", title: "Verify pricing policies", status: "Open" },
    ],
    evidence: [
      { id: "e1", title: "Revenue GL details", status: "Open" },
      { id: "e2", title: "Sales journal entries", status: "Open" },
      { id: "e3", title: "Customer contracts", status: "In Progress" },
      { id: "e4", title: "Credit memos", status: "Open" },
      { id: "e5", title: "Revenue policies", status: "Open" },
      { id: "e6", title: "Cutoff tests", status: "Open" },
      { id: "e7", title: "Pricing schedules", status: "In Progress" },
      { id: "e8", title: "Accrual analysis", status: "Open" },
    ],
    status: "In Progress",
    client: "ABC Manufacturing Ltd.",
  },
  {
    id: "cash",
    name: "Cash & Bank",
    risk: "Medium",
    progress: 35,
    assignedAuditor: { id: "u2", name: "John Smith", avatar: "JS" },
    tasks: [
      { id: "t1", title: "Reconcile bank accounts", status: "Open" },
      { id: "t2", title: "Test cash controls", status: "Open" },
      { id: "t3", title: "Review bank confirmations", status: "Open" },
    ],
    evidence: [
      { id: "e1", title: "Bank statements", status: "Open" },
      { id: "e2", title: "Reconciliations", status: "Open" },
      { id: "e3", title: "Bank confirmations", status: "Open" },
    ],
    status: "Planning",
    client: "ABC Manufacturing Ltd.",
  },
  {
    id: "inventory",
    name: "Inventory",
    risk: "High",
    progress: 20,
    assignedAuditor: { id: "u3", name: "Emily Davis", avatar: "ED" },
    tasks: [
      { id: "t1", title: "Plan physical inventory", status: "Open" },
      { id: "t2", title: "Test inventory valuation", status: "Open" },
      { id: "t3", title: "Review purchase orders", status: "Open" },
      { id: "t4", title: "Test inventory cutoff", status: "Open" },
      { id: "t5", title: "Review obsolescence", status: "Open" },
      { id: "t6", title: "Test perpetual records", status: "Open" },
    ],
    evidence: [
      { id: "e1", title: "Inventory listing", status: "Open" },
      { id: "e2", title: "Physical count sheets", status: "Open" },
      { id: "e3", title: "Inventory policies", status: "Open" },
    ],
    status: "Planning",
    client: "ABC Manufacturing Ltd.",
  },
  {
    id: "payroll",
    name: "Payroll",
    risk: "Low",
    progress: 90,
    assignedAuditor: { id: "u4", name: "David Wilson", avatar: "DW" },
    tasks: [
      { id: "t1", title: "Test payroll processing", status: "Completed" },
      { id: "t2", title: "Review tax withholdings", status: "Completed" },
    ],
    evidence: [
      { id: "e1", title: "Payroll registers", status: "Completed" },
      { id: "e2", title: "Tax filings", status: "Completed" },
    ],
    status: "Review",
    client: "ABC Manufacturing Ltd.",
  },
];

// ============================================
// Tech Innovations Inc - Data
// ============================================
const techOverview: AuditOverview = {
  clientName: "Tech Innovations Inc",
  financialYear: "2025",
  engagementStatus: "In Progress",
  engagementPartner: "Jennifer Taylor",
  auditManager: "Robert Chen",
  overallProgress: 58,
  startDate: "2026-06-15",
  dueDate: "2026-09-30",
};

const techAuditAreas: AuditArea[] = [
  {
    id: "revenue",
    name: "Revenue",
    risk: "High",
    progress: 80,
    assignedAuditor: { id: "u5", name: "Rachel Moore", avatar: "RM" },
    tasks: [
      { id: "t1", title: "Analyze SaaS revenue", status: "Completed" },
      { id: "t2", title: "Review license agreements", status: "In Progress" },
    ],
    evidence: [
      { id: "e1", title: "Revenue GL details", status: "Completed" },
      { id: "e2", title: "License agreements", status: "In Progress" },
    ],
    status: "Review",
    client: "Tech Innovations Inc",
  },
  {
    id: "it-systems",
    name: "IT Systems & Security",
    risk: "High",
    progress: 45,
    assignedAuditor: { id: "u6", name: "Kevin Brown", avatar: "KB" },
    tasks: [
      { id: "t1", title: "Test access controls", status: "Open" },
      { id: "t2", title: "Review security patches", status: "In Progress" },
      { id: "t3", title: "Assess data backups", status: "Open" },
    ],
    evidence: [
      { id: "e1", title: "Access logs", status: "Open" },
      { id: "e2", title: "Security policies", status: "In Progress" },
    ],
    status: "In Progress",
    client: "Tech Innovations Inc",
  },
  {
    id: "capitalized-software",
    name: "Capitalized Software",
    risk: "Medium",
    progress: 70,
    assignedAuditor: { id: "u7", name: "Lisa Wong", avatar: "LW" },
    tasks: [
      { id: "t1", title: "Review capitalization", status: "Completed" },
      { id: "t2", title: "Test amortization", status: "Completed" },
    ],
    evidence: [
      { id: "e1", title: "Dev costs register", status: "Completed" },
      { id: "e2", title: "Amortization schedule", status: "Completed" },
    ],
    status: "Review",
    client: "Tech Innovations Inc",
  },
];

// ============================================
// Global Finance Ltd - Data
// ============================================
const globalOverview: AuditOverview = {
  clientName: "Global Finance Ltd",
  financialYear: "2025",
  engagementStatus: "In Progress",
  engagementPartner: "Andrew Martinez",
  auditManager: "Victoria Lee",
  overallProgress: 72,
  startDate: "2026-05-01",
  dueDate: "2026-08-30",
};

const globalAuditAreas: AuditArea[] = [
  {
    id: "revenue",
    name: "Revenue",
    risk: "Medium",
    progress: 95,
    assignedAuditor: { id: "u8", name: "Marcus Thompson", avatar: "MT" },
    tasks: [{ id: "t1", title: "Final revenue testing", status: "Completed" }],
    evidence: [{ id: "e1", title: "Revenue analysis", status: "Completed" }],
    status: "Complete",
    client: "Global Finance Ltd",
  },
  {
    id: "investments",
    name: "Investments",
    risk: "High",
    progress: 55,
    assignedAuditor: { id: "u9", name: "Patricia Garcia", avatar: "PG" },
    tasks: [
      { id: "t1", title: "Verify investments", status: "In Progress" },
      { id: "t2", title: "Test fair value", status: "Open" },
      { id: "t3", title: "Check impairment", status: "Open" },
    ],
    evidence: [
      { id: "e1", title: "Investment statements", status: "In Progress" },
      { id: "e2", title: "Fair value tests", status: "Open" },
    ],
    status: "In Progress",
    client: "Global Finance Ltd",
  },
  {
    id: "loans",
    name: "Loans & Borrowings",
    risk: "Medium",
    progress: 85,
    assignedAuditor: { id: "u10", name: "Christopher Lee", avatar: "CL" },
    tasks: [
      { id: "t1", title: "Reconcile loan balances", status: "Completed" },
      { id: "t2", title: "Test interest expense", status: "In Progress" },
    ],
    evidence: [
      { id: "e1", title: "Loan agreements", status: "Completed" },
      { id: "e2", title: "Interest calculation", status: "In Progress" },
    ],
    status: "Review",
    client: "Global Finance Ltd",
  },
  {
    id: "deposits",
    name: "Deposits",
    risk: "Low",
    progress: 100,
    assignedAuditor: { id: "u11", name: "Susan Martinez", avatar: "SM" },
    tasks: [],
    evidence: [],
    status: "Complete",
    client: "Global Finance Ltd",
  },
];

// ============================================
// Retail Solutions Co - Data
// ============================================
const retailOverview: AuditOverview = {
  clientName: "Retail Solutions Co",
  financialYear: "2025",
  engagementStatus: "Planning",
  engagementPartner: "Thomas Anderson",
  auditManager: "Nicole Johnson",
  overallProgress: 25,
  startDate: "2026-07-15",
  dueDate: "2026-10-15",
};

const retailAuditAreas: AuditArea[] = [
  {
    id: "revenue",
    name: "Revenue",
    risk: "High",
    progress: 10,
    assignedAuditor: { id: "u12", name: "Brandon White", avatar: "BW" },
    tasks: [
      { id: "t1", title: "Plan revenue testing", status: "Open" },
      { id: "t2", title: "Design test procedures", status: "Open" },
    ],
    evidence: [{ id: "e1", title: "POS system documentation", status: "Open" }],
    status: "Planning",
    client: "Retail Solutions Co",
  },
  {
    id: "inventory",
    name: "Inventory",
    risk: "High",
    progress: 15,
    assignedAuditor: { id: "u13", name: "Megan Rodriguez", avatar: "MR" },
    tasks: [
      { id: "t1", title: "Prepare for count", status: "Open" },
      { id: "t2", title: "Design count procedures", status: "Open" },
    ],
    evidence: [{ id: "e1", title: "Store location list", status: "Open" }],
    status: "Planning",
    client: "Retail Solutions Co",
  },
  {
    id: "vendor-payables",
    name: "Vendor Payables",
    risk: "Medium",
    progress: 40,
    assignedAuditor: { id: "u14", name: "Daniel Harris", avatar: "DH" },
    tasks: [
      { id: "t1", title: "Reconcile vendor statements", status: "In Progress" },
      { id: "t2", title: "Test vendor payments", status: "Open" },
    ],
    evidence: [{ id: "e1", title: "Vendor statements", status: "In Progress" }],
    status: "In Progress",
    client: "Retail Solutions Co",
  },
];

// ============================================
// Manufacturing Plus - Data
// ============================================
const mfgOverview: AuditOverview = {
  clientName: "Manufacturing Plus",
  financialYear: "2025",
  engagementStatus: "Active",
  engagementPartner: "Elizabeth Clark",
  auditManager: "George Williams",
  overallProgress: 35,
  startDate: "2026-06-01",
  dueDate: "2026-09-15",
};

const mfgAuditAreas: AuditArea[] = [
  {
    id: "revenue",
    name: "Revenue",
    risk: "High",
    progress: 50,
    assignedAuditor: { id: "u15", name: "Walter Lewis", avatar: "WL" },
    tasks: [
      { id: "t1", title: "Test revenue transactions", status: "In Progress" },
      { id: "t2", title: "Review contracts", status: "In Progress" },
    ],
    evidence: [{ id: "e1", title: "Contract samples", status: "In Progress" }],
    status: "In Progress",
    client: "Manufacturing Plus",
  },
  {
    id: "inventory",
    name: "Inventory",
    risk: "High",
    progress: 25,
    assignedAuditor: { id: "u16", name: "Nancy Walker", avatar: "NW" },
    tasks: [
      { id: "t1", title: "Plan count procedures", status: "Open" },
      { id: "t2", title: "Review valuation", status: "Open" },
    ],
    evidence: [{ id: "e1", title: "Inventory policies", status: "Open" }],
    status: "Planning",
    client: "Manufacturing Plus",
  },
  {
    id: "accounts-payable",
    name: "Accounts Payable",
    risk: "Low",
    progress: 60,
    assignedAuditor: { id: "u17", name: "Paul Hall", avatar: "PH" },
    tasks: [
      { id: "t1", title: "Test cutoff", status: "In Progress" },
      { id: "t2", title: "Reconcile subledger", status: "In Progress" },
    ],
    evidence: [
      { id: "e1", title: "Vendor reconciliations", status: "In Progress" },
    ],
    status: "In Progress",
    client: "Manufacturing Plus",
  },
];

// ============================================
// Mapping Client Data
// ============================================
const clientData: Record<
  string,
  { overview: AuditOverview; areas: AuditArea[] }
> = {
  "ABC Manufacturing Ltd.": { overview: abcOverview, areas: abcAuditAreas },
  "Tech Innovations Inc": { overview: techOverview, areas: techAuditAreas },
  "Global Finance Ltd": { overview: globalOverview, areas: globalAuditAreas },
  "Retail Solutions Co": { overview: retailOverview, areas: retailAuditAreas },
  "Manufacturing Plus": { overview: mfgOverview, areas: mfgAuditAreas },
};

// ============================================
// Default Data (ABC Manufacturing Ltd.)
// ============================================
export const auditOverview = abcOverview;
export const auditAreas = abcAuditAreas;

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
    title: "Revenue Planning",
    date: "2026-07-29",
    daysRemaining: 2,
  },
  {
    id: 2,
    title: "Inventory Review",
    date: "2026-07-31",
    daysRemaining: 4,
  },
  {
    id: 3,
    title: "Cash Confirmation",
    date: "2026-08-02",
    daysRemaining: 6,
  },
];

export const activityItems: ActivityItem[] = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "assigned Revenue audit area",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: "John Smith",
    action: "completed Payroll planning",
    time: "1 hour ago",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "updated Inventory risk assessment",
    time: "Yesterday",
  },
];

// ============================================
// Helper to get data by client
// ============================================
export function getClientData(clientName: string): {
  overview: AuditOverview;
  areas: AuditArea[];
  auditAreas: AuditArea[];
  highRiskAreas: AuditArea[];
  activityItems?: ActivityItem[];
} {
  const data = clientData[clientName] || clientData["ABC Manufacturing Ltd."]!;
  return {
    ...data,
    auditAreas: data.areas,
    highRiskAreas: data.areas.filter((a) => a.risk === "High"),
    activityItems: undefined,
  };
}
