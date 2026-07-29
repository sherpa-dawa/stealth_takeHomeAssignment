"use client";

import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Input } from "@/shared/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";
import { RiskLevel, AreaStatus } from "@/features/audit-planning/types";
import { clients } from "@/features/audit-planning/constants/mockData";

interface FilterBarProps {
  selectedClient: string;
  onClientChange: (client: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRisk: RiskLevel | "All";
  onRiskChange: (risk: RiskLevel | "All") => void;
  selectedStatus: AreaStatus | "All";
  onStatusChange: (status: AreaStatus | "All") => void;
  isLoading?: boolean;
}

export default function FilterBar({
  selectedClient,
  onClientChange,
  searchQuery,
  onSearchChange,
  selectedRisk,
  onRiskChange,
  selectedStatus,
  onStatusChange,
  isLoading = false,
}: FilterBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(onSearchChange, 300);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-neutral-200 sm:items-end">
      <div className="w-48 sm:w-48">
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Client
        </label>
        <Select
          value={selectedClient}
          onValueChange={onClientChange}
          disabled={isLoading}
        >
          <SelectTrigger
            className={`w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client} value={client}>
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:flex-1 sm:min-w-40">
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Search by area name
        </label>
        <Input
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="w-full"
        />
      </div>

      <div className="w-full sm:w-auto sm:min-w-40">
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Risk Level
        </label>
        <Select
          value={selectedRisk}
          onValueChange={(value) => onRiskChange(value as RiskLevel | "All")}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto sm:min-w-40">
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Status
        </label>
        <Select
          value={selectedStatus}
          onValueChange={(value) => onStatusChange(value as AreaStatus | "All")}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Complete">Complete</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
