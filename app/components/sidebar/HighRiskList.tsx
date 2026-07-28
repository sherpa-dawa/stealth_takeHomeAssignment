import { Card, CardContent } from "../ui/Card";
import { AuditArea } from "@/lib/types";
import RiskChip from "../shared/RiskChip";

interface HighRiskListProps {
  areas: AuditArea[];
}

export default function HighRiskList({ areas }: HighRiskListProps) {
  if (areas.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-bold mb-4">High-Risk Areas</h3>

        <div className="space-y-3">
          {areas.map((area) => (
            <div
              key={area.id}
              className="pb-3 border-b border-neutral-100 last:border-b-0"
            >
              <div className="flex justify-between items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-neutral-900 flex-1">
                  {area.name}
                </p>
                <RiskChip risk={area.risk} size="sm" />
              </div>
              <p className="text-xs text-neutral-600">
                Progress: {area.progress}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
