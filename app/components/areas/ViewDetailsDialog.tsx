"use client";

import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/Dialog";
import { AuditArea } from "@/lib/types";
import RiskChip from "../shared/RiskChip";
import StatusChip from "../shared/StatusChip";

interface ViewDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  area: AuditArea | null;
}

export default function ViewDetailsDialog({
  open,
  onClose,
  area,
}: ViewDetailsDialogProps) {
  if (!area) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{area.name}</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Risk and Status */}
          <div className="flex gap-2">
            <RiskChip risk={area.risk} size="md" />
            <StatusChip status={area.status} size="md" />
          </div>

          <div className="border-t border-neutral-200" />

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-neutral-900">
                Progress
              </span>
              <span className="text-sm font-semibold text-neutral-900">
                {area.progress}%
              </span>
            </div>
            <div className="w-full bg-neutral-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${area.progress}%` }}
              />
            </div>
          </div>

          <div className="border-t border-neutral-200" />

          {/* Assigned Auditor */}
          <div>
            <p className="text-xs font-semibold text-neutral-700 mb-2">
              Assigned Auditor
            </p>
            {area.assignedAuditor ? (
              <div className="flex items-center gap-2">
                <Avatar initials={area.assignedAuditor.avatar} size="md" />
                <p className="text-sm text-neutral-900">
                  {area.assignedAuditor.name}
                </p>
              </div>
            ) : (
              <p className="text-sm text-neutral-500 italic">Unassigned</p>
            )}
          </div>

          <div className="border-t border-neutral-200" />

          {/* Tasks and Evidence */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-neutral-700 mb-2">
                Open Tasks
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                {area.openTasks}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-700 mb-2">
                Evidence Requested
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                {area.evidenceRequested}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
