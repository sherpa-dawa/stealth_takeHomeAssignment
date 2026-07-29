import {
  AuditOverview,
  AuditArea,
  ProgressBreakdown,
  Deadline,
  ActivityItem,
  Auditor,
  AreaStatus,
} from "@/features/audit-planning/types";

export interface WorkspaceState {
  overview: AuditOverview | null;
  areas: AuditArea[];
  progress: ProgressBreakdown | null;
  highRiskAreas: AuditArea[];
  deadlines: Deadline[];
  activity: ActivityItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: WorkspaceState = {
  overview: null,
  areas: [],
  progress: null,
  highRiskAreas: [],
  deadlines: [],
  activity: [],
  loading: true,
  error: null,
};

export type WorkspaceAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: {
        overview: AuditOverview;
        areas: AuditArea[];
        progress: ProgressBreakdown;
        highRiskAreas: AuditArea[];
        deadlines: Deadline[];
        activityItems: ActivityItem[];
      };
    }
  | { type: "FETCH_ERROR"; payload: string }
  | {
      type: "ASSIGN_AUDITOR";
      payload: { areaId: string; auditor: Auditor; userName: string };
    }
  | {
      type: "CHANGE_STATUS";
      payload: { areaId: string; status: AreaStatus; userName: string };
    }
  | { type: "MARK_COMPLETE"; payload: { areaId: string; userName: string } };

const generateActivityId = (activity: ActivityItem[]): number => {
  return activity.length > 0 ? Math.max(...activity.map((a) => a.id)) + 1 : 1;
};

const prependActivity = (
  activity: ActivityItem[],
  newItem: Omit<ActivityItem, "id">
): ActivityItem[] => {
  const id = generateActivityId(activity);
  return [{ ...newItem, id }, ...activity];
};

export function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        overview: action.payload.overview,
        areas: action.payload.areas,
        progress: action.payload.progress,
        highRiskAreas: action.payload.highRiskAreas,
        deadlines: action.payload.deadlines,
        activity: action.payload.activityItems,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ASSIGN_AUDITOR": {
      const updatedAreas = state.areas.map((area) =>
        area.id === action.payload.areaId
          ? { ...area, assignedAuditor: action.payload.auditor }
          : area
      );

      const areaName =
        state.areas.find((a) => a.id === action.payload.areaId)?.name ||
        "audit area";

      const newActivity = prependActivity(state.activity, {
        user: action.payload.userName,
        action: `Assigned ${action.payload.auditor.name} to ${areaName}`,
        time: "just now",
      });

      return {
        ...state,
        areas: updatedAreas,
        activity: newActivity,
      };
    }

    case "CHANGE_STATUS": {
      const updatedAreas = state.areas.map((area) => {
        if (area.id !== action.payload.areaId) return area;

        const isChangingToComplete = action.payload.status === "Complete";
        const isChangingFromComplete = area.status === "Complete";

        return {
          ...area,
          status: action.payload.status,
          progress: isChangingToComplete
            ? 100
            : isChangingFromComplete
              ? area.progressBeforeComplete || 0
              : area.progress,
          progressBeforeComplete: isChangingToComplete
            ? area.progress
            : undefined,
        };
      });

      const areaName =
        state.areas.find((a) => a.id === action.payload.areaId)?.name ||
        "audit area";

      const newActivity = prependActivity(state.activity, {
        user: action.payload.userName,
        action: `Changed ${areaName} status to ${action.payload.status}`,
        time: "just now",
      });

      return {
        ...state,
        areas: updatedAreas,
        activity: newActivity,
      };
    }

    case "MARK_COMPLETE": {
      const updatedAreas = state.areas.map((area) =>
        area.id === action.payload.areaId
          ? { ...area, status: "Complete" as const, progress: 100 }
          : area
      );

      const areaName =
        state.areas.find((a) => a.id === action.payload.areaId)?.name ||
        "audit area";

      const newActivity = prependActivity(state.activity, {
        user: action.payload.userName,
        action: `Marked ${areaName} as complete`,
        time: "just now",
      });

      return {
        ...state,
        areas: updatedAreas,
        activity: newActivity,
      };
    }

    default:
      return state;
  }
}
