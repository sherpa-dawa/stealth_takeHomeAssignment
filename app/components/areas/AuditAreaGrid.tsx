"use client";

import { useState } from "react";
import { AuditArea, Auditor } from "@/lib/types";
import { WorkspaceAction } from "@/lib/workspaceReducer";
import AuditAreaCard from "./AuditAreaCard";
import AssignAuditorDialog from "./AssignAuditorDialog";
import ViewDetailsDialog from "./ViewDetailsDialog";

interface AuditAreaGridProps {
  areas: AuditArea[];
  dispatch: React.Dispatch<WorkspaceAction>;
  highlightedAreaId?: string | null;
}

export default function AuditAreaGrid({
  areas,
  dispatch,
  highlightedAreaId,
}: AuditAreaGridProps) {
  const [selectedAreaForDetails, setSelectedAreaForDetails] =
    useState<AuditArea | null>(null);
  const [selectedAreaForAssign, setSelectedAreaForAssign] =
    useState<AuditArea | null>(null);

  const handleAssignAuditor = (auditor: Auditor) => {
    if (selectedAreaForAssign) {
      dispatch({
        type: "ASSIGN_AUDITOR",
        payload: {
          areaId: selectedAreaForAssign.id,
          auditor,
          userName: "Current User",
        },
      });
    }
  };

  const handleMarkComplete = (area: AuditArea) => {
    dispatch({
      type: "MARK_COMPLETE",
      payload: {
        areaId: area.id,
        userName: "Current User",
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {areas.map((area) => (
          <AuditAreaCard
            key={area.id}
            area={area}
            isHighlighted={highlightedAreaId === area.id}
            onViewDetails={(a: AuditArea) => setSelectedAreaForDetails(a)}
            onChangeStatus={(a: AuditArea, status) => {
              dispatch({
                type: "CHANGE_STATUS",
                payload: {
                  areaId: a.id,
                  status,
                  userName: "Current User",
                },
              });
            }}
            onAssignAuditor={(a: AuditArea) => setSelectedAreaForAssign(a)}
            onMarkComplete={handleMarkComplete}
          />
        ))}
      </div>

      {/* Dialogs */}
      <ViewDetailsDialog
        open={selectedAreaForDetails !== null}
        onClose={() => setSelectedAreaForDetails(null)}
        area={selectedAreaForDetails}
      />

      <AssignAuditorDialog
        open={selectedAreaForAssign !== null}
        onClose={() => setSelectedAreaForAssign(null)}
        onAssign={handleAssignAuditor}
        currentAuditor={selectedAreaForAssign?.assignedAuditor}
      />
    </>
  );
}
