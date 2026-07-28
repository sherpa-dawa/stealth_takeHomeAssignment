import { Box, LinearProgress, Typography, Card, CardContent } from "@mui/material";
import { ProgressBreakdown } from "@/lib/types";

interface ProgressWidgetProps {
  progress: ProgressBreakdown | null;
}

const phaseColors = {
  planning: "#b3e5fc",
  evidence: "#fff9c4",
  review: "#c8e6c9",
};

export default function ProgressWidget({ progress }: ProgressWidgetProps) {
  if (!progress) return null;

  return (
    <Card sx={{ border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Progress Breakdown
        </Typography>

        {/* Planning */}
        <Box sx={{ marginBottom: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Planning
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {progress.planning}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress.planning}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: phaseColors.planning,
              },
            }}
          />
        </Box>

        {/* Evidence */}
        <Box sx={{ marginBottom: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Evidence
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {progress.evidence}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress.evidence}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: phaseColors.evidence,
              },
            }}
          />
        </Box>

        {/* Review */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Review
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {progress.review}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress.review}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: phaseColors.review,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
