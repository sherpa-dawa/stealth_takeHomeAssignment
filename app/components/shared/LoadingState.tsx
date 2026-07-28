"use client";

import { Card, CardContent } from "../ui/Card";

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

export default function LoadingState() {
  return (
    <div className="flex flex-1">
      {/* Left: Loading Skeleton Cards */}
      <div className="flex-1 p-8 overflow-y-auto bg-neutral-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <div key={key}>
            <Card className="h-full flex flex-col">
              <CardContent className="flex flex-col gap-4">
                {/* Title and Risk Chip */}
                <div className="flex justify-between">
                  <Skeleton width="60%" height="28px" />
                  <Skeleton width="60px" height="24px" />
                </div>

                {/* Progress Section */}
                <div>
                  <Skeleton width="30%" height="16px" />
                  <Skeleton width="100%" height="6px" />
                </div>

                {/* Assigned Auditor Section */}
                <div>
                  <Skeleton width="40%" height="16px" />
                  <div className="flex items-center gap-2 mt-2">
                    <Skeleton width="32px" height="32px" />
                    <Skeleton width="50%" height="16px" />
                  </div>
                </div>

                {/* Open Tasks and Evidence Section */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Skeleton width="50%" height="16px" />
                    <Skeleton width="30%" height="16px" />
                  </div>
                  <div className="flex-1">
                    <Skeleton width="60%" height="16px" />
                    <Skeleton width="30%" height="16px" />
                  </div>
                </div>

                {/* Status Section */}
                <div>
                  <Skeleton width="25%" height="16px" />
                  <Skeleton width="40%" height="24px" />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4].map((btn) => (
                    <Skeleton key={btn} width="calc(25% - 6px)" height="32px" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Right: Loading Sidebar */}
      <div className="w-80 p-8 overflow-y-auto border-l border-neutral-200 bg-white">
        <Card>
          <CardContent>
            <Skeleton width="50%" height="28px" />
            <div className="flex flex-col gap-3 mt-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex gap-2 pb-3 border-b border-neutral-100 last:border-b-0"
                >
                  <Skeleton width="32px" height="32px" />
                  <div className="flex-1">
                    <Skeleton width="70%" height="16px" />
                    <Skeleton width="100%" height="14px" />
                    <Skeleton width="40%" height="12px" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
