"use client";

import { useEffect } from "react";
import { useAuditWorkspace } from "@/lib/useAuditWorkspace";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

export default function WorkspaceTest() {
  const { state, refetch } = useAuditWorkspace();

  useEffect(() => {
    console.log("Workspace State:", state);
  }, [state]);

  if (state.loading) {
    return (
      <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <CircularProgress size={24} />
        <Typography>Loading workspace data...</Typography>
      </Box>
    );
  }

  if (state.error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{state.error}</Alert>
        <Typography
          onClick={refetch}
          sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
        >
          Click to retry
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Alert severity="success">
        ✅ State loaded successfully! Check console for full state object.
      </Alert>
      <Typography sx={{ mt: 2, fontSize: "0.875rem", color: "gray" }}>
        Areas loaded: {state.areas.length} | Activity items: {state.activity.length} | High-risk areas: {state.highRiskAreas.length}
      </Typography>
    </Box>
  );
}
