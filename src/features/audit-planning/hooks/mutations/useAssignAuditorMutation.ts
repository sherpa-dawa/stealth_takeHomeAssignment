import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auditService } from "@/features/audit-planning/services/auditService";
import { auditQueryKeys } from "@/features/audit-planning/lib/queryKeys";

export function useAssignAuditorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => auditService.assignAuditor(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: auditQueryKeys.all,
      });
    },
  });
}
