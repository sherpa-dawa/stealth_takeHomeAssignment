"use client";

import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { Eye, UserPlus } from "lucide-react";
import { AuditArea, AreaStatus } from "@/lib/types";
import RiskChip from "../shared/RiskChip";
import StatusChip from "../shared/StatusChip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface AuditAreaCardProps {
  area: AuditArea;
  isHighlighted?: boolean;
  onViewDetails: (area: AuditArea) => void;
  onChangeStatus: (area: AuditArea, status: AreaStatus) => void;
  onAssignAuditor: (area: AuditArea) => void;
  onMarkComplete: (area: AuditArea) => void;
}

const statuses: AreaStatus[] = [
  "Planning",
  "In Progress",
  "Review",
  "Complete",
];

export default function AuditAreaCard({
  area,
  isHighlighted,
  onViewDetails,
  onChangeStatus,
  onAssignAuditor,
  onMarkComplete,
}: AuditAreaCardProps) {
  const openTasksCount = area.tasks.filter((t) => t.status === "Open").length;
  const evidenceRequestedCount = area.evidence.filter(
    (e) => e.status === "Open"
  ).length;

  const handleStatusChange = (newStatus: AreaStatus) => {
    onChangeStatus(area, newStatus);
  };

  return (
    <Card
      className={`hover:shadow-md transition-all duration-300 bg-white h-full ${
        isHighlighted
          ? "border-2 border-red-500 shadow-lg"
          : "border border-neutral-200"
      }`}
    >
      <CardContent className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4 flex flex-col h-full">
        {/* Header: Name & Risk */}
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 flex-1 break-words">
            {area.name}
          </h3>
          <RiskChip risk={area.risk} size="sm" />
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${area.progress}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-neutral-900 whitespace-nowrap">
              {area.progress}%
            </span>
          </div>
        </div>

        {/* Auditor */}
        <div className="flex items-center gap-2 min-w-0">
          <Avatar
            initials={area.assignedAuditor?.avatar || "?"}
            size="sm"
            className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-neutral-900 truncate">
              {area.assignedAuditor?.name || "Unassigned"}
            </p>
          </div>
        </div>

        {/* Tasks & Evidence - Compact */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 py-2 border-t border-b border-neutral-100">
          <div>
            <span className="text-xs text-neutral-600 block">Tasks</span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-900">
              {openTasksCount}
            </span>
          </div>
          <div>
            <span className="text-xs text-neutral-600 block">Evidence</span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-900">
              {evidenceRequestedCount}
            </span>
          </div>
        </div>

        {/* Status with Dropdown */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-neutral-600">Status</span>
          <Select
            value={area.status}
            onValueChange={(value) => handleStatusChange(value as AreaStatus)}
          >
            <SelectTrigger className="w-auto border-0 bg-transparent p-0 h-auto text-xs font-medium hover:bg-neutral-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  <StatusChip status={status} size="sm" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons - Refined */}
        <div className="flex gap-1 sm:gap-1.5 pt-2 mt-auto flex-wrap">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onViewDetails(area)}
            className="h-6 sm:h-7 px-1.5 sm:px-2 text-xs flex-1 sm:flex-none"
            title="View details"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
            <span className="hidden sm:inline">View</span>
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onAssignAuditor(area)}
            className="h-6 sm:h-7 px-1.5 sm:px-2 text-xs flex-1 sm:flex-none"
            title="Assign auditor"
          >
            <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
            <span className="hidden sm:inline">Assign</span>
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onMarkComplete(area)}
            className="h-6 sm:h-7 px-1.5 sm:px-2 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 flex-1 sm:flex-none"
            title="Mark complete"
          >
            <span className="hidden sm:inline">Complete</span>
            <span className="sm:hidden">✓</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
