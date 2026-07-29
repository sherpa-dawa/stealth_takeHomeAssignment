/**
 * Example: Using TanStack Query mutations to change server state
 * Demonstrates optimistic updates and automatic cache invalidation
 */

import {
  useAssignAuditorMutation,
  useChangeStatusMutation,
  AuditArea,
} from "@/features/audit-planning";
import { queryClient, auditQueryKeys } from "@/features/audit-planning/lib";

// ============================================
// Basic Mutation Usage
// ============================================
export function ExampleBasicMutation() {
  const { mutate, isPending, error } = useAssignAuditorMutation();

  const handleAssignAuditor = () => {
    mutate(undefined, {
      onSuccess: () => {
        console.log("Auditor assigned successfully");
      },
      onError: (err) => {
        console.error("Failed to assign auditor:", err);
      },
    });
  };

  return {
    onAssignClick: handleAssignAuditor,
    isAssigning: isPending,
    assignError: error,
  };
}

// ============================================
// Optimistic Updates
// ============================================
export function ExampleOptimisticUpdate(client: string) {
  const { mutate } = useAssignAuditorMutation();

  const handleAssignAuditor = (areaId: string, auditorId: string) => {
    // 1. Optimistically update the cache BEFORE the server responds
    const previousData = queryClient.getQueryData(
      auditQueryKeys.auditsByClient(client)
    );

    queryClient.setQueryData(
      auditQueryKeys.auditsByClient(client),
      (old: AuditArea[] | undefined) =>
        old?.map((a) =>
          a.id === areaId
            ? { ...a, assignedAuditor: { id: auditorId, name: "", avatar: "" } }
            : a
        )
    );

    // 2. Mutate on the server
    mutate(undefined, {
      onError: () => {
        queryClient.setQueryData(
          auditQueryKeys.auditsByClient(client),
          previousData
        );
      },
    });
  };

  return { handleAssignAuditor };
}

// ============================================
// Sequential Mutations
// ============================================
export function ExampleSequentialMutations() {
  const assignAuditor = useAssignAuditorMutation();
  const changeStatus = useChangeStatusMutation();

  const handleUpdateArea = async (
    _areaId: string,
    _auditorId: string,
    _client: string
  ) => {
    // First assign the auditor
    await new Promise<void>((resolve) => {
      assignAuditor.mutate(undefined, {
        onSuccess: () => resolve(),
      });
    });

    // Then change the status
    changeStatus.mutate(undefined, {
      onSuccess: () => {
        console.log("Area fully updated");
      },
    });
  };

  return { handleUpdateArea };
}

// ============================================
// Batch Mutations with Promise.all
// ============================================
export function ExampleBatchMutations() {
  const { mutate: assignAuditor } = useAssignAuditorMutation();

  const handleBulkAssign = async (
    _assignments: Array<{ areaId: string; auditorId: string; client: string }>
  ) => {
    // Fire all mutations in parallel
    // In a real implementation, you'd batch these with proper parameters
    const promises = [
      new Promise<void>((resolve) => {
        assignAuditor(undefined, {
          onSuccess: () => resolve(),
        });
      }),
    ];

    // Wait for all to complete
    await Promise.all(promises);
  };

  return { handleBulkAssign };
}

// ============================================
// Mutation with Loading UI
// ============================================
export function ExampleMutationWithUI() {
  const { mutate, isPending, variables } = useAssignAuditorMutation();

  const handleAssign = (
    _areaId: string,
    _auditorId: string,
    _client: string
  ) => {
    mutate(undefined);
  };

  return {
    onAssignClick: handleAssign,
    isLoading: isPending,
  };
}
