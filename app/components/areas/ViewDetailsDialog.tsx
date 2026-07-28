"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
} from "@mui/material";
import { AuditArea } from "@/lib/types";
import RiskChip from "../shared/RiskChip";
import StatusChip from "../shared/StatusChip";

interface ViewDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  area: AuditArea | null;
}

export default function ViewDetailsDialog({
  open,
  onClose,
  area,
}: ViewDetailsDialogProps) {
  if (!area) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{area.name}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Risk and Status */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <RiskChip risk={area.risk} />
          <StatusChip status={area.status} />
        </Box>

        <Divider />

        {/* Progress */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Progress
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {area.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={area.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: "#1976d2",
              },
            }}
          />
        </Box>

        <Divider />

        {/* Assigned Auditor */}
        <Box>
          <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>
            Assigned Auditor
          </Typography>
          {area.assignedAuditor ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#1976d2",
                  fontWeight: 600,
                }}
              >
                {area.assignedAuditor.avatar}
              </Avatar>
              <Typography variant="body2">{area.assignedAuditor.name}</Typography>
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#999", fontStyle: "italic", mt: 1 }}
            >
              Unassigned
            </Typography>
          )}
        </Box>

        <Divider />

        {/* Tasks and Evidence */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>
              Open Tasks
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              {area.openTasks}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>
              Evidence Requested
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              {area.evidenceRequested}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
