import {
  workspaceReducer,
  initialState,
} from "@/features/audit-planning/state/reducer";
import {
  auditAreas,
  auditOverview,
  progressBreakdown,
  highRiskAreas,
  deadlines,
  activityItems,
} from "@/features/audit-planning/constants/mockData";

describe("workspaceReducer", () => {
  describe("FETCH_START", () => {
    it("should set loading to true and clear error", () => {
      const state = workspaceReducer(initialState, { type: "FETCH_START" });

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe("FETCH_SUCCESS", () => {
    it("should populate state with fetched data and clear loading/error", () => {
      const state = workspaceReducer(initialState, {
        type: "FETCH_SUCCESS",
        payload: {
          overview: auditOverview,
          areas: auditAreas,
          progress: progressBreakdown,
          highRiskAreas,
          deadlines,
          activityItems,
        },
      });

      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.overview).toEqual(auditOverview);
      expect(state.areas).toEqual(auditAreas);
      expect(state.progress).toEqual(progressBreakdown);
      expect(state.highRiskAreas).toEqual(highRiskAreas);
      expect(state.deadlines).toEqual(deadlines);
      expect(state.activity).toEqual(activityItems);
    });
  });

  describe("FETCH_ERROR", () => {
    it("should set error and clear loading", () => {
      const errorMessage = "Failed to fetch";
      const state = workspaceReducer(initialState, {
        type: "FETCH_ERROR",
        payload: errorMessage,
      });

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("ASSIGN_AUDITOR", () => {
    it("should update auditor and prepend activity item", () => {
      const initialWithData = {
        ...initialState,
        areas: auditAreas,
        activity: activityItems,
      };

      const newAuditor = { id: "a99", name: "New Auditor", avatar: "NA" };
      const state = workspaceReducer(initialWithData, {
        type: "ASSIGN_AUDITOR",
        payload: {
          areaId: "revenue",
          auditor: newAuditor,
          userName: "Test User",
        },
      });

      const revenueArea = state.areas.find((a) => a.id === "revenue");
      expect(revenueArea?.assignedAuditor).toEqual(newAuditor);

      expect(state.activity.length).toBe(initialWithData.activity.length + 1);
      expect(state.activity[0]!.user).toBe("Test User");
      expect(state.activity[0]!.action).toContain("Assigned");
    });
  });

  describe("CHANGE_STATUS", () => {
    it("should update status and prepend activity item", () => {
      const initialWithData = {
        ...initialState,
        areas: auditAreas,
        activity: activityItems,
      };

      const state = workspaceReducer(initialWithData, {
        type: "CHANGE_STATUS",
        payload: {
          areaId: "inventory",
          status: "Review",
          userName: "Test User",
        },
      });

      const inventoryArea = state.areas.find((a) => a.id === "inventory");
      expect(inventoryArea?.status).toBe("Review");

      expect(state.activity.length).toBe(initialWithData.activity.length + 1);
      expect(state.activity[0]!.user).toBe("Test User");
      expect(state.activity[0]!.action).toContain("status");
    });
  });

  describe("MARK_COMPLETE", () => {
    it("should set status to Complete, progress to 100, and prepend activity", () => {
      const initialWithData = {
        ...initialState,
        areas: auditAreas,
        activity: activityItems,
      };

      const state = workspaceReducer(initialWithData, {
        type: "MARK_COMPLETE",
        payload: {
          areaId: "payroll",
          userName: "Test User",
        },
      });

      const payrollArea = state.areas.find((a) => a.id === "payroll");
      expect(payrollArea?.status).toBe("Complete");
      expect(payrollArea?.progress).toBe(100);

      expect(state.activity.length).toBe(initialWithData.activity.length + 1);
      expect(state.activity[0]!.user).toBe("Test User");
      expect(state.activity[0]!.action).toContain("complete");
    });
  });

  describe("activity management", () => {
    it("should maintain chronological order with newest first", () => {
      const initialWithData = {
        ...initialState,
        areas: auditAreas,
        activity: activityItems,
      };

      let state = initialWithData;

      state = workspaceReducer(state, {
        type: "MARK_COMPLETE",
        payload: { areaId: "revenue", userName: "User 1" },
      });

      state = workspaceReducer(state, {
        type: "MARK_COMPLETE",
        payload: { areaId: "cash-bank", userName: "User 2" },
      });

      expect(state.activity[0]!.user).toBe("User 2");
      expect(state.activity[1]!.user).toBe("User 1");
      expect(state.activity[2]!.user).toBe(initialWithData.activity[0]!.user);
    });
  });
});
