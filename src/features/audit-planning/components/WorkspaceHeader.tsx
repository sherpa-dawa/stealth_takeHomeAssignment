"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Download, Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/common/Toast";
import { ThemeToggle } from "./ThemeToggle";

export default function WorkspaceHeader() {
  const { addToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      addToast({
        message: "Workspace exported successfully",
        type: "success",
        duration: 3000,
      });
    }, 2000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        message: "Workspace saved successfully",
        type: "success",
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-neutral-200 bg-white gap-4">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 truncate">
        Audit Planning Workspace
      </h1>

      <div className="flex gap-2 sm:gap-3 flex-shrink-0 items-center">
        <ThemeToggle />
        <Button
          variant="outline"
          size="sm"
          className="sm:size-md text-xs sm:text-sm"
          onClick={handleExport}
          disabled={isExporting}
          style={{ backgroundColor: "#ffffff" }}
        >
          {isExporting ? (
            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
          ) : (
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
          <span className="hidden sm:inline ml-2">Export</span>
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="sm:size-md text-xs sm:text-sm"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
          ) : (
            <Save className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
          <span className="hidden sm:inline ml-2">Save</span>
        </Button>
      </div>
    </div>
  );
}
