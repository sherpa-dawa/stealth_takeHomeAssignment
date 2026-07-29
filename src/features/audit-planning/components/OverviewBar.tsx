import { AuditOverview } from "@/features/audit-planning/types";

interface OverviewBarProps {
  overview: AuditOverview | null;
  selectedClient?: string;
  isLoading?: boolean;
}

const Skeleton = ({
  width = "100%",
  height = "16px",
}: {
  width?: string;
  height?: string;
}) => (
  <div
    className="bg-neutral-300 rounded animate-pulse"
    style={{ width, height }}
  />
);

function formatDate(dateString: string): string {
  const [y, m, d] = dateString.split("-").map(Number) as [
    number,
    number,
    number,
  ];
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OverviewBar({
  overview,
  selectedClient,
  isLoading = false,
}: OverviewBarProps) {
  if (!overview && !isLoading) return null;

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-neutral-100 border-b border-neutral-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5].map((key) => (
            <div key={key} className="flex flex-col gap-2">
              <Skeleton width="50%" height="14px" />
              <Skeleton width="80%" height="16px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!overview) return null;

  const startDate = formatDate(overview.startDate);
  const dueDate = formatDate(overview.dueDate);
  const clientName = selectedClient || overview.clientName;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-neutral-100 border-b border-neutral-200">
      {/* Responsive grid: 2 cols mobile, 3 cols tablet, 5 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Client */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-neutral-600">Client</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2">
            {clientName}
          </p>
        </div>

        {/* FY / Status */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-neutral-600">FY / Status</p>
          <div className="text-xs sm:text-sm font-semibold text-neutral-900">
            <p>{overview.financialYear}</p>
            <p className="text-xs text-neutral-700">
              {overview.engagementStatus}
            </p>
          </div>
        </div>

        {/* Partner / Manager */}
        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-medium text-neutral-600">Partner / Mgr</p>
          <div className="text-xs sm:text-sm font-semibold text-neutral-900">
            <p className="line-clamp-1">{overview.engagementPartner}</p>
            <p className="text-xs text-neutral-700 line-clamp-1">
              {overview.auditManager}
            </p>
          </div>
        </div>

        {/* Start / Due */}
        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-medium text-neutral-600">Start / Due</p>
          <div className="text-xs sm:text-sm font-semibold text-neutral-900">
            <p className="hidden sm:block">
              <span className="block">{startDate}</span>
              <span className="block">{dueDate}</span>
            </p>
            <p className="sm:hidden text-xs">
              <span className="block">{startDate.split(" ")[0]}</span>
              <span className="block">{dueDate.split(" ")[0]}</span>
            </p>
          </div>
        </div>

        {/* Overall Progress - Full width on mobile/tablet */}
        <div className="flex flex-col gap-1 col-span-2 sm:col-span-3 lg:col-span-1">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xs font-medium text-neutral-600">Progress</p>
            <p className="text-xs font-semibold text-neutral-600">
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
    </div>
  );
}
