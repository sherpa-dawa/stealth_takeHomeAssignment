"use client";

import { Button } from "@/shared/components/Button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="px-8 py-6">
      <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-800">{error}</p>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={onRetry}
          className="flex-shrink-0"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}
