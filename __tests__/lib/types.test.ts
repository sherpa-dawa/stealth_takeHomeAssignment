import {
  RiskLevel,
  AreaStatus,
  Auditor,
  AuditArea,
  AuditOverview,
  ProgressBreakdown,
  Deadline,
  ActivityItem,
} from "@/lib/types";

describe("Type definitions", () => {
  describe("RiskLevel", () => {
    it("should accept Low, Medium, High values", () => {
      const low: RiskLevel = "Low";
      const medium: RiskLevel = "Medium";
      const high: RiskLevel = "High";

      expect([low, medium, high]).toEqual(["Low", "Medium", "High"]);
    });
  });

  describe("AreaStatus", () => {
    it("should accept all valid status values", () => {
      const statuses: AreaStatus[] = [
        "Planning",
        "In Progress",
        "Review",
        "Complete",
      ];

      expect(statuses).toHaveLength(4);
      expect(statuses).toContain("Complete");
    });
  });

  describe("Auditor interface", () => {
    it("should have required id and name properties", () => {
      const auditor: Auditor = {
        id: "a1",
        name: "John Doe",
      };

      expect(auditor.id).toBe("a1");
      expect(auditor.name).toBe("John Doe");
    });

    it("should support optional avatar property", () => {
      const auditor: Auditor = {
        id: "a1",
        name: "John Doe",
        avatar: "JD",
      };

      expect(auditor.avatar).toBe("JD");
    });
  });

  describe("AuditArea interface", () => {
    it("should validate complete AuditArea object", () => {
      const area: AuditArea = {
        id: "revenue",
        name: "Revenue",
        client: "Acme Corporation",
        risk: "High",
        progress: 45,
        assignedAuditor: { id: "a1", name: "Emma Wilson", avatar: "EW" },
        tasks: [
          { id: "t1", title: "Review revenue transactions", status: "Open" },
          { id: "t2", title: "Verify cutoff procedures", status: "Completed" },
        ],
        evidence: [
          { id: "e1", title: "Revenue contracts", status: "Open" },
          { id: "e2", title: "Customer agreements", status: "Completed" },
        ],
        status: "In Progress",
      };

      expect(area.id).toBe("revenue");
      expect(area.risk).toBe("High");
      expect(area.progress).toBe(45);
      expect(area.status).toBe("In Progress");
      expect(area.assignedAuditor).not.toBeNull();
    });

    it("should allow null assignedAuditor", () => {
      const area: AuditArea = {
        id: "test",
        name: "Test Area",
        client: "Test Client",
        risk: "Low",
        progress: 0,
        assignedAuditor: null,
        tasks: [],
        evidence: [],
        status: "Planning",
      };

      expect(area.assignedAuditor).toBeNull();
    });
  });

  describe("AuditOverview interface", () => {
    it("should contain all required engagement details", () => {
      const overview: AuditOverview = {
        clientName: "Acme Corp",
        financialYear: "2024",
        engagementStatus: "Active",
        engagementPartner: "John Smith",
        auditManager: "Jane Doe",
        overallProgress: 58,
        startDate: "2024-01-15",
        dueDate: "2024-12-31",
      };

      expect(overview.clientName).toBe("Acme Corp");
      expect(overview.overallProgress).toBe(58);
      expect(overview.dueDate).toBe("2024-12-31");
    });
  });

  describe("ProgressBreakdown interface", () => {
    it("should track planning, evidence, and review progress", () => {
      const breakdown: ProgressBreakdown = {
        planning: 15,
        evidence: 58,
        review: 27,
      };

      expect(breakdown.planning + breakdown.evidence + breakdown.review).toBe(
        100
      );
    });
  });

  describe("Deadline interface", () => {
    it("should contain deadline information", () => {
      const deadline: Deadline = {
        id: 1,
        title: "Revenue Testing Complete",
        date: "2024-08-30",
        daysRemaining: 33,
      };

      expect(deadline.title).toBe("Revenue Testing Complete");
      expect(deadline.daysRemaining).toBeGreaterThan(0);
    });
  });

  describe("ActivityItem interface", () => {
    it("should track audit activities", () => {
      const activity: ActivityItem = {
        id: 1,
        user: "Emma Wilson",
        action: "Requested additional documents",
        time: "2 hours ago",
      };

      expect(activity.user).toBe("Emma Wilson");
      expect(activity.action).toContain("documents");
    });
  });
});
