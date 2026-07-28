import { Card, CardContent } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { ActivityItem } from "@/lib/types";

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-start pb-3 border-b border-neutral-100 last:border-b-0"
            >
              <Avatar
                initials={item.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                size="sm"
                className="flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900">
                  {item.user}
                </p>
                <p className="text-xs text-neutral-600">{item.action}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
