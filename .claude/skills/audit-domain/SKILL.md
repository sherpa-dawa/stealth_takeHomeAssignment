---
name: audit-domain
description: Audit domain vocabulary, TypeScript types, enums, and UX copy conventions
---

# Audit Domain & UX Copy

When working with audit data or writing UI copy, use the canonical vocabulary and tone.

## Domain Vocabulary

| Term                   | Definition                                                            | Example                               |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------- |
| **Audit Area**         | A domain or process being audited (Revenue, Inventory, Payroll, etc.) | Appears as a card in the grid         |
| **Engagement**         | The overall audit project/contract                                    | "FY 2024-2025 Financial Audit"        |
| **Risk Level**         | Inherent risk rating: Low, Medium, High                               | Displayed as colored Chip             |
| **Area Status**        | Progress state: Planning, In Progress, Review, Complete               | Shown in status dropdown              |
| **Auditor Assignment** | Which auditor is responsible for the area                             | Name + avatar displayed on card       |
| **Evidence Request**   | A request for documentation or data                                   | Count shown on card                   |
| **Task**               | An open action item within an audit area                              | Count shown on card                   |
| **Progress**           | Numeric completion % for the area (0–100)                             | Bar chart on card                     |
| **Deadline**           | Date-based milestone for the engagement                               | Listed in sidebar with days remaining |

## TypeScript Domain Types

All types defined in `lib/types.ts`. Always use these; never define duplicates:

```tsx
export type RiskLevel = "Low" | "Medium" | "High";
export type AreaStatus = "Planning" | "In Progress" | "Review" | "Complete";
export type TaskStatus = "Open" | "In Progress" | "Completed";

export interface AuditArea {
  id: string;
  name: string;
  risk: RiskLevel;
  progress: number; // 0–100
  assignedAuditor: Auditor | null;
  tasks: Task[];
  evidence: Evidence[];
  status: AreaStatus;
  client: string;
}

export interface Auditor {
  id: string;
  name: string;
  avatar?: string; // Initials like "ES" for Emma Smith
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface Evidence {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface AuditOverview {
  clientName: string;
  financialYear: string; // "2024-2025"
  engagementStatus: string; // "In Progress"
  engagementPartner: string;
  auditManager: string;
  overallProgress: number; // 0–100
  startDate: string; // "YYYY-MM-DD"
  dueDate: string; // "YYYY-MM-DD"
}

export interface Deadline {
  id: number;
  title: string;
  date: string; // "YYYY-MM-DD"
  daysRemaining: number;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string; // "2 hours ago", "just now"
}
```

## Enum Values (Valid Choices)

### RiskLevel

- `"Low"` → Green color (low concern)
- `"Medium"` → Amber color (moderate concern)
- `"High"` → Red color (critical focus)

### AreaStatus

- `"Planning"` → Gray (prep phase)
- `"In Progress"` → Blue (active work)
- `"Review"` → Orange (QA/review phase)
- `"Complete"` → Green (finished)

**Note:** When status is "Complete", progress is always 100. When changing status to "Complete" via dropdown, progress auto-updates to 100.

### TaskStatus

- `"Open"` → Task not started
- `"In Progress"` → Task active
- `"Completed"` → Task done

## UX Copy Conventions

### Tone

- **Professional enterprise:** speak to auditors and finance professionals
- **No exclamation marks:** never use "Great job!" or "Success!"
- **Sentence case:** "Assigned Emma Wilson to Revenue area" not "ASSIGNED EMMA WILSON..."
- **Concise:** "5 tasks" not "You have 5 open tasks"

### Action Descriptions (Recent Activity)

Every action in the activity feed follows this pattern:

```
"[Verb] [object] [preposition] [area/context]"

Examples:
✅ "Assigned Emma Wilson to Revenue area"
✅ "Changed Inventory area status to In Progress"
✅ "Marked Payroll area as complete"
❌ "Assigned an auditor"  (vague)
❌ "Status changed"       (incomplete)
```

The verb should be past tense and match the action taken.

### Dialog & Button Labels

```
Assign Auditor
Change Status
Mark Complete
View Details
Save Changes
Cancel
```

No gerunds ("Assigning"), no questions ("Assign?"), just clear imperatives.

### Empty/Error States

- **No audit areas found:** "There are no audit areas to display. This audit workspace appears to be empty."
- **No filter results:** "No results match your filters. Try adjusting your search query or filter criteria."
- **Error state:** "Failed to load audit data. [Retry button]"

### Date Format

Dates are displayed as "Aug 15, 2024" (abbreviated month, day, numeric year). Never show "2024-08-15" in the UI.

## Common Copy Examples

| Scenario                 | Copy                                                                           |
| ------------------------ | ------------------------------------------------------------------------------ |
| Card header (risk badge) | "High", "Medium", "Low" (never "High Risk")                                    |
| Status chip              | "Planning", "In Progress", "Review", "Complete"                                |
| Sidebar section          | "Upcoming Deadlines", "High Risk Areas", "Recent Activity", "Overall Progress" |
| Progress label           | "Planning", "Evidence", "Review" (phase names)                                 |
| Task count               | "5" (just the number; label is in the card)                                    |
| Evidence count           | "3"                                                                            |
| Auditor unassigned       | "Unassigned" (not "No auditor" or "None")                                      |
| Activity timestamp       | "just now", "2 hours ago", "1 day ago"                                         |
| Deadline countdown       | "33d", "50d" (days remaining, lowercase 'd')                                   |

## Styling Based on Domain

### Risk Level Colors (Theme Tokens)

- `riskHigh` → Red (#ef4444)
- `riskMedium` → Amber (#f59e0b)
- `riskLow` → Green (#10b981)

Always use these tokens; never hardcode colors.

### Status Colors (Theme Tokens)

- `statusPlanning` → Gray (#6b7280)
- `statusInProgress` → Blue (#3b82f6)
- `statusReview` → Orange (#f97316)
- `statusComplete` → Green (#10b981)

## Date Parsing Rule

Date strings from the API are `YYYY-MM-DD` and must be parsed as local time to avoid timezone offset bugs:

```tsx
// ✅ Correct (parses as local date)
const [y, m, d] = "2024-08-15".split("-").map(Number);
const date = new Date(y, m - 1, d);

// ❌ Wrong (parses as UTC, may shift by 1 day)
const date = new Date("2024-08-15");
```

## Accessibility Notes

- Risk and status must always use both color AND text (no color alone)
- Dates in the UI must be human-readable (not ISO 8601)
- Activity timestamps use relative time for recency ("just now", "2 hours ago")
- Deadlines show days remaining, not absolute dates in sidebar (dates in Overview Bar only)
