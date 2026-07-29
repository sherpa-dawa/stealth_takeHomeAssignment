import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useAuditsQuery(client: string) {
  return useQuery({
    queryKey: auditQueryKeys.auditsByClient(client),
    queryFn: () => auditService.getAudits(client),
  });
}
