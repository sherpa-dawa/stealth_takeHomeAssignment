import { Chip } from "@mui/material";
import { AreaStatus } from "@/lib/types";

interface StatusChipProps {
  status: AreaStatus;
  size?: "small" | "medium";
}

const statusColors = {
  Planning: "#e3f2fd",
  "In Progress": "#fff3e0",
  Review: "#f3e5f5",
  Complete: "#e8f5e9",
};

const statusTextColors = {
  Planning: "#1976d2",
  "In Progress": "#f57c00",
  Review: "#7b1fa2",
  Complete: "#388e3c",
};

export default function StatusChip({ status, size = "small" }: StatusChipProps) {
  return (
    <Chip
      label={status}
      size={size}
      sx={{
        backgroundColor: statusColors[status],
        color: statusTextColors[status],
        fontWeight: 600,
        border: `1px solid ${statusTextColors[status]}`,
      }}
    />
  );
}
