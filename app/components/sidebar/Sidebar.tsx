import { Box, Stack } from "@mui/material";
import { WorkspaceState } from "@/lib/workspaceReducer";
import ProgressWidget from "./ProgressWidget";
import HighRiskList from "./HighRiskList";
import DeadlinesList from "./DeadlinesList";
import ActivityFeed from "./ActivityFeed";

interface SidebarProps {
  state: WorkspaceState;
}

export default function Sidebar({ state }: SidebarProps) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 320,
      }}
    >
      <Stack spacing={2}>
        <ProgressWidget progress={state.progress} />
        <HighRiskList areas={state.highRiskAreas} />
        <DeadlinesList deadlines={state.deadlines} />
        <ActivityFeed items={state.activity} />
      </Stack>
    </Box>
  );
}
