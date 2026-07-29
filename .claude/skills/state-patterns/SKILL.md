---
name: state-patterns
description: State management patterns, reducer actions, and the three-layer state split
---

# State Patterns & Management

When adding or modifying state in this project, follow the three-layer split and action conventions.

## Three-Layer State Split

### Layer 1: Async/Domain State (useReducer)

The single source of truth for audit data, managed by `workspaceReducer`:

```tsx
interface WorkspaceState {
  overview: AuditOverview | null;
  areas: AuditArea[];
  progress: ProgressBreakdown | null;
  deadlines: Deadline[];
  activity: ActivityItem[];
  loading: boolean;
  error: string | null;
}
```

**Lives in:** `lib/workspaceReducer.ts` and dispatched via `useAuditWorkspace()` hook.

**Mutation rule:** Only the reducer changes this state. All actions go through `dispatch()`.

### Layer 2: UI State (useState)

Local UI state that doesn't affect the domain; reset on navigate:

```tsx
// In page.tsx
const [selectedClient, setSelectedClient] = useState(clients[0]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedRisk, setSelectedRisk] = useState<RiskLevel | "All">("All");
const [selectedStatus, setSelectedStatus] = useState<AreaStatus | "All">("All");
const [highlightedAreaId, setHighlightedAreaId] = useState<string | null>(null);

// In dialogs
const [selectedArea, setSelectedArea] = useState<AuditArea | null>(null);
```

**Never store in reducer:** Filter results, dialog open/close, highlighted items, form temp values.

### Layer 3: Derived Data (useMemo)

Computed lists that depend on layers 1 & 2. Never store in state:

```tsx
const filteredAreas = useMemo(() => {
  return state.areas.filter((area) => {
    const matchesSearch =
      searchQuery === "" ||
      area.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = selectedRisk === "All" || area.risk === selectedRisk;
    const matchesStatus =
      selectedStatus === "All" || area.status === selectedStatus;
    return matchesSearch && matchesRisk && matchesStatus;
  });
}, [state.areas, searchQuery, selectedRisk, selectedStatus]);
```

**Never do this:**

```tsx
// ❌ Bad: storing derived data
const [filteredAreas, setFilteredAreas] = useState<AuditArea[]>([]);
useEffect(() => {
  setFilteredAreas(state.areas.filter(...));
}, [state.areas, selectedRisk]);
```

## Reducer Actions

### Action Structure (Discriminated Union)

All actions must have a `type` field and optional `payload`:

```tsx
type WorkspaceAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { areas: AuditArea[] /* ... */ } }
  | { type: "FETCH_ERROR"; payload: string }
  | {
      type: "ASSIGN_AUDITOR";
      payload: { areaId: string; auditor: Auditor; userName: string };
    }
  | {
      type: "CHANGE_STATUS";
      payload: { areaId: string; status: AreaStatus; userName: string };
    }
  | { type: "MARK_COMPLETE"; payload: { areaId: string; userName: string } };
```

### Action Naming Convention

- **Fetching:** `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`
- **Domain mutations:** `ASSIGN_AUDITOR`, `CHANGE_STATUS`, `MARK_COMPLETE`
- **UI operations (not reducer):** Use `useState` instead

### Required: Activity Logging on Every Mutation

Every action that changes domain state **must** append a Recent Activity entry in the same reducer case:

```tsx
case "ASSIGN_AUDITOR": {
  const updatedAreas = state.areas.map((area) =>
    area.id === action.payload.areaId
      ? { ...area, assignedAuditor: action.payload.auditor }
      : area
  );

  // Get the area name for the activity message
  const areaName = state.areas.find((a) => a.id === action.payload.areaId)?.name || "audit area";

  // Prepend activity entry using the helper
  const newActivity = prependActivity(state.activity, {
    user: action.payload.userName,
    action: `Assigned ${action.payload.auditor.name} to ${areaName}`,
    time: "just now",
  });

  return {
    ...state,
    areas: updatedAreas,
    activity: newActivity,
  };
}
```

**Helper function** (already in workspaceReducer.ts):

```tsx
const prependActivity = (
  activity: ActivityItem[],
  newItem: Omit<ActivityItem, "id">
): ActivityItem[] => {
  const id =
    activity.length > 0 ? Math.max(...activity.map((a) => a.id)) + 1 : 1;
  return [{ ...newItem, id }, ...activity];
};
```

