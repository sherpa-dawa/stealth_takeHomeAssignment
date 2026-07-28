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
  ListItemText,
  Chip,
} from "@mui/material";
import { AreaStatus } from "@/lib/types";
import StatusChip from "../shared/StatusChip";

const statuses: AreaStatus[] = ["Planning", "In Progress", "Review", "Complete"];

interface ChangeStatusDialogProps {
  open: boolean;
  onClose: () => void;
  onChangeStatus: (status: AreaStatus) => void;
  currentStatus: AreaStatus;
}

export default function ChangeStatusDialog({
  open,
  onClose,
  onChangeStatus,
  currentStatus,
}: ChangeStatusDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {statuses.map((status) => (
            <ListItem key={status} disablePadding>
              <ListItemButton
                onClick={() => {
                  onChangeStatus(status);
                  onClose();
                }}
                selected={currentStatus === status}
              >
                <ListItemText primary={status} />
                <StatusChip status={status} size="small" />
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
