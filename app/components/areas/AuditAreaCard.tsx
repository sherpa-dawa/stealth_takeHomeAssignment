"use client";

import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { Eye, UserPlus } from "lucide-react";
import { AuditArea, AreaStatus } from "@/lib/types";
import RiskChip from "../shared/RiskChip";
import StatusChip from "../shared/StatusChip";
import { componentColors, getColorClass } from "@/lib/colorTokens";
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
          ? `border-2 ${getColorClass("border", componentColors.highlight.border)} shadow-lg`
          : `border ${getColorClass("border", componentColors.border.light)}`
      }`}
    >
      <CardContent className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4 flex flex-col h-full">
        {/* Header: Name & Risk */}
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h3
            className={`text-xs sm:text-sm font-semibold ${getColorClass("text", componentColors.text.primary)} flex-1 break-words`}
          >
            {area.name}
          </h3>
          <RiskChip risk={area.risk} size="sm" />
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div
              className={`flex-1 ${getColorClass("bg", componentColors.progress.background)} rounded-full h-1.5 overflow-hidden`}
            >
              <div
                className={`${getColorClass("bg", componentColors.progress.bar)} h-full rounded-full transition-all duration-300`}
                style={{ width: `${area.progress}%` }}
              />
            </div>
            <span
              className={`text-xs font-semibold ${getColorClass("text", componentColors.text.primary)} whitespace-nowrap`}
            >
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
            <p
              className={`text-xs font-medium ${getColorClass("text", componentColors.text.primary)} truncate`}
            >
              {area.assignedAuditor?.name || "Unassigned"}
            </p>
          </div>
        </div>

        {/* Tasks & Evidence - Compact */}
        <div
          className={`grid grid-cols-2 gap-2 sm:gap-3 py-2 border-t border-b ${getColorClass("border", componentColors.border.light)}`}
        >
          <div>
            <span
              className={`text-xs ${getColorClass("text", componentColors.text.secondary)} block`}
            >
              Tasks
            </span>
            <span
              className={`text-xs sm:text-sm font-semibold ${getColorClass("text", componentColors.text.primary)}`}
            >
              {openTasksCount}
            </span>
          </div>
          <div>
            <span
              className={`text-xs ${getColorClass("text", componentColors.text.secondary)} block`}
            >
              Evidence
            </span>
            <span
              className={`text-xs sm:text-sm font-semibold ${getColorClass("text", componentColors.text.primary)}`}
            >
              {evidenceRequestedCount}
            </span>
          </div>
        </div>

        {/* Status with Dropdown */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-xs font-medium ${getColorClass("text", componentColors.text.secondary)}`}
          >
            Status
          </span>
          <Select
            value={area.status}
            onValueChange={(value) => handleStatusChange(value as AreaStatus)}
          >
            <SelectTrigger
              className={`w-auto border-0 bg-transparent p-0 h-auto text-xs font-medium hover:${getColorClass("bg", componentColors.background.tertiary)}`}
            >
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

        {/* Action Buttons - View & Assign Only */}
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
        </div>
      </CardContent>
    </Card>
  );
}
