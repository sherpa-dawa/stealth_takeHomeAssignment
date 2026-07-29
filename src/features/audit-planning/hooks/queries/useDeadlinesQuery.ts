import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useDeadlinesQuery() {
  return useQuery({
    queryKey: auditQueryKeys.deadlines(),
    queryFn: () => auditService.getDeadlines(),
  });
}
