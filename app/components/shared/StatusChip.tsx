import { Badge } from "../ui/Badge";
import { AreaStatus } from "@/lib/types";
import type { componentColors } from "@/lib/colorTokens";

interface StatusChipProps {
  status: AreaStatus;
  size?: "sm" | "md" | "lg";
}

const statusToBadgeVariant: Record<
  AreaStatus,
  keyof typeof componentColors.badge
> = {
  Planning: "secondary",
  "In Progress": "primary",
  Review: "warning",
  Complete: "success",
};

export default function StatusChip({ status, size = "sm" }: StatusChipProps) {
  return (
    <Badge variant={statusToBadgeVariant[status]} size={size}>
      {status}
    </Badge>
  );
}
