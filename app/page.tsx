"use client";

import { useState, useMemo } from "react";
import { RiskLevel, AreaStatus } from "@/lib/types";
import { useAuditWorkspace } from "@/lib/useAuditWorkspace";
import { clients } from "@/lib/mockData";
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
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<AreaStatus | "All">(
    "All"
  );
  const [highlightedAreaId, setHighlightedAreaId] = useState<string | null>(
    null
  );

  const filteredAreas = useMemo(() => {
    return state.areas.filter((area) => {
      const matchesSearch =
        searchQuery === "" ||
        area.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = selectedRisk === "All" || area.risk === selectedRisk;

      const matchesStatus =
        selectedStatus === "All" || area.status === selectedStatus;

      const matchesClient = area.client === selectedClient;

      return matchesSearch && matchesRisk && matchesStatus && matchesClient;
    });
  }, [state.areas, searchQuery, selectedRisk, selectedStatus, selectedClient]);

  const hasNoAreas = state.areas.length === 0;
  const hasNoFilteredResults = filteredAreas.length === 0;

  const handleHighlightArea = (areaId: string) => {
    setHighlightedAreaId(areaId);
    setTimeout(() => {
      setHighlightedAreaId(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <WorkspaceHeader />

      {/* Overview Bar */}
      <OverviewBar overview={state.overview} selectedClient={selectedClient} />

      {/* Error State - shown at top if present */}
      {state.error && <ErrorState error={state.error} onRetry={refetch} />}

      {/* Filter Bar - hidden during loading */}
      {!state.loading && (
        <FilterBar
          selectedClient={selectedClient}
          onClientChange={setSelectedClient}
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
        <div className="flex flex-col lg:flex-row flex-1">
          <div className="flex-1 bg-neutral-50">
            <EmptyState variant="no-results" />
          </div>
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-neutral-200 bg-neutral-50 overflow-y-auto max-h-96 lg:max-h-none">
            <Sidebar state={state} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Audit Areas Grid */}
          <div className="flex-1 overflow-y-auto bg-neutral-50 p-3 sm:p-4 lg:p-6">
            <AuditAreaGrid
              areas={filteredAreas}
              dispatch={dispatch}
              highlightedAreaId={highlightedAreaId}
            />
          </div>

          {/* Right: Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-neutral-200 bg-neutral-50 overflow-y-auto max-h-96 lg:max-h-none">
            <Sidebar state={state} onHighlightArea={handleHighlightArea} />
          </div>
        </div>
      )}
    </div>
  );
}
