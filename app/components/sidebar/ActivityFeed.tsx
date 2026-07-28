import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import { ActivityItem } from "@/lib/types";

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) return null;

  return (
    <Card sx={{ border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Recent Activity
        </Typography>

        <List sx={{ padding: 0 }}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                padding: "0.75rem 0",
                borderBottom: "1px solid #f0f0f0",
                "&:last-child": {
                  borderBottom: "none",
                },
                display: "flex",
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#1976d2",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {item.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {item.user}
                </Typography>
                <Typography variant="caption" sx={{ display: "block" }}>
                  {item.action}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#999", fontSize: "0.7rem" }}
                >
                  {item.time}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
