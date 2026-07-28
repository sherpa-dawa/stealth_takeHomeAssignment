"use client";

import { useState, useMemo } from "react";
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
    <div className="flex flex-col min-h-screen bg-neutral-50">
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
        <div className="flex flex-1">
          <div className="flex-1 bg-neutral-50">
            <EmptyState variant="no-data" />
          </div>
          <div className="w-96 border-l border-neutral-200 bg-neutral-50 overflow-y-auto">
            <Sidebar state={state} />
          </div>
        </div>
      ) : hasNoFilteredResults ? (
        <div className="flex flex-1">
          <div className="flex-1 bg-neutral-50">
            <EmptyState variant="no-results" />
          </div>
          <div className="w-96 border-l border-neutral-200 bg-neutral-50 overflow-y-auto">
            <Sidebar state={state} />
          </div>
        </div>
      ) : (
        <div className="flex flex-1">
          {/* Left: Audit Areas Grid */}
          <div className="flex-1 overflow-y-auto bg-neutral-50 p-6">
            <AuditAreaGrid areas={filteredAreas} dispatch={dispatch} />
          </div>

          {/* Right: Sidebar */}
          <div className="w-96 border-l border-neutral-200 bg-neutral-50 overflow-y-auto">
            <Sidebar state={state} />
          </div>
        </div>
      )}
    </div>
  );
}
