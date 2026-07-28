"use client";

import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function LoadingState() {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      {/* Left: Loading Skeleton Cards */}
      <Box
        sx={{
          flex: 1,
          padding: "2rem",
          overflowY: "auto",
          backgroundColor: "#fafafa",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Box key={key}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {/* Title and Risk Chip */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width="60%" height={28} />
                  <Skeleton variant="rectangular" width={60} height={24} />
                </Box>

                {/* Progress Section */}
                <Box>
                  <Skeleton
                    variant="text"
                    width="30%"
                    height={16}
                    sx={{ mb: 1 }}
                  />
                  <Skeleton variant="rectangular" height={6} />
                </Box>

                {/* Assigned Auditor Section */}
                <Box>
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={16}
                    sx={{ mb: 0.5 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="text" width="50%" height={16} />
                  </Box>
                </Box>

                {/* Open Tasks and Evidence Section */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="50%" height={16} />
                    <Skeleton variant="text" width="30%" height={16} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={16} />
                    <Skeleton variant="text" width="30%" height={16} />
                  </Box>
                </Box>

                {/* Status Section */}
                <Box>
                  <Skeleton variant="text" width="25%" height={16} />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={24}
                    sx={{ mt: 0.5 }}
                  />
                </Box>

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {[1, 2, 3, 4].map((btn) => (
                    <Skeleton
                      key={btn}
                      variant="rectangular"
                      width="23%"
                      height={32}
                      sx={{ flex: 1, minWidth: "45px" }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Right: Loading Sidebar */}
      <Box
        sx={{
          width: 360,
          padding: "2rem",
          overflowY: "auto",
          borderLeft: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Card sx={{ border: "1px solid #e0e0e0" }}>
          <CardContent>
            <Skeleton variant="text" width="50%" height={28} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    gap: 1,
                    paddingBottom: 1.5,
                    borderBottom: "1px solid #f0f0f0",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{ flexShrink: 0 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="70%" height={16} />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={14}
                      sx={{ mt: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={12}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
