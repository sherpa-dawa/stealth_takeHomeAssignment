"use client";

import { useState, useCallback, useRef } from "react";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { RiskLevel, AreaStatus } from "@/lib/types";
import { clients } from "@/lib/mockData";

interface FilterBarProps {
  selectedClient: string;
  onClientChange: (client: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRisk: RiskLevel | "All";
  onRiskChange: (risk: RiskLevel | "All") => void;
  selectedStatus: AreaStatus | "All";
  onStatusChange: (status: AreaStatus | "All") => void;
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
}: FilterBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchInput = useCallback(
    (value: string) => {
      setInputValue(value);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        onSearchChange(value);
      }, 300);
    },
    [onSearchChange]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-neutral-200 sm:items-end">
      <div className="w-48 sm:w-48">
        <label className="block text-xs font-medium text-neutral-700 mb-1">
          Client
        </label>
        <Select value={selectedClient} onValueChange={onClientChange}>
          <SelectTrigger className="w-full">
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
          onChange={(e) => handleSearchInput(e.target.value)}
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
