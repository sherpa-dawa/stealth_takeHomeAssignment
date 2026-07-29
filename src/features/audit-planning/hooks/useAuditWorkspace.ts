"use client";

import { useReducer, useEffect, useCallback } from "react";
import {
  workspaceReducer,
  initialState,
} from "@/features/audit-planning/state/reducer";

export function useAuditWorkspace(client?: string) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  const fetchWorkspace = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      );
      const shouldFail = params.get("fail") === "true";

      let url = `/api/audit`;
      if (shouldFail) url += "?fail=true";
      if (client)
        url += `${shouldFail ? "&" : "?"}client=${encodeURIComponent(client)}`;

      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);
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
      dispatch({
        type: "FETCH_ERROR",
        payload: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [client]);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  return { state, dispatch, refetch: fetchWorkspace };
}
