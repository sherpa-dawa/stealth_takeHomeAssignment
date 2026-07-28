"use client";

import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { RiskLevel, AreaStatus } from "@/lib/types";
import { useAuditWorkspace } from "@/lib/useAuditWorkspace";
import WorkspaceHeader from "./components/layout/WorkspaceHeader";
import OverviewBar from "./components/layout/OverviewBar";
import FilterBar from "./components/filters/FilterBar";
import AuditAreaGrid from "./components/areas/AuditAreaGrid";
import Sidebar from "./components/sidebar/Sidebar";
import LoadingState from "./components/shared/LoadingState";
import EmptyState from "./components/shared/EmptyState";
import ErrorState from "./components/shared/ErrorState";

export default function Home() {
  const { state, dispatch, refetch } = useAuditWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<AreaStatus | "All">(
    "All"
  );

  const filteredAreas = useMemo(() => {
    return state.areas.filter((area) => {
      const matchesSearch =
        searchQuery === "" ||
        area.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = selectedRisk === "All" || area.risk === selectedRisk;

      const matchesStatus =
        selectedStatus === "All" || area.status === selectedStatus;

      return matchesSearch && matchesRisk && matchesStatus;
    });
  }, [state.areas, searchQuery, selectedRisk, selectedStatus]);

  const hasNoAreas = state.areas.length === 0;
  const hasNoFilteredResults = filteredAreas.length === 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <WorkspaceHeader />

      {/* Overview Bar */}
      <OverviewBar overview={state.overview} />

      {/* Error State - shown at top if present */}
      {state.error && <ErrorState error={state.error} onRetry={refetch} />}

      {/* Filter Bar - hidden during loading */}
      {!state.loading && (
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedRisk={selectedRisk}
          onRiskChange={setSelectedRisk}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      )}

      {/* Main Content Area */}
      {state.loading ? (
        <LoadingState />
      ) : hasNoAreas ? (
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box sx={{ flex: 1, backgroundColor: "#fafafa" }}>
            <EmptyState variant="no-data" />
          </Box>
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
      ) : hasNoFilteredResults ? (
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box sx={{ flex: 1, backgroundColor: "#fafafa" }}>
            <EmptyState variant="no-results" />
          </Box>
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
      ) : (
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
            <AuditAreaGrid areas={filteredAreas} dispatch={dispatch} />
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
      )}
    </Box>
  );
}
