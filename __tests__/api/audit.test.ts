import {
  auditOverview,
  auditAreas,
  progressBreakdown,
  highRiskAreas,
  deadlines,
  activityItems,
} from "@/lib/mockData";

describe("/api/audit data contract", () => {
  describe("API response payload", () => {
    it("should contain all required data properties", () => {
      const apiPayload = {
        auditOverview,
        auditAreas,
        progressBreakdown,
        highRiskAreas,
        deadlines,
        activityItems,
      };

      expect(apiPayload).toHaveProperty("auditOverview");
      expect(apiPayload).toHaveProperty("auditAreas");
      expect(apiPayload).toHaveProperty("progressBreakdown");
      expect(apiPayload).toHaveProperty("highRiskAreas");
      expect(apiPayload).toHaveProperty("deadlines");
      expect(apiPayload).toHaveProperty("activityItems");
    });

    it("should return valid audit overview", () => {
      expect(auditOverview.clientName).toBe("Acme Corporation");
      expect(auditOverview.financialYear).toBe("2024");
      expect(auditOverview.overallProgress).toBeGreaterThan(0);
    });

    it("should return audit areas array with 8+ items", () => {
      expect(Array.isArray(auditAreas)).toBe(true);
      expect(auditAreas.length).toBeGreaterThanOrEqual(8);
    });

    it("should return multiple high-risk areas", () => {
      expect(Array.isArray(highRiskAreas)).toBe(true);
      expect(highRiskAreas.length).toBeGreaterThan(0);

      highRiskAreas.forEach((area) => {
        expect(area.risk).toBe("High");
        expect(area.name).toBeDefined();
        expect(area.id).toBeDefined();
      });
    });

    it("should have deadlines with valid structure", () => {
      expect(Array.isArray(deadlines)).toBe(true);
      expect(deadlines.length).toBeGreaterThanOrEqual(3);

      deadlines.forEach((deadline) => {
        expect(deadline.id).toBeDefined();
        expect(deadline.title).toBeDefined();
        expect(deadline.date).toBeDefined();
        expect(deadline.daysRemaining).toBeGreaterThanOrEqual(0);
      });
    });

    it("should have activity items with user actions", () => {
      expect(Array.isArray(activityItems)).toBe(true);
      expect(activityItems.length).toBeGreaterThanOrEqual(3);

      activityItems.forEach((activity) => {
        expect(activity.user).toBeDefined();
        expect(activity.action).toBeDefined();
        expect(activity.time).toBeDefined();
      });
    });

    it("should have progress breakdown totaling near 100%", () => {
      const total =
        progressBreakdown.planning +
        progressBreakdown.evidence +
        progressBreakdown.review;

      expect(total).toBeLessThanOrEqual(100);
      expect(total).toBeGreaterThan(0);
    });
  });
});
