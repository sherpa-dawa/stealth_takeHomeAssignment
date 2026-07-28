import { Box, Button, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SaveIcon from "@mui/icons-material/Save";

export default function WorkspaceHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Audit Planning Workspace
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          size="small"
        >
          Export
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} size="small">
          Save
        </Button>
      </Box>
    </Box>
  );
}
