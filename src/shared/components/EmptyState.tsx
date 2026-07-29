"use client";

import { Inbox, Filter } from "lucide-react";

interface EmptyStateProps {
  variant: "no-data" | "no-results";
}

export default function EmptyState({ variant }: EmptyStateProps) {
  const isNoData = variant === "no-data";

  return (
    <div className="flex justify-center items-center min-h-96 flex-col gap-4 p-8 text-center">
      {isNoData ? (
        <>
          <Inbox className="w-20 h-20 text-neutral-400" />
          <h3 className="text-xl font-semibold text-neutral-700">
            No Audit Areas Found
          </h3>
          <p className="text-sm text-neutral-600 max-w-sm">
            There are no audit areas to display. This audit workspace appears to
            be empty.
          </p>
        </>
      ) : (
        <>
          <Filter className="w-20 h-20 text-neutral-400" />
          <h3 className="text-xl font-semibold text-neutral-700">
            No Results Match Your Filters
          </h3>
          <p className="text-sm text-neutral-600 max-w-sm">
            Try adjusting your search query or filter criteria to find the audit
            areas you&apos;re looking for.
          </p>
        </>
      )}
    </div>
  );
}