## Callback Props (Container → Presentational)

### Container Component (Dispatches)

```tsx
// app/components/areas/AuditAreaGrid.tsx
export default function AuditAreaGrid({ areas, dispatch, highlightedAreaId }) {
  const handleAssignAuditor = (auditor: Auditor) => {
    dispatch({
      type: "ASSIGN_AUDITOR",
      payload: { areaId: selectedArea.id, auditor, userName: "Current User" },
    });
  };

  return (
    <AuditAreaCard
      area={area}
      onAssignAuditor={(area) => setSelectedArea(area)}
      onChangeStatus={(area, status) => {
        dispatch({
          type: "CHANGE_STATUS",
          payload: { areaId: area.id, status, userName: "Current User" },
        });
      }}
    />
  );
}
```

### Presentational Component (Receives Callbacks)

```tsx
// app/components/areas/AuditAreaCard.tsx
interface AuditAreaCardProps {
  area: AuditArea;
  onAssignAuditor: (area: AuditArea) => void;
  onChangeStatus: (area: AuditArea, status: AreaStatus) => void;
  onMarkComplete: (area: AuditArea) => void;
}

export default function AuditAreaCard({
  area,
  onAssignAuditor,
  onChangeStatus,
  onMarkComplete,
}: AuditAreaCardProps) {
  return (
    <Card>
      <Select
        value={area.status}
        onValueChange={(status) => onChangeStatus(area, status)}
      >
        {/* ... */}
      </Select>
      <Button onClick={() => onAssignAuditor(area)}>Assign</Button>
      <Button onClick={() => onMarkComplete(area)}>Complete</Button>
    </Card>
  );
}
```

**Rule:** Presentational components never import `workspaceReducer` or call `dispatch()` directly. All domain changes go through callbacks.

## Common Patterns

### Fetching Data

```tsx
const fetchWorkspace = useCallback(async () => {
  dispatch({ type: "FETCH_START" });
  try {
    const response = await fetch("/api/audit");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    dispatch({
      type: "FETCH_SUCCESS",
      payload: {
        overview: data.auditOverview,
        areas: data.auditAreas,
        deadlines: data.deadlines,
        activity: data.activityItems,
      },
    });
  } catch (error) {
    dispatch({ type: "FETCH_ERROR", payload: error.message });
  }
}, []);
```

### Dialog State (Not in Reducer)

```tsx
const [selectedAreaForAssign, setSelectedAreaForAssign] =
  useState<AuditArea | null>(null);

const handleAssignAuditor = (auditor: Auditor) => {
  if (selectedAreaForAssign) {
    dispatch({ type: "ASSIGN_AUDITOR", payload: {/* ... */} });
    setSelectedAreaForAssign(null); // Close dialog after dispatch
  }
};

// Render dialog with callback from handleAssignAuditor
<AssignAuditorDialog
  open={selectedAreaForAssign !== null}
  onClose={() => setSelectedAreaForAssign(null)}
  onAssign={handleAssignAuditor}
/>;
```

### Timeout Cleanup (useRef)

For UI effects that can be interrupted (e.g., highlight timeout):

```tsx
const highlightTimeoutRef = useRef<NodeJS.Timeout>();

const handleHighlightArea = (areaId: string) => {
  if (highlightTimeoutRef.current) {
    clearTimeout(highlightTimeoutRef.current);
  }
  setHighlightedAreaId(areaId);
  highlightTimeoutRef.current = setTimeout(() => {
    setHighlightedAreaId(null);
  }, 1000);
};

useEffect(() => {
  return () => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
  };
}, []);
```

## Anti-Patterns to Avoid

❌ **Don't:** Store derived data in state

```tsx
const [filteredAreas, setFilteredAreas] = useState([]);
```

❌ **Don't:** Call dispatch from presentational components

```tsx
// AuditAreaCard.tsx
dispatch({ type: "ASSIGN_AUDITOR", ... }); // Wrong!
```

❌ **Don't:** Forget activity logging

```tsx
case "CHANGE_STATUS": {
  // Updates status but no activity entry = incomplete
  return { ...state, areas: updatedAreas };
}
```

❌ **Don't:** Leave uncleared timeouts

```tsx
const handleHighlight = () => {
  setTimeout(() => setHighlighted(false), 1000); // No cleanup!
};
```

✅ **Do:** Use the three-layer split correctly, pass callbacks down, log activities, clean up effects.
