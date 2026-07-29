"use client";

import { ToastProvider } from "@/components/common/Toast";
import { QueryProvider } from "@/features/audit-planning/lib/QueryProvider";
import { ThemeProvider } from "@/features/audit-planning/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
