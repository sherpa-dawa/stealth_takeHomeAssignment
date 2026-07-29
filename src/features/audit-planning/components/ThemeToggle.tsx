"use client";

import { useTheme } from "@/features/audit-planning/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        mode === "dark"
          ? "text-yellow-400 hover:bg-yellow-400/10"
          : "text-amber-600 hover:bg-amber-600/10"
      }`}
      title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      aria-label="Toggle theme"
    >
      {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
