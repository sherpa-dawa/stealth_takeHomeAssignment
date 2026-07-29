"use client";

import { Avatar } from "../ui/Avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/Dialog";
import { AuditArea } from "@/lib/types";
import RiskChip from "../shared/RiskChip";
import StatusChip from "../shared/StatusChip";
import { componentColors, getColorClass } from "@/lib/colorTokens";
import { CheckSquare, FileText } from "lucide-react";

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

  const openTasksCount = area.tasks.filter((t) => t.status === "Open").length;
  const evidenceRequestedCount = area.evidence.filter(
    (e) => e.status === "Open"
  ).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-xl lg:max-w-2xl p-4 sm:p-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
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

          <div
            className={`border-t ${getColorClass("border", componentColors.border.light)}`}
          />

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-sm font-semibold ${getColorClass("text", componentColors.text.primary)}`}
              >
                Progress
              </span>
              <span
                className={`text-sm font-semibold ${getColorClass("text", componentColors.text.primary)}`}
              >
                {area.progress}%
              </span>
            </div>
            <div
              className={`w-full ${getColorClass("bg", componentColors.progress.background)} rounded-full h-2 overflow-hidden`}
            >
              <div
                className={`${getColorClass("bg", componentColors.progress.bar)} h-full rounded-full transition-all duration-500`}
                style={{ width: `${area.progress}%` }}
              />
            </div>
          </div>

          <div
            className={`border-t ${getColorClass("border", componentColors.border.light)}`}
          />

          {/* Assigned Auditor */}
          <div>
            <p
              className={`text-xs font-semibold ${getColorClass("text", componentColors.text.secondary)} mb-2`}
            >
              Assigned Auditor
            </p>
            {area.assignedAuditor ? (
              <div className="flex items-center gap-2">
                <Avatar name={area.assignedAuditor.name} size="md" />
                <p
                  className={`text-sm ${getColorClass("text", componentColors.text.primary)}`}
                >
                  {area.assignedAuditor.name}
                </p>
              </div>
            ) : (
              <p
                className={`text-sm ${getColorClass("text", componentColors.text.tertiary)} italic`}
              >
                Unassigned
              </p>
            )}
          </div>

          <div
            className={`border-t ${getColorClass("border", componentColors.border.light)}`}
          />

          {/* Tasks and Evidence */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <CheckSquare className="w-4 h-4" />
                <p
                  className={`text-xs font-semibold ${getColorClass("text", componentColors.text.secondary)}`}
                >
                  Open Tasks
                </p>
              </div>
              <p
                className={`text-2xl font-bold ${getColorClass("text", componentColors.text.primary)}`}
              >
                {openTasksCount}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <FileText className="w-4 h-4" />
                <p
                  className={`text-xs font-semibold ${getColorClass("text", componentColors.text.secondary)}`}
                >
                  Evidence Requested
                </p>
              </div>
              <p
                className={`text-2xl font-bold ${getColorClass("text", componentColors.text.primary)}`}
              >
                {evidenceRequestedCount}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
