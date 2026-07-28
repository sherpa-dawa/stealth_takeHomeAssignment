import { Badge } from "../ui/Badge";
import { AreaStatus } from "@/lib/types";

interface StatusChipProps {
  status: AreaStatus;
  size?: "sm" | "md" | "lg";
}

const statusVariants: Record<
  AreaStatus,
  "primary" | "warning" | "secondary" | "success"
> = {
  Planning: "secondary",
  "In Progress": "primary",
  Review: "warning",
  Complete: "success",
};

export default function StatusChip({ status, size = "sm" }: StatusChipProps) {
  return (
    <Badge variant={statusVariants[status]} size={size}>
      {status}
    </Badge>
  );
}
