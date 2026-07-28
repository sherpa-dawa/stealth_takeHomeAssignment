import {
  AuditOverview,
  AuditArea,
  ProgressBreakdown,
  Deadline,
  ActivityItem,
  Auditor,
  AreaStatus,
} from "./types";

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
  loading: false,
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
  | { type: "FETCH_ERROR"; payload: string };

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

    default:
      return state;
  }
}
