"use client";

import { useState, useCallback, useRef } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { RiskLevel, AreaStatus } from "@/lib/types";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRisk: RiskLevel | "All";
  onRiskChange: (risk: RiskLevel | "All") => void;
  selectedStatus: AreaStatus | "All";
  onStatusChange: (status: AreaStatus | "All") => void;
}

export default function FilterBar({
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
    <Box
      sx={{
        display: "flex",
        gap: 2,
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        alignItems: "flex-end",
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Search by area name"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => handleSearchInput(e.target.value)}
        sx={{ minWidth: "250px" }}
      />

      <FormControl size="small" sx={{ minWidth: "150px" }}>
        <InputLabel>Risk Level</InputLabel>
        <Select
          value={selectedRisk}
          label="Risk Level"
          onChange={(e) => onRiskChange(e.target.value as RiskLevel | "All")}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: "150px" }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={selectedStatus}
          label="Status"
          onChange={(e) => onStatusChange(e.target.value as AreaStatus | "All")}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Planning">Planning</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Review">Review</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
