import { Box } from "@mui/material";
import { AuditArea } from "@/lib/types";
import AuditAreaCard from "./AuditAreaCard";

interface AuditAreaGridProps {
  areas: AuditArea[];
}

export default function AuditAreaGrid({ areas }: AuditAreaGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {areas.map((area) => (
        <AuditAreaCard key={area.id} area={area} />
      ))}
    </Box>
  );
}
