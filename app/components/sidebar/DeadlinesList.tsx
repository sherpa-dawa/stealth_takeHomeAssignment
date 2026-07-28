import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Chip,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { Deadline } from "@/lib/types";

interface DeadlinesListProps {
  deadlines: Deadline[];
}

const getUrgencyColor = (daysRemaining: number) => {
  if (daysRemaining <= 7) return "#f44336";
  if (daysRemaining <= 14) return "#ff9800";
  return "#4caf50";
};

export default function DeadlinesList({ deadlines }: DeadlinesListProps) {
  if (deadlines.length === 0) return null;

  return (
    <Card sx={{ border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Upcoming Deadlines
        </Typography>

        <List sx={{ padding: 0 }}>
          {deadlines.map((deadline) => (
            <ListItem
              key={deadline.id}
              sx={{
                padding: "0.75rem 0",
                borderBottom: "1px solid #f0f0f0",
                "&:last-child": {
                  borderBottom: "none",
                },
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {deadline.title}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <EventIcon sx={{ fontSize: "1rem", color: "#666" }} />
                <Typography variant="caption" sx={{ color: "#666" }}>
                  {new Date(deadline.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
              <Chip
                label={`${deadline.daysRemaining} days remaining`}
                size="small"
                sx={{
                  backgroundColor: getUrgencyColor(deadline.daysRemaining),
                  color: "#fff",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
