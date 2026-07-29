# TanStack Query (React Query) Integration

## Overview

This project uses **TanStack Query v5** for professional data fetching, caching, and state management. Query provides a powerful abstraction over async operations with built-in solutions for:

- ✅ Request deduplication (multiple identical requests within a time window coalesce into one)
- ✅ Automatic cache management with configurable stale times
- ✅ Built-in loading/error/success states per query
- ✅ Smart retry logic with exponential backoff
- ✅ Stale-while-revalidate patterns
- ✅ Optimistic updates for mutations
- ✅ Automatic query invalidation after mutations

## Architecture

### Query Client Configuration

Located in `lib/queryClient.ts`, provides sensible defaults:

```typescript
// Queries are fresh for 5 minutes, cached for 10 minutes
staleTime: 1000 * 60 * 5;
gcTime: 1000 * 60 * 10; // formerly cacheTime

// Automatic retry with exponential backoff
retry: 1;
retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000);
```

### Query Keys

All query keys are centralized in `lib/queryKeys.ts` using a factory pattern:

```typescript
// Ensures consistency and enables precise cache invalidation
auditQueryKeys.auditsByClient("ABC Manufacturing Ltd.");
// → ["audit", "audits", "ABC Manufacturing Ltd."]

auditQueryKeys.overviewByClient("ABC Manufacturing Ltd.");
// → ["audit", "overview", "ABC Manufacturing Ltd."]
```

This allows invalidating related queries when mutations succeed:

```typescript
queryClient.invalidateQueries({
  queryKey: auditQueryKeys.auditsByClient(client),
});
```

## Query Hooks

Located in `hooks/queries/`, each hook wraps a single API call with Query:

### `useAuditsQuery(client: string)`

Fetch all audit areas for a client.

```typescript
import { useAuditsQuery } from "@/features/audit-planning";

function MyComponent() {
  const { data, isLoading, isError, error, refetch } = useAuditsQuery("ABC Manufacturing Ltd.");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return <div>{data?.map(area => area.name)}</div>;
}
```

### `useOverviewQuery(client: string)`

Fetch audit overview metadata.

```typescript
const { data: overview } = useOverviewQuery(client);
```

### `useProgressQuery()`

Fetch progress breakdown across all audits.

```typescript
const { data: progress } = useProgressQuery();
```

### `useHighRiskAreasQuery(client: string)`

Fetch high-risk audit areas for a client.

```typescript
const { data: highRiskAreas } = useHighRiskAreasQuery(client);
```

### `useDeadlinesQuery()`

Fetch upcoming deadlines.

```typescript
const { data: deadlines } = useDeadlinesQuery();
```

### `useActivityQuery()`

Fetch recent activity.

```typescript
const { data: activity } = useActivityQuery();
```

## Mutation Hooks

Located in `hooks/mutations/`, mutations handle state changes and cache invalidation.

### `useAssignAuditorMutation()`

Assign an auditor to an audit area.

```typescript
import { useAssignAuditorMutation } from "@/features/audit-planning";

function AssignAuditor() {
  const { mutate, isPending, error } = useAssignAuditorMutation();

  const handleAssign = () => {
    mutate({
      areaId: "revenue",
      auditorId: "u1",
      client: "ABC Manufacturing Ltd.",
    });
  };

  return (
    <button onClick={handleAssign} disabled={isPending}>
      {isPending ? "Assigning..." : "Assign Auditor"}
    </button>
  );
}
```

When the mutation succeeds, related queries (audits for that client) are automatically invalidated and refetch.

### `useChangeStatusMutation()`

Change the status of an audit area.

```typescript
const { mutate } = useChangeStatusMutation();

mutate({
  areaId: "inventory",
  status: "In Progress",
  client: "ABC Manufacturing Ltd.",
});
```

## Professional Patterns

### 1. Optimistic Updates

For better UX, update the UI before the server confirms:

```typescript
const { mutate } = useChangeStatusMutation();

const handleStatusChange = (status: string) => {
  // Optimistically update cache
  queryClient.setQueryData(
    auditQueryKeys.auditsByClient(client),
    (old: AuditArea[] | undefined) =>
      old?.map((a) => (a.id === areaId ? { ...a, status } : a))
  );

  // Fire mutation; if it fails, Query will rollback
  mutate({ areaId, status, client });
};
```

### 2. Dependent Queries

Fetch related data only when the first query succeeds:

```typescript
const { data: client } = useClientQuery();
const { data: audits, isLoading } = useAuditsQuery(client?.id ?? "");
// Query won't run until client is defined
```

### 3. Manual Refetch

Trigger a manual refetch when needed:

```typescript
const { refetch } = useAuditsQuery(client);

const handleRefresh = async () => {
  await refetch();
};
```

### 4. Polling

Refetch data at regular intervals:

```typescript
useAuditsQuery(client, {
  refetchInterval: 1000 * 60, // Refetch every minute
  refetchOnWindowFocus: true, // Also refetch when user refocuses tab
});
```

### 5. Disable Queries Conditionally

Skip a query if a condition isn't met:

```typescript
useAuditsQuery(client, {
  enabled: !!client, // Only run if client is truthy
});
```

## Migration Guide: From Reducer to Query

### Before (Reducer Pattern)

```typescript
const { state, dispatch, refetch } = useAuditWorkspace(client);

if (state.loading) return <LoadingState />;
if (state.error) return <ErrorState error={state.error} />;

return <div>{state.areas.map(...)}</div>;
```

### After (Query Pattern)

```typescript
const { data: areas, isLoading, isError, error } = useAuditsQuery(client);

if (isLoading) return <LoadingState />;
if (isError) return <ErrorState error={error?.message} />;

return <div>{areas?.map(...)}</div>;
```

**Benefits:**

- No manual dispatch calls
- Loading/error states are scoped to each query
- Automatic request deduplication
- Built-in retry and cache management
- Mutations trigger automatic cache invalidation

## DevTools

Install and use TanStack Query DevTools for development:

```bash
npm install @tanstack/react-query-devtools
```

Add to your app:

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

This gives you:

- Visual cache state inspection
- Query execution timeline
- Manual query invalidation
- Cache state mutation

## Best Practices

✅ **Do:**

- Use query hooks for all data fetching
- Keep queries focused and single-purpose
- Use the query keys factory for consistency
- Implement proper error handling
- Use mutations for state changes
- Leverage automatic cache invalidation

❌ **Don't:**

- Mix reducer fetching with Query hooks in the same component
- Manually manage `loading`/`error` states when Query handles them
- Call `refetch()` on every component render
- Bypass cache invalidation by refetching manually
- Use Query for non-async operations (state changes use Redux/Zustand)

## Testing

For testing components with Query hooks, wrap them with QueryClientProvider:

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
);
```

Mock queries with `queryClient.setQueryData()`:

```typescript
queryClient.setQueryData(
  auditQueryKeys.auditsByClient("ABC Manufacturing Ltd."),
  mockAuditAreas
);
```

## Resources

- [TanStack Query Official Docs](https://tanstack.com/query/latest)
- [React Query Course (School.com)](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2)
- [Query Devtools](https://tanstack.com/query/latest/docs/react/devtools)
