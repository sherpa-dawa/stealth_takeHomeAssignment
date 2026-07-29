"use client";

import { Card, CardContent } from "../ui/Card";

const Skeleton = ({
  width = "100%",
  height = "16px",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded animate-pulse ${className}`}
    style={{ width, height }}
  />
);

export default function LoadingState() {
  return (
    <div className="flex flex-1">
      {/* Left: Loading Skeleton Cards */}
      <div className="flex-1 overflow-y-auto bg-neutral-50 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <div key={key}>
              <Card className="h-full flex flex-col">
                <CardContent className="flex flex-col gap-4">
                  {/* Title and Risk Chip */}
                  <div className="flex items-start justify-between gap-2">
                    <Skeleton width="55%" height="22px" />
                    <Skeleton
                      width="70px"
                      height="24px"
                      className="rounded-md"
                    />
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton width="35%" height="14px" />
                      <Skeleton width="25%" height="14px" />
                    </div>
                    <Skeleton
                      width="100%"
                      height="8px"
                      className="rounded-full"
                    />
                  </div>

                  {/* Assigned Auditor Section */}
                  <div className="space-y-2">
                    <Skeleton width="45%" height="14px" />
                    <div className="flex items-center gap-3">
                      <Skeleton
                        width="40px"
                        height="40px"
                        className="rounded-full flex-shrink-0"
                      />
                      <Skeleton width="50%" height="16px" />
                    </div>
                  </div>

                  {/* Tasks and Evidence Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton width="50%" height="14px" />
                      <Skeleton width="40%" height="18px" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton width="55%" height="14px" />
                      <Skeleton width="45%" height="18px" />
                    </div>
                  </div>

                  {/* Status Section */}
                  <div className="space-y-2">
                    <Skeleton width="30%" height="14px" />
                    <Skeleton
                      width="60%"
                      height="28px"
                      className="rounded-md"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Skeleton
                      width="45%"
                      height="32px"
                      className="rounded-md"
                    />
                    <Skeleton
                      width="45%"
                      height="32px"
                      className="rounded-md"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Loading Sidebar */}
      <div className="hidden lg:flex lg:w-96 border-l border-neutral-200 bg-white overflow-y-auto">
        <div className="flex-1 p-6 space-y-6">
          {/* Progress Breakdown */}
          <Card>
            <CardContent className="space-y-3">
              <Skeleton width="45%" height="18px" />
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <Skeleton width="35%" height="14px" />
                  <Skeleton width="20%" height="14px" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* High Risk Areas */}
          <Card>
            <CardContent className="space-y-3">
              <Skeleton width="50%" height="18px" />
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  width="100%"
                  height="32px"
                  className="rounded-md"
                />
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="space-y-3">
              <Skeleton width="50%" height="18px" />
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3">
                  <Skeleton
                    width="40px"
                    height="40px"
                    className="rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="60%" height="14px" />
                    <Skeleton width="100%" height="12px" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
