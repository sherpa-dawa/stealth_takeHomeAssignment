import { Card, CardContent } from "../ui/Card";
import { ProgressBreakdown } from "@/lib/types";

interface ProgressWidgetProps {
  progress: ProgressBreakdown | null;
}

const phaseColors = {
  planning: "from-blue-300 to-blue-400",
  evidence: "from-yellow-300 to-yellow-400",
  review: "from-emerald-300 to-emerald-400",
};

const ProgressBar = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-semibold text-neutral-700">{label}</span>
      <span className="text-xs font-semibold text-neutral-700">{value}%</span>
    </div>
    <div className="w-full bg-neutral-300 rounded-full h-2 overflow-hidden">
      <div
        className={`bg-gradient-to-r ${colorClass} h-full rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function ProgressWidget({ progress }: ProgressWidgetProps) {
  if (!progress) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-bold mb-4">Progress Breakdown</h3>

        <ProgressBar
          label="Planning"
          value={progress.planning}
          colorClass={phaseColors.planning}
        />
        <ProgressBar
          label="Evidence"
          value={progress.evidence}
          colorClass={phaseColors.evidence}
        />
        <ProgressBar
          label="Review"
          value={progress.review}
          colorClass={phaseColors.review}
        />
      </CardContent>
    </Card>
  );
}
