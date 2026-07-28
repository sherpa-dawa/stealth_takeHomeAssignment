import { Chip } from "@mui/material";
import { RiskLevel } from "@/lib/types";

interface RiskChipProps {
  risk: RiskLevel;
  size?: "small" | "medium";
}

const riskColors = {
  Low: "#4caf50",
  Medium: "#ff9800",
  High: "#f44336",
};

export default function RiskChip({ risk, size = "small" }: RiskChipProps) {
  return (
    <Chip
      label={risk}
      size={size}
      sx={{
        backgroundColor: riskColors[risk],
        color: "#fff",
        fontWeight: 600,
      }}
    />
  );
}
