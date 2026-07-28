"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { AuditArea, Auditor, AreaStatus } from "@/lib/types";
import { WorkspaceState, WorkspaceAction } from "@/lib/workspaceReducer";
import AuditAreaCard from "./AuditAreaCard";
import AssignAuditorDialog from "./AssignAuditorDialog";
import ChangeStatusDialog from "./ChangeStatusDialog";
import ViewDetailsDialog from "./ViewDetailsDialog";

interface AuditAreaGridProps {
  areas: AuditArea[];
  dispatch: React.Dispatch<WorkspaceAction>;
}

export default function AuditAreaGrid({ areas, dispatch }: AuditAreaGridProps) {
  const [selectedAreaForDetails, setSelectedAreaForDetails] =
    useState<AuditArea | null>(null);
  const [selectedAreaForAssign, setSelectedAreaForAssign] =
    useState<AuditArea | null>(null);
  const [selectedAreaForStatus, setSelectedAreaForStatus] =
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

  const handleChangeStatus = (status: AreaStatus) => {
    if (selectedAreaForStatus) {
      dispatch({
        type: "CHANGE_STATUS",
        payload: {
          areaId: selectedAreaForStatus.id,
          status,
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {areas.map((area) => (
          <AuditAreaCard
            key={area.id}
            area={area}
            onViewDetails={setSelectedAreaForDetails}
            onChangeStatus={setSelectedAreaForStatus}
            onAssignAuditor={setSelectedAreaForAssign}
            onMarkComplete={handleMarkComplete}
          />
        ))}
      </Box>

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

      <ChangeStatusDialog
        open={selectedAreaForStatus !== null}
        onClose={() => setSelectedAreaForStatus(null)}
        onChangeStatus={handleChangeStatus}
        currentStatus={selectedAreaForStatus?.status || "Planning"}
      />
    </>
  );
}
