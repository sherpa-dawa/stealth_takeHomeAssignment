import { AlertCircle, Shield, Info } from "lucide-react";
import { RiskLevel } from "@/features/audit-planning/types";
import { riskBadgeColorMap } from "@/lib/theme/colorMap";

interface RiskChipProps {
  risk: RiskLevel;
  size?: "sm" | "md" | "lg";
}

export default function RiskChip({ risk, size = "sm" }: RiskChipProps) {
  const colors = riskBadgeColorMap[risk] || riskBadgeColorMap["Low"]!;

  const getIcon = () => {
    switch (risk) {
      case "High":
        return <AlertCircle className="w-4 h-4" />;
      case "Medium":
        return <Shield className="w-4 h-4" />;
      case "Low":
        return <Info className="w-4 h-4" />;
    }
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 font-semibold rounded-full border transition-colors duration-200 ${sizeClasses[size]}`}
      style={{
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        borderColor: colors.borderColor,
      }}
    >
      {getIcon()}
      <span>{risk}</span>
    </div>
  );
}
