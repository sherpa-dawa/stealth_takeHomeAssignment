"use client";

import { Box, CircularProgress, Alert } from "@mui/material";
import { useAuditWorkspace } from "@/lib/useAuditWorkspace";
import WorkspaceHeader from "./components/layout/WorkspaceHeader";
import OverviewBar from "./components/layout/OverviewBar";
import AuditAreaGrid from "./components/areas/AuditAreaGrid";
import Sidebar from "./components/sidebar/Sidebar";

export default function Home() {
  const { state, refetch } = useAuditWorkspace();

  if (state.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (state.error) {
    return (
      <Box sx={{ padding: "2rem" }}>
        <Alert
          severity="error"
          action={
            <button onClick={refetch} style={{ marginLeft: "1rem" }}>
              Retry
            </button>
          }
        >
          {state.error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <WorkspaceHeader />

      {/* Overview Bar */}
      <OverviewBar overview={state.overview} />

      {/* Main Content Area */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Left: Audit Areas Grid */}
        <Box
          sx={{
            flex: 1,
            padding: "2rem",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <AuditAreaGrid areas={state.areas} />
        </Box>

        {/* Right: Sidebar */}
        <Box
          sx={{
            width: 360,
            padding: "2rem",
            overflowY: "auto",
            borderLeft: "1px solid #e0e0e0",
            backgroundColor: "#fff",
          }}
        >
          <Sidebar state={state} />
        </Box>
      </Box>
    </Box>
  );
}
