"use client";

import { ToastProvider } from "@/components/common/Toast";
import { QueryProvider } from "@/features/audit-planning/lib/QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
}
