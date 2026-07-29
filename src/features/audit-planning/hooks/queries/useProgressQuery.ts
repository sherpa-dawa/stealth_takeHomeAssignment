import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useProgressQuery() {
  return useQuery({
    queryKey: auditQueryKeys.progress(),
    queryFn: () => auditService.getProgress(),
  });
}
