import { WorkspaceState } from "@/lib/workspaceReducer";

interface SidebarProps {
  state: WorkspaceState;
}

export default function Sidebar({ state }: SidebarProps) {
  const highRiskAreas = state.areas.filter((a) => a.risk === "High");

  return (
    <div className="w-full space-y-6 p-6">
      {/* Overall Progress - Phase Breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">
          Overall Progress
        </h3>
        <div className="space-y-3">
          {/* Planning */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-neutral-700">
                Planning
              </span>
              <span className="text-xs font-semibold text-neutral-900">
                70%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
              <div className="w-[70%] bg-blue-500 h-full" />
            </div>
          </div>

          {/* Evidence */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-neutral-700">
                Evidence
              </span>
              <span className="text-xs font-semibold text-neutral-900">
                40%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
              <div className="w-[40%] bg-blue-500 h-full" />
            </div>
          </div>

          {/* Review */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-neutral-700">
                Review
              </span>
              <span className="text-xs font-semibold text-neutral-900">
                20%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
              <div className="w-[20%] bg-blue-500 h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* High Risk Areas */}
      {highRiskAreas.length > 0 && (
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">
            High Risk Areas
          </h3>
          <div className="space-y-2">
            {highRiskAreas.map((area) => (
              <div
                key={area.id}
                className="text-xs font-medium text-red-700 hover:text-red-900 cursor-pointer"
              >
                {area.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Deadlines */}
      <div className="border-t border-neutral-200 pt-6">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Upcoming Deadlines
        </h3>
        <div className="space-y-2">
          {state.areas.slice(0, 3).map((area) => (
            <div key={area.id} className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-700 truncate">
                {area.name} Review
              </span>
              <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                {(parseInt(area.id) % 5) + 1}d
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-neutral-200 pt-6">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {state.activity.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="pb-3 border-b border-neutral-100 last:border-b-0"
            >
              <p className="text-xs font-medium text-neutral-900">
                {item.action}
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">{item.user}</p>
              <p className="text-xs text-neutral-400 mt-1">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
