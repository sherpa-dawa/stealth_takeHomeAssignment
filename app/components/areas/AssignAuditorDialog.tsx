"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Auditor } from "@/lib/types";

const mockAuditors: Auditor[] = [
  { id: "a1", name: "Emma Wilson", avatar: "EW" },
  { id: "a2", name: "David Martinez", avatar: "DM" },
  { id: "a3", name: "Lisa Anderson", avatar: "LA" },
  { id: "a4", name: "James Rodriguez", avatar: "JR" },
  { id: "a5", name: "Jennifer Taylor", avatar: "JT" },
];

interface AssignAuditorDialogProps {
  open: boolean;
  onClose: () => void;
  onAssign: (auditor: Auditor) => void;
  currentAuditor?: Auditor | null;
}

export default function AssignAuditorDialog({
  open,
  onClose,
  onAssign,
  currentAuditor,
}: AssignAuditorDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Auditor</DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {mockAuditors.map((auditor) => (
            <ListItem key={auditor.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  onAssign(auditor);
                  onClose();
                }}
                selected={currentAuditor?.id === auditor.id}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: "#1976d2",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    {auditor.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={auditor.name}
                  secondary={`ID: ${auditor.id}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
