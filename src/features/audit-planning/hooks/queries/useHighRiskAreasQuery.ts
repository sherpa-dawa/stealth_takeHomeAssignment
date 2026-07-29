import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useHighRiskAreasQuery(client: string) {
  return useQuery({
    queryKey: auditQueryKeys.highRiskAreasByClient(client),
    queryFn: () => auditService.getHighRiskAreas(client),
  });
}
