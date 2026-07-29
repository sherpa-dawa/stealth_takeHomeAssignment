import { Badge } from "../ui/Badge";
import { RiskLevel } from "@/lib/types";

interface RiskChipProps {
  risk: RiskLevel;
  size?: "sm" | "md" | "lg";
}

const riskVariants: Record<RiskLevel, "success" | "warning" | "danger"> = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

export default function RiskChip({ risk, size = "sm" }: RiskChipProps) {
  return (
    <Badge variant={riskVariants[risk]} size={size}>
      {risk}
    </Badge>
  );
}
