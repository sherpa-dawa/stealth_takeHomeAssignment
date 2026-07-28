import { AuditOverview } from "@/lib/types";

interface OverviewBarProps {
  overview: AuditOverview | null;
}

export default function OverviewBar({ overview }: OverviewBarProps) {
  if (!overview) return null;

  return (
    <div className="px-8 py-6 bg-neutral-100 border-b border-neutral-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-1">Client</p>
          <p className="text-sm font-semibold text-neutral-900">
            {overview.clientName}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-1">
            FY / Status
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {overview.financialYear} / {overview.engagementStatus}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-1">
            Partner / Manager
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {overview.engagementPartner} / {overview.auditManager}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-1">Timeline</p>
          <p className="text-sm font-semibold text-neutral-900">Q1 - Q4 2024</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold text-neutral-700">
            Overall Progress
          </p>
          <p className="text-xs font-semibold text-neutral-700">
            {overview.overallProgress}%
          </p>
        </div>
        <div className="w-full bg-neutral-300 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${overview.overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
