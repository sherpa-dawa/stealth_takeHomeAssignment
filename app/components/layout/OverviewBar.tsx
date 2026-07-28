import { Box, LinearProgress, Typography } from "@mui/material";
import { AuditOverview } from "@/lib/types";

interface OverviewBarProps {
  overview: AuditOverview | null;
}

export default function OverviewBar({ overview }: OverviewBarProps) {
  if (!overview) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ padding: "1.5rem 2rem", backgroundColor: "#f5f5f5" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
          gap: 3,
          marginBottom: 2,
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Client
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {overview.clientName}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Financial Year / Status
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {overview.financialYear} / {overview.engagementStatus}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Partner / Manager
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {overview.engagementPartner} / {overview.auditManager}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Timeline
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {formatDate(overview.startDate)} - {formatDate(overview.dueDate)}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Overall Progress
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {overview.overallProgress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={overview.overallProgress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              backgroundColor: "#1976d2",
            },
          }}
        />
      </Box>
    </Box>
  );
}
