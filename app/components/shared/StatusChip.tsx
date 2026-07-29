import { Badge } from "../ui/Badge";
import { AreaStatus } from "@/lib/types";

interface StatusChipProps {
  status: AreaStatus;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function StatusChip({ status, size = "xs" }: StatusChipProps) {
  return (
    <Badge variant="outline" size={size}>
      {status}
    </Badge>
  );
}
