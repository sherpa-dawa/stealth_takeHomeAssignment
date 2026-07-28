"use client";

import { useReducer, useEffect, useCallback } from "react";
import {
  workspaceReducer,
  initialState,
  WorkspaceState,
} from "./workspaceReducer";

export function useAuditWorkspace() {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  const fetchWorkspace = useCallback(async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const response = await fetch("/api/audit");

      if (!response.ok) {
        throw new Error(`Failed to fetch workspace: ${response.statusText}`);
      }

      const data = await response.json();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          overview: data.auditOverview,
          areas: data.auditAreas,
          progress: data.progressBreakdown,
          highRiskAreas: data.highRiskAreas,
          deadlines: data.deadlines,
          activityItems: data.activityItems,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
    }
  }, []);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  const refetch = useCallback(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  return {
    state,
    dispatch,
    refetch,
  };
}
