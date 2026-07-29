import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Calendar } from "lucide-react";
import { Deadline } from "@/lib/types";

interface DeadlinesListProps {
  deadlines: Deadline[];
}

const getUrgencyVariant = (
  daysRemaining: number
): "danger" | "warning" | "success" => {
  if (daysRemaining <= 7) return "danger";
  if (daysRemaining <= 14) return "warning";
  return "success";
};

export default function DeadlinesList({ deadlines }: DeadlinesListProps) {
  if (deadlines.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-bold mb-4">Upcoming Deadlines</h3>

        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="pb-3 border-b border-neutral-100 last:border-b-0"
            >
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                {deadline.title}
              </h4>
              <div className="flex gap-1 items-center mb-2">
                <Calendar className="w-4 h-4 text-neutral-600" />
                <span className="text-xs text-neutral-600">
                  {new Date(deadline.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Badge
                variant={getUrgencyVariant(deadline.daysRemaining)}
                size="sm"
              >
                {deadline.daysRemaining} days remaining
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
