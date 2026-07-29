/**
 * Example: Using TanStack Query to fetch audit areas
 * This demonstrates the professional way to integrate Query into components
 */

import { useAuditsQuery } from "@/features/audit-planning";

// ============================================
// Basic Usage
// ============================================
export function ExampleBasicUsage(client: string) {
  // Query automatically handles:
  // - Request deduplication (multiple calls = one request)
  // - Caching with 5-minute stale time
  // - Automatic retry on failure
  // - Loading and error states
  const { data, isLoading, isError, error } = useAuditsQuery(client);

  // State flow: idle → pending → success/error
  if (isLoading) return "Loading audits...";
  if (isError) return `Error: ${error?.message}`;
  return `Found ${data?.length} audit areas`;
}

// ============================================
// With Manual Refetch
// ============================================
export function ExampleWithRefetch(client: string) {
  const { data, isLoading, refetch } = useAuditsQuery(client);

  const handleRefresh = async () => {
    // Bypass cache and fetch fresh data
    await refetch();
  };

  return { data, isLoading, handleRefresh };
}

// ============================================
// Dependent Queries
// ============================================
export function ExampleDependentQueries(clientId: string | null) {
  // To properly implement dependent queries, the query hook would need
  // to accept options. Current hooks use Query client defaults.
  // This example shows the pattern:
  // const { data: audits, isLoading } = useAuditsQuery(clientId ?? "", {
  //   enabled: !!clientId,
  // });

  // For now, always call the hook with a fallback empty string
  const { data: audits, isLoading } = useAuditsQuery(clientId ?? "");

  return { audits, isLoading };
}

// ============================================
// Polling / Auto-Refresh
// ============================================
export function ExampleWithPolling(client: string) {
  // Note: For polling with refetchInterval and other advanced options,
  // these would require extending the query hooks to accept options.
  // Current implementation uses Query client defaults:
  // - staleTime: 5 minutes
  // - gcTime: 10 minutes
  // - retry: 1 with exponential backoff
  const { data } = useAuditsQuery(client);

  return data;
}

// ============================================
// Multiple Queries in One Component
// ============================================
export function ExampleMultipleQueries(client: string) {
  // All queries are independent and fetch in parallel
  // Each has its own loading/error state
  const audits = useAuditsQuery(client);
  const overview = useAuditsQuery(client);
  const progress = useAuditsQuery(client);

  // Check if ANY query is loading
  const isLoading =
    audits.isLoading || overview.isLoading || progress.isLoading;

  // Check if ANY query has an error
  const isError = audits.isError || overview.isError || progress.isError;

  return { audits, overview, progress, isLoading, isError };
}

// ============================================
// Query Key Management
// ============================================
export function ExampleQueryKeys() {
  // Query keys enable precise cache invalidation after mutations
  // This is why query keys are centralized in lib/queryKeys.ts
  // Example:
  // auditQueryKeys.auditsByClient("ABC Manufacturing Ltd.")
  // → ["audit", "audits", "ABC Manufacturing Ltd."]
  //
  // When an auditor is assigned, we invalidate this key:
  // queryClient.invalidateQueries({
  //   queryKey: auditQueryKeys.auditsByClient("ABC Manufacturing Ltd."),
  // });
  //
  // This triggers an automatic refetch of all audits for that client
}
