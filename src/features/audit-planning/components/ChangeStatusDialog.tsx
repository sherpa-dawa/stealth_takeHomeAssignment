"use client";

import { Button } from "@/shared/components/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/shared/components/Dialog";
import { AreaStatus } from "@/features/audit-planning/types";
import StatusChip from "@/shared/components/StatusChip";

const statuses: AreaStatus[] = [
  "Planning",
  "In Progress",
  "Review",
  "Complete",
];

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="space-y-2 py-4">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                onChangeStatus(status);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors ${
                currentStatus === status
                  ? "bg-primary-100 border border-primary-300"
                  : "hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              <span className="font-medium text-neutral-900">{status}</span>
              <StatusChip status={status} size="sm" />
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
