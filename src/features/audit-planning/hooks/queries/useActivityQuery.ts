import { useQuery } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useActivityQuery() {
  return useQuery({
    queryKey: auditQueryKeys.activity(),
    queryFn: () => auditService.getActivity(),
  });
}
