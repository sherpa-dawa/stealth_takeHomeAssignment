import { Badge } from "../ui/Badge";
import { AreaStatus } from "@/lib/types";

interface StatusChipProps {
  status: AreaStatus;
  size?: "sm" | "md" | "lg";
}

export default function StatusChip({ status, size = "sm" }: StatusChipProps) {
  return (
    <Badge variant="outline" size={size}>
      {status}
    </Badge>
  );
}
