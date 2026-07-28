import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { AuditArea } from "@/lib/types";
import RiskChip from "../shared/RiskChip";

interface HighRiskListProps {
  areas: AuditArea[];
}

export default function HighRiskList({ areas }: HighRiskListProps) {
  if (areas.length === 0) return null;

  return (
    <Card sx={{ border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
          High-Risk Areas
        </Typography>

        <List sx={{ padding: 0 }}>
          {areas.map((area) => (
            <ListItem
              key={area.id}
              sx={{
                padding: "0.75rem 0",
                borderBottom: "1px solid #f0f0f0",
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, flex: 1 }}
                    >
                      {area.name}
                    </Typography>
                    <RiskChip risk={area.risk} size="small" />
                  </Box>
                }
                secondary={
                  <Box sx={{ marginTop: "0.5rem" }}>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Progress: {area.progress}%
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
