"use client";

import { Avatar } from "@/components/common/Avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/common/Dialog";
import { Auditor } from "@/features/audit-planning/types";

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Auditor</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="space-y-2 py-4">
          {mockAuditors.map((auditor) => (
            <button
              key={auditor.id}
              onClick={() => {
                onAssign(auditor);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors ${
                currentAuditor?.id === auditor.id
                  ? "bg-primary-100 border border-primary-300"
                  : "hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              <Avatar name={auditor.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900">{auditor.name}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
