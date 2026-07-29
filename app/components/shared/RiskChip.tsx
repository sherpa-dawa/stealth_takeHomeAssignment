import { Badge } from "../ui/Badge";
import { RiskLevel } from "@/lib/types";
import type { componentColors } from "@/lib/colorTokens";

interface RiskChipProps {
  risk: RiskLevel;
  size?: "sm" | "md" | "lg";
}

const riskToBadgeVariant: Record<
  RiskLevel,
  keyof typeof componentColors.badge
> = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

export default function RiskChip({ risk, size = "sm" }: RiskChipProps) {
  return (
    <Badge variant={riskToBadgeVariant[risk]} size={size}>
      {risk}
    </Badge>
  );
}
