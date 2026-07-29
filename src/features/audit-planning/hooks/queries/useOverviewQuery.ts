import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useOverviewQuery(client: string) {
  return useQuery({
    queryKey: auditQueryKeys.overviewByClient(client),
    queryFn: () => auditService.getOverview(client),
  });
}
