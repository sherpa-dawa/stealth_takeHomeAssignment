"use client";

import { Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface EmptyStateProps {
  variant: "no-data" | "no-results";
}

export default function EmptyState({ variant }: EmptyStateProps) {
  const isNoData = variant === "no-data";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        flexDirection: "column",
        gap: 2,
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {isNoData ? (
        <>
          <InboxIcon sx={{ fontSize: 80, color: "#ccc" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#666" }}>
            No Audit Areas Found
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", maxWidth: 400 }}>
            There are no audit areas to display. This audit workspace appears to
            be empty.
          </Typography>
        </>
      ) : (
        <>
          <FilterAltIcon sx={{ fontSize: 80, color: "#ccc" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#666" }}>
            No Results Match Your Filters
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", maxWidth: 400 }}>
            Try adjusting your search query or filter criteria to find the audit
            areas you&apos;re looking for.
          </Typography>
        </>
      )}
    </Box>
  );
}
