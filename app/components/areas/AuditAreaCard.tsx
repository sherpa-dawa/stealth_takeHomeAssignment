"use client";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  LinearProgress,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuditArea } from "@/lib/types";
import RiskChip from "../shared/RiskChip";
import StatusChip from "../shared/StatusChip";

interface AuditAreaCardProps {
  area: AuditArea;
  onViewDetails: (area: AuditArea) => void;
  onChangeStatus: (area: AuditArea) => void;
  onAssignAuditor: (area: AuditArea) => void;
  onMarkComplete: (area: AuditArea) => void;
}

export default function AuditAreaCard({
  area,
  onViewDetails,
  onChangeStatus,
  onAssignAuditor,
  onMarkComplete,
}: AuditAreaCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease",
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Header with title and risk */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            {area.name}
          </Typography>
          <RiskChip risk={area.risk} />
        </Box>

        {/* Progress bar */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <Typography variant="caption" sx={{ color: "#666" }}>
              Progress
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {area.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={area.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                backgroundColor: "#1976d2",
              },
            }}
          />
        </Box>

        {/* Assigned auditor */}
        <Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Assigned Auditor
          </Typography>
          {area.assignedAuditor ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#1976d2",
                  fontSize: "0.75rem",
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
              sx={{ color: "#999", fontStyle: "italic", mt: 0.5 }}
            >
              Unassigned
            </Typography>
          )}
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: "#666" }}>
              Open Tasks
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {area.openTasks}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "#666" }}>
              Evidence Requested
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {area.evidenceRequested}
            </Typography>
          </Box>
        </Box>

        {/* Status */}
        <Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Status
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <StatusChip status={area.status} />
          </Box>
        </Box>

        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: "auto",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => onViewDetails(area)}
            sx={{ flex: 1 }}
          >
            Details
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onChangeStatus(area)}
            sx={{ flex: 1 }}
          >
            Status
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={() => onAssignAuditor(area)}
            sx={{ flex: 1 }}
          >
            Assign
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CheckCircleIcon />}
            onClick={() => onMarkComplete(area)}
            sx={{ flex: 1 }}
          >
            Complete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
