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
        <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:h-16">
          {[1, 2, 3, 4, 5].map((key) => (
            <div
              key={key}
              className="flex-1 flex flex-col justify-between py-1 min-w-0 gap-2"
            >
              <Skeleton width="40%" height="14px" />
              <Skeleton width="70%" height="16px" />
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
      {/* Mobile: Stack vertically, Tablet: 2 rows, Desktop: Single row */}
      <div className="flex flex-col gap-4 md:gap-3 md:flex-wrap md:flex-row lg:gap-6 lg:h-16 lg:flex-nowrap">
        {/* Client */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0 md:w-1/3 lg:w-auto">
          <p className="text-xs font-medium text-neutral-600">Client</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1">
            {clientName}
          </p>
        </div>

        {/* FY / Status */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0 md:w-1/3 lg:w-auto">
          <p className="text-xs font-medium text-neutral-600">FY / Status</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900">
            {overview.financialYear} / {overview.engagementStatus}
          </p>
        </div>

        {/* Partner / Manager */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0 md:w-1/3 lg:w-auto">
          <p className="text-xs font-medium text-neutral-600">Partner / Mgr</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1">
            {overview.engagementPartner} / {overview.auditManager}
          </p>
        </div>

        {/* Start / Due */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0 md:w-1/3 lg:w-auto">
          <p className="text-xs font-medium text-neutral-600">Start / Due</p>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1">
            <span className="hidden sm:inline">
              {startDate} → {dueDate}
            </span>
            <span className="sm:hidden">
              {startDate.split(" ")[0]} → {dueDate.split(" ")[0]}
            </span>
          </p>
        </div>

        {/* Overall Progress */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0 md:w-1/3 lg:w-auto">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xs font-medium text-neutral-600">Progress</p>
            <p className="text-xs font-semibold text-neutral-600 whitespace-nowrap">
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
